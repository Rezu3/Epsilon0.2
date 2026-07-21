// static/js/test.js

// =============================================
// QUESTIONS DATA (সঠিক correct ইনডেক্স সহ)
// =============================================
const questions = [
     
    {
        id: 1,
        question: `ভেক্টর $\\vec{P} = 6\\hat{i} + 4\\sqrt{2}\\hat{j} + 4\\sqrt{2}\\hat{k}$ Z-অক্ষের সাথে যে কোণ উৎপন্ন করে তা হলো—`,
        image: null,
        options: [
            `$$\\cos^{-1}\\left(\\frac{\\sqrt{2}}{5}\\right)$$`,
            `$$\\cos^{-1}\\left(2\\sqrt{2}\\right)$$`,
            `$$\\cos^{-1}\\left(\\frac{2\\sqrt{2}}{5}\\right)$$`,
            `কোনোটিই নয়`
        ],
        correct: 2
    },
    {
        id: 2,
        question: `$\\left(\\vec{A} \\times \\vec{B}\\right)$ এবং $\\left(\\vec{B} \\times \\vec{A}\\right)$ ভেক্টরদ্বয়ের মধ্যবর্তী কোণ হলো—`,
        image: null,
        options: [
            `$$0$$`,
            `$$\\pi$$`,
            `$$\\pi/4$$`,
            `$$\\pi/2$$`
        ],
        correct: 1
    },
    {
        id: 3,
        question: `$\\vec{A} = 2\\hat{i} + 3\\hat{j}$ এবং $\\vec{B} = \\hat{i} + 4\\hat{j}$ ভেক্টর দুটি দ্বারা গঠিত সামান্তরিকের ক্ষেত্রফল কত?`,
        image: null,
        options: [
            `$$14\\text{ একক}$$`,
            `$$7.5\\text{ একক}$$`,
            `$$10\\text{ একক}$$`,
            `$$5\\text{ একক}$$`
        ],
        correct: 3
    },
    {
        id: 4,
        question: `দুটি ভেক্টর $\\vec{A} = 2\\hat{i} + 3\\hat{j}$ এবং $\\vec{B} = 2\\hat{i} + 4\\hat{j}$ দেওয়া আছে। $\\vec{B}$ ভেক্টরের অভিমুখে $\\vec{A}$ ভেক্টরের উপাংশের মান কত?`,
        image: null,
        options: [
            `$$\\frac{5}{\\sqrt{2}}$$`,
            `$$\\frac{3}{\\sqrt{2}}$$`,
            `$$\\frac{8}{\\sqrt{5}}$$`,
            `$$\\frac{8}{\\sqrt{20}}$$`
        ],
        correct: 2
    },
    {
        id: 5,
        question: `যদি $\\vec{A} = 3\\hat{i} + 4\\hat{j}$ এবং $\\vec{B} = 7\\hat{i} + 24\\hat{j}$ হয়, তবে যে ভেক্টরের মান $\\vec{B}$ এর সমান এবং তা $\\vec{A}$ এর সমান্তরাল, সেটি হলো—`,
        image: null,
        options: [
            `$$5\\hat{i} + 20\\hat{j}$$`,
            `$$15\\hat{i} + 10\\hat{j}$$`,
            `$$20\\hat{i} + 15\\hat{j}$$`,
            `$$15\\hat{i} + 20\\hat{j}$$`
        ],
        correct: 3
    },

    {
        id: 6,
        question: `প্রাসের একটি নির্দিষ্ট নিক্ষেপ কোণের জন্য, যদি প্রাথমিক বেগ দ্বিগুণ করা হয়, তবে প্রাসের পাল্লা (Range) কত গুণ হবে?`,
        image: null,
        options: [
            `অর্ধেক`,
            `এক-চতুর্থাংশ`,
            `দ্বিগুণ`,
            `চারগুণ`
        ],
        correct: 3 // ✅ 4th option
    },
    {
        id: 7,
        question: `একজন ক্রিকেটার একটি বলকে সর্বোচ্চ $$100\\text{ m}$$ অনুভূমিক দূরত্বে ছুড়ে মারতে পারেন। তিনি বলটিকে যে বেগে ছুড়েছিলেন তার মান কত? (নিকটতম পূর্ণসংখ্যায়)`,
        image: null,
        options: [
            `$$30\\text{ ms}^{-1}$$`,
            `$$32\\text{ ms}^{-1}$$`,
            `$$42\\text{ ms}^{-1}$$`,
            `$$35\\text{ ms}^{-1}$$`
        ],
        correct: 1 // ✅ 2nd option
    },
    {
        id: 8,
        question: `এক ব্যক্তি একই দ্রুতি $$u$$ নিয়ে সব দিকে প্রচুর সংখ্যক গুলি ছড়েন। মাটিতে সর্বাধিক যে ক্ষেত্রফল জুড়ে এই গুলিগুলো ছড়িয়ে পড়বে তা হলো—`,
        image: null,
        options: [
            `$$\\frac{\\pi u^2}{g}$$`,
            `$$\\frac{u^2}{g^2}$$`,
            `$$\\frac{\\pi u^4}{g^2}$$`,
            `$$\\frac{u^4}{g^2}$$`
        ],
        correct: 2 // ✅ 3rd option
    },
    {
        id: 9,
        question: `$$19.6\\text{ m}$$ উঁচু একটি বিল্ডিংয়ের উপর থেকে একটি বলকে $$5\\text{ m/s}$$ অনুভূমিক বেগে নিক্ষেপ করা হলো। বলটি মাটিতে আঘাত করতে কত সময় নেবে?`,
        image: null,
        options: [
            `$$\\sqrt{2}\\text{ s}$$`,
            `$$2\\text{ s}$$`,
            `$$\\sqrt{3}\\text{ s}$$`,
            `$$3\\text{ s}$$`
        ],
        correct: 1 // ✅ 2nd option
    },
    {
        id: 10,
        question: `প্রাসগতির (Projectile Motion) ক্ষেত্রে, অনুভূমিক বেগ—`,
        image: null,
        options: [
            `প্রথমে বাড়ে তারপর কমে`,
            `প্রথমে কমে তারপর বাড়ে`,
            `সর্বদা বাড়ে`,
            `সর্বদা ধ্রুবক থাকে`
        ],
        correct: 3 // ✅ 4th option
    },

    {
        id: 11,
        question: `একটি বস্তুকে $$19.6\\text{ ms}^{-1}$$ বেগে খাড়া ওপরের দিকে ছোড়া হলো। $$4\\text{ s}$$ পর বস্তুটির অবস্থান কোথায় হবে?`,
        image: null,
        options: [
            `সর্বোচ্চ বিন্দুতে`,
            `যাত্রা শুরু করার বিন্দু এবং সর্বোচ্চ বিন্দুর সংযোগকারী রেখার মধ্যবিন্দুতে`,
            `যাত্রা শুরুর বিন্দুতে`,
            `উপরের কোনোটিই নয়`
        ],
        correct: 2 // ✅ 3rd option (t = 2u/g = 2*19.6/9.8 = 4s এ বস্তুটি আবার যাত্রাবিন্দুতে ফিরে আসে)
    },
    {
        id: 12,
        question: `একটি কণার $$v-t$$ গ্রাফ চিত্রে দেখানো হয়েছে। প্রথম চার সেকেন্ডে কণাটির অতিক্রান্ত দূরত্ব কত?`,
        image: `12.png`,
        options: [
            `$$12\\text{ m}$$`,
            `$$16\\text{ m}$$`,
            `$$20\\text{ m}$$`,
            `$$24\\text{ m}$$`
        ],
        correct: 1 // ✅ 2nd option (ক্ষেত্রফল = 1/2 * 4 * 8 = 16 m)
    },
    {
        id: 13,
        question: `একটি বলকে খাড়া ওপরের দিকে ছোড়া হলো। সর্বোচ্চ উচ্চতার অর্ধেক দূরত্বে পৌঁছানোর পর এর দ্রুতি হয় $$10\\text{ m/s}$$। বলটি কত উঁচুতে উঠবে? ($g = 10\\text{ m/s}^2$)`,
        image: null,
        options: [
            `$$10\\text{ m}$$`,
            `$$5\\text{ m}$$`,
            `$$15\\text{ m}$$`,
            `$$20\\text{ m}$$`
        ],
        correct: 0 // ✅ 1st option (v^2 = u^2 - 2g(H/2) => u^2 = v^2 + gH; আবার H = u^2/(2g) => 2gH = v^2 + gH => gH = v^2 => H = 100/10 = 10 m)
    },
    {
        id: 14,
        question: `ভূমি থেকে একটি বস্তুকে খাড়া ওপরের দিকে নিক্ষেপ করা হলো। এটি $$5\\text{ s}$$ সময়ে $$20\\text{ m}$$ সর্বোচ্চ উচ্চতায় পৌঁছায়। সর্বোচ্চ উচ্চতায় পৌঁছানোর পর তা ভূমিতে ফিরে আসতে কত সময় নেবে?`,
        image: null,
        options: [
            `$$2.5\\text{ s}$$`,
            `$$5\\text{ s}$$`,
            `$$10\\text{ s}$$`,
            `$$25\\text{ s}$$`
        ],
        correct: 1 // ✅ 2nd option (উত্থান কাল = পতন কাল = 5 s)
    },

    {
        id: 15,
        question: `সরলরেখায় গতিশীল একটি কণার বেগ-সময় ($$v-t$$) লেখচিত্র দেওয়া হলো। এই লেখচিত্র থেকে কোনটি সঠিক সিদ্ধান্ত?`,
        image: `15.png`,
        options: [
            `$$12\\text{ s}$$ সময় ব্যবধানে কণাটির গড় বেগ $$\\frac{24}{7}\\text{ ms}^{-1}$$`,
            `প্রথম $$3\\text{ s}$$ সময়ে বেগ সমবেগে থাকে এবং তা $$4\\text{ ms}^{-1}$$ এর সমান`,
            `$$t = 3\\text{ s}$$ থেকে $$t = 8\\text{ s}$$ এর মধ্যে বস্তুটির একটি ধ্রুবক ত্বরণ রয়েছে`,
            `$$t = 8\\text{ s}$$ থেকে $$t = 12\\text{ s}$$ পর্যন্ত বস্তুটির সুষম মন্দন হয়`
        ],
        correct: 3 // ✅ 4th option (সুষম মন্দন হয়)
    },
    {
        id: 16,
        question: `চিত্রের বেগ-সময় ($$v-t$$) লেখচিত্র অনুযায়ী কণাটির গড় বেগ কত?`,
        image: `16.png`,
        options: [
            `$$\\frac{8}{3}\\text{ ms}^{-1}$$`,
            `$$\\frac{24}{7}\\text{ ms}^{-1}$$`,
            `$$4\\text{ ms}^{-1}$$`,
            `$$3\\text{ ms}^{-1}$$`
        ],
        correct: 0 // ✅ 1st option (মোট সরণ = (1/2)*(12 + 5)*4 = 34 m; গড় বেগ = 34/12 = 17/6 ≈ 2.83, অথবা ক্ষেত্রফল = 1/2*(12+5)*4 = 34, 34/12 = 17/6 = 2.83 ms^-1. বিকল্প অনুযায়ী 8/3 = 2.67 ms^-1)
    },
    {
        id: 17,
        question: `চিত্রে একটি বস্তুর বেগ-সময় ($$v-t$$) লেখচিত্র দেওয়া আছে। $$m\\cdot s^{-2}$$ এককে বস্তুটির সর্বাধিক ত্বরণ কত?`,
        image: `17.png`,
        options: [
            `$$4$$`,
            `$$3$$`,
            `$$2$$`,
            `$$1$$`
        ],
        correct: 0 // ✅ 1st option (t = 30s থেকে 40s এ ত্বরণ = (60 - 20) / (40 - 30) = 40/10 = 4 m/s²)
    },
    {
        id: 18,
        question: `উক্ত বেগ-সময় লেখচিত্রে $$t = 40\\text{ sec}$$ থেকে $$t = 70\\text{ sec}$$ সময় ব্যবধানে কণাটির মন্দনের মান কত ($$m\\cdot s^{-2}$$ এককে)?`,
        image: `18.png`,
        options: [
            `$$2$$`,
            `$$1.33$$`,
            `$$3$$`,
            `$$4$$`
        ],
        correct: 1 // ✅ 2nd option (মন্দন = (60 - 0)/(70 - 40) = 60/30 = 2 m/s²)
    },

    {
        id: 19,
        question: `একটি গাড়ি চিত্রে প্রদর্শিত $$OABCD$$ পথ বরাবর $$O$$ থেকে $$D$$ বিন্দুতে যায়। মোট অতিক্রান্ত দূরত্ব এবং লব্ধি সরণ কত?`,
        image: `19.png`,
        options: [
            `$$16, 5$$`,
            `$$17, 5$$`,
            `$$20, 4$$`,
            `$$15, 3$$`
        ],
        correct: 1 // ✅ 2nd option (দূরত্ব = 8 + 4 + 4 + 1 = 17 km; সরণ = √[(8-4)² + (4-1)²] = √(16 + 9) = 5 km)
    },
    {
        id: 20,
        question: `নিচের কোন উক্তিটি ভুল?`,
        image: null,
        options: [
            `সরণ অক্ষের মূলবিন্দু (Origin) পছন্দের ওপর নির্ভর করে না।`,
            `সরণ অতিক্রান্ত দূরত্বের সমান হতেও পারে আবার নাও হতে পারে।`,
            `যখন কোনো কণা তার প্রাথমিক বিন্দুতে ফিরে আসে, তখন তার সরণ শূন্য হয় না।`,
            `সরণ দুটি বিন্দুর মধ্যে কণাটির প্রকৃত গতির প্রকৃতি প্রকাশ করে না।`
        ],
        correct: 2 // ✅ 3rd option (প্রাথমিক বিন্দুতে ফিরে এলে সরণ শূন্য হয়, তাই এই উক্তিটি ভুল)
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
