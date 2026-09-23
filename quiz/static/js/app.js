// ==========================================
// QUIZ SYSTEM WITH CHAPTER LOCK SYSTEM
// + Question Type (MCQ / SAQ / 2,3,4,5 Marks)
// ==========================================

// ===== CONFIGURATION =====
const USER_TYPE = document.getElementById('userType').value;
const STUDENT_ID = document.getElementById('studentId').value;
const MATCHED_BATCH = JSON.parse(document.getElementById('matchedBatchData').value || 'null');
const RETURN_URL = document.getElementById('returnUrl').value;
const API_BASE = '/quiz/api';

// ===== STATE VARIABLES =====
let currentBatchId = null;
let currentBatchName = '';
let currentSubjectId = null;
let currentSubjectName = '';
let currentChapterId = null;
let currentChapterName = '';
let currentQuestionType = null;
let currentQuestionTypeName = '';

let questions = [];
let currentQuestionIndex = 0;
let userAnswers = {};
let currentSubjectChapters = [];
let isSubmitting = false;

// ==========================================
// CELEBRATION
// ==========================================
function triggerCelebration() {
    if (typeof confetti === 'function') {
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } });
    }
}

// ==========================================
// 1. LOAD BATCHES
// ==========================================
async function loadBatches(pushHistory = true) {
    currentBatchId = null;
    currentBatchName = '';
    currentSubjectId = null;
    currentSubjectName = '';
    currentChapterId = null;
    currentChapterName = '';
    currentQuestionType = null;
    currentQuestionTypeName = '';

    if (pushHistory && history.state?.view !== 'batches') {
        history.pushState({ view: 'batches' }, '');
    }

    const grid = document.getElementById('batches-grid');
    if (!grid) return;

    try {
        if (USER_TYPE === 'student' && MATCHED_BATCH) {
            grid.innerHTML = `
                <div class="card matched-batch" onclick="selectBatch('${MATCHED_BATCH.id}', '${MATCHED_BATCH.name}')">
                    <i class="fas fa-graduation-cap"></i>
                    ${MATCHED_BATCH.name}
                    <span style="font-size:0.7rem;color:#4facfe;display:block;margin-top:4px;">✅ Your Class</span>
                </div>
            `;
            
            setTimeout(() => {
                if (MATCHED_BATCH && MATCHED_BATCH.id) {
                    selectBatch(MATCHED_BATCH.id, MATCHED_BATCH.name, true);
                }
            }, 500);
            
            showView('batches-view');
            updateBreadcrumb();
            return;
        }

        const response = await fetch(`${API_BASE}/batches`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        let batches = await response.json();
        batches = sortBatches(batches);
        
        grid.innerHTML = '';
        if (batches && batches.length > 0) {
            batches.forEach(batch => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `<i class="fas fa-users"></i> ${batch.name}`;
                card.onclick = () => selectBatch(batch.id, batch.name);
                grid.appendChild(card);
            });
        } else {
            grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #718096;"><h3>No Batches Found</h3></div>`;
        }
        showView('batches-view');
        updateBreadcrumb();
    } catch (error) {
        console.error('❌ Error loading batches:', error);
        grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #e53e3e;"><h3>Failed to load</h3></div>`;
    }
}

function sortBatches(batches) {
    return batches.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        const numA = parseInt(nameA.match(/\d+/)?.[0] || 0);
        const numB = parseInt(nameB.match(/\d+/)?.[0] || 0);
        if (numA > 0 && numB > 0) return numA - numB;
        return nameA.localeCompare(nameB);
    });
}

