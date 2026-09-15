const questions = [
  {
    id: 1,
    question: `কোনো স্লাইড ক্যালিপার্সের ভ্যানিয়ারের $(n+1)$ সংখ্যক ঘর মূল স্কেলের $n$ সংখ্যক ক্ষুদ্রতম ঘরের সমান। মূল স্কেলের ক্ষুদ্রতম ঘরের মান $e$ হলে, ভ্যানিয়ার ধ্রুবকের মান হবে —`,
    image: null,
    options: [
      `$\\frac{e}{n}$`,
      `$\\frac{e}{n+1}$`,
      `$\\frac{ne}{n+1}$`,
      `$n \\cdot e$`
    ],
    correct: 1
  },
  {
    id: 2,
    question: `একটি ঘনকের দৈর্ঘ্য $L$-এর পরিমাপে ত্রুটি $5\\%$ এবং ভরের পরিমাপে ত্রুটি $3\\%$ হলে, ঘনত্বের পরিমাপের ক্ষেত্রে সর্বাধিক ত্রুটি হবে —`,
    image: null,
    options: [
      `$6\\%$`,
      `$14\\%$`,
      `$8\\%$`,
      `$18\\%$`
    ],
    correct: 3
  },
  {
    id: 3,
    question: `যদি $\\vec{A} = \\vec{B} + \\vec{C}$ এবং $A, B$ ও $C$-এর মান যথাক্রমে $5, 4$ এবং $3$ হয়, তবে $\\vec{A}$ ও $\\vec{C}$-এর মধ্যবর্তী কোণ হলো —`,
    image: null,
    options: [
      `$\\cos^{-1}\\left(\\frac{3}{5}\\right)$`,
      `$\\cos^{-1}\\left(\\frac{4}{5}\\right)$`,
      `$\\frac{\\pi}{2}$`,
      `$\\sin^{-1}\\left(\\frac{4}{5}\\right)$`
    ],
    correct: 0
  },
  {
    id: 4,
    question: `বলের মাত্রা সংকেত নির্দেশ করে কোনটি?`,
    image: null,
    options: [
      `$[MLT^{-1}]$`,
      `$[MLT^{-2}]$`,
      `$[ML^2T^{-2}]$`,
      `$[M^{-1}L^3T^{-2}]$`
    ],
    correct: 1
  },
  {
    id: 5,
    question: `$\\vec{A} = 2\\hat{i} - 3\\hat{j} + 5\\hat{k}$ এবং $\\vec{B} = \\hat{i} - 3\\hat{j} - 2\\hat{k}$ হলে, $\\vec{A} \\cdot \\vec{B}$-এর মান হবে —`,
    image: null,
    options: [
      `$1$`,
      `$11$`,
      `$-1$`,
      `$21$`
    ],
    correct: 0
  },
  {
    id: 6,
    question: `একটি গাড়ি প্রথম অর্ধেক পথ $40\\text{ km/h}$ গতিবেগে এবং দ্বিতীয় অর্ধেক পথ $60\\text{ km/h}$ গতিবেগে অতিক্রম করে। গাড়িটির গড় গতিবেগ কত?`,
    image: null,
    options: [
      `$45\\text{ km/h}$`,
      `$48\\text{ km/h}$`,
      `$50\\text{ km/h}$`,
      `$55\\text{ km/h}$`
    ],
    correct: 1
  },
  {
    id: 7,
    question: `একটি কণার অবস্থান $x = \\frac{\\alpha}{\\beta}(1 - e^{-\\beta t})$ দ্বারা প্রকাশ করা হলে, $\\alpha$-এর মাত্রীয় সংকেত হবে —`,
    image: null,
    options: [
      `$[LT^{-1}]$`,
      `$[LT^{-2}]$`,
      `$[L]$`,
      `$[LT^2]$`
    ],
    correct: 0
  },
  {
    id: 8,
    question: `স্থির অবস্থা থেকে একটি বস্তু সমত্বরণে যাত্রা শুরু করে $t$ সেকেন্ডে $s_1$ এবং পরবর্তী $t$ সেকেন্ডে $s_2$ দূরত্ব অতিক্রম করে। $s_2$ ও $s_1$-এর সম্পর্ক হলো —`,
    image: null,
    options: [
      `$s_2 = s_1$`,
      `$s_2 = 2s_1$`,
      `$s_2 = 3s_1$`,
      `$s_2 = 4s_1$`
    ],
    correct: 2
  },
  {
    id: 9,
    question: `অনুভূমিকের সাথে $45^\\circ$ কোণে $20\\text{ m/s}$ গতিবেগে নিক্ষিপ্ত একটি বস্তু সর্বাধিক কত উচ্চতায় উঠবে? ($g = 10\\text{ m/s}^2$)`,
    image: null,
    options: [
      `$10\\text{ m}$`,
      `$5\\text{ m}$`,
      `$15\\text{ m}$`,
      `$20\\text{ m}$`
    ],
    correct: 0
  },
  {
    id: 10,
    question: `একটি বস্তুর বেগ $v = 20 + 0.1t^2$ সমীকরণ মেনে চললে বস্তুর গতি হলো —`,
    image: null,
    options: [
      `সমত্বরণ`,
      `সমমন্দিন`,
      `ত্বরণ শূন্য`,
      `অসমত্বরণ`
    ],
    correct: 3
  },
  {
    id: 11,
    question: `$60\\text{ kg}$ ভরের একজন ব্যক্তি লিফটে দাঁড়িয়ে আছেন। লিফটটি $2\\text{ m/s}^2$ ত্বরণে ওপরে উঠলে লোকটির আপাত ওজন হবে — ($g = 10\\text{ m/s}^2$)`,
    image: null,
    options: [
      `$480\\text{ N}$`,
      `$600\\text{ N}$`,
      `$720\\text{ N}$`,
      `$840\\text{ N}$`
    ],
    correct: 2
  },
  {
    id: 12,
    question: `স্থিতিঘর্ষণ গুণাঙ্ক ($\\mu_s$) ও চলঘর্ষণ গুণাঙ্ক ($\\mu_k$)-এর সঠিক সম্পর্ক কোনটি?`,
    image: null,
    options: [
      `$\\mu_s > \\mu_k$`,
      `$\\mu_s < \\mu_k$`,
      `$\\mu_s = \\mu_k$`,
      `$\\mu_s \\cdot \\mu_k = 1$`
    ],
    correct: 0
  },
  {
    id: 13,
    question: `$5\\text{ kg}$ ভরের স্থির বস্তুর ওপর $20\\text{ N}$ বল $2\\text{ s}$ ধরে ক্রিয়া করলে বস্তুর ভরবেগের পরিবর্তন হবে —`,
    image: null,
    options: [
      `$10\\text{ kg}\\cdot\\text{m/s}$`,
      `$20\\text{ kg}\\cdot\\text{m/s}$`,
      `$40\\text{ kg}\\cdot\\text{m/s}$`,
      `$80\\text{ kg}\\cdot\\text{m/s}$`
    ],
    correct: 2
  },
  {
    id: 14,
    question: `ভরবেগের সংরক্ষণের সূত্রটি নিউটনের কোন গতিসূত্র থেকে পাওয়া যায়?`,
    image: null,
    options: [
      `প্রথম`,
      `দ্বিতীয়`,
      `তৃতীয়`,
      `দ্বিতীয় ও তৃতীয় উভয়ই`
    ],
    correct: 3
  },
  {
    id: 15,
    question: `$\\vec{F} = (3\\hat{i} + 4\\hat{j})\\text{ N}$ বল প্রয়োগে কোনো বস্তুর সরণ $\\vec{r} = (5\\hat{i} + 2\\hat{j})\\text{ m}$ হলে কৃতকার্য হবে —`,
    image: null,
    options: [
      `$23\\text{ J}$`,
      `$15\\text{ J}$`,
      `$7\\text{ J}$`,
      `$20\\text{ J}$`
    ],
    correct: 0
  },
  {
    id: 16,
    question: `বস্তুর গতিশক্তি $100\\%$ বৃদ্ধি করা হলে তার ভরবেগ শতকরা কত বৃদ্ধি পাবে?`,
    image: null,
    options: [
      `$41.4\\%$`,
      `$50\\%$`,
      `$100\\%$`,
      `$200\\%$`
    ],
    correct: 0
  },
  {
    id: 17,
    question: `$1\\text{ kWh}$ সমান কত জুল?`,
    image: null,
    options: [
      `$3.6 \\times 10^6\\text{ J}$`,
      `$3.6 \\times 10^5\\text{ J}$`,
      `$10^3\\text{ J}$`,
      `$360\\text{ J}$`
    ],
    correct: 0
  },
  {
    id: 18,
    question: `$M$ ভর ও $R$ ব্যাসার্ধের একটি নিরেট গোলকের ব্যাসের সাপেক্ষে চক্রগতির ব্যাসার্ধ ($K$) হলো —`,
    image: null,
    options: [
      `$\\sqrt{\\frac{2}{5}}R$`,
      `$\\sqrt{\\frac{1}{2}}R$`,
      `$\\sqrt{\\frac{2}{3}}R$`,
      `$\\frac{2}{5}R$`
    ],
    correct: 0
  },
  {
    id: 19,
    question: `একটি ঘূর্ণায়মান চাকতির কৌণিক ভরবেগ সংরক্ষিত থাকবে যখন —`,
    image: null,
    options: [
      `বহিঃস্থ বল শূন্য`,
      `বহিঃস্থ টর্ক শূন্য`,
      `ভর স্থির থাকে`,
      `কৌণিক বেগ শূন্য`
    ],
    correct: 1
  },
  {
    id: 20,
    question: `সমকৌণিক ত্বরণে গতিশীল একটি চাকা $168\\text{ rad}$ ঘোরার পর কৌণিক বেগ হয় $3120\\text{ rpm}$। চাকার কৌণিক ত্বরণ কত?`,
    image: null,
    options: [
      `$2\\pi\\text{ rad/s}^2$`,
      `$4\\pi\\text{ rad/s}^2$`,
      `$12\\pi\\text{ rad/s}^2$`,
      `$104\\pi\\text{ rad/s}^2$`
    ],
    correct: 1
  },
  {
    id: 21,
    question: `প্রদর্শিত $v-t$ লেখচিত্র থেকে $t = 0$ থেকে $t = 5\\text{ s}$-এর মধ্যে বস্তুর অতিক্রান্ত দূরত্ব কত?`,
    image: 'q21.png',
    options: [
      `$50\\text{ m}$`,
      `$70\\text{ m}$`,
      `$90\\text{ m}$`,
      `$100\\text{ m}$`
    ],
    correct: 1
  },
  {
    id: 22,
    question: `প্রদর্শিত মসৃণ আনত তলে আবদ্ধ হালকা কপিকল ব্যবস্থার ত্বরণ কত?`,
    image: 'q22.png',
    options: [
      `$\\frac{g}{4}$`,
      `$\\frac{g}{2}$`,
      `$\\frac{g}{3}$`,
      `$g$`
    ],
    correct: 0
  },
  {
    id: 23,
    question: `প্রদর্শিত বল-সরণ ($F-x$) লেখচিত্র হতে $x = 0$ থেকে $x = 6\\text{ m}$ পর্যন্ত সম্পাদন করা কৃতকার্য নির্ণয় করো।`,
    image: 'q23.png',
    options: [
      `$30\\text{ J}$`,
      `$40\\text{ J}$`,
      `$25\\text{ J}$`,
      `$50\\text{ J}$`
    ],
    correct: 0
  },
  {
    id: 24,
    question: `$M$ ভর ও $L$ দৈর্ঘ্যের সরু সুষম রডের মধ্যবিন্দুগামী লম্ব অক্ষের সাপেক্ষে জড়তার ভ্রামক নির্দেশক চিত্র অনুযায়ী অক্ষটির সাপেক্ষে $I$-এর মান কত?`,
    image: 'q24.png',
    options: [
      `$\\frac{1}{12}ML^2$`,
      `$\\frac{1}{3}ML^2$`,
      `$\\frac{1}{2}ML^2$`,
      `$\\frac{2}{5}ML^2$`
    ],
    correct: 0
  },
  {
    id: 25,
    question: `চিত্রে $\\vec{P}$ এবং $\\vec{Q}$ দুটি ভেক্টরের লব্ধি $\\vec{R}$। যদি $P = Q$ হয়, তবে লব্ধি $\\vec{R}$ এবং $\\vec{P}$-এর মধ্যবর্তী কোণ $\\theta$ কত?`,
    image: 'q25.png',
    options: [
      `$\\alpha$`,
      `$\\frac{\\alpha}{2}$`,
      `$2\\alpha$`,
      `$90^\\circ$`
    ],
    correct: 1
  },
  {
    id: 26,
    question: `**বিবৃতি (A):** প্রাসের গতিপথের সর্বোচ্চ বিন্দুতে বেগের মান শূন্য হয় না।\n**কারণ (R):** সর্বোচ্চ বিন্দুতে বেগের অনুভূমিক উপাংশ বজায় থাকে।`,
    image: null,
    options: [
      `A ও R উভয়ই সত্য এবং R হলো A-এর সঠিক ব্যাখ্যা`,
      `A ও R উভয়ই সত্য কিন্তু R, A-এর সঠিক ব্যাখ্যা নয়`,
      `A সত্য কিন্তু R মিথ্যা`,
      `A মিথ্যা কিন্তু R সত্য`
    ],
    correct: 0
  },
  {
    id: 27,
    question: `**বিবৃতি (A):** অবাধে পতনশীল অবস্থায় একজন ব্যক্তি নিজেকে ভারশূন্য মনে করেন।\n**কারণ (R):** অবাধে পতনশীল বস্তুর ওপর লম্ব প্রতিক্রিয়া বল শূন্য হয়।`,
    image: null,
    options: [
      `A ও R উভয়ই সত্য এবং R হলো A-এর সঠিক ব্যাখ্যা`,
      `A ও R উভয়ই সত্য কিন্তু R, A-এর সঠিক ব্যাখ্যা নয়`,
      `A সত্য কিন্তু R মিথ্যা`,
      `A মিথ্যা কিন্তু R সত্য`
    ],
    correct: 0
  },
  {
    id: 28,
    question: `**বিবৃতি (A):** সংরক্ষণশীল বলের দ্বারা একটি আবদ্ধ পথে কৃতকার্য সর্বদা শূন্য হয়।\n**কারণ (R):** ঘর্ষণ বল একটি সংরক্ষণশীল বলের উদাহরণ।`,
    image: null,
    options: [
      `A ও R উভয়ই সত্য এবং R হলো A-এর সঠিক ব্যাখ্যা`,
      `A ও R উভয়ই সত্য কিন্তু R, A-এর সঠিক ব্যাখ্যা নয়`,
      `A সত্য কিন্তু R মিথ্যা`,
      `A মিথ্যা কিন্তু R সত্য`
    ],
    correct: 2
  },
  {
    id: 29,
    question: `**বিবৃতি (A):** সমবৃত্তীয় গতিতে ঘূর্ণায়মান বস্তুর ওপর কেন্দ্রমুখী বল দ্বারা কৃতকার্য শূন্য।\n**কারণ (R):** কেন্দ্রমুখী বল এবং তৎক্ষণাৎ সরণ পরস্পরের লম্ব।`,
    image: null,
    options: [
      `A ও R উভয়ই সত্য এবং R হলো A-এর সঠিক ব্যাখ্যা`,
      `A ও R উভয়ই সত্য কিন্তু R, A-এর সঠিক ব্যাখ্যা নয়`,
      `A সত্য কিন্তু R মিথ্যা`,
      `A মিথ্যা কিন্তু R সত্য`
    ],
    correct: 0
  },
  {
    id: 30,
    question: `**বিবৃতি (A):** একই ভর ও ব্যাসার্ধের একটি ফাপা গোলকের জড়তার ভ্রামক নিরেট গোলক অপেক্ষা বেশি।\n**কারণ (R):** ফাপা গোলকের ভর ঘূর্ণন অক্ষ থেকে বেশি দূরে অবস্থান করে।`,
    image: null,
    options: [
      `A ও R উভয়ই সত্য এবং R হলো A-এর সঠিক ব্যাখ্যা`,
      `A ও R উভয়ই সত্য কিন্তু R, A-এর সঠিক ব্যাখ্যা নয়`,
      `A সত্য কিন্তু R মিথ্যা`,
      `A মিথ্যা কিন্তু R সত্য`
    ],
    correct: 0
  },
  {
    id: 31,
    question: `বামস্তম্ভের সাথে ডানস্তম্ভের সঠিক বিকল্পটি নির্বাচন করো:`,
    image: 'q31.png',
    options: [
      `(i)-(b), (ii)-(a), (iii)-(d), (iv)-(c)`,
      `(i)-(a), (ii)-(b), (iii)-(c), (iv)-(d)`,
      `(i)-(c), (ii)-(d), (iii)-(a), (iv)-(b)`,
      `(i)-(d), (ii)-(c), (iii)-(b), (iv)-(a)`
    ],
    correct: 0
  },
  {
    id: 32,
    question: `বামস্তম্ভের সাথে ডানস্তম্ভ মেলাও:`,
    image: 'q32.png',
    options: [
      `(i)-(b), (ii)-(c), (iii)-(d), (iv)-(a)`,
      `(i)-(a), (ii)-(b), (iii)-(c), (iv)-(d)`,
      `(i)-(c), (ii)-(a), (iii)-(b), (iv)-(d)`,
      `(i)-(d), (ii)-(c), (iii)-(a), (iv)-(b)`
    ],
    correct: 0
  },
  {
    id: 33,
    question: `ভৌতিক রাশি ও মাত্রীয় সংকেতের সঠিক মেলবন্ধন কোনটি?`,
    image: 'q33.png',
    options: [
      `(i)-(b), (ii)-(a), (iii)-(d), (iv)-(c)`,
      `(i)-(a), (ii)-(b), (iii)-(c), (iv)-(d)`,
      `(i)-(c), (ii)-(d), (iii)-(a), (iv)-(b)`,
      `(i)-(d), (ii)-(c), (iii)-(b), (iv)-(a)`
    ],
    correct: 0
  },
  {
    id: 34,
    question: `লেখচিত্রের নতি ও ক্ষেত্রফলের অর্থ মেলাও:`,
    image: 'q34.png',
    options: [
      `(i)-(c), (ii)-(d), (iii)-(a), (iv)-(b)`,
      `(i)-(a), (ii)-(b), (iii)-(c), (iv)-(d)`,
      `(i)-(d), (ii)-(c), (iii)-(b), (iv)-(a)`,
      `(i)-(b), (ii)-(a), (iii)-(d), (iv)-(c)`
    ],
    correct: 0
  },
  {
    id: 35,
    question: `বৃত্তীয় গতির রাশিমালা মেলাও:`,
    image: 'q35.png',
    options: [
      `(i)-(b), (ii)-(a), (iii)-(c), (iv)-(d)`,
      `(i)-(a), (ii)-(b), (iii)-(d), (iv)-(c)`,
      `(i)-(c), (ii)-(d), (iii)-(a), (iv)-(b)`,
      `(i)-(d), (ii)-(c), (iii)-(b), (iv)-(a)`
    ],
    correct: 0
  },
  {
    id: 36,
    question: `$10\\text{ g}$ ভরের একটি বুলেট $400\\text{ m/s}$ বেগে একটি কাঠের ব্লকে প্রবেশ করে $20\\text{ cm}$ ভেতরে ঢুকে থেমে গেল। কাঠের ব্লকের প্রতিরোধ বলের মান কত?`,
    image: null,
    options: [
      `$4000\\text{ N}$`,
      `$2000\\text{ N}$`,
      `$8000\\text{ N}$`,
      `$1000\\text{ N}$`
    ],
    correct: 0
  },
  {
    id: 37,
    question: `$20\\text{ m}$ উঁচু স্থান থেকে একটি বস্তুকে অনুভূমিকভাবে $10\\text{ m/s}$ বেগে ছোঁড়া হলো। মাটিতে পৌঁছাতে বস্তুটির কত সময় লাগবে? ($g = 10\\text{ m/s}^2$)`,
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
    id: 38,
    question: `একটি কণার অবস্থান $x = (2t^2 + 5t + 3)\\text{ m}$ দ্বারা প্রকাশ করা হলে, $t = 2\\text{ s}$ এ কণাটির তাৎক্ষণিক বেগ কত?`,
    image: null,
    options: [
      `$9\\text{ m/s}$`,
      `$13\\text{ m/s}$`,
      `$17\\text{ m/s}$`,
      `$21\\text{ m/s}$`
    ],
    correct: 1
  },
  {
    id: 39,
    question: `$50\\text{ kg}$ ভরের একটি বস্তুকে $10\\text{ m}$ ওপরে তুলতে কত কার্য করতে হবে? ($g = 9.8\\text{ m/s}^2$)`,
    image: null,
    options: [
      `$4900\\text{ J}$`,
      `$980\\text{ J}$`,
      `$500\\text{ J}$`,
      `$2450\\text{ J}$`
    ],
    correct: 0
  },
  {
    id: 40,
    question: `$4\\text{ m}$ ব্যাসার্ধের বৃত্তাকার পথে একটি গাড়ি $10\\text{ m/s}$ সমবেগে ঘুরছে। গাড়িটির কেন্দ্রমুখী ত্বরণ কত?`,
    image: null,
    options: [
      `$25\\text{ m/s}^2$`,
      `$40\\text{ m/s}^2$`,
      `$2.5\\text{ m/s}^2$`,
      `$100\\text{ m/s}^2$`
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

