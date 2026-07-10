// static/js/student_dashboard.js

document.addEventListener('DOMContentLoaded', function() {
    // Initialize date/time
    updateDateTime();
    setInterval(updateDateTime, 1000);

    // Sidebar toggle for mobile
    const menuBtn = document.getElementById('menuBtn');
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');

    function toggleSidebar() {
        sidebar.classList.toggle('open');
    }

    if (menuBtn) {
        menuBtn.addEventListener('click', toggleSidebar);
    }

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 992) {
            const isSidebar = sidebar.contains(e.target);
            const isMenuBtn = menuBtn && menuBtn.contains(e.target);
            if (!isSidebar && !isMenuBtn && sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
            }
        }
    });

    // Notification bell click
    const notificationBell = document.querySelector('.notification-bell');
    if (notificationBell) {
        notificationBell.addEventListener('click', function() {
            alert('📬 You have 2 new notifications');
        });
    }

    // Animate rank progress on load
    setTimeout(function() {
        const rankFill = document.getElementById('rankProgressFill');
        if (rankFill) {
            const progressWidth = rankFill.getAttribute('data-progress') || 0;
            rankFill.style.width = '0%';
            rankFill.style.transition = 'width 1.5s ease';
            setTimeout(function() {
                rankFill.style.width = progressWidth + '%';
            }, 300);
        }
    }, 500);

    // Start all timers
    setTimeout(function() {
        initializeTimers();
    }, 1000);

    // Add animation to cards on load
    const cards = document.querySelectorAll('.action-card');
    cards.forEach(function(card, index) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(function() {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 + (index * 100));
    });
});

// Update date and time
function updateDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    const dateTimeStr = now.toLocaleDateString('en-US', options);
    const element = document.getElementById('currentDateTime');
    if (element) {
        element.textContent = dateTimeStr;
    }
}

// =============================================
// TIMER FUNCTIONS
// =============================================

// Initialize all exam timers
function initializeTimers() {
    const examItems = document.querySelectorAll('.exam-item');
    console.log("🔍 Found exam items:", examItems.length);
    
    if (examItems.length === 0) {
        console.log("⚠️ No exam items found");
        return;
    }
    
    examItems.forEach(function(item) {
        const examId = item.id.replace('exam-item-', '');
        console.log("⏰ Starting timer for exam:", examId);
        startTimer(examId);
    });
}

// Start timer for a specific exam
function startTimer(examId) {
    const timerText = document.getElementById('timer-text-' + examId);
    const startBtn = document.getElementById('start-btn-' + examId);
    
    console.log("⏳ Timer for exam", examId, ":", timerText);
    
    if (!timerText) {
        console.log("❌ Timer text not found for exam:", examId);
        return;
    }
    
    // Get exam data from the DOM
    const examItem = document.getElementById('exam-item-' + examId);
    if (!examItem) {
        console.log("❌ Exam item not found:", examId);
        return;
    }
    
    // Extract exam date and time from the exam info
    const examInfo = examItem.querySelector('.exam-info');
    if (!examInfo) {
        console.log("❌ Exam info not found:", examId);
        return;
    }
    
    const text = examInfo.textContent || '';
    console.log("📝 Exam info text:", text);
    
    // Parse date and time
    let examDate = null;
    let examTime = null;
    
    const dateMatch = text.match(/Date:\s*([\d-]+)/);
    const timeMatch = text.match(/Time:\s*([\d:]+)/);
    
    if (dateMatch) {
        examDate = dateMatch[1];
        console.log("📅 Date found:", examDate);
    }
    if (timeMatch) {
        examTime = timeMatch[1];
        console.log("🕐 Time found:", examTime);
    }
    
    if (!examDate || !examTime) {
        timerText.textContent = '⏰ No date set';
        console.log("❌ Invalid date/time for exam:", examId);
        return;
    }
    
    // Create target date
    const targetDate = new Date(examDate + 'T' + examTime + ':00');
    const now = new Date();
    
    // Calculate difference in seconds
    let diffSeconds = Math.floor((targetDate - now) / 1000);
    console.log("⏱️ Difference in seconds:", diffSeconds);
    
    // If exam time has passed, show "Test Started"
    if (diffSeconds <= 0) {
        timerText.textContent = '✅ Test Started';
        timerText.className = 'time-up';
        if (startBtn) {
            startBtn.style.display = 'inline-flex';
        }
        return;
    }
    
    // Update timer every second
    const timerInterval = setInterval(function() {
        diffSeconds--;
        
        if (diffSeconds <= 0) {
            clearInterval(timerInterval);
            timerText.textContent = '✅ Test Started';
            timerText.className = 'time-up';
            if (startBtn) {
                startBtn.style.display = 'inline-flex';
            }
            return;
        }
        
        // Format time
        const hours = Math.floor(diffSeconds / 3600);
        const minutes = Math.floor((diffSeconds % 3600) / 60);
        const seconds = diffSeconds % 60;
        
        let displayTime = '';
        if (hours > 0) {
            displayTime = hours + 'h ' + minutes.toString().padStart(2, '0') + 'm ' + seconds.toString().padStart(2, '0') + 's';
        } else if (minutes > 0) {
            displayTime = minutes + 'm ' + seconds.toString().padStart(2, '0') + 's';
        } else {
            displayTime = seconds + 's';
        }
        
        timerText.textContent = displayTime;
        timerText.className = 'time-remaining';
        
    }, 1000);
}