// ==========================================
// 2. SELECT BATCH -> LOAD SUBJECTS
// ==========================================
async function selectBatch(batchId, batchName, pushHistory = true) {
    currentBatchId = batchId;
    currentBatchName = batchName;
    currentSubjectId = null;
    currentSubjectName = '';
    currentChapterId = null;
    currentChapterName = '';
    currentQuestionType = null;
    currentQuestionTypeName = '';

    if (pushHistory) {
        history.pushState({ view: 'subjects', batchId, batchName }, '');
    }

    try {
        const response = await fetch(`${API_BASE}/batches/${batchId}/subjects`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const subjects = await response.json();
        const grid = document.getElementById('subjects-grid');
        if (!grid) return;
        grid.innerHTML = '';

        if (subjects && subjects.length > 0) {
            subjects.forEach(subject => {
                const card = document.createElement('div');
                card.className = 'card';
                const progress = subject.progress_percentage || 0;
                const progressColor = progress === 100 ? '#28a745' : progress > 0 ? '#4facfe' : '#e2e8f0';
                
                card.innerHTML = `
                    <i class="fas fa-book"></i>
                    ${subject.name}
                    <div style="font-size:0.75rem;color:#718096;margin-top:4px;">
                        ${subject.completed_chapters}/${subject.total_chapters} Chapters Completed
                    </div>
                    <div style="width:100%;height:4px;background:#e2e8f0;border-radius:2px;margin-top:6px;">
                        <div style="width:${progress}%;height:100%;background:${progressColor};border-radius:2px;transition:width 0.5s;"></div>
                    </div>
                `;
                card.onclick = () => selectSubject(subject.id, subject.name);
                grid.appendChild(card);
            });
        } else {
            grid.innerHTML = `<div style="text-align: center; padding: 40px; color: #718096;"><h3>No Subjects Found</h3></div>`;
        }
        showView('subjects-view');
        updateBreadcrumb();
    } catch (error) {
        console.error('❌ Error loading subjects:', error);
        showError('Failed to load subjects.');
    }
}

// ==========================================
// 3. SELECT SUBJECT -> LOAD CHAPTERS
// ==========================================
async function selectSubject(subjectId, subjectName, pushHistory = true) {
    currentSubjectId = subjectId;
    currentSubjectName = subjectName;
    currentChapterId = null;
    currentChapterName = '';
    currentQuestionType = null;
    currentQuestionTypeName = '';

    if (pushHistory) {
        history.pushState({ 
            view: 'chapters', 
            batchId: currentBatchId, 
            batchName: currentBatchName, 
            subjectId, 
            subjectName 
        }, '');
    }

    try {
        const response = await fetch(`${API_BASE}/batches/${currentBatchId}/subjects/${subjectId}/chapters`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const chapters = await response.json();
        currentSubjectChapters = chapters;
        
        const grid = document.getElementById('chapters-grid');
        if (!grid) return;
        grid.innerHTML = '';

        if (chapters && chapters.length > 0) {
            chapters.forEach(chapter => {
                const card = document.createElement('div');
                card.className = 'card';
                
                let statusIcon = '';
                let statusText = '';
                let statusColor = '';
                
                const isTeacher = USER_TYPE === 'teacher' || USER_TYPE === 'admin';
                const isLocked = !isTeacher && chapter.is_locked;
                const isCompleted = chapter.is_completed;
                
                if (isCompleted) {
                    statusIcon = '✅';
                    statusText = 'Completed';
                    statusColor = '#28a745';
                    card.style.borderColor = '#28a745';
                    card.style.background = '#f0fff4';
                } else if (isLocked) {
                    statusIcon = '🔒';
                    statusText = 'Locked';
                    statusColor = '#e53e3e';
                    card.style.opacity = '0.6';
                    card.style.cursor = 'not-allowed';
                } else {
                    statusIcon = '📝';
                    statusText = 'Open';
                    statusColor = '#4facfe';
                }
                
                card.innerHTML = `
                    <i class="fas fa-${isLocked ? 'lock' : isCompleted ? 'check-circle' : 'play-circle'}" 
                       style="color:${statusColor};"></i>
                    Chapter ${chapter.order}: ${chapter.name}
                    <span style="font-size:0.7rem;color:${statusColor};display:block;margin-top:4px;">
                        ${statusIcon} ${statusText}
                    </span>
                `;
                
                if (!isLocked || isTeacher) {
                    card.onclick = () => selectChapter(chapter.id, chapter.name);
                }
                
                grid.appendChild(card);
            });
        } else {
            grid.innerHTML = `<div style="text-align: center; padding: 40px; color: #718096;"><h3>No Chapters Found</h3></div>`;
        }
        showView('chapters-view');
        updateBreadcrumb();
    } catch (error) {
        console.error('❌ Error loading chapters:', error);
        showError('Failed to load chapters.');
    }
}

// ==========================================
// 4. SELECT CHAPTER -> LOAD QUESTION TYPES
// ==========================================
async function selectChapter(chapterId, chapterName, pushHistory = true) {
    currentChapterId = chapterId;
    currentChapterName = chapterName;
    currentQuestionType = null;
    currentQuestionTypeName = '';

    if (pushHistory) {
        history.pushState({
            view: 'question-types',
            batchId: currentBatchId,
            batchName: currentBatchName,
            subjectId: currentSubjectId,
            subjectName: currentSubjectName,
            chapterId,
            chapterName
        }, '');
    }

    try {
        const response = await fetch(`${API_BASE}/batches/${currentBatchId}/subjects/${currentSubjectId}/chapters/${chapterId}/question-types`);
        
        if (response.status === 403) {
            const error = await response.json();
            const isTeacher = USER_TYPE === 'teacher' || USER_TYPE === 'admin';
            if (!isTeacher) {
                showError(error.error || 'This chapter is locked! Complete previous chapter first.');
                return;
            }
        }
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const types = await response.json();
        const grid = document.getElementById('question-types-grid');
        if (!grid) return;
        grid.innerHTML = '';

        if (types && types.length > 0) {
            types.forEach(t => {
                const card = document.createElement('div');
                card.className = 'card';
                const isTeacher = USER_TYPE === 'teacher' || USER_TYPE === 'admin';
                const isLocked = !isTeacher && t.is_locked;
                const isCompleted = t.is_completed;

                let statusIcon = isCompleted ? '✅' : isLocked ? '🔒' : '📝';
                let statusText = isCompleted ? 'Completed' : isLocked ? 'Locked' : 'Open';
                let statusColor = isCompleted ? '#28a745' : isLocked ? '#e53e3e' : '#4facfe';

                let iconClass = 'play-circle';
                if (t.type === 'mcq') iconClass = 'check-square';
                else if (t.type === 'saq') iconClass = 'pen';
                else if (t.type && t.type.startsWith('marks_')) iconClass = 'file-alt';

                card.innerHTML = `
                    <i class="fas fa-${iconClass}" 
                       style="color:${statusColor};"></i>
                    ${t.name}
                    <span style="font-size:0.7rem;color:${statusColor};display:block;margin-top:4px;">
                        ${statusIcon} ${statusText}
                    </span>
                `;

                if (isLocked) {
                    card.style.opacity = '0.6';
                    card.style.cursor = 'not-allowed';
                } else {
                    card.onclick = () => selectQuestionType(t.type, t.name);
                }
                grid.appendChild(card);
            });
        } else {
            grid.innerHTML = `<div style="text-align: center; padding: 40px; color: #718096;"><h3>No Question Types Found</h3></div>`;
        }
        showView('question-types-view');
        updateBreadcrumb();
    } catch (error) {
        console.error('❌ Error loading question types:', error);
        showError('Failed to load question types.');
    }
}

// ==========================================
// 5. SELECT QUESTION TYPE -> LOAD QUESTIONS
// ==========================================
async function selectQuestionType(type, typeName, pushHistory = true) {
    currentQuestionType = type;
    currentQuestionTypeName = typeName;

    questions = [];
    currentQuestionIndex = 0;
    userAnswers = {};
    isSubmitting = false;

    if (pushHistory) {
        history.pushState({
            view: 'quiz',
            batchId: currentBatchId,
            batchName: currentBatchName,
            subjectId: currentSubjectId,
            subjectName: currentSubjectName,
            chapterId: currentChapterId,
            chapterName: currentChapterName,
            questionType: type,
            questionTypeName: typeName
        }, '');
    }

    try {
        const isTeacher = USER_TYPE === 'teacher' || USER_TYPE === 'admin';
        const forceParam = isTeacher ? '?force=true' : '';
        const url = `${API_BASE}/batches/${currentBatchId}/subjects/${currentSubjectId}/chapters/${currentChapterId}/questions/${type}${forceParam}`;
        
        const response = await fetch(url);
        
        if (response.status === 403) {
            const error = await response.json();
            if (!isTeacher) {
                showError(error.error || 'This section is locked!');
                return;
            }
        }
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        questions = await response.json();

        if (questions.length > 0) {
            if (type === 'mcq') {
                restoreQuizLayout();
                showQuestion(0);
            } else {
                restoreWrittenLayout();
                showWrittenQuestion(0);
            }
            showView('quiz-view');
            updateBreadcrumb();
        } else {
            alert('❌ No questions found in this section!');
        }
    } catch (error) {
        console.error('❌ Error loading questions:', error);
        showError('Failed to load questions.');
    }
}

// ==========================================
// NAVIGATION HELPERS
// ==========================================
function showBatchesView() { loadBatches(true); }
function showSubjectsView() { if (currentBatchId) selectBatch(currentBatchId, currentBatchName, true); }
function showChaptersView() { if (currentSubjectId) selectSubject(currentSubjectId, currentSubjectName, true); }
function showQuestionTypesView() { if (currentChapterId) selectChapter(currentChapterId, currentChapterName, true); }

function updateBreadcrumb() {
    const bc = document.getElementById('breadcrumb');
    if (!bc) return;

    let html = `<span onclick="showBatchesView()" style="cursor:pointer;"><i class="fas fa-home"></i> Batch</span>`;

    if (currentBatchId) {
        html += ` <span class="separator">›</span> <span onclick="showSubjectsView()" style="cursor:pointer;">${currentBatchName}</span>`;
    }
    if (currentSubjectId) {
        html += ` <span class="separator">›</span> <span onclick="showChaptersView()" style="cursor:pointer;">${currentSubjectName}</span>`;
    }
    if (currentChapterId) {
        html += ` <span class="separator">›</span> <span onclick="showQuestionTypesView()" style="cursor:pointer;">${currentChapterName}</span>`;
    }
    if (currentQuestionType) {
        html += ` <span class="separator">›</span> <span style="font-weight:bold;">${currentQuestionTypeName}</span>`;
    }

    bc.innerHTML = html;
    bc.style.display = 'flex';
}

function showView(viewId) {
    document.querySelectorAll('.view-section').forEach(v => v.classList.remove('active'));
    const targetView = document.getElementById(viewId);
    if (targetView) targetView.classList.add('active');
}

// ==========================================
// QUIZ UI (MCQ)
// ==========================================
function restoreQuizLayout() {
    const quizCard = document.getElementById('quiz-card');
    const footer = document.getElementById('quizFooter');
    if (footer) {
        footer.style.display = 'flex';
        footer.style.visibility = 'visible';
        footer.style.opacity = '1';
    }

    quizCard.innerHTML = `
        <div id="question-text" class="question-text"></div>
        <div id="question-image-container" class="image-container" style="display: none;">
            <img id="question-image" src="" alt="Question Image">
        </div>
        <div id="options-container" class="options-grid"></div>
    `;
}

// ==========================================
// WRITTEN QUESTION LAYOUT (SAQ / 2,3,4,5 Marks)
// ==========================================
function restoreWrittenLayout() {
    const quizCard = document.getElementById('quiz-card');
    const footer = document.getElementById('quizFooter');
    if (footer) {
        footer.style.display = 'flex';
        footer.style.visibility = 'visible';
        footer.style.opacity = '1';
    }
    quizCard.innerHTML = `
        <div id="written-question-container"></div>
    `;
}

function showWrittenQuestion(index) {
    if (!questions || questions.length === 0) return;
    const q = questions[index];
    if (!q) return;

    const progressElem = document.getElementById('quiz-progress');
    if (progressElem) progressElem.innerText = `Question ${index + 1} / ${questions.length}`;

    const container = document.getElementById('written-question-container');
    if (!container) return;

    container.innerHTML = `
        <div class="written-q-block">
            <div class="question-text" id="written-q-text-${index}">
                ${index + 1}. ${q.question || q.text || ''}
            </div>
            <button class="view-answer-btn" onclick="toggleAnswer(${index})">
                <i class="fas fa-eye"></i> View Answer
            </button>
            <div class="written-answer" id="written-answer-${index}" style="display:none;">
                <strong>Answer:</strong><br>${q.answer || ''}
            </div>
        </div>
    `;

    if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise([container]).catch(() => {});
    }

    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const isLast = index === questions.length - 1;

    if (prevBtn) {
        if (index === 0) {
            prevBtn.disabled = true;
            prevBtn.style.display = 'none';
        } else {
            prevBtn.disabled = false;
            prevBtn.style.display = 'flex';
            prevBtn.style.opacity = '1';
        }
    }

    if (nextBtn) {
        nextBtn.disabled = false;
        nextBtn.style.display = 'flex';
        nextBtn.style.visibility = 'visible';
        nextBtn.style.opacity = '1';
        if (isLast) {
            nextBtn.innerHTML = '✅ Done';
            nextBtn.onclick = () => showQuestionTypesView();
            nextBtn.style.background = '#28a745';
        } else {
            nextBtn.innerHTML = 'Next →';
            nextBtn.onclick = nextQuestion;
            nextBtn.style.background = '#4facfe';
        }
    }
}

function toggleAnswer(index) {
    const ans = document.getElementById(`written-answer-${index}`);
    if (!ans) return;
    const btn = ans.previousElementSibling;
    if (ans.style.display === 'none') {
        ans.style.display = 'block';
        if (btn) btn.innerHTML = '<i class="fas fa-eye-slash"></i> Hide Answer';
    } else {
        ans.style.display = 'none';
        if (btn) btn.innerHTML = '<i class="fas fa-eye"></i> View Answer';
    }
}

// ==========================================
// MCQ QUESTION RENDER
// ==========================================
function showQuestion(index) {
    if (!questions || questions.length === 0) return;
    const q = questions[index];
    if (!q) return;

    const progressElem = document.getElementById('quiz-progress');
    if (progressElem) progressElem.innerText = `Question ${index + 1} / ${questions.length}`;

    const qTextElem = document.getElementById('question-text');
    if (qTextElem) qTextElem.innerHTML = `${index + 1}. ${q.question || q.text || ''}`;

    const imgContainer = document.getElementById('question-image-container');
    const imgElem = document.getElementById('question-image');
    if (q.image && imgElem) {
        imgElem.src = `quiz/static/images/${q.image}`;
        if (imgContainer) imgContainer.style.display = 'block';
    } else if (imgContainer) {
        imgContainer.style.display = 'none';
    }

    const optionsGrid = document.getElementById('options-container');
    if (!optionsGrid) return;
    optionsGrid.innerHTML = '';

    if (q.options && Array.isArray(q.options)) {
        const correctAnswer = q.answer !== undefined ? q.answer : q.correct_answer;
        
        q.options.forEach((optText, optIdx) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerHTML = `<span class="option-label">${String.fromCharCode(65 + optIdx)}</span> ${optText}`;
            
            if (userAnswers[index] !== undefined) {
                btn.classList.add('disabled');
                if (optIdx === correctAnswer) btn.classList.add('correct');
                if (userAnswers[index] === optIdx && optIdx !== correctAnswer) btn.classList.add('wrong');
            } else {
                btn.onclick = () => handleAnswer(optIdx, correctAnswer, index);
            }
            optionsGrid.appendChild(btn);
        });
    }

    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (prevBtn) {
        if (index === 0) {
            prevBtn.disabled = true;
            prevBtn.style.display = 'none';
        } else {
            prevBtn.disabled = false;
            prevBtn.style.display = 'flex';
            prevBtn.style.opacity = '1';
        }
    }
    
    if (nextBtn) {
        nextBtn.disabled = false;
        nextBtn.style.display = 'flex';
        nextBtn.style.opacity = '1';
        nextBtn.style.visibility = 'visible';
        
        const answeredCount = Object.keys(userAnswers).length;
        const totalQuestions = questions.length;
        const allAnswered = answeredCount === totalQuestions;
        const isLastQuestion = index === totalQuestions - 1;
        
        if (isLastQuestion && allAnswered) {
            nextBtn.innerHTML = '📤 Submit';
            nextBtn.onclick = submitQuiz;
            nextBtn.style.background = '#28a745';
        } else {
            nextBtn.innerHTML = 'Next →';
            nextBtn.onclick = nextQuestion;
            nextBtn.style.background = '#4facfe';
        }
    }

    if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise([qTextElem, optionsGrid]).catch(() => {});
    }
}

