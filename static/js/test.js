// static/js/test.js

// =============================================
// QUESTIONS DATA (সঠিক correct ইনডেক্স সহ)
// =============================================
const questions = [
    {
        id: 1,
        question: `একটি হেলিকপ্টার $360\\text{ km/h}$ অনুভূমিক বেগে $2\\text{ km}$ উচ্চতায় উড়ন্ত অবস্থায় একটি বস্তু ফেলে দেয়। বস্তুটিকে ফেলার ২০ সেকেন্ড পর সেটি মাটিতে $O$ বিন্দুতে আঘাত করে। হেলিকপ্টার থেকে বস্তুটিকে ছাড়ার স্থান থেকে $O$ বিন্দুর সরণ কত? ($g = 10\\text{ m/s}^2$)`,
        image: null,
        options: [
            `$$2\\,\\text{km}$$`,
            `$$\\sqrt{2}\\,\\text{km}$$`,
            `$$4\\,\\text{km}$$`,
            `$$2\\sqrt{2}\\,\\text{km}$$`
        ],
        correct: 0  // ✅ 1st option
    },
    {
        id: 2,
        question: `সরণ ($x$) বনাম সময় ($t$) গ্রাফটি লক্ষ্য করে নিচের বিবৃতিগুলোর মধ্যে কোনগুলো সঠিক তা নির্বাচন করুন।`,
        image: "2.png",
        options: [
            `(A), (B) এবং (C) মাত্র`,
            `(A), (C) এবং (D) মাত্র`,
            `(B), (D) এবং (E) মাত্র`,
            `(C), (D) এবং (E) মাত্র`
        ],
        correct: 1  // ✅ 2nd option
    },
    {
        id: 3,
        question: `দুটি গাড়ি P এবং Q একই অভিমুখে গতিশীল। P-এর ত্বরণ সময়ের সাথে রৈখিকভাবে বৃদ্ধি পায় এবং Q ধ্রুবক ত্বরণে চলে। $t = 0$ সময়ে তারা প্রথমবার একে অপরকে অতিক্রম করে। গাড়ি দুটির সর্বোচ্চ কতবার একে অপরকে অতিক্রম করা সম্ভব ($t = 0$-এর অতিক্রমণসহ)?`,
        image: null,
        options: [
            `$$1\\text{ বার}$$`,
            `$$2\\text{ বার}$$`,
            `$$3\\text{ বার}$$`,
            `$$4\\text{ বার}$$`
        ],
        correct: 2  // ✅ 3rd option
    },
    {
        id: 4,
        question: `স্থির জলে একটি নৌকার সর্বোচ্চ বেগ $27\\text{ km/h}$। নৌকাটি $9\\text{ km/h}$ বেগে প্রবাহিত একটি নদীতে স্রোতের অনুকূলে (downstream) চলছে। নৌকা থেকে এক ব্যক্তি একটি বলকে উলম্বভাবে উপরের দিকে $10\\text{ m/s}$ বেগে ছুঁড়ে দিল। নদীর তীরে স্থির থাকা একজন পর্যবেক্ষকের সাপেক্ষে বলটির পাল্লা (Range) কত হবে? ($g = 10\\text{ m/s}^2$)`,
        image: null,
        options: [
            `$$1000\\,\\text{cm}$$`,
            `$$2000\\,\\text{cm}$$`,
            `$$1500\\,\\text{cm}$$`,
            `$$2500\\,\\text{cm}$$`
        ],
        correct: 1  // ✅ 2nd option
    },
    {
        id: 5,
        question: `একটি বিমানের বেগ-সময় গ্রাফ দেওয়া আছে। প্রথম 30.5 সেকেন্ডে বিমানটি কত দূরত্ব অতিক্রম করবে?`,
        image: "5.png",
        options: [
            `$$2\\,\\text{km}$$`,
            `$$3\\,\\text{km}$$`,
            `$$4\\,\\text{km}$$`,
            `$$5\\,\\text{km}$$`
        ],
        correct: 2  // ✅ 3rd option
    },
    {
        id: 6,
        question: `এক ব্যক্তি সরলরেখা বরাবর $x$ দূরত্ব $v_1$ সুষম বেগে এবং পরবর্তী $\\frac{3}{2}x$ দূরত্ব $v_2$ সুষম বেগে অতিক্রম করে। সমগ্র গতির গড় বেগ $\\frac{50}{7}\\text{ m/s}$। যদি $v_1 = 5\\text{ m/s}$ হয়, তবে $v_2$-এর মান কত?`,
        image: null,
        options: [
            `$$5\\,\\text{m/s}$$`,
            `$$7.5\\,\\text{m/s}$$`,
            `$$10\\,\\text{m/s}$$`,
            `$$15\\,\\text{m/s}$$`
        ],
        correct: 3  // ✅ 4th option
    },
    {
        id: 7,
        question: `সময় $t$ এবং দূরত্ব $x$-এর মধ্যে সম্পর্ক $t = \\alpha x^2 + \\beta x$। ত্বরণ ($a$) এবং বেগ ($v$)-এর মধ্যে সম্পর্কটি কী?`,
        image: null,
        options: [
            `$$a = -2\\alpha v^3$$`,
            `$$a = 2\\alpha v^3$$`,
            `$$a = -2\\beta v^3$$`,
            `$$a = 2\\beta v^2$$`
        ],
        correct: 1  // ✅ 2nd option
    },
    {
        id: 8,
        question: `একটি স্থির লক্ষ্যে ফায়ার করা একটি বুলেট $4\\text{ cm}$ প্রবেশের পর তার বেগের এক-তৃতীয়াংশ ($\\frac{1}{3}$) হারায়। বুলেটটি স্থির অবস্থায় আসার আগে আরও কত দূরত্ব প্রবেশ করবে?`,
        image: null,
        options: [
            `$$32 \\times 10^{-3}\\,\\text{m}$$`,
            `$$40 \\times 10^{-3}\\,\\text{m}$$`,
            `$$16 \\times 10^{-3}\\,\\text{m}$$`,
            `$$24 \\times 10^{-3}\\,\\text{m}$$`
        ],
        correct: 1  // ✅ 2nd option
    },
    {
        id: 9,
        question: `$10\\text{ g}$ ভরের একটি কণা $2x$ মন্দন (retardation) সহ সরলরেখায় চলে। কণাটির গতিশক্তি হ্রাস $(\\frac{10}{x})^{-n}\\text{ J}$ হলে $n$-এর মান কত?`,
        image: null,
        options: [
            `$$1$$`,
            `$$2$$`,
            `$$3$$`,
            `$$4$$`
        ],
        correct: 2  // ✅ 3rd option
    },
    {
        id: 10,
        question: `$20\\text{ m/s}$ বেগে চলমান একটি ট্রেনের চালক স্টেশন থেকে $500\\text{ m}$ দূরে ব্রেক কষলে ট্রেনটি স্টেশনে এসে থামে। যদি ব্রেক অর্ধেক দূরত্বে ($250\\text{ m}$) কষা হতো, তবে ট্রেনটি কত বেগে স্টেশন অতিক্রম করতো? গতিবেগ $\\sqrt{x}\\text{ m/s}$ হলে $x$-এর মান কত?`,
        image: null,
        options: [
            `$$100$$`,
            `$$200$$`,
            `$$250$$`,
            `$$300$$`
        ],
        correct: 2  // ✅ 3rd option
    },
    {
        id: 11,
        question: `একজন জাদুকর (juggler) প্রতি সেকেন্ডে $n$ সংখ্যক বল উলম্বভাবে উপরের দিকে একই বেগে ছোঁড়েন। প্রথম বলটি সর্বোচ্চ উচ্চতায় পৌঁছালে তিনি দ্বিতীয় বলটি ছোঁড়েন। বলগুলোর সর্বোচ্চ উচ্চতা কত হতে পারে?`,
        image: null,
        options: [
            `$$\\frac{g}{n^2}$$`,
            `$$\\frac{g}{2n}$$`,
            `$$\\frac{2g}{n^2}$$`,
            `$$\\frac{g}{2n^2}$$`
        ],
        correct: 3  // ✅ 4th option
    },
    {
        id: 12,
        question: `একটি বুলেটকে $100\\text{ m/s}$ প্রাথমিক বেগে উলম্বভাবে নিচের দিকে ছোঁড়া হলো। ১০ সেকেন্ডে সেটি মাটিতে পৌঁছায় এবং সম্পূর্ণ অস্থিতিস্থাপক সংঘর্ষের কারণে তাৎক্ষণিকভাবে স্থির হয়ে যায়। ২০ সেকেন্ডের জন্য সঠিক বেগ-সময় (v-t) গ্রাফ কোনটি হবে?`,
        image: "12.png",
        options: [
            `গ্রাফ (1)`,
            `গ্রাফ (2)`,
            `গ্রাফ (3)`,
            `গ্রাফ (4)`
        ],
        correct: 0  // ✅ 1st option
    },
    {
        id: 13,
        question: `একটি কণার $v^2$ বনাম সরণ ($x$) গ্রাফ দেওয়া আছে (যেখানে $x=0$ তে $v^2=20$ এবং $x=30$ তে $v^2=80$ একটি সরলরেখা)। কণাটির ত্বরণ কত?`,
        image: "13.png",
        options: [
            `$$0.5\\,\\text{m/s}^2$$`,
            `$$1\\,\\text{m/s}^2$$`,
            `$$1.5\\,\\text{m/s}^2$$`,
            `$$2\\,\\text{m/s}^2$$`
        ],
        correct: 2  // ✅ 3rd option
    },
    {
        id: 14,
        question: `একটি টেনিস বলকে $h$ উচ্চতা থেকে ছেড়ে দেওয়া হলো। কাঠের মেঝেতে ড্রপ খেয়ে এটি $\\frac{h}{2}$ উচ্চতা পর্যন্ত রিবাউন্ড করে। সম্পূর্ণ গতির বেগ বনাম উচ্চতার সঠিক গ্রাফ কোনটি হবে?`,
        image: "14.png",
        options: [
            `গ্রাফ (1)`,
            `গ্রাফ (2)`,
            `গ্রাফ (3)`,
            `গ্রাফ (4)`
        ],
        correct: 2  // ✅ 3rd option
    },
    {
        id: 15,
        question: `A এবং B দুটি ট্রেন যথাক্রমে $36\\text{ km/h}$ এবং $72\\text{ km/h}$ বেগে সমান্তরাল ট্র্যাকে বিপরীত মুখে চলছে। ট্রেন A-এর ভেতরে এক ব্যক্তি ট্রেনের গতির বিপরীত দিকে $1.8\\text{ km/h}$ বেগে হাঁটছেন। ট্রেন B থেকে দেখলে ওই ব্যক্তির আপেক্ষিক বেগ কত হবে?`,
        image: null,
        options: [
            `$$29.5\\,\\text{m/s}$$`,
            `$$30\\,\\text{m/s}$$`,
            `$$106.2\\,\\text{m/s}$$`,
            `$$24.5\\,\\text{m/s}$$`
        ],
        correct: 1  // ✅ 2nd option
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
window.goToQuestion = goToQuestion;
window.updateNavigator = updateNavigator;
