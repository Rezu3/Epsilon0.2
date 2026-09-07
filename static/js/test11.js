const questions = [
  {
    id: 1,
    question: `$\\lim_{n \\to \\infty} \\frac{1^2 + 2^2 + 3^2 + \\dots + n^2}{n^2}$-এর মান হল -`,
    image: null,
    options: [
      `$\\frac{3}{2}$`,
      `$\\frac{2}{3}$`,
      `$\\frac{1}{3}$`,
      `$\\frac{1}{2}$`
    ],
    correct: 2
  },
  {
    id: 2,
    question: `$\\lim_{x \\to 0} \\frac{e^x + e^{-x} - 2}{x^2}$-এর মান -`,
    image: null,
    options: [
      `$0$`,
      `$1$`,
      `$2$`,
      `অস্তিত্ব নেই`
    ],
    correct: 1
  },
  {
    id: 3,
    question: `$\\lim_{x \\to 2^-} \\{x + (x - [x])^2\\} =$ কত?`,
    image: null,
    options: [
      `$0$`,
      `$1$`,
      `$2$`,
      `$3$`
    ],
    correct: 3
  },
  {
    id: 4,
    question: `$\\lim_{x \\to 0} (1 + 4x)^{\\frac{x+2}{x}}$-এর মান হল -`,
    image: null,
    options: [
      `$e^6$`,
      `$e^7$`,
      `$e^8$`,
      `$e^9$`
    ],
    correct: 2
  },
  {
    id: 5,
    question: `$\\lim_{u \\to -3} \\left[\\frac{1}{u+3} + \\frac{6}{u^2-9}\\right]$-এর মান হবে -`,
    image: null,
    options: [
      `$\\frac{1}{6}$`,
      `$-\\frac{1}{6}$`,
      `$\\frac{1}{3}$`,
      `$-\\frac{1}{3}$`
    ],
    correct: 1
  },
  {
    id: 6,
    question: `$\\lim_{x \\to 0} \\frac{\\sin x^\\circ}{x}$-এর মান -`,
    image: null,
    options: [
      `$\\frac{180}{\\pi}$`,
      `$\\frac{\\pi}{180}$`,
      `$1$`,
      `অস্তিত্ব নেই`
    ],
    correct: 1
  },
  {
    id: 7,
    question: `$\\lim_{x \\to 0} \\frac{\\sqrt{\\cos x} - \\sqrt[3]{\\cos x}}{\\sin^2 x}$-এর মান -`,
    image: null,
    options: [
      `$-\\frac{1}{12}$`,
      `$\\frac{1}{12}$`,
      `$\\frac{5}{12}$`,
      `$-\\frac{5}{12}$`
    ],
    correct: 0
  },
  {
    id: 8,
    question: `$\\lim_{x \\to 2} \\frac{ax^2 - b}{x - 2} = 4$ হলে, $a$ ও $b$-এর মান যথাক্রমে -`,
    image: null,
    options: [
      `$1, 2$`,
      `$2, 4$`,
      `$4, 1$`,
      `$1, 4$`
    ],
    correct: 3
  },
  {
    id: 9,
    question: `$\\lim_{x \\to \\frac{\\pi}{4}} \\frac{1 - \\tan x}{1 - \\sqrt{2}\\sin x}$-এর মান -`,
    image: null,
    options: [
      `$\\sqrt{2}$`,
      `$\\frac{1}{\\sqrt{2}}$`,
      `$-\\sqrt{2}$`,
      `$0$`
    ],
    correct: 0
  },
  {
    id: 10,
    question: `$\\lim_{x \\to 0} \\frac{2^x - 1}{\\sqrt{1+x} - 1}$-এর মান -`,
    image: null,
    options: [
      `$\\log 3$`,
      `$\\log 2$`,
      `$2\\log 2$`,
      `$2\\log 3$`
    ],
    correct: 2
  },
  {
    id: 11,
    question: `যদি $f(1) = 1$, $f'(1) = 2$ হয়, তবে $\\lim_{x \\to 1} \\frac{\\sqrt{f(x)} - 1}{\\sqrt{x} - 1}$-এর মান -`,
    image: null,
    options: [
      `$1$`,
      `$0$`,
      `$-1$`,
      `$2$`
    ],
    correct: 3
  },
  {
    id: 12,
    question: `একটি অপেক্ষক $f(x)$ নিম্নলিখিতরূপে সংজ্ঞাত :- \n$$f(x) = \\begin{cases} px^2 + 1, & \\text{যখন } x > 1 \\\\ x + p, & \\text{যখন } x \\le 1 \\end{cases}$$\n যদি $f(x)$ অপেক্ষকটি $x = 1$ বিন্দুতে অন্তরকলনযোগ্য হয়, তবে $p$-এর মান -`,
    image: null,
    options: [
      `$0$`,
      `$2$`,
      `$1$`,
      `$\\frac{1}{2}$`
    ],
    correct: 3
  },
  {
    id: 13,
    question: `$y = \\cos^2\\frac{x}{2}$ হলে নিচের কোনটি $\\frac{dy}{dx}$-এর মান -`,
    image: null,
    options: [
      `$\\cos x$`,
      `$\\frac{1}{2}\\cos x$`,
      `$-\\frac{1}{2}\\sin x$`,
      `$-\\sin x$`
    ],
    correct: 2
  },
  {
    id: 14,
    question: `$y = 4x^3 - 21x^2 - 24x + 7$-এর স্থির বিন্দুসমূহ হল -`,
    image: null,
    options: [
      `$x = 4, -\\frac{1}{2}$`,
      `$x = 4, \\frac{1}{2}$`,
      `$x = 4, 2$`,
      `$x = \\frac{1}{4}, 2$`
    ],
    correct: 0
  },
  {
    id: 15,
    question: `$2f(x) + 3f(-x) = x^2 - x + 1$ হলে $f'(1)$-এর মান -`,
    image: null,
    options: [
      `$\\frac{3}{5}$`,
      `$\\frac{4}{5}$`,
      `$\\frac{7}{5}$`,
      `$\\frac{2}{5}$`
    ],
    correct: 0
  },
  {
    id: 16,
    question: `যদি $f(x) = \\lambda x^2 + \\mu x + 12$, $f'(4) = 15$ এবং $f'(2) = 11$ হয় তবে $\\lambda + \\mu$-এর মান হবে -`,
    image: null,
    options: [
      `$1$`,
      `$-1$`,
      `$8$`,
      `$-2$`
    ],
    correct: 2
  },
  {
    id: 17,
    question: `$2y^2 = ax^2 + b$ বক্রের $(1, -1)$ বিন্দুতে স্পর্শকের প্রবণতা $-1$, তবে $a, b$-এর মান হবে -`,
    image: null,
    options: [
      `$a = 2, b = 1$`,
      `$a = 2, b = 0$`,
      `$a = 0, b = 2$`,
      `$a = 1, b = 1$`
    ],
    correct: 1
  },
  {
    id: 18,
    question: `একটি সমবাহু ত্রিভুজের প্রতিটি বাহু $8\\text{ সেমি}/\\text{ঘণ্টা}$ হারে বৃদ্ধি পাচ্ছে। যখন বাহুর দৈর্ঘ্য $2\\text{ সেমি}$, তখন এর ক্ষেত্রফলের বৃদ্ধির হার হবে -`,
    image: null,
    options: [
      `$8\\sqrt{3}\\text{ সেমি}^2/\\text{ঘণ্টা}$`,
      `$4\\sqrt{3}\\text{ সেমি}^2/\\text{ঘণ্টা}$`,
      `$16\\sqrt{3}\\text{ সেমি}^2/\\text{ঘণ্টা}$`,
      `এদের কোনটিই নয়`
    ],
    correct: 0
  },
  {
    id: 19,
    question: `$x^2 + 2y = 10$ অধিবৃত্তের ওপর সেই বিন্দুর স্থানাঙ্ক কত যেখানে তার স্পর্শক $2x - 4y = 7$ সরলরেখার ওপর লম্ব।`,
    image: null,
    options: [
      `$(1, 2)$`,
      `$(2, 1)$`,
      `$(2, 3)$`,
      `$(3, 2)$`
    ],
    correct: 2
  },
  {
    id: 20,
    question: `$y = \\frac{1}{2}x^2 - \\frac{1}{2}$ বক্রের উপরিস্ত $P$ বিন্দুতে স্পর্শক $x$-অক্ষের সঙ্গে $45^\\circ$ কোণ করে; তাহলে, নীচের কোনটি $P$ বিন্দুর স্থানাঙ্ক?`,
    image: null,
    options: [
      `$\\left(1, \\frac{1}{2}\\right)$`,
      `$(1, 0)$`,
      `$\\left(2, \\frac{3}{2}\\right)$`,
      `$(-1, 0)$`
    ],
    correct: 1
  },
  {
    id: 21,
    question: `$x^3 + y^3 = 3axy$ বক্রের $\\left(\\frac{3a}{2}, \\frac{3a}{2}\\right)$ বিন্দুতে অঙ্কিত স্পর্শক $x$-অক্ষের ধনাত্মক দিকের সঙ্গে উৎপন্ন করে -`,
    image: null,
    options: [
      `সূক্ষ্মকোণ`,
      `স্থূলকোণ`,
      `সমকোণ`,
      `সরলকোণ`
    ],
    correct: 1
  },
  {
    id: 22,
    question: `$4y = x^2 - 8$ বক্রের যে বিন্দুতে স্পর্শকের প্রবণতা তার কোটির সমান তার স্থানাঙ্ক:-`,
    image: null,
    options: [
      `$(4, 2)$ অথবা $(-2, 1)$`,
      `$(4, 2)$ অথবা $(-2, -1)$`,
      `$(4, -2)$ অথবা $(-2, -1)$`,
      `$(4, 2)$ অথবা $(2, 1)$`
    ],
    correct: 1
  },
  {
    id: 23,
    question: `$\\lim_{x \\to 1} \\frac{x + x^2 + x^3 + \\dots + x^n - n}{x - 1}$-এর মান -`,
    image: null,
    options: [
      `$n$`,
      `$\\frac{n(n+1)}{2}$`,
      `$\\frac{n(n-1)}{2}$`,
      `$\\frac{n+1}{2}$`
    ],
    correct: 1
  },
  {
    id: 24,
    question: `$f(x) = \\frac{|x|}{x}$ হলে, $\\lim_{x \\to 0} f(x)$-এর মান -`,
    image: null,
    options: [
      `$0$`,
      `$1$`,
      `$-1$`,
      `অস্তিত্ব নেই`
    ],
    correct: 3
  },
  {
    id: 25,
    question: `$G(x) = -\\sqrt{25-x^2}$ হলে, $\\lim_{x \\to 1} \\frac{G(x) - G(1)}{x - 1}$-এর মান হবে -`,
    image: null,
    options: [
      `$\\frac{1}{2\\sqrt{6}}$`,
      `$\\frac{1}{\\sqrt{6}}$`,
      `$\\frac{1}{\\sqrt{3}}$`,
      `$\\frac{1}{2}$`
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
// QUESTION NAVIGATOR FUNCTIONS
// =============================================

// Navigate to specific question
function goToQuestion(index) {
    if (index < 0 || index >= questions.length || isExamSubmitted) return;
    showQuestion(index);
}

// Update question navigator buttons
function updateNavigator() {
    const container = document.getElementById('questionNavButtons');
    if (!container) return;
    
    let html = '';
    for (let i = 0; i < questions.length; i++) {
        let statusClass = 'unanswered';
        let icon = '';
        
        if (i === currentQuestion) {
            statusClass = 'current';
        }
        if (selectedAnswers[i] !== null) {
            statusClass = 'answered';
            icon = ' ✓';
        }
        if (i === currentQuestion && selectedAnswers[i] !== null) {
            statusClass = 'answered current';
        }
        
        html += `
            <button class="question-nav-btn ${statusClass}" onclick="goToQuestion(${i})" title="Question ${i + 1}">
                ${i + 1}${icon ? `<span class="nav-check">✓</span>` : ''}
            </button>
        `;
    }
    container.innerHTML = html;
    
    // Update answered count
    const badge = document.getElementById('answeredCountBadge');
    if (badge) {
        const answered = selectedAnswers.filter(a => a !== null).length;
        badge.textContent = `${answered}/${questions.length} Answered`;
    }
}

// =============================================
// CLEAR SELECTION - ভুল উত্তর দাগ Remove
// =============================================
function clearSelection(questionIndex) {
    if (isExamSubmitted || isSubmitting) return;
    
    // Clear the answer
    selectedAnswers[questionIndex] = null;
    
    // Update the specific question's UI if it's currently visible
    if (questionIndex === currentQuestion) {
        const options = document.querySelectorAll('.option');
        options.forEach((opt) => {
            const radio = opt.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = false;
            }
            opt.classList.remove('selected');
        });
    }
    
    // Update counters
    answeredCount = selectedAnswers.filter(a => a !== null).length;
    answeredCountDisplay.textContent = `${answeredCount} Answered`;
    
    // Update navigator
    updateNavigator();
    
    // Show feedback
    showSecurityWarning('✅ Selection cleared! You can select again.');
}

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
                ${selectedAnswers[index] === optIndex ? `<span class="clear-option-btn" onclick="event.stopPropagation();clearSelection(${index})">✕</span>` : ''}
            </label>
        `;
    });
    html += `</div>`;
    
    // Add Clear Selection button for current question
    if (selectedAnswers[index] !== null) {
        html += `
            <div class="clear-selection-container">
                <button class="clear-selection-btn" onclick="clearSelection(${index})">
                    <i class="fas fa-undo"></i> Clear Selection
                </button>
            </div>
        `;
    }
    
    questionContainer.innerHTML = html;
    
    // Render MathJax
    if (window.MathJax && MathJax.typesetPromise) {
        MathJax.typesetPromise([questionContainer]).catch(function(err) {
            console.log('MathJax error:', err);
        });
    }
    
    const progress = ((index + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
    
    // Update navigator
    updateNavigator();
    
    prevBtn.style.display = index === 0 ? 'none' : 'inline-flex';
    nextBtn.style.display = index === questions.length - 1 ? 'none' : 'inline-flex';
    submitBtn.style.display = index === questions.length - 1 ? 'inline-flex' : 'none';
}

// =============================================
// SELECT OPTION
// =============================================
function selectOption(questionIndex, optionIndex) {
    if (isExamSubmitted || isSubmitting) return;
    
    // If same option is clicked, deselect it (toggle off)
    if (selectedAnswers[questionIndex] === optionIndex) {
        clearSelection(questionIndex);
        return;
    }
    
    selectedAnswers[questionIndex] = optionIndex;
    
    const options = document.querySelectorAll('.option');
    options.forEach((opt, idx) => {
        opt.classList.toggle('selected', idx === optionIndex);
        const radio = opt.querySelector('input[type="radio"]');
        if (radio) radio.checked = idx === optionIndex;
    });
    
    answeredCount = selectedAnswers.filter(a => a !== null).length;
    answeredCountDisplay.textContent = `${answeredCount} Answered`;
    
    // Update navigator
    updateNavigator();
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
// REVIEW TOGGLE - MathJax রেন্ডার সহ
// =============================================
function toggleReview() {
    const reviewSection = document.getElementById('reviewSection');
    if (reviewSection) {
        if (reviewSection.style.display === 'none' || reviewSection.style.display === '') {
            reviewSection.style.display = 'block';
            // MathJax রেন্ডার
            if (window.MathJax && MathJax.typesetPromise) {
                MathJax.typesetPromise([reviewSection]).catch(function(err) {
                    console.log('MathJax error:', err);
                });
            }
        } else {
            reviewSection.style.display = 'none';
        }
    }
}

// =============================================
// SHOW RESULT (আপডেটেড - MathJax + Clear Selection সহ)
// =============================================
function showResult(correct, wrong, skipped, total, percentage, grade, reason = '') {
    // Review section - প্রতিটি প্রশ্নের জন্য Clear Selection বাটন সহ
    let reviewItems = '';
    for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        const userAnswer = selectedAnswers[i];
        const isCorrect = userAnswer === q.correct;
        const isSkipped = userAnswer === null;
        
        let statusClass = 'skipped-review';
        let statusText = 'Not Answered';
        let statusColor = 'skipped-text';
        
        if (!isSkipped) {
            if (isCorrect) {
                statusClass = 'correct-review';
                statusText = q.options[userAnswer];
                statusColor = 'correct-text';
            } else {
                statusClass = 'wrong-review';
                statusText = q.options[userAnswer];
                statusColor = 'wrong-text';
            }
        }
        
        reviewItems += `
            <div class="review-item ${statusClass}">
                <div class="review-question">
                    <span class="review-number">${i + 1}.</span>
                    <span class="review-text mathjax">${q.question}</span>
                </div>
                <div class="review-answer">
                    <span class="review-label">Your Answer: </span>
                    <span class="review-value ${statusColor} mathjax">${statusText}</span>
                    ${!isSkipped && !isCorrect ? `<span class="review-correct mathjax">Correct: ${q.options[q.correct]}</span>` : ''}
                </div>
            </div>
        `;
    }

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
                ${reviewItems}
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
    
    // MathJax রেন্ডার
    if (window.MathJax && MathJax.typesetPromise) {
        MathJax.typesetPromise([resultDiv]).catch(function(err) {
            console.log('MathJax error:', err);
        });
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
window.goToQuestion = goToQuestion;
window.updateNavigator = updateNavigator;
window.clearSelection = clearSelection;

