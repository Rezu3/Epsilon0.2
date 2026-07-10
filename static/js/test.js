// static/js/test.js - MathJax সমর্থন সহ

// =============================================
// QUESTIONS DATA - MATH EQUATIONS
// =============================================
const questions = [
    // =============================================
    // 1. INTEGRATION
    // =============================================
    {
        id: 1,
        question: `$$\int_0^1 x^2 \\, dx$$ এর মান কত?`,
        image: null,
        options: [
            `$$\\frac{1}{3}$$`,
            `$$\\frac{1}{2}$$`,
            `$$1$$`,
            `$$\\frac{2}{3}$$`
        ],
        correct: 0
    },

    // =============================================
    // 2. DERIVATIVE
    // =============================================
    {
        id: 2,
        question: `$$\\frac{d}{dx}(x^3 + 2x^2 - 5x + 7)$$ এর মান কত?`,
        image: null,
        options: [
            `$$3x^2 + 4x - 5$$`,
            `$$3x^2 + 2x - 5$$`,
            `$$x^2 + 4x - 5$$`,
            `$$3x^2 + 4x + 5$$`
        ],
        correct: 0
    },

    // =============================================
    // 3. MATRIX DETERMINANT
    // =============================================
    {
        id: 3,
        question: `নিচের ম্যাট্রিক্সটির ডিটারমিনেন্ট কত? $$\\begin{vmatrix} 1 & 2 \\\\ 3 & 4 \\end{vmatrix}$$`,
        image: null,
        options: [
            `$$-2$$`,
            `$$2$$`,
            `$$-1$$`,
            `$$1$$`
        ],
        correct: 0
    },

    // =============================================
    // 4. LIMIT
    // =============================================
    {
        id: 4,
        question: `$$\\lim_{x \\to 0} \\frac{\\sin x}{x}$$ এর মান কত?`,
        image: null,
        options: [
            `$$0$$`,
            `$$1$$`,
            `$$\\infty$$`,
            `$$-1$$`
        ],
        correct: 1
    },

    // =============================================
    // 5. DEFINITE INTEGRAL
    // =============================================
    {
        id: 5,
        question: `$$\\int_0^{\\pi} \\sin x \\, dx$$ এর মান কত?`,
        image: null,
        options: [
            `$$0$$`,
            `$$1$$`,
            `$$2$$`,
            `$$-1$$`
        ],
        correct: 2
    },

    // =============================================
    // 6. PARTIAL DERIVATIVE
    // =============================================
    {
        id: 6,
        question: `$$f(x,y) = x^2y + y^3$$ হলে $$\\frac{\\partial f}{\\partial x}$$ এর মান কত?`,
        image: null,
        options: [
            `$$2xy$$`,
            `$$x^2 + 3y^2$$`,
            `$$2xy + 3y^2$$`,
            `$$x^2y$$`
        ],
        correct: 0
    },

    // =============================================
    // 7. TRIGONOMETRIC IDENTITY
    // =============================================
    {
        id: 7,
        question: `$$\\sin^2 x + \\cos^2 x$$ এর মান কত?`,
        image: null,
        options: [
            `$$0$$`,
            `$$1$$`,
            `$$\\sin 2x$$`,
            `$$\\cos 2x$$`
        ],
        correct: 1
    },

    // =============================================
    // 8. LOGARITHM
    // =============================================
    {
        id: 8,
        question: `$$\\log_{10} 100$$ এর মান কত?`,
        image: null,
        options: [
            `$$1$$`,
            `$$2$$`,
            `$$10$$`,
            `$$100$$`
        ],
        correct: 1
    },

    // =============================================
    // 9. DIFFERENTIAL EQUATION
    // =============================================
    {
        id: 9,
        question: `$$\\frac{dy}{dx} = 2x$$ এর সমাধান কত?`,
        image: null,
        options: [
            `$$y = x^2 + C$$`,
            `$$y = 2x + C$$`,
            `$$y = \\frac{x^2}{2} + C$$`,
            `$$y = e^{2x} + C$$`
        ],
        correct: 0
    },

    // =============================================
    // 10. VECTOR DOT PRODUCT
    // =============================================
    {
        id: 10,
        question: `$$\\vec{i} + \\vec{j}$$ এবং $$\\vec{i} - \\vec{j}$$ এর ডট গুণফল কত?`,
        image: null,
        options: [
            `$$0$$`,
            `$$1$$`,
            `$$-1$$`,
            `$$2$$`
        ],
        correct: 0
    },

    // =============================================
    // 11. MULTIPLE INTEGRATION
    // =============================================
    {
        id: 11,
        question: `$$\\int_0^1 \\int_0^1 (x + y) \\, dx \\, dy$$ এর মান কত?`,
        image: null,
        options: [
            `$$1$$`,
            `$$\\frac{1}{2}$$`,
            `$$\\frac{3}{2}$$`,
            `$$2$$`
        ],
        correct: 0
    },

    // =============================================
    // 12. SECOND DERIVATIVE
    // =============================================
    {
        id: 12,
        question: `$$y = e^{2x}$$ হলে $$\\frac{d^2y}{dx^2}$$ এর মান কত?`,
        image: null,
        options: [
            `$$2e^{2x}$$`,
            `$$4e^{2x}$$`,
            `$$e^{2x}$$`,
            `$$8e^{2x}$$`
        ],
        correct: 1
    },

    // =============================================
    // 13. MATRIX MULTIPLICATION
    // =============================================
    {
        id: 13,
        question: `$$\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix} \\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix}$$ এর মান কত?`,
        image: null,
        options: [
            `$$\\begin{pmatrix} 5 \\\\ 11 \\end{pmatrix}$$`,
            `$$\\begin{pmatrix} 3 \\\\ 7 \\end{pmatrix}$$`,
            `$$\\begin{pmatrix} 4 \\\\ 10 \\end{pmatrix}$$`,
            `$$\\begin{pmatrix} 2 \\\\ 8 \\end{pmatrix}$$`
        ],
        correct: 0
    },

    // =============================================
    // 14. LAPLACE TRANSFORM
    // =============================================
    {
        id: 14,
        question: `$$\\mathcal{L}\\{1\\}$$ এর মান কত?`,
        image: null,
        options: [
            `$$\\frac{1}{s}$$`,
            `$$\\frac{1}{s^2}$$`,
            `$$s$$`,
            `$$e^{-s}$$`
        ],
        correct: 0
    },

    // =============================================
    // 15. FOURIER SERIES
    // =============================================
    {
        id: 15,
        question: `$$\\int_0^{2\\pi} \\sin(nx) \\, dx$$ এর মান কত?`,
        image: null,
        options: [
            `$$0$$`,
            `$$1$$`,
            `$$2$$`,
            `$$\\pi$$`
        ],
        correct: 0
    },

    // =============================================
    // 16. COMPLEX NUMBER
    // =============================================
    {
        id: 16,
        question: `$$(1 + i)^2$$ এর মান কত?`,
        image: null,
        options: [
            `$$2i$$`,
            `$$1 + 2i$$`,
            `$$2 + i$$`,
            `$$-2i$$`
        ],
        correct: 0
    },

    // =============================================
    // 17. TAYLOR SERIES
    // =============================================
    {
        id: 17,
        question: `$$e^x$$ এর টেলর সিরিজের প্রথম ৩টি পদ কত?`,
        image: null,
        options: [
            `$$1 + x + \\frac{x^2}{2}$$`,
            `$$1 + x + x^2$$`,
            `$$x + \\frac{x^2}{2} + \\frac{x^3}{6}$$`,
            `$$1 + \\frac{x}{2} + \\frac{x^2}{4}$$`
        ],
        correct: 0
    },

    // =============================================
    // 18. VECTOR CROSS PRODUCT
    // =============================================
    {
        id: 18,
        question: `$$\\vec{i} \\times \\vec{j}$$ এর মান কত?`,
        image: null,
        options: [
            `$$\\vec{k}$$`,
            `$$-\\vec{k}$$`,
            `$$\\vec{i}$$`,
            `$$\\vec{j}$$`
        ],
        correct: 0
    },

    // =============================================
    // 19. STATISTICS - MEAN
    // =============================================
    {
        id: 19,
        question: `$$\\bar{x} = \\frac{\\sum x}{n}$$ সূত্রটি কী বের করতে ব্যবহৃত হয়?`,
        image: null,
        options: [
            `গড় (Mean)`,
            `মধ্যমা (Median)`,
            `প্রচুরক (Mode)`,
            `ভেদাঙ্ক (Variance)`
        ],
        correct: 0
    },

    // =============================================
    // 20. PROBABILITY
    // =============================================
    {
        id: 20,
        question: `$$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$$ সূত্রটি কোনটি?`,
        image: null,
        options: [
            `যোগ সূত্র`,
            `গুণ সূত্র`,
            `শর্তাধীন সম্ভাবনা`,
            `বেইস সূত্র`
        ],
        correct: 0
    }
];