// ==========================================
// MCQ ANSWER HANDLER
// ==========================================
function handleAnswer(selectedIndex, correctAnswer, questionIndex) {
    userAnswers[questionIndex] = selectedIndex;

    if (selectedIndex === correctAnswer) {
        triggerCelebration();
    }

    showQuestion(questionIndex);

    const totalQuestions = questions.length;
    const answeredCount = Object.keys(userAnswers).length;
    
    if (answeredCount === totalQuestions) {
        const nextBtn = document.getElementById('next-btn');
        if (nextBtn) {
            nextBtn.innerHTML = '📤 Submit';
            nextBtn.onclick = submitQuiz;
            nextBtn.disabled = false;
            nextBtn.style.display = 'flex';
            nextBtn.style.visibility = 'visible';
            nextBtn.style.opacity = '1';
            nextBtn.style.background = '#28a745';
        }
    }
}

// ==========================================
// SUBMIT QUIZ (MCQ)
// ==========================================
async function submitQuiz() {
    if (isSubmitting) return;
    isSubmitting = true;
    
    let correct = 0;
    questions.forEach((q, idx) => {
        const correctAnswer = q.answer !== undefined ? q.answer : q.correct_answer;
        if (userAnswers[idx] === correctAnswer) correct++;
    });
    
    const total = questions.length;
    const percentage = Math.round((correct / total) * 100);
    
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    
    if (nextBtn) {
        nextBtn.disabled = true;
        nextBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    }
    if (prevBtn) {
        prevBtn.disabled = true;
    }
    
    try {
        const response = await fetch('/quiz/api/submit_result', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                batch_id: currentBatchId,
                subject_id: currentSubjectId,
                chapter_id: currentChapterId,
                question_type: currentQuestionType || 'mcq',
                score: correct,
                total: total,
                percentage: percentage
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            triggerCelebration();
            
            const quizCard = document.getElementById('quiz-card');
            const footer = document.getElementById('quizFooter');
            
            let nextChapterHTML = '';
            if (result.next_chapter_unlocked) {
                nextChapterHTML = `
                    <div style="margin-top:15px;padding:15px;background:#e6fffa;border-radius:10px;border:2px solid #38b2ac;">
                        <p style="color:#2c7a7b;font-weight:600;">
                            🎉 Chapter Completed! Next Chapter Unlocked!
                        </p>
                        <button onclick="showChaptersView()" class="nav-btn primary" style="margin-top:10px;padding:12px 30px;border:none;border-radius:8px;cursor:pointer;display:inline-flex;align-items:center;gap:8px;">
                            <i class="fas fa-arrow-right"></i> View Next Chapter
                        </button>
                    </div>
                `;
            }
            
            quizCard.innerHTML = `
                <div class="quiz-results" style="text-align: center; padding: 30px 20px;">
                    <div style="font-size: 60px; margin-bottom: 10px;">🎉</div>
                    <h2 style="color: #28a745; margin-bottom: 10px;">Congratulations!</h2>
                    <p style="font-size: 1.2rem; margin-bottom: 5px;">You scored: <strong>${correct}/${total}</strong></p>
                    <p style="font-size: 1.1rem; color: #2c7a7b; margin-bottom: 15px;">
                        Score: <strong>${percentage}%</strong>
                        ✅ Passed!
                    </p>
                    <p style="font-size: 0.9rem; color: #718096; margin-bottom: 15px;">
                        📊 Result saved to database
                    </p>
                    ${nextChapterHTML}
                    <button onclick="showQuestionTypesView()" class="nav-btn secondary" style="margin-top:10px;padding:12px 30px;border:none;border-radius:8px;cursor:pointer;display:inline-flex;align-items:center;gap:8px;">
                        <i class="fas fa-arrow-left"></i> Back to Question Types
                    </button>
                </div>
            `;
            if (footer) footer.style.display = 'none';
            
        } else {
            const quizCard = document.getElementById('quiz-card');
            
            if (result.already_completed) {
                quizCard.innerHTML = `
                    <div class="quiz-results" style="text-align: center; padding: 30px 20px;">
                        <div style="font-size: 60px; margin-bottom: 10px;">⚠️</div>
                        <h2 style="color: #e53e3e; margin-bottom: 10px;">This section is already completed!</h2>
                        <button onclick="showQuestionTypesView()" class="nav-btn primary" style="margin-top:10px;padding:12px 30px;border:none;border-radius:8px;cursor:pointer;display:inline-flex;align-items:center;gap:8px;">
                            <i class="fas fa-arrow-left"></i> Back to Question Types
                        </button>
                    </div>
                `;
                const footer = document.getElementById('quizFooter');
                if (footer) footer.style.display = 'none';
            } else {
                quizCard.innerHTML = `
                    <div class="quiz-results" style="text-align: center; padding: 30px 20px;">
                        <div style="font-size: 60px; margin-bottom: 10px;">😅</div>
                        <h2 style="color: #e53e3e; margin-bottom: 10px;">Try Again!</h2>
                        <p style="font-size: 1.2rem; margin-bottom: 5px;">You scored: <strong>${correct}/${total}</strong></p>
                        <p style="font-size: 1.1rem; color: #e53e3e; margin-bottom: 15px;">
                            Score: <strong>${percentage}%</strong> (Need 95%)
                        </p>
                        <p style="color: #718096; margin-bottom: 15px;">${result.message || 'Try again!'}</p>
                        <button onclick="resetQuiz()" class="nav-btn primary" style="margin-top:10px;padding:12px 30px;border:none;border-radius:8px;cursor:pointer;display:inline-flex;align-items:center;gap:8px;">
                            <i class="fas fa-redo"></i> Retry Quiz
                        </button>
                    </div>
                `;
                const footer = document.getElementById('quizFooter');
                if (footer) footer.style.display = 'none';
            }
        }
        
        isSubmitting = false;
        
    } catch (error) {
        console.error('❌ Error submitting quiz:', error);
        showError('Failed to submit. Please try again.');
        
        const nextBtn = document.getElementById('next-btn');
        const prevBtn = document.getElementById('prev-btn');
        if (nextBtn) {
            nextBtn.disabled = false;
            nextBtn.innerHTML = '📤 Submit';
            nextBtn.onclick = submitQuiz;
        }
        if (prevBtn) {
            prevBtn.disabled = false;
        }
        isSubmitting = false;
    }
}