// =============================================
// NAVIGATION FUNCTIONS
// =============================================

// Select Gender for WhatsApp
function selectGender(gender) {
    const maleBtn = document.querySelector('.gender-btn.male');
    const femaleBtn = document.querySelector('.gender-btn.female');
    const linkContainer = document.getElementById('whatsappLinkContainer');
    const link = document.getElementById('whatsappLink');
    
    if (!maleBtn || !femaleBtn || !linkContainer || !link) return;
    
    maleBtn.classList.remove('selected');
    femaleBtn.classList.remove('selected');
    
    if (gender === 'male') {
        maleBtn.classList.add('selected');
        link.href = 'https://chat.whatsapp.com/Kbpkt2u9A3rC2Ggs49u5tC';
    } else {
        femaleBtn.classList.add('selected');
        link.href = 'https://chat.whatsapp.com/LAaHt6NR0lzAqrcDPUlSt8';
    }
    
    linkContainer.style.display = 'block';
}

// Show Class Notes
function showClassNotes() {
    const notesSection = document.getElementById('classNotesSection');
    const examsSection = document.getElementById('myExamsSection');
    const resultsSection = document.getElementById('resultsSection');
    const rankSection = document.getElementById('rankSection');
    const whatsappSection = document.getElementById('whatsappSection');
    
    if (notesSection) {
        notesSection.style.display = 'block';
        notesSection.scrollIntoView({ behavior: 'smooth' });
        notesSection.style.transition = 'all 0.3s ease';
        notesSection.style.boxShadow = '0 0 0 3px #4facfe';
        setTimeout(() => {
            notesSection.style.boxShadow = 'none';
        }, 2000);
    }
    
    if (examsSection) examsSection.style.display = 'none';
    if (resultsSection) resultsSection.style.display = 'none';
    if (rankSection) rankSection.style.display = 'none';
    if (whatsappSection) whatsappSection.style.display = 'none';
}

// Show My Exams / Online Test
function showMyExams() {
    const examsSection = document.getElementById('myExamsSection');
    const notesSection = document.getElementById('classNotesSection');
    const resultsSection = document.getElementById('resultsSection');
    const rankSection = document.getElementById('rankSection');
    const whatsappSection = document.getElementById('whatsappSection');
    
    if (examsSection) {
        examsSection.style.display = 'block';
        examsSection.scrollIntoView({ behavior: 'smooth' });
        examsSection.style.transition = 'all 0.3s ease';
        examsSection.style.boxShadow = '0 0 0 3px #4facfe';
        setTimeout(() => {
            examsSection.style.boxShadow = 'none';
        }, 2000);
        
        // Restart timers when section becomes visible
        setTimeout(function() {
            initializeTimers();
        }, 500);
    }
    
    if (notesSection) notesSection.style.display = 'none';
    if (resultsSection) resultsSection.style.display = 'none';
    if (rankSection) rankSection.style.display = 'none';
    if (whatsappSection) whatsappSection.style.display = 'none';
}

