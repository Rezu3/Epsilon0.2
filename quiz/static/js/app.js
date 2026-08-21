// ==========================================
// QUIZ SYSTEM - COMPLETE JAVASCRIPT
// ==========================================

// State Variables
let currentBatchId = null;
let currentBatchName = '';
let currentSubjectId = null;
let currentSubjectName = '';
let currentChapterId = null;
let currentChapterName = '';

let questions = [];
let currentQuestionIndex = 0;
let userAnswers = {}; // শুধু current chapter এর জন্য
let completedChapters = {}; // Track completed chapters per subject

// ==========================================
// API BASE URL
// ==========================================
const API_BASE = '/quiz/api';

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Quiz System Initialized');
    loadBatches();
    document.addEventListener('keydown', handleKeyboardShortcuts);
});

// ==========================================
// 1. API CALLS & DATA LOADING
// ==========================================

// ===== ব্যাচ সর্ট করার ফাংশন =====
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

async function loadBatches() {
    try {
        console.log('📡 Fetching batches...');
        const response = await fetch(`${API_BASE}/batches`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        let batches = await response.json();
        batches = sortBatches(batches);
        console.log('✅ Sorted batches:', batches);
        
        const grid = document.getElementById('batches-grid');
        if (!grid) return;
        
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
            grid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #718096;">
                    <i class="fas fa-folder-open" style="font-size: 48px; display: block; margin-bottom: 10px;"></i>
                    <h3>No Batches Found</h3>
                    <p>Please add some quiz data to get started.</p>
                </div>
            `;
        }
        showView('batches-view');
        updateBreadcrumb();
    } catch (error) {
        console.error('❌ Error loading batches:', error);
        showError('Failed to load batches. Please try again.');
    }
}

async function selectBatch(batchId, batchName) {
    currentBatchId = batchId;
    currentBatchName = batchName;
    console.log(`📚 Selected batch: ${batchName}`);
    
    // Reset completed chapters for new batch
    completedChapters = {};

    try {
        const response = await fetch(`${API_BASE}/batches/${batchId}/subjects`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const subjects = await response.json();
        console.log('✅ Subjects loaded:', subjects);

        const grid = document.getElementById('subjects-grid');
        if (!grid) return;
        grid.innerHTML = '';

        if (subjects && subjects.length > 0) {
            subjects.forEach(subject => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `<i class="fas fa-book"></i> ${subject.name}`;
                card.onclick = () => selectSubject(subject.id, subject.name);
                grid.appendChild(card);
            });
        } else {
            grid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #718096;">
                    <i class="fas fa-book" style="font-size: 48px; display: block; margin-bottom: 10px;"></i>
                    <h3>No Subjects Found</h3>
                    <p>This batch has no subjects yet.</p>
                </div>
            `;
        }
        showView('subjects-view');
        updateBreadcrumb();
    } catch (error) {
        console.error('❌ Error loading subjects:', error);
        showError('Failed to load subjects. Please try again.');
    }
}

