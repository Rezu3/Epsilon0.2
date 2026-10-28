 const questions = [
  // ================= Section A: Physics (Force & Pressure) — ১০টি =================
  {
    id: 1,
    question: `The dimensional formula of force is:`,
    image: null,
    options: [`$[MLT^{-1}]$`, `$[MLT^{-2}]$`, `$[ML^2T^{-2}]$`, `$[M^0LT^{-2}]$`],
    correct: 1
  },
  {
    id: 2,
    question: `1 Newton is equal to:`,
    image: null,
    options: [`$10^3$ dyne`, `$10^4$ dyne`, `$10^5$ dyne`, `$10^6$ dyne`],
    correct: 2
  },
  {
    id: 3,
    question: `The dimensional formula of pressure is:`,
    image: null,
    options: [`$[MLT^{-2}]$`, `$[ML^{-1}T^{-2}]$`, `$[ML^2T^{-2}]$`, `$[M^0LT^{-2}]$`],
    correct: 1
  },
  {
    id: 4,
    question: `For a constant force, if area is halved, pressure becomes:`,
    image: null,
    options: [`Half`, `Double`, `Same`, `Zero`],
    correct: 1
  },
  {
    id: 5,
    question: `The pressure at a point inside a liquid at a given depth is:`,
    image: null,
    options: [`Same in all directions`, `Different in different directions`, `Zero`, `Infinite`],
    correct: 0
  },
  {
    id: 6,
    question: `If force is 100 N and area is $2\\text{ m}^2$, pressure is:`,
    image: null,
    options: [`25 Pa`, `50 Pa`, `100 Pa`, `200 Pa`],
    correct: 1
  },
  {
    id: 7,
    question: `1 atmosphere (atm) is equal to:`,
    image: null,
    options: [`101,325 Pa`, `1,013.25 Pa`, `10,132.5 Pa`, `1,013,250 Pa`],
    correct: 0
  },
  {
    id: 8,
    question: `The pressure exerted by a liquid depends on:`,
    image: null,
    options: [`Its depth`, `Its density`, `Acceleration due to gravity`, `All of the above`],
    correct: 3
  },
  {
    id: 9,
    question: `If a force of 10 N and 5 N act in opposite directions, net force is:`,
    image: null,
    options: [`5 N`, `10 N`, `15 N`, `50 N`],
    correct: 0
  },
  {
    id: 10,
    question: `Atmospheric pressure:`,
    image: null,
    options: [`Increases with altitude`, `Decreases with altitude`, `Remains constant with altitude`, `Becomes zero at high altitude`],
    correct: 1
  },

  // ================= Section B: Mathematics (Rational Numbers) — ১০টি =================
  {
    id: 11,
    question: `Out of the following rational numbers, which is the smallest?`,
    image: null,
    options: [`$\\frac{2}{7}$`, `$-\\frac{5}{7}$`, `$-\\frac{4}{7}$`, `$\\frac{3}{7}$`],
    correct: 1
  },
   {
  id: 12,
  question: `Which of the following is not true?`,
  image: null,
  options: [
    `$\\frac{8}{7}+\\frac{3}{8}=\\frac{3}{8}+\\frac{8}{7}$`,
    `$\\frac{8}{7}\\times\\frac{3}{8}=\\frac{3}{8}\\times\\frac{8}{7}$`,
    `$\\frac{8}{7}\\div\\frac{3}{8}=\\frac{8}{7}\\times\\frac{8}{3}$`,
    `$\\frac{8}{7}-\\frac{3}{8}=\\frac{3}{8}-\\frac{8}{7}$`
  ],
  correct: 3
},
  {
    id: 13,
    question: `Which one of the following rational numbers is the additive identity for rational numbers?`,
    image: null,
    options: [`0`, `2`, `1`, `3`],
    correct: 0
  },
  {
    id: 14,
    question: `$\\frac{3}{4}$ of $\\frac{2}{7}$ of $\\frac{1}{5}$ of $560=?$`,
    image: null,
    options: [`28`, `24`, `32`, `36`],
    correct: 1
  },
  {
    id: 15,
    question: `A rational number between $-\\frac{2}{3}$ and $\\frac{3}{4}$ is`,
    image: null,
    options: [`2`, `-2`, `-1`, `1`],
    correct: 2
  },
  {
    id: 16,
    question: `The value of $1\\div[1+1\\div\\{1+1\\div(1+1\\div2)\\}]$ is:`,
    image: null,
    options: [`$\\frac{5}{8}$`, `$\\frac{8}{5}$`, `$\\frac{3}{8}$`, `$\\frac{3}{5}$`],
    correct: 1
  },
  {
    id: 17,
    question: `The number expression $\\frac{3}{8}+\\frac{(-5)}{7}=\\frac{-19}{56}$ shows:`,
    image: null,
    options: [
      `rational numbers are closed under addition.`,
      `rational numbers are not closed under addition.`,
      `rational numbers are closed under multiplication.`,
      `addition of rational numbers is not commutative.`
    ],
    correct: 0
  },
  {
    id: 18,
    question: `The product of $\\frac{3}{4}$, $\\frac{2}{5}$ and $\\frac{25}{3}$ is:`,
    image: null,
    options: [`$\\frac{3}{2}$`, `$\\frac{5}{2}$`, `$\\frac{5}{4}$`, `$\\frac{3}{4}$`],
    correct: 1
  },
  {
    id: 19,
    question: `If $157z234$ is divisible by 3, then the value of $z$ can be:`,
    image: null,
    options: [`2`, `5`, `8`, `0`],
    correct: 1
  },
  {
    id: 20,
    question: `Which number is divisible by 5 and 9?`,
    image: null,
    options: [`585`, `285`, `389`, `560`],
    correct: 0
  },

  // ================= Section C: English (Advanced Present Tense Translation) — ১০টি =================
  {
    id: 21,
    question: `নদীর জল ধীরে ধীরে শুকিয়ে যাচ্ছে।`,
    image: null,
    options: [
      `The river water is slowly drying up.`,
      `The river water slowly dries up.`,
      `The river water has slowly dried up.`,
      `The river water is slowly dried up.`
    ],
    correct: 0
  },
  {
    id: 22,
    question: `সকাল থেকে অবিরাম বৃষ্টি হচ্ছে।`,
    image: null,
    options: [
      `It is raining continuously since morning.`,
      `It has been raining continuously since morning.`,
      `It rains continuously from the morning.`,
      `It has rained continuously since morning.`
    ],
    correct: 1
  },
  {
    id: 23,
    question: `এই কিতাবটি সবার দ্বারাই পঠিত হয়।`,
    image: null,
    options: [
      `Everyone reads this book.`,
      `This book is being read by all.`,
      `This book is read by everyone.`,
      `This book has been read by all.`
    ],
    correct: 2
  },
  {
    id: 24,
    question: `চোরটিকে হাতেনাতে ধরা হয়েছে।`,
    image: null,
    options: [
      `The thief is caught red-handed.`,
      `The thief has been caught red-handed.`,
      `The thief is being caught red-handed.`,
      `They caught the thief red-handed.`
    ],
    correct: 1
  },
  {
    id: 25,
    question: `সূর্য ওঠার আগেই আমরা আমাদের কাজ শেষ করে ফেলেছি।`,
    image: null,
    options: [
      `We finish our work before the sun rises.`,
      `We have finished our work before the sun rises.`,
      `We had finished our work before the sun rose.`,
      `We are finishing our work before the sun rises.`
    ],
    correct: 2
  },
  {
    id: 26,
    question: `সে কি ইদানিং নিয়মিত পড়াশোনা করছে?`,
    image: null,
    options: [
      `Does he study regularly nowadays?`,
      `Is he studying regularly nowadays?`,
      `Has he studied regularly nowadays?`,
      `Is he studied regularly nowadays?`
    ],
    correct: 1
  },
  {
    id: 27,
    question: `গাছটিতে নতুন পাতা গজিয়েছে।`,
    image: null,
    options: [
      `New leaves grow on the tree.`,
      `New leaves are growing on the tree.`,
      `New leaves have sprouted on the tree.`,
      `New leaves had sprouted on the tree.`
    ],
    correct: 2
  },
  {
    id: 28,
    question: `অভিজ্ঞতা মানুষকে বিচক্ষণ করে তোলে।`,
    image: null,
    options: [
      `Experience makes a man wise.`,
      `Experience is making a man wise.`,
      `Experience has made a man wise.`,
      `Experience made a man wise.`
    ],
    correct: 0
  },
  {
    id: 29,
    question: `তারা গত তিন বছর ধরে এই প্রতিষ্ঠানে কাজ করছে।`,
    image: null,
    options: [
      `They are working in this institution for three years.`,
      `They have worked in this institution for three years.`,
      `They have been working in this institution for three years.`,
      `They work in this institution for three years.`
    ],
    correct: 2
  },
  {
    id: 30,
    question: `সততাই সর্বোত্তম পন্থা---এ কথাটি সর্বজনবিদিত।`,
    image: null,
    options: [
      `Honesty is the best policy---this is universally known.`,
      `Honesty is being the best policy---this is universally known.`,
      `Honesty has been the best policy---this was universally known.`,
      `Honesty was the best policy---this is universally known.`
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