// =============================================
// EXAM STATE
// =============================================
let currentQuestion = 0;
let selectedAnswers = new Array(questions.length).fill(null);
let timerInterval = null;
let timeLeft = 0;
let examDuration = 30;
let examId = null;
let isExamSubmitted = false;
let isSubmitting = false;
let securityViolations = 0;
let warningTimeout = null;

// =============================================
// DOM ELEMENTS
// =============================================
const questionContainer = document.getElementById('questionContainer');
const progressBar = document.getElementById('progressBar');
const timerDisplay = document.getElementById('timerDisplay');
const questionNumber = document.getElementById('questionNumber');
const answeredCountDisplay = document.getElementById('answeredCount');
const questionIndicator = document.getElementById('questionIndicator');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
const securityWarning = document.getElementById('securityWarning');
const warningMessage = document.getElementById('warningMessage');

// =============================================
// INITIALIZE EXAM
// =============================================
document.addEventListener('DOMContentLoaded', function() {
    const examIdElem = document.getElementById('examId');
    const durationElem = document.getElementById('examDuration');
    const statusElem = document.getElementById('examStatus');
    
    if (examIdElem) examId = examIdElem.textContent;
    if (durationElem) examDuration = parseInt(durationElem.textContent) || 30;
    
    if (statusElem && statusElem.textContent === 'taken') {
        alert('⚠️ You have already taken this exam!');
        window.location.href = '/student_dashboard';
        return;
    }
    
    startExam();
    
    // Security Features
    history.pushState(null, null, location.href);
    window.addEventListener('popstate', function() {
        if (!isExamSubmitted && !isSubmitting) forceLogout('Back Button');
    });
    
    window.addEventListener('beforeunload', function(e) {
        if (!isExamSubmitted && !isSubmitting) {
            forceLogout('Page Refresh');
            e.preventDefault();
            e.returnValue = '';
        }
    });
    
    document.addEventListener('visibilitychange', function() {
        if (document.hidden && !isExamSubmitted && !isSubmitting) {
            forceLogout('Tab Switch');
        }
    });
    
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        showSecurityWarning('Right click is disabled!');
    });
    
    document.addEventListener('copy', function(e) { e.preventDefault(); showSecurityWarning('Copy is disabled!'); });
    document.addEventListener('paste', function(e) { e.preventDefault(); showSecurityWarning('Paste is disabled!'); });
    
    document.addEventListener('keydown', function(e) {
        const forbidden = ['c', 'v', 'u', 's', 'p'];
        if (e.ctrlKey && forbidden.includes(e.key.toLowerCase())) {
            e.preventDefault();
            showSecurityWarning('Keyboard shortcut disabled!');
        }
        if (e.key === 'F12' || e.key === 'F5') {
            e.preventDefault();
            showSecurityWarning('This key is disabled!');
        }
        if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) {
            e.preventDefault();
            showSecurityWarning('DevTools disabled!');
        }
        if (e.ctrlKey && e.key === 'p') {
            e.preventDefault();
            showSecurityWarning('Print is disabled!');
        }
    });
});

