// static/js/teacher_home.js
// teacher_home.js - এই ফাংশন যোগ করুন
function removeDuplicateClasses() {
    // Class Filter
    const classFilter = document.getElementById('classFilter');
    if (classFilter) {
        const options = classFilter.querySelectorAll('option');
        const uniqueClasses = new Set();
        options.forEach(option => {
            if (option.value !== 'all' && uniqueClasses.has(option.value)) {
                option.remove();
            } else if (option.value !== 'all') {
                uniqueClasses.add(option.value);
            }
        });
    }
    
    // Study Material Modal
    const modalClassSelect = document.querySelector('#studyMaterialModal select[name="class"]');
    if (modalClassSelect) {
        const options = modalClassSelect.querySelectorAll('option');
        const uniqueClasses = new Set();
        options.forEach(option => {
            if (option.value !== '' && uniqueClasses.has(option.value)) {
                option.remove();
            } else if (option.value !== '') {
                uniqueClasses.add(option.value);
            }
        });
    }
}

// DOMContentLoaded এ কল করুন
document.addEventListener('DOMContentLoaded', function() {
    removeDuplicateClasses();
    // ... বাকি কোড
});
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

    // Remove the upload form display toggle
    const uploadForm = document.getElementById('uploadForm');
    if (uploadForm) {
        uploadForm.style.display = 'none';
    }
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

// Filter students by class and search
function filterStudents() {
    const classFilter = document.getElementById('classFilter');
    const searchInput = document.getElementById('searchStudent');
    const selectedClass = classFilter ? classFilter.value : 'all';
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const studentCards = document.querySelectorAll('.student-card');
    
    let visibleCount = 0;
    
    studentCards.forEach(card => {
        const cardClass = card.dataset.class || '';
        const cardName = card.dataset.name || '';
        
        let show = true;
        
        // Class filter
        if (selectedClass !== 'all' && cardClass !== selectedClass) {
            show = false;
        }
        
        // Search filter
        if (searchTerm && !cardName.includes(searchTerm)) {
            show = false;
        }
        
        if (show) {
            visibleCount++;
        }
        
        card.style.display = show ? '' : 'none';
    });
    
    // Update total count
    const totalCount = document.querySelector('.total-count');
    if (totalCount) {
        const total = document.querySelectorAll('.student-card').length;
        totalCount.textContent = visibleCount + ' / ' + total + ' Students';
    }
}

// Show My Students
function showMyStudents() {
    const studentsSection = document.getElementById('studentsSection');
    const studySection = document.getElementById('studyMaterialSection');
    
    if (studentsSection) {
        studentsSection.style.display = 'block';
        studentsSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
            studentsSection.style.transition = 'all 0.3s ease';
            studentsSection.style.boxShadow = '0 0 0 3px #f093fb';
            setTimeout(() => {
                studentsSection.style.boxShadow = 'none';
            }, 2000);
        }, 100);
    }
    
    if (studySection) {
        studySection.style.display = 'none';
    }
}

// Show Study Material
function showStudyMaterial() {
    const studySection = document.getElementById('studyMaterialSection');
    const studentsSection = document.getElementById('studentsSection');
    
    if (studySection) {
        studySection.style.display = 'block';
        studySection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
            studySection.style.transition = 'all 0.3s ease';
            studySection.style.boxShadow = '0 0 0 3px #4facfe';
            setTimeout(() => {
                studySection.style.boxShadow = 'none';
            }, 2000);
        }, 100);
    }
    
    if (studentsSection) {
        studentsSection.style.display = 'none';
    }
}

// View Student Dashboard - Teacher directly views student dashboard
function viewStudentDashboard(studentId) {
    // Directly go to student dashboard with student ID (no password required)
    window.location.href = '/student_dashboard_as_teacher/' + studentId;
}

// View Student Result
function viewStudentResult(id) {
    alert('📄 Viewing results for student ID: ' + id);
}

// Send Message
function sendMessage(id) {
    alert('✉️ Sending message to student ID: ' + id);
}

// Show Quiz
function showQuiz() {
    alert('🧠 Quiz Management\n\nYou can:\n• Create new quizzes\n• Manage quiz questions\n• Set quiz timings\n• View quiz results');
}

// Open Study Material Modal
function openStudyMaterialModal() {
    const modal = document.getElementById('studyMaterialModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

// Close Study Material Modal
function closeStudyMaterialModal() {
    const modal = document.getElementById('studyMaterialModal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Close modal on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeStudyMaterialModal();
        const sidebar = document.getElementById('sidebar');
        if (sidebar && sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
        }
    }
});

// Close modal on outside click
document.addEventListener('click', function(e) {
    const modal = document.getElementById('studyMaterialModal');
    if (modal && modal.style.display === 'flex') {
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent && !modalContent.contains(e.target) && !e.target.closest('.add-btn')) {
            closeStudyMaterialModal();
        }
    }
});

// Make functions globally available
window.showMyStudents = showMyStudents;
window.showStudyMaterial = showStudyMaterial;
window.showQuiz = showQuiz;
window.viewStudentDashboard = viewStudentDashboard;
window.viewStudentResult = viewStudentResult;
window.sendMessage = sendMessage;
window.filterStudents = filterStudents;
window.openStudyMaterialModal = openStudyMaterialModal;
window.closeStudyMaterialModal = closeStudyMaterialModal;
