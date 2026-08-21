// ==========================================
// QUIZ SYSTEM - COMPLETE JAVASCRIPT
// (GNM/ANM JSON Format Compatible)
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
let userAnswers = {};

// ✅ LocalStorage ফাংশন
function getCompletedChapters() {
    try {
        const data = localStorage.getItem('quizCompletedChapters');
        return data ? JSON.parse(data) : {};
    } catch (e) {
        return {};
    }
}

function saveCompletedChapters(chapters) {
    try {
        localStorage.setItem('quizCompletedChapters', JSON.stringify(chapters));
    } catch (e) {
        console.error('Error saving:', e);
    }
}

function getChapterKey(batchId, subjectId, chapterId) {
    return `${batchId}_${subjectId}_${chapterId}`;
}

function isChapterCompleted(batchId, subjectId, chapterId) {
    const key = getChapterKey(batchId, subjectId, chapterId);
    const completed = getCompletedChapters();
    return completed[key] === true;
}

function markChapterCompleted(batchId, subjectId, chapterId) {
    const key = getChapterKey(batchId, subjectId, chapterId);
    const completed = getCompletedChapters();
    completed[key] = true;
    saveCompletedChapters(completed);
    console.log(`✅ Chapter marked completed: ${key}`);
}

let completedChapters = getCompletedChapters();
let allData = null; // পুরো JSON ডেটা

// ==========================================
// JSON FILE LOCATION
// ==========================================
const JSON_FILE = '/static/data/gnm_anm.json'; // আপনার JSON ফাইলের পাথ

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Quiz System Initialized');
    loadBatches();
    document.addEventListener('keydown', handleKeyboardShortcuts);
});

// ==========================================
// 1. BATCHES LOAD
// ==========================================