// ==========================================
// RESET QUIZ
// ==========================================
function resetQuiz() {
    userAnswers = {};
    currentQuestionIndex = 0;
    isSubmitting = false;
    
    restoreQuizLayout();
    showQuestion(0);
    
    const footer = document.getElementById('quizFooter');
    if (footer) {
        footer.style.display = 'flex';
        footer.style.visibility = 'visible';
        footer.style.opacity = '1';
    }
    
    const prevBtn = document.getElementById('prev-btn');
    if (prevBtn) {
        prevBtn.disabled = true;
        prevBtn.style.display = 'none';
        prevBtn.style.opacity = '1';
    }
    
    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) {
        nextBtn.disabled = false;
        nextBtn.style.display = 'flex';
        nextBtn.style.visibility = 'visible';
        nextBtn.style.opacity = '1';
        nextBtn.innerHTML = 'Next →';
        nextBtn.onclick = nextQuestion;
        nextBtn.style.background = '#4facfe';
    }
    
    const progressElem = document.getElementById('quiz-progress');
    if (progressElem) {
        progressElem.innerText = `Question 1 / ${questions.length}`;
    }
    
    if (window.MathJax && window.MathJax.typesetPromise) {
        const qTextElem = document.getElementById('question-text');
        const optionsGrid = document.getElementById('options-container');
        if (qTextElem && optionsGrid) {
            window.MathJax.typesetPromise([qTextElem, optionsGrid]).catch(() => {});
        }
    }
    
    const quizView = document.getElementById('quiz-view');
    if (quizView) {
        quizView.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    console.log('🔄 Quiz reset successfully');
}