async function selectSubject(subjectId, subjectName) {
    currentSubjectId = subjectId;
    currentSubjectName = subjectName;
    console.log(`📖 Selected subject: ${subjectName}`);
    
    // Reset completed chapters for new subject
    completedChapters = {};

    try {
        const response = await fetch(`${API_BASE}/batches/${currentBatchId}/subjects/${subjectId}/chapters`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const chapters = await response.json();
        console.log('✅ Chapters loaded:', chapters);

        const grid = document.getElementById('chapters-grid');
        if (!grid) return;
        grid.innerHTML = '';

        if (chapters && chapters.length > 0) {
            chapters.forEach(chapter => {
                const card = document.createElement('div');
                card.className = 'card';
                
                // Check if chapter is completed
                const isCompleted = completedChapters[chapter.id] || false;
                card.innerHTML = `
                    <i class="fas fa-list"></i> ${chapter.name}
                    ${isCompleted ? '<span style="color:#28a745;font-size:0.7rem;display:block;">✅ Completed</span>' : ''}
                `;
                card.onclick = () => selectChapter(chapter.id, chapter.name);
                grid.appendChild(card);
            });
        } else {
            grid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #718096;">
                    <i class="fas fa-list" style="font-size: 48px; display: block; margin-bottom: 10px;"></i>
                    <h3>No Chapters Found</h3>
                    <p>This subject has no chapters yet.</p>
                </div>
            `;
        }
        showView('chapters-view');
        updateBreadcrumb();
    } catch (error) {
        console.error('❌ Error loading chapters:', error);
        showError('Failed to load chapters. Please try again.');
    }
}

async function selectChapter(chapterId, chapterName) {
    currentChapterId = chapterId;
    currentChapterName = chapterName;
    console.log(`📝 Selected chapter: ${chapterName}`);
    
    // ✅ RESET for this chapter
    questions = [];
    currentQuestionIndex = 0;
    userAnswers = {}; // ✅ Reset userAnswers for this chapter

    try {
        const response = await fetch(`${API_BASE}/batches/${currentBatchId}/subjects/${currentSubjectId}/chapters/${chapterId}/questions`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        questions = await response.json();
        console.log('✅ Questions loaded:', questions.length);

        if (questions.length > 0) {
            document.getElementById('quiz-chapter-title').innerHTML = `<i class="fas fa-pencil-alt"></i> ${currentChapterName}`;
            showQuestion(0);
            showView('quiz-view');
            updateBreadcrumb();
            
            // Reset navigation buttons
            const nextBtn = document.getElementById('next-btn');
            nextBtn.innerHTML = 'পরবর্তী →';
            nextBtn.onclick = nextQuestion;
            document.querySelector('.quiz-footer').style.display = 'flex';
        } else {
            alert('❌ এই অধ্যায়ে কোনো প্রশ্ন পাওয়া যায়নি!');
        }
    } catch (error) {
        console.error('❌ Error loading questions:', error);
        showError('Failed to load questions. Please try again.');
    }
}

// ==========================================
// 2. QUIZ DISPLAY
// ==========================================

function showQuestion(index) {
    if (!questions || questions.length === 0) {
        console.error('❌ No questions to display');
        return;
    }
    
    const q = questions[index];
    if (!q) {
        console.error(`❌ Question at index ${index} not found`);
        return;
    }
    
    // Update Progress
    const progressElem = document.getElementById('quiz-progress');
    if (progressElem) {
        progressElem.innerText = `প্রশ্ন ${index + 1} / ${questions.length}`;
    }

    // Update Question Text
    const qTextElem = document.getElementById('question-text');
    if (qTextElem) {
        qTextElem.innerHTML = `${index + 1}. ${q.question || q.text || 'Question not available'}`;
    }

    // Update Image
    const imgContainer = document.getElementById('question-image-container');
    const imgElem = document.getElementById('question-image');
    if (q.image && imgElem) {
        imgElem.src = `/static/images/${q.image}`;
        if (imgContainer) imgContainer.style.display = 'block';
    } else if (imgContainer) {
        imgContainer.style.display = 'none';
    }

    // Render Options
    const optionsGrid = document.getElementById('options-container');
    if (!optionsGrid) return;
    optionsGrid.innerHTML = '';

    if (q.options && Array.isArray(q.options)) {
        const correctAnswer = q.answer !== undefined ? q.answer : q.correct_answer;
        
        q.options.forEach((optText, optIdx) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerHTML = `<span class="option-label">${String.fromCharCode(65 + optIdx)}</span> ${optText}`;
            btn.dataset.correct = (optIdx === correctAnswer) ? 'true' : 'false';
            btn.dataset.index = optIdx;
            
            // Check if user already answered this question
            if (userAnswers[index] !== undefined) {
                btn.classList.add('disabled');
                if (optIdx === correctAnswer) btn.classList.add('correct');
                if (userAnswers[index] === optIdx && optIdx !== correctAnswer) btn.classList.add('wrong');
                if (userAnswers[index] === optIdx) btn.classList.add('selected');
            } else {
                btn.onclick = function() {
                    handleAnswer(optIdx, correctAnswer, index);
                };
            }
            optionsGrid.appendChild(btn);
        });
    } else {
        optionsGrid.innerHTML = '<p style="color: #a0aec0;">No options available for this question.</p>';
    }

    // Navigation Buttons
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (prevBtn) prevBtn.disabled = (index === 0);
    if (nextBtn) {
        if (index === questions.length - 1) {
            // Check if ALL questions are answered
            const allAnswered = Object.keys(userAnswers).length === questions.length;
            if (allAnswered) {
                nextBtn.innerHTML = 'অধ্যায়ে ফিরুন';
                nextBtn.onclick = showResults;
            } else {
                nextBtn.innerHTML = 'শেষ প্রশ্ন';
                nextBtn.onclick = nextQuestion;
            }
        } else {
            nextBtn.innerHTML = 'পরবর্তী →';
            nextBtn.onclick = nextQuestion;
        }
    }

    // Re-render MathJax
    if (window.MathJax && window.MathJax.typesetPromise) {
        try {
            window.MathJax.typesetPromise([qTextElem, optionsGrid]).catch(err => console.log('MathJax error:', err));
        } catch (e) {
            console.log('MathJax not available');
        }
    }
}

// ==========================================
// 3. HANDLE ANSWER
// ==========================================

function handleAnswer(selectedIndex, correctAnswer, questionIndex) {
    // Save user answer
    userAnswers[questionIndex] = selectedIndex;
    
    const optionsGrid = document.getElementById('options-container');
    const allBtns = optionsGrid.querySelectorAll('.option-btn');
    
    allBtns.forEach(btn => {
        btn.classList.add('disabled');
        btn.onclick = null;
    });
    
    allBtns.forEach((btn, idx) => {
        if (idx === correctAnswer) btn.classList.add('correct');
        if (idx === selectedIndex && idx !== correctAnswer) btn.classList.add('wrong');
        if (idx === selectedIndex) btn.classList.add('selected');
    });
    
    // Check if all questions are answered
    if (Object.keys(userAnswers).length === questions.length) {
        const nextBtn = document.getElementById('next-btn');
        nextBtn.innerHTML = 'অধ্যায়ে ফিরুন';
        nextBtn.onclick = showResults;
    }
}

// ==========================================
// 4. FINISH QUIZ (NO RESULTS DISPLAY)
// ==========================================

function showResults() {
    // ✅ Mark chapter as completed
    completedChapters[currentChapterId] = true;
    console.log('✅ Chapter completed:', currentChapterName);
    
    const quizCard = document.getElementById('quiz-card');
    const footer = document.querySelector('.quiz-footer');
    
    quizCard.innerHTML = `
        <div class="quiz-results" style="text-align: center; padding: 30px 20px;">
            <h2 style="color: #2d3748; margin-bottom: 20px; font-size: 1.3rem;">অধ্যায়ের সকল প্রশ্ন সমাপ্ত হয়েছে!</h2>
            <div style="display: flex; justify-content: center; margin-top: 20px;">
                <button onclick="goBackToChapters()" class="nav-btn primary" style="padding: 10px 25px;">
                    <i class="fas fa-arrow-left"></i> অধ্যায়ে ফিরুন
                </button>
            </div>
        </div>
    `;
    
    if (footer) footer.style.display = 'none';
}

// ==========================================
// 5. NAVIGATION
// ==========================================

function goBackToChapters() {
    // Go back to chapters view with updated completion status
    if (currentSubjectId && currentSubjectName) {
        selectSubject(currentSubjectId, currentSubjectName);
    } else {
        showSubjectsView();
    }
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
    }
}

function showView(viewId) {
    document.querySelectorAll('.view-section').forEach(view => {
        view.classList.remove('active');
    });
    const targetView = document.getElementById(viewId);
    if (targetView) targetView.classList.add('active');
}

function updateBreadcrumb() {
    const bc = document.getElementById('breadcrumb');
    const bcBatch = document.getElementById('bc-batch');
    const bcSub = document.getElementById('bc-subject');
    const bcChap = document.getElementById('bc-chapter');
    const sep1 = document.getElementById('sep1');
    const sep2 = document.getElementById('sep2');

    if (!bc) return;
    bc.style.display = 'flex';

    if (currentBatchId && !currentSubjectId) {
        bcBatch.innerText = currentBatchName;
        bcSub.style.display = 'none';
        bcChap.style.display = 'none';
        sep1.style.display = 'none';
        sep2.style.display = 'none';
    } else if (currentSubjectId && !currentChapterId) {
        bcBatch.innerText = currentBatchName;
        bcSub.innerText = currentSubjectName;
        bcSub.style.display = 'inline';
        bcChap.style.display = 'none';
        sep1.style.display = 'inline';
        sep2.style.display = 'none';
    } else if (currentChapterId) {
        bcBatch.innerText = currentBatchName;
        bcSub.innerText = currentSubjectName;
        bcSub.style.display = 'inline';
        bcChap.innerText = currentChapterName;
        bcChap.style.display = 'inline';
        sep1.style.display = 'inline';
        sep2.style.display = 'inline';
    } else {
        bc.style.display = 'none';
    }
}

function showBatchesView() {
    currentSubjectId = null;
    currentChapterId = null;
    loadBatches();
}

function showSubjectsView() {
    currentChapterId = null;
    if (currentBatchId && currentBatchName) {
        selectBatch(currentBatchId, currentBatchName);
    } else {
        loadBatches();
    }
}

function showChaptersView() {
    if (currentSubjectId && currentSubjectName) {
        selectSubject(currentSubjectId, currentSubjectName);
    } else {
        loadBatches();
    }
}

function resetToBatches() {
    currentBatchId = null;
    currentSubjectId = null;
    currentChapterId = null;
    loadBatches();
}

// ==========================================
// 6. KEYBOARD SHORTCUTS
// ==========================================

function handleKeyboardShortcuts(e) {
    const quizView = document.getElementById('quiz-view');
    if (!quizView || !quizView.classList.contains('active')) return;

    if (e.key >= '1' && e.key <= '4') {
        const optionIndex = parseInt(e.key) - 1;
        const optionsGrid = document.getElementById('options-container');
        const btns = optionsGrid.querySelectorAll('.option-btn');
        if (btns[optionIndex] && !btns[optionIndex].classList.contains('disabled')) {
            btns[optionIndex].click();
        }
        e.preventDefault();
    }

    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        const nextBtn = document.getElementById('next-btn');
        if (nextBtn && !nextBtn.disabled) nextBtn.click();
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevBtn = document.getElementById('prev-btn');
        if (prevBtn && !prevBtn.disabled) prevBtn.click();
    }
}

// ==========================================
// 7. ERROR HANDLING
// ==========================================

function showError(message) {
    const container = document.querySelector('.main-container') || document.body;
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        background: #fed7d7;
        color: #c53030;
        padding: 15px;
        border-radius: 10px;
        margin: 15px 0;
        text-align: center;
        border: 2px solid #fc8181;
    `;
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-triangle" style="font-size: 24px; display: block; margin-bottom: 8px;"></i>
        <p>${message}</p>
        <button onclick="this.parentElement.remove(); loadBatches();" style="margin-top: 8px; padding: 8px 20px; background: #c53030; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: 600;">
            🔄 পুনরায় চেষ্টা করুন
        </button>
    `;
    container.prepend(errorDiv);
}

// ==========================================
// 8. EXPOSE TO GLOBAL SCOPE
// ==========================================

window.loadBatches = loadBatches;
window.selectBatch = selectBatch;
window.selectSubject = selectSubject;
window.selectChapter = selectChapter;
window.showQuestion = showQuestion;
window.handleAnswer = handleAnswer;
window.nextQuestion = nextQuestion;
window.prevQuestion = prevQuestion;
window.showView = showView;
window.updateBreadcrumb = updateBreadcrumb;
window.showBatchesView = showBatchesView;
window.showSubjectsView = showSubjectsView;
window.showChaptersView = showChaptersView;
window.resetToBatches = resetToBatches;
window.showError = showError;
window.showResults = showResults;
window.goBackToChapters = goBackToChapters;

console.log('✅ Quiz System Ready (Results & Celebrations Disabled)!');
