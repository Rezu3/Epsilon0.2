// ==========================================
// QUIZ SYSTEM - COMPLETE JAVASCRIPT
// (No Save, No Result - Only Back Button)
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
        
        if (numA > 0 && numB > 0) {
            return numA - numB;
        }
        return nameA.localeCompare(nameB);
    });
}

async function loadBatches() {
    try {
        console.log('📡 Fetching batches...');
        const response = await fetch(`${API_BASE}/batches`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        let batches = await response.json();
        console.log('✅ Batches loaded:', batches);
        
        batches = sortBatches(batches);
        
        const grid = document.getElementById('batches-grid');
        if (!grid) {
            console.error('❌ batches-grid element not found!');
            return;
        }
        
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

    try {
        const response = await fetch(`${API_BASE}/batches/${batchId}/subjects`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const subjects = await response.json();
        console.log('✅ Subjects loaded:', subjects);

        const grid = document.getElementById('subjects-grid');
        if (!grid) {
            console.error('❌ subjects-grid element not found!');
            return;
        }
        
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

    try {
        const response = await fetch(`${API_BASE}/batches/${currentBatchId}/subjects/${subjectId}/chapters`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const chapters = await response.json();
        console.log('✅ Chapters loaded:', chapters);

        const grid = document.getElementById('chapters-grid');
        if (!grid) {
            console.error('❌ chapters-grid element not found!');
            return;
        }
        
        grid.innerHTML = '';

        if (chapters && chapters.length > 0) {
            chapters.forEach(chapter => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `<i class="fas fa-list"></i> ${chapter.name}`;
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

    try {
        const response = await fetch(`${API_BASE}/batches/${currentBatchId}/subjects/${currentSubjectId}/chapters/${chapterId}/questions`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        questions = await response.json();
        console.log('✅ Questions loaded:', questions.length);

        currentQuestionIndex = 0;
        userAnswers = {};

        if (questions.length > 0) {
            document.getElementById('quiz-chapter-title').innerHTML = `<i class="fas fa-pencil-alt"></i> ${currentChapterName}`;
            showQuestion(currentQuestionIndex);
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

    // Update Image (If exists)
    const imgContainer = document.getElementById('question-image-container');
    const imgElem = document.getElementById('question-image');
    if (q.image && imgElem) {
        imgElem.src = `/static/images/${q.image}`;
        if (imgContainer) {
            imgContainer.style.display = 'block';
        }
    } else if (imgContainer) {
        imgContainer.style.display = 'none';
    }

    // Render Options
    const optionsGrid = document.getElementById('options-container');
    if (!optionsGrid) {
        console.error('❌ options-container element not found!');
        return;
    }
    
    optionsGrid.innerHTML = '';

    if (q.options && Array.isArray(q.options)) {
        const correctAnswer = q.answer !== undefined ? q.answer : q.correct_answer;
        
        q.options.forEach((optText, optIdx) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerHTML = `<span class="option-label">${String.fromCharCode(65 + optIdx)}</span> ${optText}`;
            btn.dataset.correct = (optIdx === correctAnswer) ? 'true' : 'false';
            btn.dataset.index = optIdx;
            
            // Check if user already answered
            if (userAnswers[index] !== undefined) {
                btn.classList.add('disabled');
                if (optIdx === correctAnswer) {
                    btn.classList.add('correct');
                }
                if (userAnswers[index] === optIdx && optIdx !== correctAnswer) {
                    btn.classList.add('wrong');
                }
                if (userAnswers[index] === optIdx) {
                    btn.classList.add('selected');
                }
            } else {
                btn.onclick = function(e) {
                    handleAnswer(optIdx, correctAnswer, index);
                };
            }

            optionsGrid.appendChild(btn);
        });
    } else {
        optionsGrid.innerHTML = '<p style="color: #a0aec0;">No options available for this question.</p>';
    }

    // Navigation Buttons State
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (prevBtn) prevBtn.disabled = (index === 0);
    
    // Check if all questions are answered
    const allAnswered = Object.keys(userAnswers).length === questions.length;
    
    if (nextBtn) {
        if (allAnswered && index === questions.length - 1) {
            // সব প্রশ্নের উত্তর দেওয়া হয়েছে - শুধু "সম্পন্ন" বাটন দেখাবে
            nextBtn.innerHTML = '✅ সম্পন্ন';
            nextBtn.className = 'nav-btn success';
            nextBtn.onclick = showQuizComplete;
            nextBtn.disabled = false;
        } else if (index === questions.length - 1) {
            nextBtn.innerHTML = 'শেষ প্রশ্ন';
            nextBtn.className = 'nav-btn primary';
            nextBtn.onclick = nextQuestion;
            nextBtn.disabled = false;
        } else {
            nextBtn.innerHTML = 'পরবর্তী →';
            nextBtn.className = 'nav-btn primary';
            nextBtn.onclick = nextQuestion;
            nextBtn.disabled = false;
        }
    }

    // Re-render MathJax Equations
    if (window.MathJax && window.MathJax.typesetPromise) {
        try {
            window.MathJax.typesetPromise([qTextElem, optionsGrid]).catch((err) => console.log('MathJax error:', err));
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
    
    // Get all option buttons
    const optionsGrid = document.getElementById('options-container');
    const allBtns = optionsGrid.querySelectorAll('.option-btn');
    
    // Disable all buttons
    allBtns.forEach(btn => {
        btn.classList.add('disabled');
        btn.onclick = null;
    });
    
    // Show correct and wrong answers
    allBtns.forEach((btn, idx) => {
        if (idx === correctAnswer) {
            btn.classList.add('correct');
        }
        if (idx === selectedIndex && idx !== correctAnswer) {
            btn.classList.add('wrong');
        }
        if (idx === selectedIndex) {
            btn.classList.add('selected');
        }
    });
    
    // 🎉 Check if answer is correct - show celebration
    if (selectedIndex === correctAnswer) {
        console.log('🎉 Correct Answer! Showing celebration...');
        showCelebration();
    } else {
        console.log('❌ Wrong Answer');
    }
    
    // Check if all questions are answered
    if (Object.keys(userAnswers).length === questions.length) {
        const nextBtn = document.getElementById('next-btn');
        nextBtn.innerHTML = '✅ সম্পন্ন';
        nextBtn.className = 'nav-btn success';
        nextBtn.onclick = showQuizComplete;
        nextBtn.disabled = false;
    }
}

// ==========================================
// 4. QUIZ COMPLETE - শুধু Back Button
// ==========================================

function showQuizComplete() {
    const quizCard = document.getElementById('quiz-card');
    const footer = document.querySelector('.quiz-footer');
    
    // Hide footer
    if (footer) {
        footer.style.display = 'none';
    }
    
    // Show completion message with Back button
    quizCard.innerHTML = `
        <div class="quiz-complete">
            <div class="complete-icon">🎉</div>
            <h2 style="color: #2d3748; margin: 15px 0 10px 0; font-size: 1.5rem;">
                কুইজ সম্পন্ন হয়েছে!
            </h2>
            <p style="color: #718096; font-size: 1rem; margin-bottom: 20px;">
                আপনি সব প্রশ্নের উত্তর দিয়েছেন।
            </p>
            <button onclick="goBackToChapters()" class="nav-btn primary" style="width: 100%; max-width: 300px; margin: 0 auto;">
                <i class="fas fa-arrow-left"></i> অধ্যায়ে ফিরুন
            </button>
        </div>
    `;
    
    // Update progress
    const progressElem = document.getElementById('quiz-progress');
    if (progressElem) {
        progressElem.innerText = `✅ সম্পন্ন`;
        progressElem.style.background = '#d4edda';
        progressElem.style.color = '#155724';
        progressElem.style.borderColor = '#28a745';
    }
}

// ==========================================
// 5. GO BACK TO CHAPTERS
// ==========================================

function goBackToChapters() {
    // Reset quiz state
    questions = [];
    userAnswers = {};
    currentQuestionIndex = 0;
    
    // Go back to chapters view
    if (currentSubjectId && currentSubjectName) {
        selectSubject(currentSubjectId, currentSubjectName);
    } else {
        loadBatches();
    }
}

// ==========================================
// 6. NAVIGATION
// ==========================================

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
    if (targetView) {
        targetView.classList.add('active');
    } else {
        console.error(`❌ View "${viewId}" not found!`);
    }
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
        if (bcBatch) bcBatch.innerText = currentBatchName;
        if (bcSub) bcSub.style.display = 'none';
        if (bcChap) bcChap.style.display = 'none';
        if (sep1) sep1.style.display = 'none';
        if (sep2) sep2.style.display = 'none';
    } else if (currentSubjectId && !currentChapterId) {
        if (bcBatch) bcBatch.innerText = currentBatchName;
        if (bcSub) {
            bcSub.innerText = currentSubjectName;
            bcSub.style.display = 'inline';
        }
        if (bcChap) bcChap.style.display = 'none';
        if (sep1) sep1.style.display = 'inline';
        if (sep2) sep2.style.display = 'none';
    } else if (currentChapterId) {
        if (bcBatch) bcBatch.innerText = currentBatchName;
        if (bcSub) {
            bcSub.innerText = currentSubjectName;
            bcSub.style.display = 'inline';
        }
        if (bcChap) {
            bcChap.innerText = currentChapterName;
            bcChap.style.display = 'inline';
        }
        if (sep1) sep1.style.display = 'inline';
        if (sep2) sep2.style.display = 'inline';
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
// 7. CELEBRATION ANIMATIONS
// ==========================================

function createEmojiBurst() {
    const emojis = ['🎉', '🎊', '⭐', '✨', '🌟', '💫', '🎆', '🎇', '❤️', '🔥', '🥳', '🎈'];
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
    
    setTimeout(() => {
        if (container.parentNode) {
            container.remove();
        }
    }, 3000);
}

function createFireworks() {
    const container = document.createElement('div');
    container.className = 'firework-container';
    document.body.appendChild(container);
    
    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd', '#ff6348', '#7bed9f'];
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
            
            container.appendChild(particle);
        }
    }
    
    setTimeout(() => {
        if (container.parentNode) {
            container.remove();
        }
    }, 2000);
}

function createConfetti() {
    const container = document.createElement('div');
    container.className = 'confetti-container';
    document.body.appendChild(container);
    
    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#ff6348', '#7bed9f', '#ff4757', '#2ed573'];
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
    
    setTimeout(() => {
        if (container.parentNode) {
            container.remove();
        }
    }, 5500);
}

function showCelebration() {
    console.log('🎉 Celebration triggered!');
    createConfetti();
    setTimeout(createFireworks, 100);
    setTimeout(createEmojiBurst, 200);
}

// ==========================================
// 8. KEYBOARD SHORTCUTS
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
        if (nextBtn && !nextBtn.disabled) {
            nextBtn.click();
        }
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevBtn = document.getElementById('prev-btn');
        if (prevBtn && !prevBtn.disabled) {
            prevBtn.click();
        }
    }
}

// ==========================================
// 9. ERROR HANDLING
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
// 10. EXPOSE TO GLOBAL SCOPE
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
window.goBackToChapters = goBackToChapters;
window.showQuizComplete = showQuizComplete;
window.showCelebration = showCelebration;

console.log('✅ Quiz System Ready!');