// ==========================================
// NAVIGATION
// ==========================================
function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        if (currentQuestionType === 'mcq') {
            showQuestion(currentQuestionIndex);
        } else {
            showWrittenQuestion(currentQuestionIndex);
        }
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        if (currentQuestionType === 'mcq') {
            showQuestion(currentQuestionIndex);
        } else {
            showWrittenQuestion(currentQuestionIndex);
        }
    }
}

// ==========================================
// GO BACK TO DASHBOARD
// ==========================================
function goBackToDashboard() {
    if (RETURN_URL) {
        window.location.href = RETURN_URL;
        return;
    }
    const storedUrl = sessionStorage.getItem('dashboardUrl');
    if (storedUrl) {
        window.location.href = storedUrl;
        return;
    }
    const referrer = document.referrer;
    if (referrer && (referrer.includes('/student_dashboard') || 
                   referrer.includes('/teacher_home') || 
                   referrer.includes('/admin_dashboard'))) {
        window.location.href = referrer;
        return;
    }
    const userType = USER_TYPE;
    if (userType === 'student') {
        window.location.href = '/student_dashboard';
    } else if (userType === 'teacher') {
        window.location.href = '/teacher_home';
    } else if (userType === 'admin') {
        window.location.href = '/admin_dashboard';
    } else {
        window.location.href = '/';
    }
}

