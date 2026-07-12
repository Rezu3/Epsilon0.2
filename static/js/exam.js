// static/js/exam.js

document.addEventListener('DOMContentLoaded', function() {
    updateDateTime();
    setInterval(updateDateTime, 1000);

    const menuBtn = document.getElementById('menuBtn');
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');

    function toggleSidebar() {
        sidebar.classList.toggle('open');
    }

    if (menuBtn) menuBtn.addEventListener('click', toggleSidebar);
    if (sidebarToggle) sidebarToggle.addEventListener('click', toggleSidebar);

    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 992) {
            const isSidebar = sidebar.contains(e.target);
            const isMenuBtn = menuBtn && menuBtn.contains(e.target);
            if (!isSidebar && !isMenuBtn && sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
            }
        }
    });

    const searchInput = document.getElementById('searchExam');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            const rows = document.querySelectorAll('.exam-table tbody tr');
            rows.forEach(row => {
                row.style.display = row.textContent.toLowerCase().includes(searchTerm) ? '' : 'none';
            });
        });
    }

    const notificationBell = document.querySelector('.notification-bell');
    if (notificationBell) {
        notificationBell.addEventListener('click', function() {
            alert('📬 You have 3 new notifications');
        });
    }

    const dateInput = document.getElementById('exam_date');
    if (dateInput) {
        const today = new Date();
        dateInput.value = today.toISOString().split('T')[0];
    }
});

function updateDateTime() {
    const now = new Date();
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const element = document.getElementById('currentDateTime');
    if (element) element.textContent = now.toLocaleDateString('en-US', options);
}

// Exam Type Modal
function openExamTypeModal() {
    const modal = document.getElementById('examTypeModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeExamTypeModal() {
    const modal = document.getElementById('examTypeModal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

function selectExamType(type) {
    closeExamTypeModal();
    const modal = document.getElementById('addExamModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';

        document.getElementById('exam_type').value = type;
        const onlineFields = document.getElementById('onlineExamFields');
        const modalTitle = document.querySelector('#addExamModal .modal-header h2');

        if (type === 'online') {
            onlineFields.style.display = 'block';
            document.getElementById('exam_class').required = true;
            document.getElementById('exam_time').required = true;
            document.getElementById('duration').required = true;
            modalTitle.innerHTML = '<i class="fas fa-globe"></i> Add Online Exam';
        } else {
            onlineFields.style.display = 'none';
            document.getElementById('exam_class').required = false;
            document.getElementById('exam_time').required = false;
            document.getElementById('duration').required = false;
            modalTitle.innerHTML = '<i class="fas fa-school"></i> Add Offline Exam';
        }

        const dateInput = document.getElementById('exam_date');
        if (dateInput) {
            const today = new Date();
            dateInput.value = today.toISOString().split('T')[0];
        }

        const form = document.getElementById('examForm');
        if (form) {
            form.reset();
            document.getElementById('exam_type').value = type;
        }
    }
}

function closeAddExamModal() {
    const modal = document.getElementById('addExamModal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Form Submit Validation
document.getElementById('examForm')?.addEventListener('submit', function(e) {
    const examType = document.getElementById('exam_type').value;
    if (examType === 'online') {
        const examClass = document.getElementById('exam_class').value;
        const examTime = document.getElementById('exam_time').value;
        const duration = document.getElementById('duration').value;
        if (!examClass || !examTime || !duration) {
            e.preventDefault();
            alert('⚠️ For online exam, please fill all fields: Class, Time, and Duration!');
            return false;
        }
    }
    return true;
});

// View/Edit/Delete
function viewExam(id) { alert('👁️ Viewing exam details for ID: ' + id); }
function editExam(id) { alert('✏️ Editing exam with ID: ' + id); }
function confirmDelete() { return confirm('⚠️ Are you sure you want to delete this exam? This action cannot be undone!'); }

// Close modal on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeExamTypeModal();
        closeAddExamModal();
        const sidebar = document.getElementById('sidebar');
        if (sidebar && sidebar.classList.contains('open')) sidebar.classList.remove('open');
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

window.openExamTypeModal = openExamTypeModal;
window.closeExamTypeModal = closeExamTypeModal;
window.selectExamType = selectExamType;
window.closeAddExamModal = closeAddExamModal;
window.viewExam = viewExam;
window.editExam = editExam;
window.confirmDelete = confirmDelete;
