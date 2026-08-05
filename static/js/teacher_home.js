// static/js/teacher_home.js

document.addEventListener("DOMContentLoaded", function () {
    // 1. Initialize Date & Time
    updateDateTime();
    setInterval(updateDateTime, 1000);

    // 2. Handle URL Hash Navigation
    const hash = window.location.hash;
    if (hash === "#students") {
        showMyStudents();
    } else if (hash === "#study-material") {
        showStudyMaterial();
    } else if (hash === "#quiz") {
        showQuiz();
    }

    // 3. Clean Duplicate Class Options
    removeDuplicateClasses();

    // 4. Sidebar Toggle Functionality
    const menuBtn = document.getElementById('menuBtn');
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');

    function toggleSidebar() {
        if (sidebar) {
            sidebar.classList.toggle('open');
        }
    }

    if (menuBtn) menuBtn.addEventListener('click', toggleSidebar);
    if (sidebarToggle) sidebarToggle.addEventListener('click', toggleSidebar);

    // Close sidebar on clicking outside (Mobile view)
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 992 && sidebar) {
            const isSidebar = sidebar.contains(e.target);
            const isMenuBtn = menuBtn && menuBtn.contains(e.target);
            if (!isSidebar && !isMenuBtn && sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
            }
        }
    });

    // 5. Notification Bell
    const notificationBell = document.querySelector('.notification-bell');
    if (notificationBell) {
        notificationBell.addEventListener('click', function() {
            alert('📬 You have 5 new notifications');
        });
    }

    // 6. Action Cards Animation
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

    // 7. Hide Upload Form Initially
    const uploadForm = document.getElementById('uploadForm');
    if (uploadForm) {
        uploadForm.style.display = 'none';
    }
});

// Remove Duplicate Class Options in Select Dropdowns
function removeDuplicateClasses() {
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

// Update Date and Time UI
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

// Filter Students List
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
        if (selectedClass !== 'all' && cardClass !== selectedClass) {
            show = false;
        }
        if (searchTerm && !cardName.includes(searchTerm)) {
            show = false;
        }
        if (show) {
            visibleCount++;
        }
        
        card.style.display = show ? '' : 'none';
    });
    
    const totalCount = document.querySelector('.total-count');
    if (totalCount) {
        const total = document.querySelectorAll('.student-card').length;
        totalCount.textContent = visibleCount + ' / ' + total + ' Students';
    }
}

// View Section: My Students
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

// View Section: Study Material
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

// View Student Dashboard directly as Teacher
function viewStudentDashboard(studentId) {
    window.location.href = '/student_dashboard_as_teacher/' + studentId;
}

// Student Action Placeholders
function viewStudentResult(id) {
    alert('📄 Viewing results for student ID: ' + id);
}

function sendMessage(id) {
    alert('✉️ Sending message to student ID: ' + id);
}

function showQuiz() {
    alert('🧠 Quiz Management\n\nYou can:\n• Create new quizzes\n• Manage quiz questions\n• Set quiz timings\n• View quiz results');
}

// Modal Handlers
function openStudyMaterialModal() {
    const modal = document.getElementById('studyMaterialModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeStudyMaterialModal() {
    const modal = document.getElementById('studyMaterialModal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Global Keyboard & Overlay Click Listeners for Modal
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeStudyMaterialModal();
        const sidebar = document.getElementById('sidebar');
        if (sidebar && sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
        }
    }
});

document.addEventListener('click', function(e) {
    const modal = document.getElementById('studyMaterialModal');
    if (modal && modal.style.display === 'flex') {
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent && !modalContent.contains(e.target) && !e.target.closest('.add-btn')) {
            closeStudyMaterialModal();
        }
    }
});

// Export Functions Globally
window.showMyStudents = showMyStudents;
window.showStudyMaterial = showStudyMaterial;
window.showQuiz = showQuiz;
window.viewStudentDashboard = viewStudentDashboard;
window.viewStudentResult = viewStudentResult;
window.sendMessage = sendMessage;
window.filterStudents = filterStudents;
window.openStudyMaterialModal = openStudyMaterialModal;
window.closeStudyMaterialModal = closeStudyMaterialModal;
