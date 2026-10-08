const questions = [
  // ================= Life Science (Chapter 1-5) — ১৫টি =================
  {
    id: 1,
    question: `পাঁচ রাজ্য শ্রেণীবিন্যাস কে প্রবর্তন করেন?`,
    image: null,
    options: [`লিনিয়াস`, `হোইটেকার`, `ডারউইন`, `ল্যামার্ক`],
    correct: 1
  },
  {
    id: 2,
    question: `দ্বিপদ নামকরণের জনক কাকে বলা হয়?`,
    image: null,
    options: [`ক্যারোলাস লিনিয়াস`, `আরিস্টটল`, `রবার্ট হুক`, `বেন্থাম ও হুকার`],
    correct: 0
  },
  {
    id: 3,
    question: `টেক্সোনমির ক্ষুদ্রতম একক কোনটি?`,
    image: null,
    options: [`গণ`, `প্রজাতি`, `গোত্র`, `বর্গ`],
    correct: 1
  },
  {
    id: 4,
    question: `নিচের কোনটি অপুষ্পক ও ভাস্কুলার কলাযুক্ত উদ্ভিদ?`,
    image: null,
    options: [`শেওলা`, `ছত্রাক`, `ফার্ন`, `মশ`],
    correct: 2
  },
  {
    id: 5,
    question: `টিউব ফিট (Tube feet) কোন পর্বের প্রাণীর গমন অঙ্গ?`,
    image: null,
    options: [`অ্যানিলিডা`, `আর্থ্রোপোডা`, `একাইনোডার্মাটা`, `মোলাস্কা`],
    correct: 2
  },
  {
    id: 6,
    question: `সালোকসংশ্লেষে আলোর প্রয়োজন হয় কেন?`,
    image: null,
    options: [
      `তাপ উৎপাদনের জন্য`,
      `পত্ররন্ধ্র খোলার জন্য`,
      `$\\text{H}_2$ উৎপাদনের জন্য`,
      `জলের ফটোলাইসিসের জন্য`
    ],
    correct: 3
  },
  {
    id: 7,
    question: `উদ্ভিদে জল পরিবহন কার মাধ্যমে ঘটে?`,
    image: null,
    options: [`জাইলেম`, `ফ্লোয়েম`, `উভয়`, `কোনোটিই নয়`],
    correct: 0
  },
  {
    id: 8,
    question: `ট্রাকিয়া কোন প্রাণীর শ্বাসঅঙ্গ?`,
    image: null,
    options: [`কেঁচো`, `অ্যামিবা`, `ফড়িং`, `বাদুড়`],
    correct: 2
  },
  {
    id: 9,
    question: `শ্বসন প্রক্রিয়ায় কয় অণু $ATP$ উৎপন্ন হয় (সবাত শ্বসনে)?`,
    image: null,
    options: [`$30$ অণু`, `$38$ অণু`, `$2$ অণু`, `$12$ অণু`],
    correct: 1
  },
  {
    id: 10,
    question: `হৃৎপিণ্ডের স্বাভাবিক পেসমেকার কোনটি?`,
    image: null,
    options: [`$AV$ নোড`, `$SA$ নোড`, `হিজের বান্ডিল`, `পুরকিঞ্জি তন্তু`],
    correct: 1
  },
  {
    id: 11,
    question: `বৃক্কের গাঠনিক ও কার্যগত একক কী?`,
    image: null,
    options: [`নিউরণ`, `নেফ্রন`, `সাইটন`, `অ্যাক্সন`],
    correct: 1
  },
  {
    id: 12,
    question: `রক্তে হিমোগ্লোবিন গঠনে সাহায্য করে কোন খনিজ উপাদানটি?`,
    image: null,
    options: [`ক্যালশিয়াম`, `লোহা $(\\text{Fe})$`, `সোডিয়াম`, `পটাশিয়াম`],
    correct: 1
  },
  {
    id: 13,
    question: `কোন অঙ্গাণুকে আত্মঘাতী থলি (Suicidal bag) বলা হয়?`,
    image: null,
    options: [`মাইটোকন্ড্রিয়া`, `লাইসোজোম`, `রাইবোজোম`, `কোষপ্রাচীর`],
    correct: 1
  },
  {
    id: 14,
    question: `রিকেট রোগ হয় কোন ভিটামিনের অভাবে?`,
    image: null,
    options: [`$\\text{Vitamin A}$`, `$\\text{Vitamin B}$`, `$\\text{Vitamin C}$`, `$\\text{Vitamin D}$`],
    correct: 3
  },
  {
    id: 15,
    question: `মানবদেহের দীর্ঘতম কোশ কোনটি?`,
    image: null,
    options: [`পেশিকোশ`, `স্নায়ুকোশ (নিউরণ)`, `যকৃৎ কোশ`, `লোহিত রক্তকণিকা`],
    correct: 1
  },

  // ================= Physical Science (Chapter 1-3) — ১০টি =================
  {
    id: 16,
    question: `দৈর্ঘ্যের $SI$ একক কী?`,
    image: null,
    options: [`সেন্টিমিটার`, `মিটার`, `কিলোমিটার`, `ইঞ্চি`],
    correct: 1
  },
  {
    id: 17,
    question: `কাজের $SI$ একক কী?`,
    image: null,
    options: [`জুল`, `ওয়াট`, `নিউটন`, `আর্গ`],
    correct: 0
  },
  {
    id: 18,
    question: `একটি কণা $r$ ব্যাসার্ধের বৃত্তাকার পথের অর্ধেক পথ অতিক্রম করলে কণাটির সরণ কত হবে?`,
    image: null,
    options: [`$\\pi r$`, `$2r$`, `শূন্য`, `$2\\pi r$`],
    correct: 1
  },
  {
    id: 19,
    question: `নিউটনের কোন গতিসূত্র থেকে বলের পরিমাপ বা মান পাওয়া যায়?`,
    image: null,
    options: [`প্রথম গতিসূত্র`, `দ্বিতীয় গতিসূত্র`, `তৃতীয় গতিসূত্র`, `মহাকর্ষ সূত্র`],
    correct: 1
  },
  {
    id: 20,
    question: `রকেটের উৎক্ষেপণ বা গতি নিচের কোন সংরক্ষণ নীতির ওপর ভিত্তি করে কাজ করে?`,
    image: null,
    options: [
      `শক্তি সংরক্ষণ`,
      `রৈখিক ভরবেগ সংরক্ষণ`,
      `কৌণিক ভরবেগ সংরক্ষণ`,
      `ভর সংরক্ষণ`
    ],
    correct: 1
  },
  {
    id: 21,
    question: `$SI$ পদ্ধতিতে চাপের একক কী?`,
    image: null,
    options: [
      `$\\text{N/m}$`,
      `$\\text{N/m}^2$ বা পাসকাল $(\\text{Pa})$`,
      `ডাইন/$\\text{cm}^2$`,
      `জুল`
    ],
    correct: 1
  },
  {
    id: 22,
    question: `$h$ গভীরতায় $\\rho$ ঘনত্বের তরলের অভ্যন্তরীণ চাপের রাশিমালা কোনটি?`,
    image: null,
    options: [
      `$P = h\\rho$`,
      `$P = \\dfrac{h\\rho}{g}$`,
      `$P = h\\rho g$`,
      `$P = \\dfrac{hg}{\\rho}$`
    ],
    correct: 2
  },
  {
    id: 23,
    question: `হাইড্রোলিক প্রেস কোন সূত্রের ওপর ভিত্তি করে কাজ করে?`,
    image: null,
    options: [
      `আর্কিমিডিসের নীতি`,
      `বারনৌলির নীতি`,
      `পাস্কালের সূত্র`,
      `হুকের সূত্র`
    ],
    correct: 2
  },
  {
    id: 24,
    question: `বৃষ্টির ফোঁটা গোলাকার আকার ধারণ করার মূল কারণ কী?`,
    image: null,
    options: [`সান্দ্রতা`, `প্লবতা`, `পৃষ্ঠটান`, `স্থিতিস্থাপকতা`],
    correct: 2
  },
  {
    id: 25,
    question: `তাপ সঞ্চালনের পদ্ধতি কতটি?`,
    image: null,
    options: [`$3$টি`, `$2$টি`, `$4$টি`, `$5$টি`],
    correct: 0
  },

  // ============ English, অঙ্ক, GK, Logical Reasoning — ১৫টি ============
  {
    id: 26,
    question: `He gave me ______ one-rupee note.`,
    image: null,
    options: [`a`, `an`, `the`, `no article`],
    correct: 0
  },
  {
    id: 27,
    question: `He is senior ______ me in service.`,
    image: null,
    options: [`than`, `to`, `from`, `with`],
    correct: 1
  },
  {
    id: 28,
    question: `The patient passed ______ last night.`,
    image: null,
    options: [`away`, `out`, `by`, `off`],
    correct: 0
  },
  {
    id: 29,
    question: `He plays football. (Change the voice)`,
    image: null,
    options: [
      `Football was played by him.`,
      `Football is played by him.`,
      `Football has been played by him.`,
      `Football played by him.`
    ],
    correct: 1
  },
  {
    id: 30,
    question: `He said, "I am busy now." (Direct to Indirect)`,
    image: null,
    options: [
      `He said that he was busy then.`,
      `He said that I was busy then.`,
      `He said that he is busy now.`,
      `He said that he had been busy then.`
    ],
    correct: 0
  },
  {
    id: 31,
    question: `Synonym of 'ABANDON'`,
    image: null,
    options: [`Forsake`, `Keep`, `Adopt`, `Cherish`],
    correct: 0
  },
  {
    id: 32,
    question: `Antonym of 'ANCIENT'`,
    image: null,
    options: [`Modern`, `Old`, `Past`, `Historical`],
    correct: 0
  },
  {
    id: 33,
    question: `One who believes in God:`,
    image: null,
    options: [`Theist`, `Atheist`, `Agostic`, `Apostate`],
    correct: 0
  },
  {
    id: 34,
    question: `একটি জিনিসের ক্রয়মূল্য $250$ টাকা এবং বিক্রয়মূল্য $300$ টাকা হলে, শতকরা লাভের হার কত?`,
    image: null,
    options: [`$15\\%$`, `$20\\%$`, `$25\\%$`, `$30\\%$`],
    correct: 1
  },
  {
    id: 35,
    question: `বার্ষিক $5\\%$ সরল সুদে $1000$ টাকার $3$ বছরের সুদ কত হবে?`,
    image: null,
    options: [`$100$ টাকা`, `$150$ টাকা`, `$200$ টাকা`, `$120$ টাকা`],
    correct: 1
  },
  {
    id: 36,
    question: `মৌর্য বংশের প্রতিষ্ঠাতা কে ছিলেন?`,
    image: null,
    options: [`চন্দ্রগুপ্ত মৌর্য`, `অশোক`, `বিম্বিসার`, `সমুদ্রগুপ্ত`],
    correct: 0
  },
  {
    id: 37,
    question: `ভারতের জাতীয় কংগ্রেস কবে প্রতিষ্ঠিত হয়?`,
    image: null,
    options: [`$1884$`, `$1885$`, `$1886$`, `$1887$`],
    correct: 1
  },
  {
    id: 38,
    question: `অনুক্রমটি পূর্ণ করুন: $2, 4, 8, 16, ?$`,
    image: null,
    options: [`$20$`, `$24$`, `$32$`, `$64$`],
    correct: 2
  },
  {
    id: 39,
    question: `একটি সারিতে $40$ জন ছাত্রের মধ্যে রিমির স্থান বামদিক থেকে $15$তম। ডানদিক থেকে রিমির স্থান কততম?`,
    image: null,
    options: [`$25$তম`, `$26$তম`, `$27$তম`, `$24$তম`],
    correct: 1
  },
  {
    id: 40,
    question: `নিচের কোনটি বাকিদের থেকে আলাদা (Odd one out)?`,
    image: null,
    options: [`হৃদপিণ্ড`, `ফুসফুস`, `যকৃৎ`, `কান`],
    correct: 3
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
