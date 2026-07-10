// static/js/exam.js

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

    // Exam search functionality
    const searchInput = document.getElementById('searchExam');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            const rows = document.querySelectorAll('.exam-table tbody tr');
            
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }

    // Notification bell click
    const notificationBell = document.querySelector('.notification-bell');
    if (notificationBell) {
        notificationBell.addEventListener('click', function() {
            alert('📬 You have 3 new notifications');
        });
    }

    // Set default date for modal
    const dateInput = document.getElementById('exam_date');
    if (dateInput) {
        const today = new Date();
        dateInput.value = today.toISOString().split('T')[0];
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

// Open Exam Type Modal
function openExamTypeModal() {
    const modal = document.getElementById('examTypeModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

// Close Exam Type Modal
function closeExamTypeModal() {
    const modal = document.getElementById('examTypeModal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Select Exam Type
function selectExamType(type) {
    closeExamTypeModal();
    openAddExamModal(type);
}

// Open Add Exam Modal
function openAddExamModal(type) {
    const modal = document.getElementById('addExamModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Set exam type
        document.getElementById('exam_type').value = type || 'offline';
        
        // Show/hide online fields
        const onlineFields = document.getElementById('onlineExamFields');
        if (type === 'online') {
            onlineFields.style.display = 'block';
            document.querySelector('#addExamModal .modal-header h2').innerHTML = 
                '<i class="fas fa-globe"></i> Add Online Exam';
        } else {
            onlineFields.style.display = 'none';
            document.querySelector('#addExamModal .modal-header h2').innerHTML = 
                '<i class="fas fa-school"></i> Add Offline Exam';
        }
        
        // Set default date
        const dateInput = document.getElementById('exam_date');
        if (dateInput) {
            const today = new Date();
            dateInput.value = today.toISOString().split('T')[0];
        }
        
        // Clear previous form data
        const form = document.getElementById('examForm');
        if (form) {
            form.reset();
            document.getElementById('exam_type').value = type || 'offline';
        }
    }
}

// Close Add Exam Modal
function closeAddExamModal() {
    const modal = document.getElementById('addExamModal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// View Exam
function viewExam(id) {
    alert('👁️ Viewing exam details for ID: ' + id);
}

// Edit Exam
function editExam(id) {
    alert('✏️ Editing exam with ID: ' + id);
}

// Confirm Delete
function confirmDelete() {
    return confirm('⚠️ Are you sure you want to delete this exam? This action cannot be undone!');
}

// Close modal on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeExamTypeModal();
        closeAddExamModal();
        const sidebar = document.getElementById('sidebar');
        if (sidebar && sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
        }
    }
});

// Close modal on outside click
document.addEventListener('click', function(e) {
    const typeModal = document.getElementById('examTypeModal');
    if (typeModal && typeModal.style.display === 'flex') {
        const modalContent = typeModal.querySelector('.modal-content');
        if (modalContent && !modalContent.contains(e.target) && !e.target.closest('.add-exam-btn')) {
            closeExamTypeModal();
        }
    }
    
    const addModal = document.getElementById('addExamModal');
    if (addModal && addModal.style.display === 'flex') {
        const modalContent = addModal.querySelector('.modal-content');
        if (modalContent && !modalContent.contains(e.target) && !e.target.closest('.exam-type-card')) {
            closeAddExamModal();
        }
    }
});

// Make functions globally available
window.openExamTypeModal = openExamTypeModal;
window.closeExamTypeModal = closeExamTypeModal;
window.selectExamType = selectExamType;
window.openAddExamModal = openAddExamModal;
window.closeAddExamModal = closeAddExamModal;
window.viewExam = viewExam;
window.editExam = editExam;
window.confirmDelete = confirmDelete;
