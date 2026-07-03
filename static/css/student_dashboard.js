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
        const rankFill = document.querySelector('.rank-progress-fill-big');
        if (rankFill) {
            const width = rankFill.style.width;
            rankFill.style.width = '0%';
            setTimeout(function() {
                rankFill.style.transition = 'width 1.5s ease';
                rankFill.style.width = width;
            }, 300);
        }
    }, 500);

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

// View My Results
function viewMyResults() {
    alert('📄 My Results\n\nYou can view all your exam results here.');
    // window.location.href = '/student_results';
}

// View My Rank
function viewMyRank() {
    alert('🏆 My Rank\n\nCheck your position among all students.');
    // window.location.href = '/student_rank';
}

// Start Quiz
function startQuiz() {
    alert('🧠 Quiz\n\nTake interactive quizzes to test your knowledge.');
    // window.location.href = '/student_quiz';
}

// View Fees
function viewFees() {
    alert('💰 Fees\n\nView your fees details and payment history.');
    // window.location.href = '/student_fees';
}

// View Notice
function viewNotice() {
    alert('📢 Notice\n\nView all latest notices and announcements.');
    // window.location.href = '/student_notice';
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
window.viewMyResults = viewMyResults;
window.viewMyRank = viewMyRank;
window.startQuiz = startQuiz;
window.viewFees = viewFees;
window.viewNotice = viewNotice;