// =============================================
// FORCE LOGOUT
// =============================================
function forceLogout(reason) {
    if (isExamSubmitted || isSubmitting) return;
    showSecurityWarning(`⚠️ ${reason} detected! Logging out...`);
    
    if (!isExamSubmitted && !isSubmitting) forceSubmitExam(reason);
    
    setTimeout(function() {
        fetch('/logout', { method: 'GET' })
            .then(() => { window.location.href = '/'; })
            .catch(() => { window.location.href = '/'; });
    }, 2000);
}

// =============================================
// FORCE SUBMIT EXAM
// =============================================
function forceSubmitExam(reason) {
    if (isExamSubmitted || isSubmitting) return;
    
    isSubmitting = true;
    isExamSubmitted = true;
    clearInterval(timerInterval);
    
    let correct = 0, wrong = 0, skipped = 0;
    for (let i = 0; i < questions.length; i++) {
        if (selectedAnswers[i] === null) skipped++;
        else if (selectedAnswers[i] === questions[i].correct) correct++;
        else wrong++;
    }
    
    const total = questions.length;
    const percentage = Math.round((correct / total) * 100);
    let grade = percentage >= 80 ? 'A+' : percentage >= 70 ? 'A' : percentage >= 60 ? 'A-' : 
                percentage >= 50 ? 'B' : percentage >= 40 ? 'C' : 'F';
    
    showResult(correct, wrong, skipped, total, percentage, grade, reason);
    submitToServer(correct, total, percentage, grade);
}