function showError(message) {
    const container = document.querySelector('.main-container') || document.body;
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `background: #fed7d7; color: #c53030; padding: 15px; border-radius: 10px; margin: 15px 0; text-align: center;`;
    errorDiv.innerHTML = `<p>${message}</p>`;
    container.prepend(errorDiv);
    setTimeout(() => errorDiv.remove(), 5000);
}

// ==========================================
// KEYBOARD SHORTCUTS
// ==========================================
document.addEventListener('keydown', function(e) {
    if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
    const quizView = document.getElementById('quiz-view');
    if (!quizView || !quizView.classList.contains('active')) return;

    if (currentQuestionType === 'mcq') {
        if (e.key >= '1' && e.key <= '4') {
            const optionIndex = parseInt(e.key) - 1;
            const btns = document.querySelectorAll('#options-container .option-btn');
            if (btns[optionIndex] && !btns[optionIndex].classList.contains('disabled')) {
                btns[optionIndex].click();
            }
            e.preventDefault();
        }
    }

    if (e.key === 'ArrowRight' || e.key === 'Enter') {
        e.preventDefault();
        const nextBtn = document.getElementById('next-btn');
        if (nextBtn && !nextBtn.disabled && nextBtn.style.display !== 'none') {
            nextBtn.click();
        }
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevBtn = document.getElementById('prev-btn');
        if (prevBtn && !prevBtn.disabled && prevBtn.style.display !== 'none') {
            prevBtn.click();
        }
    } else if (e.key === 'Escape') {
        goBackToDashboard();
        e.preventDefault();
    }
});

// ==========================================
// MOBILE BACK BUTTON
// ==========================================
window.onpopstate = function(event) {
    if (event.state) {
        if (event.state.view === 'batches') {
            loadBatches(false);
        } else if (event.state.view === 'subjects') {
            selectBatch(event.state.batchId, event.state.batchName, false);
        } else if (event.state.view === 'chapters') {
            selectSubject(event.state.subjectId, event.state.subjectName, false);
        } else if (event.state.view === 'question-types') {
            selectChapter(event.state.chapterId, event.state.chapterName, false);
        } else if (event.state.view === 'quiz') {
            if (event.state.questionType) {
                selectQuestionType(event.state.questionType, event.state.questionTypeName, false);
            }
        }
    }
};

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    if (RETURN_URL) {
        sessionStorage.setItem('dashboardUrl', RETURN_URL);
    }
    
    const backBtnText = document.getElementById('backButtonText');
    if (backBtnText) {
        backBtnText.textContent = 'Dashboard';
    }
    
    loadBatches(true);
});
