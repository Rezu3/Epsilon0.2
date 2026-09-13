const questions = [
  {
    id: 1,
    question: `নটোকর্ড সারাজীবন ধরে লেজের মধ্যে সীমাবদ্ধ থাকে কোন উপপর্বে?`,
    image: null,
    options: [
      `ইউরোকর্ডাটা`,
      `সেফালোকর্ডাটা`,
      `ভার্টিব্রাটা`,
      `হেমিকর্ডাটা`
    ],
    correct: 0
  },
  {
    id: 2,
    question: `নটোকর্ড মাথা থেকে লেজ পর্যন্ত আজীবন বিস্তৃত থাকে কোনটিতে?`,
    image: null,
    options: [
      `ইউরোকর্ডাটা`,
      `সেফালোকর্ডাটা`,
      `ভার্টিব্রাটা`,
      `টিউনিকেটা`
    ],
    correct: 1
  },
  {
    id: 3,
    question: `অসম্পূর্ণ অংকীয় চার প্রকোষ্ঠযুক্ত হৃৎপিণ্ড কোন প্রাণীতে দেখা যায়?`,
    image: null,
    options: [
      `উভচর`,
      `সরীসৃপ (ব্যতিক্রম কুমীর)`,
      `পাখি`,
      `স্তন্যপায়ী`
    ],
    correct: 1
  },
  {
    id: 4,
    question: `কোন পর্বের প্রাণীদের দেহে শিখাকোশ (Flame cell) রেচন অঙ্গ হিসেবে থাকে?`,
    image: null,
    options: [
      `প্লাটিহেলমিনথেস`,
      `নেমাটোডা`,
      `অ্যানিলিডা`,
      `পোরিফেরা`
    ],
    correct: 0
  },
  {
    id: 5,
    question: `হিমোপ্রোটিন বা হিমোসাইটোসিয়ানিন রক্তরসে দ্রবীভূত থাকে কোন পর্বে?`,
    image: null,
    options: [
      `আর্থ্রোপোডা ও মোলাস্কা`,
      `অ্যানিলিডা`,
      `ভার্টিব্রাটা`,
      `প্লাটিহেলমিনথেস`
    ],
    correct: 0
  },
  {
    id: 6,
    question: `জলের আলোক বিশ্লেষণকে বা ফটোলাইসিসকে কী বলা হয়?`,
    image: null,
    options: [
      `কেলভিন চক্র`,
      `হিল বিক্রিয়া`,
      `ক্রেবস চক্র`,
      `ডারউইন প্রভাব`
    ],
    correct: 1
  },
  {
    id: 7,
    question: `সবাত শ্বসনে ১ মোল গ্লুকোজ জারিত হয়ে কত শক্তি নির্গত হয়?`,
    image: null,
    options: [
      `686 kcal`,
      `668 kcal`,
      `700 kcal`,
      `500 kcal`
    ],
    correct: 0
  },
  {
    id: 8,
    question: `কোন শ্বেতকণিকা হেপারিন নিঃসরণ করে?`,
    image: null,
    options: [
      `নিউট্রোফিল`,
      `ইওসিনোফিল`,
      `বেসোফিল`,
      `মনোসাইট`
    ],
    correct: 2
  },
  {
    id: 9,
    question: `হৃৎপিণ্ডের কোন প্রকোষ্ঠ থেকে ফুসফুসীয় ধমনি উৎপন্ন হয়?`,
    image: null,
    options: [
      `ডান অলিন্দ`,
      `বাম অলিন্দ`,
      `ডান নিলয়`,
      `বাম নিলয়`
    ],
    correct: 2
  },
  {
    id: 10,
    question: `বৃক্কীয় নালিকায় জলের পুনঃশোষণ নিয়ন্ত্রণ করে কোনটি?`,
    image: null,
    options: [
      `ADH (অ্যান্টিডিউরেটিক হরমোন)`,
      `ইনসুলিন`,
      `থাইরক্সিন`,
      `অ্যাড্রেনালিন`
    ],
    correct: 0
  },
  {
    id: 11,
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
    id: 12,
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
    id: 13,
    question: `অ্যাক্সনের সর্ববহিঃস্থ আবরণীকে কী বলে?`,
    image: null,
    options: [
      `নিউরিলেমা`,
      `অ্যাক্সোলেমা`,
      `মায়েলিন সিথ`,
      `এপিনয়েড`
    ],
    correct: 0
  },
  {
    id: 14,
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
    id: 15,
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
    id: 16,
    question: `ত্বরণ-সময় (a-t) লেখচিত্রের অন্তর্গত ক্ষেত্রফল কী নির্দেশ করে?`,
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
    id: 17,
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
    id: 18,
    question: `বল এবং বলের ক্রিয়াকালের গুণফলকে কী বলা হয়?`,
    image: null,
    options: [
      `বলের ঘাত (Impulse of force)`,
      `ভরবেগ`,
      `ক্ষমতা`,
      `শক্তি`
    ],
    correct: 0
  },
  {
    id: 19,
    question: `He was accused ______ theft.`,
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
    id: 20,
    question: `He was absorbed ______ his studies.`,
    image: null,
    options: [
      `in`,
      `at`,
      `with`,
      `on`
    ],
    correct: 0
  },
  {
    id: 21,
    question: `The river flows ______ the bridge.`,
    image: null,
    options: [
      `on`,
      `under`,
      `below`,
      `over`
    ],
    correct: 1
  },
  {
    id: 22,
    question: `He deals ______ rice.`,
    image: null,
    options: [
      `in`,
      `with`,
      `at`,
      `on`
    ],
    correct: 0
  },
  {
    id: 23,
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
    id: 24,
    question: `একটি পেন 96 টাকায় বিক্রি করলে ক্রয়মূল্যের সমপরিমাণ শতকরা লাভ হয়। পেনটির ক্রয়মূল্য কত?`,
    image: null,
    options: [
      `50 টাকা`,
      `60 টাকা`,
      `70 টাকা`,
      `80 টাকা`
    ],
    correct: 1
  },
  {
    id: 25,
    question: `এক অসাধু ব্যবসায়ী জাল ওজন ব্যবহার করে কেনা ও বেচা উভয় ক্ষেত্রেই $10\\%$ করে ঠকায়। তার মোট শতকরা লাভ কত?`,
    image: null,
    options: [
      `$20\\%$`,
      `$21\\%$`,
      `$22\\%$`,
      `$19\\%$`
    ],
    correct: 1
  },
  {
    id: 26,
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
    id: 27,
    question: `বিক্রয়মূল্যের ওপর $20\\%$ ক্ষতি হলে, ক্রয়মূল্যের ওপর শতকরা ক্ষতির হার কত?`,
    image: null,
    options: [
      `$16.67\\%$`,
      `$25\\%$`,
      `$15\\%$`,
      `$20\\%$`
    ],
    correct: 0
  },
  {
    id: 28,
    question: `একটি দ্রব্য 600 টাকায় বিক্রি করলে যে পরিমাণ লাভ হয়, 400 টাকায় বিক্রি করলে সমপরিমাণ ক্ষতি হয়। দ্রব্যটির ক্রয়মূল্য কত?`,
    image: null,
    options: [
      `450 টাকা`,
      `500 টাকা`,
      `520 টাকা`,
      `480 টাকা`
    ],
    correct: 1
  },
  {
    id: 29,
    question: `পৃথিবীর উচ্চতম মালভূমি কোনটি?`,
    image: null,
    options: [
      `দাক্ষিণাত্য মালভূমি`,
      `পামির মালভূমি`,
      `তিব্বত মালভূমি`,
      `ছোটনাগপুর মালভূমি`
    ],
    correct: 1
  },
  {
    id: 30,
    question: `কর্কটক্রান্তি রেখা ভারতের কয়টি রাজ্যের ওপর দিয়ে গেছে?`,
    image: null,
    options: [
      `৬ টি`,
      `৭ টি`,
      `৮ টি`,
      `৯ টি`
    ],
    correct: 2
  },
  {
    id: 31,
    question: `কোন নদীকে 'বাংলার দুঃখ' বলা হতো?`,
    image: null,
    options: [
      `তিস্তা`,
      `দামোদর`,
      `রূপনারায়ণ`,
      `মৈয়ূরাক্ষী`
    ],
    correct: 1
  },
  {
    id: 32,
    question: `কোন মহাসাগরকে 'অন্ধকারাচ্ছন্ন মহাসাগর' বলা হয়?`,
    image: null,
    options: [
      `প্রশান্ত মহাসাগর`,
      `আটলান্টিক মহাসাগর`,
      `ভারত মহাসাগর`,
      `আর্কটিক মহাসাগর`
    ],
    correct: 1
  },
  {
    id: 33,
    question: `A হলো B-এর বোন। C হলো B-এর মা। D হলো C-এর বাবা। E হলো D-এর মা। তাহলে A-এর সাথে D-এর সম্পর্ক কী?`,
    image: null,
    options: [
      `নাতনি (Granddaughter)`,
      `মা`,
      `পিসি`,
      `কন্যা`
    ],
    correct: 0
  },
  {
    id: 34,
    question: `P হলো Q-এর বোন। R হলো P-এর মা। S হলো R-এর বাবা। T হলো S-এর মা। Q-এর সাথে S-এর সম্পর্ক কী?`,
    image: null,
    options: [
      `দাদু (Grandfather)`,
      `দিদিমা`,
      `পিতা`,
      `ছেলে`
    ],
    correct: 0
  },
  {
    id: 35,
    question: `এক ভদ্রলোককে দেখিয়ে সোমা বলল, 'ওঁর একমাত্র ভাই হলো আমার মেয়ের বাবার বাবা।' ভদ্রলোকটি সোমার কে হন?`,
    image: null,
    options: [
      `শ্বশুর`,
      `কাকা শ্বশুর`,
      `পিতা`,
      `ভাই`
    ],
    correct: 1
  },
  {
    id: 36,
    question: `A হলো B-এর ছেলে। B এবং C বোন। D হলো C-এর মা। E হলো D-এর ছেলে। তাহলে E-এর সাথে A-এর সম্পর্ক কী?`,
    image: null,
    options: [
      `মামা`,
      `পিতা`,
      `ভাই`,
      `কাকা`
    ],
    correct: 0
  },
  {
    id: 37,
    question: `এক ব্যক্তির ছবি দেখিয়ে অণুপ বলল, 'আমার কোনো ভাই বা বোন নেই, কিন্তু ওই লোকটার বাবা হলো আমার বাবার ছেলে।' ছবিটি কার?`,
    image: null,
    options: [
      `অণুপের নিজের`,
      `অণুপের ছেলের`,
      `অণুপের বাবার`,
      `অণুপের ভাতিজার`
    ],
    correct: 1
  },
     {
    id: 38,
    question: `এক ব্যক্তি বলল, 'আমার মায়ের একমাত্র পুত্রের স্ত্রীর শাশুড়ি হলেন আমার মা।' এই ব্যক্তির সাথে সেই স্ত্রীর সম্পর্ক কী?`,
    image: null,
    options: [
      `স্বামী`,
      `দেওর`,
      `শ্যালক`,
      `ভাসুর`
    ],
    correct: 0
  },
  {
    id: 39,
    question: `দীপা বলল, 'ওই মহিলা আমার মায়ের বাবার একমাত্র কন্যার মেয়ে।' মহিলাটি দীপার কে হন?`,
    image: null,
    options: [
      `বোন (বা নিজে)`,
      `পিসি`,
      `মা`,
      `কাকিমা`
    ],
    correct: 0
  },
  {
    id: 40,
    question: `A এবং B হলো বোন। R এবং S হলো ভাই। A-এর মেয়ে হলো R-এর বোন। তাহলে B-এর সাথে S-এর সম্পর্ক কী?`,
    image: null,
    options: [
      `মা`,
      `মাসি/পিসি (Aunt)`,
      `বোন`,
      `নাতনি`
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
