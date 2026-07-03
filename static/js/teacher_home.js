// static/js/teacher_home.js

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

    // Student search functionality
    const searchInput = document.getElementById('searchStudent');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            const studentCards = document.querySelectorAll('.student-card');
            
            studentCards.forEach(card => {
                const name = card.dataset.name || '';
                if (name.includes(searchTerm)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Notification bell click
    const notificationBell = document.querySelector('.notification-bell');
    if (notificationBell) {
        notificationBell.addEventListener('click', function() {
            alert('📬 You have 5 new notifications');
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

// Show My Students
function showMyStudents() {
    const studentsSection = document.getElementById('studentsSection');
    if (studentsSection) {
        studentsSection.scrollIntoView({ behavior: 'smooth' });
        studentsSection.style.transition = 'all 0.3s ease';
        studentsSection.style.boxShadow = '0 0 0 3px #f093fb';
        setTimeout(() => {
            studentsSection.style.boxShadow = 'none';
        }, 2000);
    }
}

// Show Schedule
function showSchedule() {
    alert('📅 Class Schedule\n\nYou can view:\n• Today\'s classes\n• Weekly schedule\n• Class timings\n• Subject details');
}

// Show Quiz
function showQuiz() {
    alert('🧠 Quiz Management\n\nYou can:\n• Create new quizzes\n• Manage quiz questions\n• Set quiz timings\n• View quiz results');
}

// Show Rank
function showRank() {
    alert('🏆 Rankings\n\nYou can view:\n• Class-wise rankings\n• Subject-wise rankings\n• Overall performance\n• Top performers');
}

// View Student
function viewStudent(id) {
    alert('👤 Viewing student details for ID: ' + id);
}

// Send Message
function sendMessage(id) {
    alert('✉️ Sending message to student ID: ' + id);
}

// View Student Result
function viewStudentResult(id) {
    alert('📄 Viewing results for student ID: ' + id);
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
window.showMyStudents = showMyStudents;
window.showSchedule = showSchedule;
window.showQuiz = showQuiz;
window.showRank = showRank;
window.viewStudent = viewStudent;
window.sendMessage = sendMessage;
window.viewStudentResult = viewStudentResult;