const questions = [
    {
        id: 1,
        question: `নিম্নলিখিত কোনটি সত্য?`,
        image: null,
        options: [
            `$2 + 5i > 1 + 4i$`,
            `$5 + 3i > 6 + 7i$`,
            `$5 + 7i > 5 + 3i$`,
            `এদের কোনটিই নয়`
        ],
        correct: 3
    },
    {
        id: 2,
        question: `$(x, y)$ বাস্তব এবং $x + iy = -i(-2 + 3i)$ হলে, $(x, y)$ হবে –`,
        image: null,
        options: [
            `$(2, -3)$`,
            `$(3, 2)$`,
            `$(-2, 3)$`,
            `$(-3, -2)$`
        ],
        correct: 1
    },
    {
        id: 3,
        question: `যদি $z = x - iy$ এবং $z^{\\frac{1}{3}} = p + iq$ হয়, তবে $\\frac{x}{p} + \\frac{y}{q}$-এর মান হবে –`,
        image: null,
        options: [
            `$2$`,
            `$-1$`,
            `$1$`,
            `$-2$`
        ],
        correct: 0
    },
    {
        id: 4,
        question: `যদি $i^2 = -1$ হয় তবে $\\sum_{n=0}^{225} i^n = $`,
        image: null,
        options: [
            `$0$`,
            `$1 + i$`,
            `$-1$`,
            `$i$`
        ],
        correct: 1
    },
    {
        id: 5,
        question: `যদি $\\frac{1 - i\\alpha}{1 + i\\alpha} = A + iB$ হয়, তবে $A^2 + B^2$-এর মান –`,
        image: null,
        options: [
            `$1$`,
            `$\\alpha$`,
            `$\\alpha^2$`,
            `$-1$`
        ],
        correct: 0
    },
    {
        id: 6,
        question: `যদি $\\frac{z - 2}{z + 2}$ $(z \\neq -2)$ বিশুদ্ধ অবাস্তব সংখ্যা হয়, তবে $|z|$-এর মান –`,
        image: null,
        options: [
            `$4$`,
            `$3$`,
            `$2$`,
            `$1$`
        ],
        correct: 2
    },
    {
        id: 7,
        question: `$k$-এর যে ক্ষুদ্রতম মানের জন্য $x^2 + 5x + k = 0$ সমীকরণটির কাল্পনিক বীজ থাকবে সেটি হলো –`,
        image: null,
        options: [
            `$4$`,
            `$5$`,
            `$6$`,
            `$7$`
        ],
        correct: 3
    },
    {
        id: 8,
        question: `$y^2 - (1 - 2i)y + 1 + 5i = 0$-এর সমাধান হবে –`,
        image: null,
        options: [
            `$(-1 + i), (2 - 3i)$`,
            `$(-1 + i), (2 + 3i)$`,
            `$(-1 + i), (-2 + 3i)$`,
            `$(-1 - i), (-2 - 3i)$`
        ],
        correct: 0
    },
    {
        id: 9,
        question: `$ix^2 - x + 12i = 0$-এর সমাধান হবে –`,
        image: null,
        options: [
            `$4i, -3i$`,
            `$-4i, 3i$`,
            `$4i, 3i$`,
            `$-4i, -3i$`
        ],
        correct: 0
    },
    {
        id: 10,
        question: `$x$ একটি অখণ্ড সংখ্যা হলে $-x^2 + 7x - 6 > 0$ অসমীকরণের সমাধান সেটটি হয় –`,
        image: null,
        options: [
            `\\{2, 4\\}`,
            `\\{3, 5\\}`,
            `\\{2, 3, 4, 5\\}`,
            `\\{4, 5\\}`
        ],
        correct: 2
    },
    {
        id: 11,
        question: `$\\frac{2x+3}{4} + 2 \\le \\frac{1}{4} + \\frac{4x}{3}$, $x \\in \\mathbb{R}$ অসমীকরণটির সমাধান সেট হবে –`,
        image: null,
        options: [
            `$(3, \\infty)$`,
            `$[3, \\infty)$`,
            `$[-3, \\infty)$`,
            `কোনোটিই নয়`
        ],
        correct: 1
    },
    {
        id: 12,
        question: `$\\frac{x+2}{x^2+1} > \\frac{1}{2}$-এর পূর্ণসংখ্যাত সমাধান সংখ্যা হবে –`,
        image: null,
        options: [
            `$3$`,
            `$2$`,
            `$4$`,
            `$0$`
        ],
        correct: 0
    },
    {
        id: 13,
        question: `$5(7x + 5) < 163 + 6(5x + 2)$ এবং $9x - 5 > 2(x + 6)$, $x \\in \\mathbb{R}$ অসমীকরণ দুটির সমাধান সেট –`,
        image: null,
        options: [
            `$(-\\frac{17}{7}, 30)$`,
            `$(\\frac{17}{7}, -30)$`,
            `$(\\frac{17}{7}, 30)$`,
            `$[\\frac{17}{7}, 30]$`
        ],
        correct: 2
    },
    {
        id: 14,
        question: `$\\frac{3}{|x+1|} > 2$ অসমীকরণটির সমাধান সেট –`,
        image: null,
        options: [
            `$[-1, \\frac{7}{3}]$`,
            `$(-\\frac{5}{2}, -1] \\cup (-1, \\frac{1}{2})$`,
            `$(-\\frac{5}{2}, -1) \\cup (-1, \\frac{1}{2})$`,
            `$[-\\frac{3}{2}, \\frac{1}{2}]$`
        ],
        correct: 2
    },
    {
        id: 15,
        question: `$\\frac{|x-1|}{x+2} < 1$ ($x \\neq -2$) অসমীকরণটির সমাধান সেট -`,
        image: null,
        options: [
            `$(-\\infty, -2) \\cup (-\\frac{1}{2}, \\infty)$`,
            `$(-\\infty, -2] \\cup (-\\frac{1}{2}, \\infty)$`,
            `$(-\\infty, -2] \\cup [-\\frac{1}{2}, \\infty)$`,
            `কোনোটিই নয়`
        ],
        correct: 0
    },
    {
        id: 16,
        question: `$|x-2| \\ge |x-4|$ অসমীকরণটির সমাধান সেট –`,
        image: null,
        options: [
            `$[2, \\infty)$`,
            `$(2, \\infty)$`,
            `$[3, \\infty)$`,
            `$(3, \\infty)$`
        ],
        correct: 2
    },
    {
        id: 17,
        question: `$\\frac{|x|+1}{|x|-1} < 0$ অসমীকরণটির সমাধান সেট হবে –`,
        image: null,
        options: [
            `$[-1, 1)$`,
            `$(-1, 1)$`,
            `$[-1, 1]$`,
            `$(-1, 1]$`
        ],
        correct: 1
    },
    {
        id: 18,
        question: `$\\frac{1}{2-|x|} \\ge 1$ ($x \\neq \\pm 2$) অসমীকরণটির সমাধান সেট -`,
        image: null,
        options: [
            `$[-2, -1) \\cup (1, 2]$`,
            `$(-2, -1] \\cup [1, 2)$`,
            `$(-2, -1) \\cup [1, 2)$`,
            `কোনোটিই নয়`
        ],
        correct: 1
    },
    {
        id: 19,
        question: `$\\frac{x}{x-4} > \\frac{1}{3}$ ($x \\neq 4$), $x \\in \\mathbb{R}$ অসমীকরণটির সমাধান সেট হবে –`,
        image: null,
        options: [
            `$(-\\infty, -4) \\cup (2, \\infty)$`,
            `$(-\\infty, -2] \\cup [4, \\infty)$`,
            `$(-\\infty, -2) \\cup (4, \\infty)$`,
            `কোনোটিই নয়`
        ],
        correct: 2
    },
    {
        id: 20,
        question: `$\\frac{x+3}{x-1} \\le 1$ ($x \\neq 1$), $x \\in \\mathbb{R}$ অসমীকরণটির সমাধান সেট হবে –`,
        image: null,
        options: [
            `$[-7, 1)$`,
            `$[-7, 1]$`,
            `$(-7, -1)$`,
            `$[-1, 7)$`
        ],
        correct: 0
    },
    {
        id: 21,
        question: `একটি ত্রিভুজের বাহু তিনটির দৈর্ঘ্য $x$ সেমি, $(2x+1)$ সেমি এবং $(2x-2)$ সেমি। যদি ত্রিভুজটির পরিসীমা কম করে $54$ সেমি হয়, তবে $x$-এর ক্ষুদ্রতম মান কত সেমি?`,
        image: null,
        options: [
            `$10$`,
            `$13$`,
            `$11$`,
            `$12$`
        ],
        correct: 2
    },
    {
        id: 22,
        question: `$x = 2 + 3i$ এবং $y = 2 - 3i$ হলে $\\frac{x^2 + xy + y^2}{x^2 - xy + y^2} = ?$`,
        image: null,
        options: [
            `$\\frac{4}{23}$`,
            `$-\\frac{4}{7}$`,
            `$\\frac{3}{23}$`,
            `$-\\frac{3}{23}$`
        ],
        correct: 3
    },
    {
        id: 23,
        question: `$z_1 = 1 + i\\sqrt{3}$ এবং $z_2 = \\sqrt{3} - i$ হলে $\\arg\\left(\\frac{z_1}{z_2}\\right) \\equiv$`,
        image: null,
        options: [
            `$\\arg(z_1) + \\arg(z_2)$`,
            `$\\arg(z_1) - \\arg(z_2)$`,
            `$\\arg(z_1) + \\arg(z_2) + 2\\pi$`,
            `$\\arg(z_1) + \\arg(z_2) - 2\\pi$`
        ],
        correct: 1
    },
    {
        id: 24,
        question: `$x\\sqrt{2} = 1 + \\sqrt{-1}$ হলে $x^6 + x^4 + x^2 + 2 = $`,
        image: null,
        options: [
            `$0$`,
            `$1$`,
            `$i$`,
            `$-1$`
        ],
        correct: 1
    },
    {
        id: 25,
        question: `$(1 + i)^{-2} - (1 - i)^{-2} = ?$`,
        image: null,
        options: [
            `$-2$`,
            `$i$`,
            `$-4(1+i)$`,
            `$0$`
        ],
        correct: 1
    },
    {
        id: 26,
        question: `$\\frac{2}{1 + \\cos\\theta + i\\sin\\theta}$-এর মডিউলাস হবে –`,
        image: null,
        options: [
            `$\\cos\\frac{\\theta}{2}$`,
            `$\\sec\\frac{\\theta}{2}$`,
            `$\\sin\\frac{\\theta}{2}$`,
            `$\\csc\\frac{\\theta}{2}$`
        ],
        correct: 1
    },
    {
        id: 27,
        question: `$\\omega$, $1$-এর কাল্পনিক ঘনমূল হলে $(3 + \\omega + 3\\omega^2)^4$-এর মান –`,
        image: null,
        options: [
            `$16$`,
            `$160$`,
            `$16\\omega^2$`,
            `কোনোটিই নয়`
        ],
        correct: 2
    },
    {
        id: 28,
        question: `যদি $\\arg(z-a) = \\frac{\\pi}{4}$ হয় যেখানে $a$ একটি বাস্তব সংখ্যা, তাহলে $z$ অবস্থিত হবে –`,
        image: null,
        options: [
            `একটি সরলরেখার ওপর`,
            `অধিবৃত্তের ওপর`,
            `একটি বৃত্তের ওপর`,
            `এদের কোনোটিই নয়`
        ],
        correct: 0
    },
    {
        id: 29,
        question: `জটিল তলে $z$, $iz$ ও $(z + iz)$ জটিল সংখ্যা তিনটি দ্বারা উৎপন্ন ত্রিভুজের ক্ষেত্রফল =`,
        image: null,
        options: [
            `$\\frac{1}{2}|z+iz|$`,
            `$\\frac{1}{2}|z+iz|^2$`,
            `$\\frac{1}{2}|z|$`,
            `$\\frac{1}{2}|z|^2$`
        ],
        correct: 3
    },
    {
        id: 30,
        question: `$|z| + z = 2 + i$ ($z$ একটি জটিল সংখ্যা) হলে, $z = $`,
        image: null,
        options: [
            `$i$`,
            `$\\frac{3}{4} + i$`,
            `$4 + i$`,
            `$\\frac{1}{3} + i$`
        ],
        correct: 1
    },
    {
        id: 31,
        question: `$x, y$ বাস্তব এবং $(x + 3i)$ ও $(-2 + iy)$ জটিল সংখ্যা দুটি পরস্পর অনুবন্ধী হলে $x$ ও $y$-এর মান –`,
        image: null,
        options: [
            `$2, 3$`,
            `$-2, 3$`,
            `$2, -3$`,
            `$-2, -3$`
        ],
        correct: 1
    },
    {
        id: 32,
        question: `যদি $\\arg(z-1) = \\arg(z+3i)$ সমীকরণকে $z = x + iy$ সিদ্ধ করে তবে কোনটি সত্য?`,
        image: null,
        options: [
            `$2(x-1) = y+3$`,
            `$3(y-1) = x$`,
            `$3(x-1) = y$`,
            `$x = 5y$`
        ],
        correct: 2
    },
    {
        id: 33,
        question: `$\\left(\\frac{1-i}{1+i}\\right)^n = 1$ হলে $n$-এর ক্ষুদ্রতম পূর্ণমান –`,
        image: null,
        options: [
            `$1$`,
            `$2$`,
            `$3$`,
            `$4$`
        ],
        correct: 3
    },
    {
        id: 34,
        question: `$z_1, z_2, z_3$ জটিল সংখ্যাগুলি এমন যে $|z_1| = |z_2| = |z_3| = \\left|\\frac{1}{z_1} + \\frac{1}{z_2} + \\frac{1}{z_3}\\right| = 1$, তাহলে $|z_1 + z_2 + z_3| = ?$`,
        image: null,
        options: [
            `$0$`,
            `$1$`,
            `$2$`,
            `$3$`
        ],
        correct: 1
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

