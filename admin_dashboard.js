// static/js/admin_dashboard.js

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
            alert('📬 You have 3 new notifications');
        });
    }

    // Add animation to cards on load
    const cards = document.querySelectorAll('.action-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
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

// Function for Fees Details
function viewFeesDetails(event) {
    event.preventDefault();
    alert('💰 Fees Details Page\n\nYou can view:\n• Total fees collected\n• Pending dues\n• Payment history\n• Student-wise fees');
    // window.location.href = '/fees_details';
}

// Function for Exam Management
function manageExams(event) {
    event.preventDefault();
    alert('📝 Exam Management Page\n\nYou can:\n• Schedule new exams\n• Manage exam subjects\n• Set exam dates\n• View exam lists');
    // window.location.href = '/exams';
}

// Function for Results
function viewResults(event) {
    event.preventDefault();
    alert('📄 Results Page\n\nYou can:\n• Publish exam results\n• View student results\n• Generate report cards\n• Analyze performance');
    // window.location.href = '/results';
}

// Function for Rankings
function viewRank(event) {
    event.preventDefault();
    alert('🏆 Rankings Page\n\nYou can view:\n• Class-wise rankings\n• Subject-wise rankings\n• Overall performance\n• Top performers');
    // window.location.href = '/rankings';
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