function loadBatches() {
    const grid = document.getElementById('batches-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    // ✅ আপনার JSON ফাইল থেকে ব্যাচ লোড করুন
    fetch(JSON_FILE)
        .then(response => response.json())
        .then(data => {
            allData = data;
            console.log('✅ JSON Loaded:', allData);
            
            const batches = allData.batches || {};
            const batchKeys = Object.keys(batches);
            
            if (batchKeys.length > 0) {
                batchKeys.forEach(key => {
                    const batch = batches[key];
                    const card = document.createElement('div');
                    card.className = 'card';
                    card.innerHTML = `<i class="fas fa-users"></i> ${batch.name}`;
                    card.onclick = () => selectBatch(key, batch.name);
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
        })
        .catch(error => {
            console.error('❌ Error loading JSON:', error);
            showError('Failed to load data. Please check JSON file.');
        });
}

// ==========================================
// 2. SELECT BATCH
// ==========================================

function selectBatch(batchId, batchName) {
    currentBatchId = batchId;
    currentBatchName = batchName;
    console.log(`📚 Selected batch: ${batchName}`);
    
    const batch = allData.batches[batchId];
    if (!batch) {
        showError('Batch not found!');
        return;
    }
    
    const subjects = batch.subjects || {};
    const grid = document.getElementById('subjects-grid');
    if (!grid) return;
    grid.innerHTML = '';
    
    const subjectKeys = Object.keys(subjects);
    if (subjectKeys.length > 0) {
        subjectKeys.forEach(key => {
            const subject = subjects[key];
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `<i class="fas fa-book"></i> ${subject.name}`;
            card.onclick = () => selectSubject(key, subject.name);
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
}

// ==========================================
// 3. SELECT SUBJECT
// ==========================================

function selectSubject(subjectId, subjectName) {
    currentSubjectId = subjectId;
    currentSubjectName = subjectName;
    console.log(`📖 Selected subject: ${subjectName}`);
    
    userAnswers = {};
    completedChapters = getCompletedChapters();
    
    const batch = allData.batches[currentBatchId];
    if (!batch) {
        showError('Batch not found!');
        return;
    }
    
    const subject = batch.subjects[subjectId];
    if (!subject) {
        showError('Subject not found!');
        return;
    }
    
    const chapters = subject.chapters || {};
    const grid = document.getElementById('chapters-grid');
    if (!grid) return;
    grid.innerHTML = '';
    
    const chapterKeys = Object.keys(chapters);
    if (chapterKeys.length > 0) {
        chapterKeys.forEach(key => {
            const chapter = chapters[key];
            const card = document.createElement('div');
            card.className = 'card';
            
            const isCompleted = isChapterCompleted(currentBatchId, currentSubjectId, key);
            
            card.innerHTML = `
                <i class="fas fa-list"></i> ${chapter.name}
                ${isCompleted ? '<span style="color:#28a745;font-size:0.7rem;display:block;margin-top:4px;">✅ Completed</span>' : ''}
            `;
            card.onclick = () => selectChapter(key, chapter.name);
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
}

// ==========================================
// 4. SELECT CHAPTER
// ==========================================

function selectChapter(chapterId, chapterName) {
    currentChapterId = chapterId;
    currentChapterName = chapterName;
    console.log(`📝 Selected chapter: ${chapterName}`);
    
    questions = [];
    currentQuestionIndex = 0;
    userAnswers = {};
    
    const batch = allData.batches[currentBatchId];
    if (!batch) {
        showError('Batch not found!');
        return;
    }
    
    const subject = batch.subjects[currentSubjectId];
    if (!subject) {
        showError('Subject not found!');
        return;
    }
    
    const chapter = subject.chapters[chapterId];
    if (!chapter) {
        showError('Chapter not found!');
        return;
    }
    
    questions = chapter.questions || [];
    console.log('✅ Questions loaded:', questions.length);
    
    if (questions.length > 0) {
        document.getElementById('quiz-chapter-title').innerHTML = `<i class="fas fa-pencil-alt"></i> ${currentChapterName}`;
        showQuestion(0);
        showView('quiz-view');
        updateBreadcrumb();
        
        const nextBtn = document.getElementById('next-btn');
        nextBtn.innerHTML = 'পরবর্তী →';
        nextBtn.onclick = nextQuestion;
        document.querySelector('.quiz-footer').style.display = 'flex';
    } else {
        alert('❌ এই অধ্যায়ে কোনো প্রশ্ন পাওয়া যায়নি!');
    }
}

// ==========================================
// 5. QUIZ DISPLAY
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
    
    const progressElem = document.getElementById('quiz-progress');
    if (progressElem) {
        progressElem.innerText = `প্রশ্ন ${index + 1} / ${questions.length}`;
    }

    const qTextElem = document.getElementById('question-text');
    if (qTextElem) {
        qTextElem.innerHTML = `${index + 1}. ${q.question || q.text || 'Question not available'}`;
    }

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
            btn.dataset.correct = (optIdx === correctAnswer) ? 'true' : 'false';
            btn.dataset.index = optIdx;
            
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

    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (prevBtn) prevBtn.disabled = (index === 0);
    if (nextBtn) {
        if (index === questions.length - 1) {
            const allAnswered = Object.keys(userAnswers).length === questions.length;
            if (allAnswered) {
                nextBtn.innerHTML = '📊 দেখুন ফলাফল';
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

    if (window.MathJax && window.MathJax.typesetPromise) {
        try {
            window.MathJax.typesetPromise([qTextElem, optionsGrid]).catch(err => console.log('MathJax error:', err));
        } catch (e) {
            console.log('MathJax not available');
        }
    }
}

// ==========================================
// 6. HANDLE ANSWER
// ==========================================

function handleAnswer(selectedIndex, correctAnswer, questionIndex) {
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
    
    if (selectedIndex === correctAnswer) {
        console.log('🎉 Correct Answer!');
        showCelebration();
    }
    
    if (Object.keys(userAnswers).length === questions.length) {
        const nextBtn = document.getElementById('next-btn');
        nextBtn.innerHTML = '📊 দেখুন ফলাফল';
        nextBtn.onclick = showResults;
    }
}

// ==========================================
// 7. SHOW RESULTS
// ==========================================

function showResults() {
    let correct = 0;
    let total = questions.length;
    
    questions.forEach((q, idx) => {
        const correctAnswer = q.answer !== undefined ? q.answer : q.correct_answer;
        if (userAnswers[idx] === correctAnswer) {
            correct++;
        }
    });
    
    const percentage = Math.round((correct / total) * 100);
    let grade = '';
    let emoji = '';
    let gradeClass = '';
    
    if (percentage >= 80) { grade = 'A+'; emoji = '🌟'; gradeClass = 'grade-a-plus'; showCelebration(); }
    else if (percentage >= 70) { grade = 'A'; emoji = '⭐'; gradeClass = 'grade-a'; }
    else if (percentage >= 60) { grade = 'B'; emoji = '👍'; gradeClass = 'grade-b'; setTimeout(showCelebration, 300); }
    else if (percentage >= 50) { grade = 'C'; emoji = '📖'; gradeClass = 'grade-c'; }
    else if (percentage >= 40) { grade = 'D'; emoji = '💪'; gradeClass = 'grade-d'; }
    else { grade = 'F'; emoji = '📚'; gradeClass = 'grade-f'; }
    
    // ✅ Chapter Complete Mark করুন
    markChapterCompleted(currentBatchId, currentSubjectId, currentChapterId);
    
    const quizCard = document.getElementById('quiz-card');
    const footer = document.querySelector('.quiz-footer');
    
    quizCard.innerHTML = `
        <div class="quiz-results">
            <span class="result-icon">${emoji}</span>
            <h2 style="color: #2d3748; margin-bottom: 10px; font-size: 1.3rem;">কুইজ সম্পন্ন! 🎯</h2>
            <div class="result-score">${correct} / ${total}</div>
            <div class="result-detail">✅ সঠিক উত্তর: ${correct}</div>
            <div class="result-detail">❌ ভুল উত্তর: ${total - correct}</div>
            <div class="result-detail">📊 নম্বর: ${percentage}%</div>
            <div class="result-grade ${gradeClass}">গ্রেড: ${grade}</div>
            <div style="display:flex; gap:10px; margin-top:16px; flex-wrap:wrap;">
                <button onclick="goBackToChapters()" class="nav-btn secondary" style="flex:1;">
                    <i class="fas fa-arrow-left"></i> অধ্যায়ে ফিরুন
                </button>
                <button onclick="resetToBatches()" class="nav-btn primary" style="flex:1;">
                    🔄 নতুন কুইজ
                </button>
            </div>
        </div>
    `;
    
    if (footer) footer.style.display = 'none';
    
    if (percentage >= 80) {
        setTimeout(showCelebration, 500);
        setTimeout(showCelebration, 1200);
    }
}

// ==========================================
// 8. NAVIGATION
// ==========================================

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
// 9. CELEBRATION ANIMATIONS
// ==========================================

function createEmojiBurst() {
    const emojis = ['🎉', '🎊', '⭐', '✨', '🌟', '💫', '🎆', '🎇', '❤️', '🔥', '🥳', '🎈', '🏆', '💯'];
    const container = document.createElement('div');
    container.className = 'emoji-burst-container';
    document.body.appendChild(container);
    
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const count = 25 + Math.floor(Math.random() * 20);
    
    for (let i = 0; i < count; i++) {
        const emoji = document.createElement('div');
        emoji.className = 'emoji-particle';
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        
        const angle = Math.random() * 2 * Math.PI;
        const distance = 120 + Math.random() * 350;
        const ex = Math.cos(angle) * distance;
        const ey = Math.sin(angle) * distance - 120;
        const erotate = (Math.random() - 0.5) * 720;
        const size = 24 + Math.random() * 36;
        
        emoji.style.fontSize = size + 'px';
        emoji.style.setProperty('--ex', ex + 'px');
        emoji.style.setProperty('--ey', ey + 'px');
        emoji.style.setProperty('--erotate', erotate + 'deg');
        emoji.style.left = (centerX - 30 + (Math.random() - 0.5) * 60) + 'px';
        emoji.style.top = (centerY - 30 + (Math.random() - 0.5) * 60) + 'px';
        emoji.style.animationDelay = (Math.random() * 0.3) + 's';
        emoji.style.animationDuration = (1.5 + Math.random() * 0.8) + 's';
        
        container.appendChild(emoji);
    }
    setTimeout(() => { if (container.parentNode) container.remove(); }, 3000);
}

function createFireworks() {
    const container = document.createElement('div');
    container.className = 'firework-container';
    document.body.appendChild(container);
    
    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd', '#ff6348', '#7bed9f', '#ff4757', '#2ed573', '#f368e0', '#00d2d3'];
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const burstCount = 3 + Math.floor(Math.random() * 3);
    
    for (let b = 0; b < burstCount; b++) {
        const burstX = centerX + (Math.random() - 0.5) * 250;
        const burstY = centerY + (Math.random() - 0.5) * 200;
        const particleCount = 25 + Math.floor(Math.random() * 35);
        const color = colors[Math.floor(Math.random() * colors.length)];
        const color2 = colors[Math.floor(Math.random() * colors.length)];
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'firework-particle';
            const angle = Math.random() * 2 * Math.PI;
            const distance = 80 + Math.random() * 250;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            const size = 4 + Math.random() * 8;
            const useColor = Math.random() > 0.5 ? color : color2;
            
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.background = useColor;
            particle.style.left = burstX + 'px';
            particle.style.top = burstY + 'px';
            particle.style.setProperty('--tx', tx + 'px');
            particle.style.setProperty('--ty', ty + 'px');
            particle.style.animationDelay = (Math.random() * 0.3) + 's';
            particle.style.boxShadow = `0 0 ${size * 2}px ${useColor}`;
            particle.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
            container.appendChild(particle);
        }
    }
    setTimeout(() => { if (container.parentNode) container.remove(); }, 2000);
}

function createConfetti() {
    const container = document.createElement('div');
    container.className = 'confetti-container';
    document.body.appendChild(container);
    
    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#ff6348', '#7bed9f', '#ff4757', '#2ed573', '#f368e0', '#ff9f43', '#00d2d3'];
    const count = 80 + Math.floor(Math.random() * 60);
    
    for (let i = 0; i < count; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        const color = colors[Math.floor(Math.random() * colors.length)];
        const width = 6 + Math.random() * 10;
        const height = 6 + Math.random() * 10;
        const left = Math.random() * 100;
        const duration = 2.5 + Math.random() * 2.5;
        const delay = Math.random() * 2;
        const rotation = (Math.random() - 0.5) * 720;
        const isSquare = Math.random() > 0.5;
        
        piece.style.left = left + '%';
        piece.style.width = width + 'px';
        piece.style.height = height + 'px';
        piece.style.background = color;
        piece.style.borderRadius = isSquare ? '2px' : '50%';
        piece.style.setProperty('--duration', duration + 's');
        piece.style.setProperty('--rotation', rotation + 'deg');
        piece.style.animationDelay = delay + 's';
        piece.style.opacity = 0.7 + Math.random() * 0.3;
        container.appendChild(piece);
    }
    setTimeout(() => { if (container.parentNode) container.remove(); }, 5500);
}

function showCelebration() {
    console.log('🎉 Celebration triggered!');
    createConfetti();
    setTimeout(createFireworks, 100);
    setTimeout(createEmojiBurst, 200);
}

// ==========================================
// 10. KEYBOARD SHORTCUTS
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
// 11. ERROR HANDLING
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
// 12. EXPOSE TO GLOBAL SCOPE
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
window.showCelebration = showCelebration;
window.createEmojiBurst = createEmojiBurst;
window.createFireworks = createFireworks;
window.createConfetti = createConfetti;
window.goBackToChapters = goBackToChapters;

console.log('✅ Quiz System with GNM/ANM JSON Ready!');