// =============================================
// SHOW SECURITY WARNING
// =============================================
function showSecurityWarning(message) {
    securityWarning.style.display = 'flex';
    warningMessage.textContent = message;
    clearTimeout(warningTimeout);
    warningTimeout = setTimeout(function() {
        securityWarning.style.display = 'none';
    }, 3000);
}

// =============================================
// START EXAM
// =============================================
function startExam() {
    timeLeft = examDuration * 60;
    updateTimerDisplay();
    
    timerInterval = setInterval(function() {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0 && !isExamSubmitted && !isSubmitting) {
            clearInterval(timerInterval);
            showSecurityWarning('⏰ Time is up! Auto-submitting...');
            setTimeout(function() {
                if (!isExamSubmitted && !isSubmitting) forceSubmitExam('Time Up');
            }, 1500);
        }
    }, 1000);
    
    showQuestion(0);
}

// =============================================
// SHOW QUESTION WITH MATHJAX
// =============================================
function showQuestion(index) {
    if (index < 0 || index >= questions.length || isExamSubmitted) return;
    
    currentQuestion = index;
    const question = questions[index];
    
    questionNumber.textContent = `Q${index + 1}/${questions.length}`;
    questionIndicator.textContent = `${index + 1} / ${questions.length}`;
    answeredCount = selectedAnswers.filter(a => a !== null).length;
    answeredCountDisplay.textContent = `${answeredCount} Answered`;
    
    let html = `
        <div class="question-number-badge">Question ${index + 1}</div>
        <div class="question-text mathjax">${question.question}</div>
    `;
    
    if (question.image) {
        html += `
            <div class="question-image">
                <img src="/static/images/${question.image}" alt="Question Image" class="exam-image" 
                     onerror="this.parentElement.innerHTML='<p style=\\'color:#f56565; font-size:13px;\\'>⚠️ Image not found</p>'">
            </div>
        `;
    }
    
    html += `<div class="options">`;
    question.options.forEach((option, optIndex) => {
        const checked = selectedAnswers[index] === optIndex ? 'checked' : '';
        const selectedClass = selectedAnswers[index] === optIndex ? 'selected' : '';
        html += `
            <label class="option ${selectedClass}" onclick="selectOption(${index}, ${optIndex})">
                <input type="radio" name="answer" value="${optIndex}" ${checked}>
                <span class="option-text mathjax">${option}</span>
            </label>
        `;
    });
    html += `</div>`;
    
    questionContainer.innerHTML = html;
    
    // 🔥 Render MathJax
    if (window.MathJax && MathJax.typesetPromise) {
        MathJax.typesetPromise([questionContainer]).catch(function(err) {
            console.log('MathJax error:', err);
        });
    }
    
    const progress = ((index + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
    
    prevBtn.style.display = index === 0 ? 'none' : 'inline-flex';
    nextBtn.style.display = index === questions.length - 1 ? 'none' : 'inline-flex';
    submitBtn.style.display = index === questions.length - 1 ? 'inline-flex' : 'none';
}

// =============================================
// SELECT OPTION
// =============================================
function selectOption(questionIndex, optionIndex) {
    if (isExamSubmitted || isSubmitting) return;
    
    selectedAnswers[questionIndex] = optionIndex;
    
    const options = document.querySelectorAll('.option');
    options.forEach((opt, idx) => {
        opt.classList.toggle('selected', idx === optionIndex);
        const radio = opt.querySelector('input[type="radio"]');
        if (radio) radio.checked = idx === optionIndex;
    });
    
    answeredCount = selectedAnswers.filter(a => a !== null).length;
    answeredCountDisplay.textContent = `${answeredCount} Answered`;
}

// =============================================
// NAVIGATION
// =============================================
function nextQuestion() {
    if (currentQuestion < questions.length - 1 && !isExamSubmitted) {
        showQuestion(currentQuestion + 1);
    }
}

function prevQuestion() {
    if (currentQuestion > 0 && !isExamSubmitted) {
        showQuestion(currentQuestion - 1);
    }
}

// =============================================
// UPDATE TIMER
// =============================================
function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    const timer = document.getElementById('examTimer');
    if (timeLeft < 60) {
        timer.style.background = 'rgba(245, 101, 101, 0.3)';
        timer.style.border = '2px solid #f56565';
    } else if (timeLeft < 300) {
        timer.style.background = 'rgba(237, 137, 54, 0.2)';
        timer.style.border = '2px solid #ed8936';
    } else {
        timer.style.background = 'rgba(255, 255, 255, 0.2)';
        timer.style.border = 'none';
    }
}

// =============================================
// SUBMIT EXAM
// =============================================
function submitExam() {
    if (isExamSubmitted || isSubmitting) return;
    
    const unanswered = selectedAnswers.filter(a => a === null).length;
    if (unanswered > 0 && !confirm(`⚠️ You have ${unanswered} unanswered questions. Submit anyway?`)) {
        return;
    }
    
    forceSubmitExam('Manual Submit');
}

// =============================================
// SHOW RESULT
// =============================================
function showResult(correct, wrong, skipped, total, percentage, grade, reason = '') {
    const resultHTML = `
        <div class="result-container">
            <div class="result-header">
                <i class="fas fa-check-circle"></i>
                <h2>${reason ? '⚠️ Exam Submitted' : '✅ Exam Completed!'}</h2>
                <p>${reason ? `Submitted due to: ${reason}` : 'Your exam has been submitted successfully'}</p>
            </div>
            
            <div class="result-stats">
                <div class="stat-card correct">
                    <span class="stat-icon"><i class="fas fa-check"></i></span>
                    <span class="stat-number">${correct}</span>
                    <span class="stat-label">Correct</span>
                </div>
                <div class="stat-card wrong">
                    <span class="stat-icon"><i class="fas fa-times"></i></span>
                    <span class="stat-number">${wrong}</span>
                    <span class="stat-label">Wrong</span>
                </div>
                <div class="stat-card skipped">
                    <span class="stat-icon"><i class="fas fa-minus"></i></span>
                    <span class="stat-number">${skipped}</span>
                    <span class="stat-label">Skipped</span>
                </div>
                <div class="stat-card total">
                    <span class="stat-icon"><i class="fas fa-flag"></i></span>
                    <span class="stat-number">${total}</span>
                    <span class="stat-label">Total</span>
                </div>
            </div>
            
            <div class="result-score">
                <div class="score-circle">
                    <span class="score-number">${percentage}%</span>
                    <span class="score-label">Score</span>
                </div>
                <div class="score-details">
                    <span class="score-grade">Grade: <strong>${grade}</strong></span>
                    <span class="score-message">${percentage >= 80 ? '🌟 Excellent!' : percentage >= 60 ? '👍 Good Job!' : '📚 Keep Practicing!'}</span>
                </div>
            </div>
            
            <div class="result-review">
                <button class="review-btn" onclick="toggleReview()">
                    <i class="fas fa-eye"></i> Review Answers
                </button>
                <button class="dashboard-btn" onclick="goToDashboard()">
                    <i class="fas fa-home"></i> Go to Dashboard
                </button>
            </div>
            
            <div class="review-section" id="reviewSection" style="display: none;">
                <h3><i class="fas fa-list"></i> Answer Review</h3>
                ${questions.map((q, idx) => `
                    <div class="review-item ${selectedAnswers[idx] === q.correct ? 'correct-review' : selectedAnswers[idx] === null ? 'skipped-review' : 'wrong-review'}">
                        <div class="review-question">
                            <span class="review-number">${idx + 1}.</span>
                            <span class="review-text">${q.question}</span>
                        </div>
                        <div class="review-answer">
                            <span class="review-label">Your Answer: </span>
                            <span class="review-value ${selectedAnswers[idx] === q.correct ? 'correct-text' : selectedAnswers[idx] === null ? 'skipped-text' : 'wrong-text'}">
                                ${selectedAnswers[idx] !== null ? q.options[selectedAnswers[idx]] : 'Not Answered'}
                            </span>
                            ${selectedAnswers[idx] !== null && selectedAnswers[idx] !== q.correct ? `<span class="review-correct">Correct: ${q.options[q.correct]}</span>` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    document.getElementById('questionContainer').style.display = 'none';
    document.getElementById('navigation').style.display = 'none';
    document.getElementById('progressContainer').style.display = 'none';
    document.getElementById('examHeaderRight').style.display = 'none';
    document.querySelector('.security-bar').style.display = 'none';
    
    const resultDiv = document.createElement('div');
    resultDiv.innerHTML = resultHTML;
    document.querySelector('.exam-container').appendChild(resultDiv.firstElementChild);
}

// =============================================
// TOGGLE REVIEW
// =============================================
function toggleReview() {
    const reviewSection = document.getElementById('reviewSection');
    if (reviewSection) {
        reviewSection.style.display = reviewSection.style.display === 'none' ? 'block' : 'none';
    }
}

// =============================================
// GO TO DASHBOARD
// =============================================
function goToDashboard() {
    window.location.href = '/student_dashboard';
}

// =============================================
// SUBMIT TO SERVER
// =============================================
function submitToServer(marks, total, percentage, grade) {
    fetch('/submit_online_test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            exam_id: examId,
            marks: marks,
            total: total,
            percentage: percentage,
            grade: grade
        })
    })
    .then(response => response.json())
    .then(data => {
        if (!data.success) console.error('Server error:', data.error);
    })
    .catch(error => console.error('Error:', error));
}

// =============================================
// KEYBOARD NAVIGATION
// =============================================
document.addEventListener('keydown', function(e) {
    if ((e.key === 'ArrowRight' || e.key === 'ArrowDown') && !isExamSubmitted) {
        e.preventDefault();
        nextQuestion();
    } else if ((e.key === 'ArrowLeft' || e.key === 'ArrowUp') && !isExamSubmitted) {
        e.preventDefault();
        prevQuestion();
    }
});

// =============================================
// MAKE FUNCTIONS GLOBAL
// =============================================
window.selectOption = selectOption;
window.nextQuestion = nextQuestion;
window.prevQuestion = prevQuestion;
window.submitExam = submitExam;
window.toggleReview = toggleReview;
window.goToDashboard = goToDashboard;
window.showSecurityWarning = showSecurityWarning;
window.forceLogout = forceLogout;