// ==========================================
// QUIZ SYSTEM - OPTIMIZED JAVASCRIPT
// ==========================================

let currentBatchId = null;
let currentBatchName = '';
let currentSubjectId = null;
let currentSubjectName = '';
let currentChapterId = null;
let currentChapterName = '';

let questions = [];
let currentQuestionIndex = 0;
let userAnswers = {}; 
let completedChapters = {}; 

const API_BASE = '/quiz/api';

document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Quiz System Initialized');
    loadBatches();
    document.addEventListener('keydown', handleKeyboardShortcuts);
});

// Helper for sorting batches
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
        const response = await fetch(`${API_BASE}/batches`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        let batches = await response.json();
        batches = sortBatches(batches);
        
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
                </div>`;
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
    completedChapters = {};

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
                card.innerHTML = `<i class="fas fa-book"></i> ${subject.name}`;
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

async function selectSubject(subjectId, subjectName) {
    currentSubjectId = subjectId;
    currentSubjectName = subjectName;

    try {
        const response = await fetch(`${API_BASE}/batches/${currentBatchId}/subjects/${subjectId}/chapters`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const chapters = await response.json();
        const grid = document.getElementById('chapters-grid');
        if (!grid) return;
        grid.innerHTML = '';

        if (chapters && chapters.length > 0) {
            chapters.forEach(chapter => {
                const card = document.createElement('div');
                card.className = 'card';
                const isCompleted = completedChapters[chapter.id] || false;
                card.innerHTML = `
                    <i class="fas fa-list"></i> ${chapter.name}
                    ${isCompleted ? '<span style="color:#28a745;font-size:0.75rem;display:block;">✅ Completed</span>' : ''}
                `;
                card.onclick = () => selectChapter(chapter.id, chapter.name);
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

async function selectChapter(chapterId, chapterName) {
    currentChapterId = chapterId;
    currentChapterName = chapterName;
    
    questions = [];
    currentQuestionIndex = 0;
    userAnswers = {};

    try {
        const response = await fetch(`${API_BASE}/batches/${currentBatchId}/subjects/${currentSubjectId}/chapters/${chapterId}/questions`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        questions = await response.json();

        if (questions.length > 0) {
            document.getElementById('quiz-chapter-title').innerHTML = `<i class="fas fa-pencil-alt"></i> ${currentChapterName}`;
            
            // Re-instantiate base Quiz UI layout if destroyed previously
            restoreQuizLayout();
            showQuestion(0);
            showView('quiz-view');
            updateBreadcrumb();
        } else {
            alert('❌ এই অধ্যায়ে কোনো প্রশ্ন পাওয়া যায়নি!');
        }
    } catch (error) {
        console.error('❌ Error loading questions:', error);
        showError('Failed to load questions.');
    }
}

function restoreQuizLayout() {
    const quizCard = document.getElementById('quiz-card');
    const footer = document.querySelector('.quiz-footer');
    if (footer) footer.style.display = 'flex';

    quizCard.innerHTML = `
        <div class="quiz-header" style="display:flex; justify-between; align-items:center;">
            <h3 id="quiz-chapter-title"><i class="fas fa-pencil-alt"></i> ${currentChapterName}</h3>
            <span id="quiz-progress"></span>
        </div>
        <div id="question-text" style="margin: 15px 0; font-weight: 600;"></div>
        <div id="question-image-container" style="display:none; margin-bottom:15px;">
            <img id="question-image" src="" alt="Question Image" style="max-width:100%; border-radius:8px;"/>
        </div>
        <div id="options-container" class="options-grid"></div>
    `;
}

function showQuestion(index) {
    if (!questions || questions.length === 0) return;
    const q = questions[index];
    if (!q) return;

    const progressElem = document.getElementById('quiz-progress');
    if (progressElem) progressElem.innerText = `প্রশ্ন ${index + 1} / ${questions.length}`;

    const qTextElem = document.getElementById('question-text');
    if (qTextElem) qTextElem.innerHTML = `${index + 1}. ${q.question || q.text || ''}`;

    const imgContainer = document.getElementById('question-image-container');
    const imgElem = document.getElementById('question-image');
    if (q.image && imgElem) {
        imgElem.src = `/static/images/${q.image}`;
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
                if (userAnswers[index] === optIdx) btn.classList.add('selected');
            } else {
                btn.onclick = () => handleAnswer(optIdx, correctAnswer, index);
            }
            optionsGrid.appendChild(btn);
        });
    }

    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (prevBtn) prevBtn.disabled = (index === 0);
    if (nextBtn) {
        if (index === questions.length - 1) {
            const allAnswered = Object.keys(userAnswers).length === questions.length;
            nextBtn.innerHTML = allAnswered ? 'অধ্যায়ে ফিরুন' : 'শেষ প্রশ্ন';
            nextBtn.onclick = allAnswered ? showResults : nextQuestion;
        } else {
            nextBtn.innerHTML = 'পরবর্তী →';
            nextBtn.onclick = nextQuestion;
        }
    }

    if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise([qTextElem, optionsGrid]).catch(() => {});
    }
}

function handleAnswer(selectedIndex, correctAnswer, questionIndex) {
    userAnswers[questionIndex] = selectedIndex;
    showQuestion(questionIndex);

    if (Object.keys(userAnswers).length === questions.length) {
        const nextBtn = document.getElementById('next-btn');
        if (nextBtn) {
            nextBtn.innerHTML = 'অধ্যায়ে ফিরুন';
            nextBtn.onclick = showResults;
        }
    }
}

function showResults() {
    completedChapters[currentChapterId] = true;
    const quizCard = document.getElementById('quiz-card');
    const footer = document.querySelector('.quiz-footer');
    
    quizCard.innerHTML = `
        <div class="quiz-results" style="text-align: center; padding: 30px 20px;">
            <h2 style="color: #2d3748; margin-bottom: 20px; font-size: 1.3rem;">অধ্যায়ের সকল প্রশ্ন সমাপ্ত হয়েছে!</h2>
            <button onclick="goBackToChapters()" class="nav-btn primary" style="padding: 10px 25px;">
                <i class="fas fa-arrow-left"></i> অধ্যায়ে ফিরুন
            </button>
        </div>
    `;
    if (footer) footer.style.display = 'none';
}

function goBackToChapters() {
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
    document.querySelectorAll('.view-section').forEach(v => v.classList.remove('active'));
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
        bcSub.style.display = bcChap.style.display = sep1.style.display = sep2.style.display = 'none';
    } else if (currentSubjectId && !currentChapterId) {
        bcBatch.innerText = currentBatchName;
        bcSub.innerText = currentSubjectName;
        bcSub.style.display = sep1.style.display = 'inline';
        bcChap.style.display = sep2.style.display = 'none';
    } else if (currentChapterId) {
        bcBatch.innerText = currentBatchName;
        bcSub.innerText = currentSubjectName;
        bcChap.innerText = currentChapterName;
        bcSub.style.display = bcChap.style.display = sep1.style.display = sep2.style.display = 'inline';
    } else {
        bc.style.display = 'none';
    }
}

function handleKeyboardShortcuts(e) {
    if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
    const quizView = document.getElementById('quiz-view');
    if (!quizView || !quizView.classList.contains('active')) return;

    if (e.key >= '1' && e.key <= '4') {
        const optionIndex = parseInt(e.key) - 1;
        const btns = document.querySelectorAll('#options-container .option-btn');
        if (btns[optionIndex] && !btns[optionIndex].classList.contains('disabled')) {
            btns[optionIndex].click();
        }
        e.preventDefault();
    } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        e.preventDefault();
        const nextBtn = document.getElementById('next-btn');
        if (nextBtn && !nextBtn.disabled) nextBtn.click();
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevBtn = document.getElementById('prev-btn');
        if (prevBtn && !prevBtn.disabled) prevBtn.click();
    }
}

function showError(message) {
    const container = document.querySelector('.main-container') || document.body;
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `background: #fed7d7; color: #c53030; padding: 15px; border-radius: 10px; margin: 15px 0; text-align: center;`;
    errorDiv.innerHTML = `<p>${message}</p>`;
    container.prepend(errorDiv);
}
