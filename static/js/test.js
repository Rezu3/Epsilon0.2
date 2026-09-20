const questions = [
  {
    id: 1,
    question: `নিচের কোনটি পর্দাশূন্য কোশীয় অঙ্গাণু?`,
    image: null,
    options: [
      `রাইবোজোম`,
      `মাইটোকন্ড্রিয়া`,
      `গলগি বস্তু`,
      `লাইসোজোম`
    ],
    correct: 0
  },
  {
    id: 2,
    question: `বহুস্তরীয় চ্যাপ্টা ছদ্মস্তরীভূত আবরনী কলা (Pseudostratified Epithelium) কোথায় দেখা যায়?`,
    image: null,
    options: [
      `ট্রাকিয়ায়`,
      `পাকস্থলীতে`,
      `হৃদপিণ্ডে`,
      `ত্বকে`
    ],
    correct: 0
  },
  {
    id: 3,
    question: `জাইলেমের একমাত্র সজীব উপাদান কোনটি?`,
    image: null,
    options: [
      `ট্রাকিড`,
      `ট্রাকিয়া`,
      `জাইলেম প্যারেনকাইমা`,
      `জাইলেম তন্তু`
    ],
    correct: 2
  },
  {
    id: 4,
    question: `ফ্লোয়েমের একমাত্র মৃত উপাদান কোনটি?`,
    image: null,
    options: [
      `সিভনল`,
      `সঙ্গীকোশ`,
      `ফ্লোয়েম প্যারেনকাইমা`,
      `ফ্লোয়েম তন্তু (বাস্ট তন্তু)`
    ],
    correct: 3
  },
  {
    id: 5,
    question: `অস্থিতে উপস্থিত প্রোটিনটির নাম কী?`,
    image: null,
    options: [
      `অসিন`,
      `কন্ড্রিন`,
      `মায়োসিন`,
      `অ্যালবুমিন`
    ],
    correct: 0
  },
  {
    id: 6,
    question: `স্নায়ুকোষের কোশদেহকে কী বলা হয়?`,
    image: null,
    options: [
      `অ্যাক্সন`,
      `ডেনড্রন`,
      `সাইটন বা নিউরোসাইটন`,
      `সোয়ান কোশ`
    ],
    correct: 2
  },
  {
    id: 7,
    question: `দেহের তাপমাত্রা নিয়ন্ত্রণ করে মস্তিষ্কের কোন অংশ?`,
    image: null,
    options: [
      `গুরুমস্তিষ্ক`,
      `হাইপোথ্যালামাস`,
      `লঘুমস্তিষ্ক`,
      `মেডুলা অবলংগাটা`
    ],
    correct: 1
  },
  {
    id: 8,
    question: `কোষে $ATP$ অণু গঠনে কোন খনিজ উপাদানটি অপরিহার্য?`,
    image: null,
    options: [
      `ফসফরাস (P)`,
      `সোডিয়াম (Na)`,
      `আয়োডিন (I)`,
      `ক্যালশিয়াম (Ca)`
    ],
    correct: 0
  },
  {
    id: 9,
    question: `নিউট্রোফিলকে ফ্যাকোসাইটোসিসে উদ্বুদ্ধ করে কোনটি?`,
    image: null,
    options: [
      `মেমোরি T-সেল`,
      `অপসোশিন বস্তু`,
      `অ্যাগ্লুটিনেশন`,
      `অ্যান্টিজেন`
    ],
    correct: 1
  },
  {
    id: 10,
    question: `$IgG$ হলো এক ধরনের—`,
    image: null,
    options: [
      `হেপারিন`,
      `হিস্টামিন`,
      `ভিটামিন`,
      `ইমিউনোগ্লোবিউলিন`
    ],
    correct: 3
  },
  {
    id: 11,
    question: `মানবদেহে অ্যালার্জি প্রতিক্রিয়ার জন্য দায়ী অনাক্রম্যতাপ্রোটিন বা ইমিউনোগ্লোবিউলিন কোনটি?`,
    image: null,
    options: [
      `$\\text{IgE}$`,
      `$\\text{IgG}$`,
      `$\\text{IgA}$`,
      `$\\text{IgM}$`
    ],
    correct: 0
  },
  {
    id: 12,
    question: `মশার লালাগ্রন্থিতে ম্যালেরিয়া পরজীবীর কোন দশাটি দেখা যায়?`,
    image: null,
    options: [
      `স্পোরোজয়েট (Sporozoite)`,
      `মেরোজয়েট (Merozoite)`,
      `ট্রোফোজয়েট (Trophozoite)`,
      `গ্যামেটোসাইট (Gametocyte)`
    ],
    correct: 0
  },
  {
    id: 13,
    question: `ক্যান্সার কোষ এক স্থান থেকে সারা দেহে ছড়িয়ে পড়াকে কী বলে?`,
    image: null,
    options: [
      `মেটাস্ট্যাসিস (Metastasis)`,
      `ডায়াপেডেসিস`,
      `ফ্যাগোসাইটোসিস`,
      `প্যাথোজেনেসিস`
    ],
    correct: 0
  },
  {
    id: 14,
    question: `আণবিক কাঁচি (Molecular Scissors) বলা হয় কোন উৎসেচককে?`,
    image: null,
    options: [
      `রেস্ট্রিকশন এন্ডোনিউক্লিয়েজ`,
      `লাইগেজ`,
      `পলিমারেজ`,
      `হেলিকোজ`
    ],
    correct: 0
  },
  {
    id: 15,
    question: `অ্যান্টিবডির ভারী শৃঙ্খলের (Heavy Chain) আণবিক ওজন আনুমানিক কত?`,
    image: null,
    options: [
      `$50,000\\ \\text{Da}$`,
      `$25,000\\ \\text{Da}$`,
      `$10,000\\ \\text{Da}$`,
      `$100,000\\ \\text{Da}$`
    ],
    correct: 0
  },
  {
    id: 16,
    question: `পোলিও রোগের ভাইরাসের প্রকৃতি হলো—`,
    image: null,
    options: [
      `এক-তন্ত্রী RNA`,
      `দ্বি-তন্ত্রী RNA`,
      `দ্বি-তন্ত্রী DNA`,
      `এক-তন্ত্রী DNA`
    ],
    correct: 0
  },
  {
    id: 17,
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
    id: 18,
    question: `ত্বরণ-সময় ($a-t$) লেখচিত্রের অন্তর্গত ক্ষেত্রফল কী নির্দেশ করে?`,
    image: null,
    options: [
      `সরণ`,
      `অতিক্রান্ত দূরত্ব`,
      `বেগের পরিবর্তন`,
      `বল`
    ],
    correct: 2
  },
  {
    id: 19,
    question: `একটি বস্তুকে উপরে ছুঁড়লে সর্বোচ্চ বিন্দুতে বস্তুটির বেগ কত হবে?`,
    image: null,
    options: [
      `সর্বাধিক`,
      `শূন্য`,
      `প্রাথমিক বেগের সমান`,
      `অসীম`
    ],
    correct: 1
  },
  {
    id: 20,
    question: `বেগ-সময় ($v-t$) লেখচিত্রের নতি (slope) কী প্রকাশ করে?`,
    image: null,
    options: [
      `ত্বরণ`,
      `সরণ`,
      `দূরত্ব`,
      `কৌণিক বেগ`
    ],
    correct: 0
  },
  {
    id: 21,
    question: `একটি কণা $r$ ব্যাসার্ধের বৃত্তাকার পথের অর্ধেক পথ অতিক্রম করলে কণাটির সরণ কত হবে?`,
    image: null,
    options: [
      `$\\pi r$`,
      `$2r$`,
      `শূন্য`,
      `$2\\pi r$`
    ],
    correct: 1
  },
  {
    id: 22,
    question: `নিউটনের কোন গতিসূত্র থেকে বলের পরিমাপ বা মান পাওয়া যায়?`,
    image: null,
    options: [
      `প্রথম গতিসূত্র`,
      `দ্বিতীয় গতিসূত্র`,
      `তৃতীয় গতিসূত্র`,
      `মহাকর্ষ সূত্র`
    ],
    correct: 1
  },
  {
    id: 23,
    question: `একটি জিনিসের ক্রয়মূল্য $250$ টাকা এবং বিক্রয়মূল্য $300$ টাকা হলে, শতকরা লাভের হার কত?`,
    image: null,
    options: [
      `$15\\%$`,
      `$20\\%$`,
      `$25\\%$`,
      `$30\\%$`
    ],
    correct: 1
  },
  {
    id: 24,
    question: `পরপর $10\\%$ এবং $20\\%$ ছাড় দিলে সমতুল্য একক ছাড়ের পরিমাণ কত হবে?`,
    image: null,
    options: [
      `$30\\%$`,
      `$28\\%$`,
      `$25\\%$`,
      `$32\\%$`
    ],
    correct: 1
  },
  {
    id: 25,
    question: `একটি বস্তুর ওপর $20\\%$ ছাড় দেওয়ার পরও $12\\%$ লাভ থাকে। ধার্যমূল্য ক্রয়মূল্যের চেয়ে শতকরা কত বেশি?`,
    image: null,
    options: [
      `$32\\%$`,
      `$40\\%$`,
      `$35\\%$`,
      `$44\\%$`
    ],
    correct: 1
  },
  {
    id: 26,
    question: `একটি ঘড়ি $450$ টাকায় বিক্রি করায় $10\\%$ ক্ষতি হলো। ঘড়িটির ক্রয়মূল্য কত?`,
    image: null,
    options: [
      `$500$ টাকা`,
      `$480$ টাকা`,
      `$520$ টাকা`,
      `$490$ টাকা`
    ],
    correct: 0
  },
  {
    id: 27,
    question: `১০ টি লেবুর ক্রয়মূল্য ৮ টি লেবুর বিক্রয়মূল্যের সমান হলে, শতকরা লাভের হার কত?`,
    image: null,
    options: [
      `$20\\%$`,
      `$25\\%$`,
      `$30\\%$`,
      `$15\\%$`
    ],
    correct: 1
  },
  {
    id: 28,
    question: `একটি বইয়ের লিখিত মূল্য $200$ টাকা। $15\\%$ ছাড়ে বইটি বিক্রি করলে বিক্রয়মূল্য কত হবে?`,
    image: null,
    options: [
      `$170$ টাকা`,
      `$180$ টাকা`,
      `$165$ টাকা`,
      `$175$ টাকা`
    ],
    correct: 0
  },
  {
    id: 29,
    question: `He is senior ______ me in service.`,
    image: null,
    options: [
      `than`,
      `to`,
      `from`,
      `with`
    ],
    correct: 1
  },
  {
    id: 30,
    question: `The man was accused ______ theft.`,
    image: null,
    options: [
      `for`,
      `with`,
      `of`,
      `about`
    ],
    correct: 2
  },
  {
    id: 31,
    question: `He congratulated me ______ my success.`,
    image: null,
    options: [
      `for`,
      `on`,
      `at`,
      `with`
    ],
    correct: 1
  },
  {
    id: 32,
    question: `ভারতের দীর্ঘতম নদী কোনটি?`,
    image: null,
    options: [
      `গঙ্গা`,
      `গোদাবরী`,
      `সিন্ধু`,
      `ব্রহ্মপুত্র`
    ],
    correct: 0
  },
  {
    id: 33,
    question: `পশ্চিমবঙ্গের সর্বোচ্চ শৃঙ্গ কোনটি?`,
    image: null,
    options: [
      `ফালুট`,
      `সান্দাকফু`,
      `সাবরগ্রাম`,
      `টংলু`
    ],
    correct: 1
  },
  {
    id: 34,
    question: `কোন প্রণালী ভারত ও শ্রীলঙ্কাকে পৃথক করেছে?`,
    image: null,
    options: [
      `পক প্রণালী`,
      `মলক্কা প্রণালী`,
      `জিব্রাল্টার প্রণালী`,
      `১০ ডিগ্রি চ্যানেল`
    ],
    correct: 0
  },
  {
    id: 35,
    question: `এক মহিলার দিকে নির্দেশ করে রাম বলল, 'উনি আমার মায়ের একমাত্র ছেলের স্ত্রী।' মহিলাটি রামের কে হন?`,
    image: null,
    options: [
      `বোন`,
      `স্ত্রী`,
      `মাতা`,
      `পিসি`
    ],
    correct: 1
  },
  {
    id: 36,
    question: `A হলো B-এর ভাই, C হলো A-এর পিতা, D হলো C-এর পিতা। তাহলে D-এর সাথে B-এর সম্পর্ক কী?`,
    image: null,
    options: [
      `পিতা`,
      `কাকা`,
      `দাদু (Grandfather)`,
      `ভাই`
    ],
    correct: 2
  },
  {
    id: 37,
    question: `X এবং Y হলো ভাই। R হলো Y-এর পিতা। S হলো T-এর ভাই এবং X-এর মামা। T-এর সাথে R-এর সম্পর্ক কী?`,
    image: null,
    options: [
      `স্ত্রী`,
      `বোন`,
      `মাতা`,
      `পিসি`
    ],
    correct: 0
  },
  {
    id: 38,
    question: `তৃতীয় গতিসূত্র অনুসারে ক্রিয়া ও প্রতিক্রিয়া বলের মধ্যবর্তী কোণের মান কত?`,
    image: null,
    options: [
      `$0^\\circ$`,
      `$90^\\circ$`,
      `$180^\\circ$`,
      `$360^\\circ$`
    ],
    correct: 2
  },
  {
    id: 39,
    question: `ক্রয়মূল্য ও বিক্রয়মূল্যের অনুপাত $4:5$ হলে, শতকরা লাভের হার কত?`,
    image: null,
    options: [
      `$20\\%$`,
      `$25\\%$`,
      `$30\\%$`,
      `$15\\%$`
    ],
    correct: 1
  },
  {
    id: 40,
    question: `একটি বস্তুর ভর $20\\text{ kg}$ এবং ত্বরণ $2\\text{ m/s}^2$ হলে প্রযুক্ত বলের মান কত?`,
    image: null,
    options: [
      `$10\\text{ N}$`,
      `$40\\text{ N}$`,
      `$20\\text{ N}$`,
      `$100\\text{ N}$`
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
