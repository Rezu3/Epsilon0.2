const questions = [
    {
        id: 1,
        question: `$5\\text{ kg}$ ভরের একটি বস্তুকে $20\\text{ N}$ বল দ্বারা ঠেলা হচ্ছে। যদি ঘর্ষণ বল $5\\text{ N}$ হয়, তবে বস্তুর ত্বরণ কত?`,
        image: null,
        options: [
            `$2\\text{ ms}^{-2}$`,
            `$3\\text{ ms}^{-2}$`,
            `$4\\text{ ms}^{-2}$`,
            `$5\\text{ ms}^{-2}$`
        ],
        correct: 1
    },
    {
        id: 2,
        question: `কোনো বস্তুর ভরবেগ $10\\%$ বৃদ্ধি পেলে গতিশক্তি কত শতাংশ বৃদ্ধি পাবে?`,
        image: null,
        options: [
            `$10\\%$`,
            `$20\\%$`,
            `$21\\%$`,
            `$100\\%$`
        ],
        correct: 2
    },
     {
        id: 3,
        question: `যদি $z = x - iy$ এবং $z^{\\frac{1}{3}} = p + iq$ হয়, তবে $\\frac{\\frac{x}{p} + \\frac{y}{q}}{p^2+q^2}$-এর মান হবে –`,
        image: null,
        options: [
            `$2$`,
            `$-1$`,
            `$1$`,
            `$-2$`
        ],
        correct: 3
    },
    {
        id: 4,
        question: `$1000\\text{ kg}$ ভরের একটি গাড়ি $20\\text{ ms}^{-1}$ বেগে চলছে। $2000\\text{ N}$ ব্রেক বল প্রয়োগ করলে গাড়িটি থামতে কত দূরত্ব অতিক্রম করবে?`,
        image: null,
        options: [
            `$50\\text{ m}$`,
            `$100\\text{ m}$`,
            `$200\\text{ m}$`,
            `$400\\text{ m}$`
        ],
        correct: 1
    },
    {
        id: 5,
        question: `নিউটনের তৃতীয় সূত্র অনুযায়ী ক্রিয়া ও প্রতিক্রিয়া বল —`,
        image: null,
        options: [
            `একই বস্তুর ওপর কাজ করে`,
            `সর্বদা সমান ও বিপরীতমুখী`,
            `বিভিন্ন বস্তুর ওপর কাজ করে`,
            `(b) ও (c) উভয়ই সত্য`
        ],
        correct: 3
    },
    {
        id: 6,
        question: `$m_1$ ও $m_2$ ভরের দুটি বস্তু একটি হালকা সুতার সাহায্যে ঘর্ষণহীন কপিকলের ওপর দিয়ে ঝুলছে। সুতার টান কত?`,
        image: "q6.png",
        options: [
            `$\\frac{2m_1m_2g}{m_1+m_2}$`,
            `$\\frac{m_1m_2g}{m_1+m_2}$`,
            `$(m_1+m_2)g$`,
            `$(m_1-m_2)g$`
        ],
        correct: 0
    },
    {
        id: 7,
        question: `$2\\text{ kg}$ ভরের একটি বল $10\\text{ ms}^{-1}$ বেগে দেয়ালে লম্বভাবে আঘাত করে $5\\text{ ms}^{-1}$ বেগে ফিরে আসে। বল কর্তৃক প্রযুক্ত ঘাত কত?`,
        image: null,
        options: [
            `$10\\text{ Ns}$`,
            `$20\\text{ Ns}$`,
            `$30\\text{ Ns}$`,
            `$40\\text{ Ns}$`
        ],
        correct: 2
    },
    {
        id: 8,
        question: `একটি রকেট প্রতি সেকেন্ডে $100\\text{ kg}$ গ্যাস $500\\text{ ms}^{-1}$ বেগে নির্গত করে। রকেটের ওপর প্রযুক্ত বল কত?`,
        image: null,
        options: [
            `$50000\\text{ N}$`,
            `$5000\\text{ N}$`,
            `$500\\text{ N}$`,
            `$50\\text{ N}$`
        ],
        correct: 0
    },
    {
        id: 9,
        question: `$\\mu$ ঘর্ষণ গুণাঙ্ক যুক্ত আনুভূমিক তলে $m$ ভরের একটি বস্তুকে $F$ বলে টানা হচ্ছে। বস্তুটি না সরার শর্ত কী?`,
        image: null,
        options: [
            `$F < \\mu mg$`,
            `$F > \\mu mg$`,
            `$F = \\mu mg$`,
            `$F = mg$`
        ],
        correct: 0
    },
    {
        id: 10,
        question: `$10\\text{ kg}$ ভরের একটি বস্তুকে খাড়া উপরের দিকে $100\\text{ N}$ বল দিয়ে তোলা হচ্ছে। বস্তুর ত্বরণ কত? $g = 10\\text{ ms}^{-2}$`,
        image: null,
        options: [
            `$0\\text{ ms}^{-2}$`,
            `$5\\text{ ms}^{-2}$`,
            `$10\\text{ ms}^{-2}$`,
            `$20\\text{ ms}^{-2}$`
        ],
        correct: 0
    },
    {
        id: 11,
        question: `কোনো বস্তুর ওপর ক্রিয়াশীল বল শূন্য হলে, বস্তুটি —`,
        image: null,
        options: [
            `সর্বদা স্থির থাকবে`,
            `সর্বদা সমবেগে চলবে`,
            `স্থির থাকবে অথবা সমবেগে চলবে`,
            `ত্বরিত হবে`
        ],
        correct: 2
    },
    {
        id: 12,
        question: `তিনটি ব্লক $m_1=10\\text{ kg}, m_2=6\\text{ kg}, m_3=4\\text{ kg}$ একটি মসৃণ তলের উপর রাখা আছে। $40\\text{ N}$ বল দিয়ে টানা হলে $m_1$ ও $m_2$ এর মধ্যবর্তী টান কত?`,
        image: "q12.png",
        options: [
            `$40\\text{ N}$`,
            `$30\\text{ N}$`,
            `$20\\text{ N}$`,
            `$10\\text{ N}$`
        ],
        correct: 2
    },
    {
        id: 13,
        question: `একটি বন্দুক থেকে $0.01\\text{ kg}$ ভরের গুলি $100\\text{ ms}^{-1}$ বেগে ছোড়া হয়। বন্দুকের ভর $5\\text{ kg}$ হলে বন্দুকের পশ্চাদ্বেগ কত?`,
        image: null,
        options: [
            `$0.1\\text{ ms}^{-1}$`,
            `$0.2\\text{ ms}^{-1}$`,
            `$0.5\\text{ ms}^{-1}$`,
            `$1\\text{ ms}^{-1}$`
        ],
        correct: 1
    },
    {
        id: 14,
        question: `$60^\\circ$ কোণে আনত একটি মসৃণ তল বরাবর $m$ ভরের একটি বস্তু গড়িয়ে পড়ছে। বস্তুর ত্বরণ কত?`,
        image: null,
        options: [
            `$g$`,
            `$\\frac{g}{2}$`,
            `$\\frac{\\sqrt{3}g}{2}$`,
            `$\\frac{g}{\\sqrt{2}}$`
        ],
        correct: 1
    },
    {
        id: 15,
        question: `$F = kt$ বল $t=0$ সময়ে স্থির থাকা $m$ ভরের বস্তুর ওপর প্রযুক্ত হলে $t$ সময়ে বস্তুর বেগ কত হবে?`,
        image: null,
        options: [
            `$\\frac{kt}{m}$`,
            `$\\frac{kt^2}{2m}$`,
            `$\\frac{kt^2}{m}$`,
            `$\\frac{2kt}{m}$`
        ],
        correct: 1
    },
    {
        id: 16,
        question: `একটি লোক $500\\text{ N}$ ওজন নিয়ে লিফটে দাঁড়িয়ে আছে। লিফট $2\\text{ ms}^{-2}$ ত্বরণে উপরে উঠলে লোকটির আপাত ওজন কত? $g = 10\\text{ ms}^{-2}$`,
        image: null,
        options: [
            `$400\\text{ N}$`,
            `$500\\text{ N}$`,
            `$600\\text{ N}$`,
            `$700\\text{ N}$`
        ],
        correct: 2
    },
    {
        id: 17,
        question: `বল এবং সময়ের লেখচিত্র দেওয়া আছে। $0$ থেকে $4\\text{ s}$ সময়ে ভরবেগের পরিবর্তন কত?`,
        image: "q17.png",
        options: [
            `$6\\text{ Ns}$`,
            `$12\\text{ Ns}$`,
            `$18\\text{ Ns}$`,
            `$24\\text{ Ns}$`
        ],
        correct: 1
    },
    {
        id: 18,
        question: `$5\\text{ kg}$ ভরের একটি বস্তুকে $30^\\circ$ কোণে আনত $10\\text{ m}$ লম্বা মসৃণ তলের উপর থেকে ছেড়ে দেওয়া হলো। নিচে পৌঁছাতে কত সময় লাগবে?`,
        image: null,
        options: [
            `$1\\text{ s}$`,
            `$2\\text{ s}$`,
            `$3\\text{ s}$`,
            `$4\\text{ s}$`
        ],
        correct: 1
    },
    {
        id: 19,
        question: `নিউটনের প্রথম সূত্রকে বলা হয় —`,
        image: null,
        options: [
            `বলের সূত্র`,
            `ত্বরণের সূত্র`,
            `জড়তার সূত্র`,
            `ভরবেগের সূত্র`
        ],
        correct: 2
    },
    {
        id: 20,
        question: `$m$ ভরের একটি বস্তুকে $v$ বেগে উপরে ছোড়া হলো। সর্বোচ্চ উচ্চতায় বস্তুর ওপর ক্রিয়াশীল বল কত?`,
        image: null,
        options: [
            `$0$`,
            `$mg$`,
            `$mv$`,
            `$mv^2$`
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