// Show Results
function showResults() {
    const resultsSection = document.getElementById('resultsSection');
    const notesSection = document.getElementById('classNotesSection');
    const examsSection = document.getElementById('myExamsSection');
    const rankSection = document.getElementById('rankSection');
    const whatsappSection = document.getElementById('whatsappSection');
    
    if (resultsSection) {
        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth' });
        resultsSection.style.transition = 'all 0.3s ease';
        resultsSection.style.boxShadow = '0 0 0 3px #4facfe';
        setTimeout(() => {
            resultsSection.style.boxShadow = 'none';
        }, 2000);
    }
    
    if (notesSection) notesSection.style.display = 'none';
    if (examsSection) examsSection.style.display = 'none';
    if (rankSection) rankSection.style.display = 'none';
    if (whatsappSection) whatsappSection.style.display = 'none';
}

// Show Rank
function showRank() {
    const rankSection = document.getElementById('rankSection');
    const resultsSection = document.getElementById('resultsSection');
    const notesSection = document.getElementById('classNotesSection');
    const examsSection = document.getElementById('myExamsSection');
    const whatsappSection = document.getElementById('whatsappSection');
    
    if (rankSection) {
        rankSection.style.display = 'block';
        rankSection.scrollIntoView({ behavior: 'smooth' });
        rankSection.style.transition = 'all 0.3s ease';
        rankSection.style.boxShadow = '0 0 0 3px #f6ad55';
        setTimeout(() => {
            rankSection.style.boxShadow = 'none';
        }, 2000);
    }
    
    if (resultsSection) resultsSection.style.display = 'none';
    if (notesSection) notesSection.style.display = 'none';
    if (examsSection) examsSection.style.display = 'none';
    if (whatsappSection) whatsappSection.style.display = 'none';
}

// Show WhatsApp
function showWhatsApp() {
    const whatsappSection = document.getElementById('whatsappSection');
    const resultsSection = document.getElementById('resultsSection');
    const notesSection = document.getElementById('classNotesSection');
    const examsSection = document.getElementById('myExamsSection');
    const rankSection = document.getElementById('rankSection');
    
    if (whatsappSection) {
        whatsappSection.style.display = 'block';
        whatsappSection.scrollIntoView({ behavior: 'smooth' });
        whatsappSection.style.transition = 'all 0.3s ease';
        whatsappSection.style.boxShadow = '0 0 0 3px #25D366';
        setTimeout(() => {
            whatsappSection.style.boxShadow = 'none';
        }, 2000);
    }
    
    if (resultsSection) resultsSection.style.display = 'none';
    if (notesSection) notesSection.style.display = 'none';
    if (examsSection) examsSection.style.display = 'none';
    if (rankSection) rankSection.style.display = 'none';
}

// Show Quiz
function showQuiz() {
    alert('🧠 Quiz\n\nTake interactive quizzes to test your knowledge.');
}

// Start Online Test
function startOnlineExam(examId) {
    if (confirm('📝 Are you ready to start the test?')) {
        window.location.href = '/online_test/' + examId;
    }
}

// Close sidebar on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const sidebar = document.getElementById('sidebar');
        if (sidebar && sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
        }
    }
});

// Make functions globally available
window.showClassNotes = showClassNotes;
window.showMyExams = showMyExams;
window.showResults = showResults;
window.showRank = showRank;
window.showQuiz = showQuiz;
window.showWhatsApp = showWhatsApp;
window.selectGender = selectGender;
window.startOnlineExam = startOnlineExam;
window.initializeTimers = initializeTimers;
