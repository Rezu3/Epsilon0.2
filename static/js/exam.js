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
    // Reset edit mode
    document.getElementById('edit_mode').value = '0';
    document.getElementById('exam_id').value = '';
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

// Global variable to store exam ID for editing
let editExamId = null;

function selectExamType(type) {
    closeExamTypeModal();
    const modal = document.getElementById('addExamModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';

        document.getElementById('exam_type').value = type;
        const onlineFields = document.getElementById('onlineExamFields');
        const modalTitle = document.getElementById('examModalTitle');
        const submitBtn = document.getElementById('submitExamBtn');

        // Check if editing
        const isEdit = document.getElementById('edit_mode').value === '1';

        if (type === 'online') {
            onlineFields.style.display = 'block';
            document.getElementById('exam_class').required = true;
            document.getElementById('exam_time').required = true;
            document.getElementById('duration').required = true;
            if (isEdit) {
                modalTitle.innerHTML = '<i class="fas fa-edit"></i> Edit Online Exam';
                submitBtn.innerHTML = '<i class="fas fa-save"></i> Update Exam';
            } else {
                modalTitle.innerHTML = '<i class="fas fa-globe"></i> Add Online Exam';
                submitBtn.innerHTML = '<i class="fas fa-plus"></i> Create Exam';
            }
        } else {
            onlineFields.style.display = 'none';
            document.getElementById('exam_class').required = false;
            document.getElementById('exam_time').required = false;
            document.getElementById('duration').required = false;
            if (isEdit) {
                modalTitle.innerHTML = '<i class="fas fa-edit"></i> Edit Offline Exam';
                submitBtn.innerHTML = '<i class="fas fa-save"></i> Update Exam';
            } else {
                modalTitle.innerHTML = '<i class="fas fa-school"></i> Add Offline Exam';
                submitBtn.innerHTML = '<i class="fas fa-plus"></i> Create Exam';
            }
        }

        // If editing, load exam data
        if (isEdit && editExamId) {
            loadExamData(editExamId, type);
        } else {
            // Reset form for new exam
            const form = document.getElementById('examForm');
            if (form) {
                form.reset();
                document.getElementById('exam_type').value = type;
            }
            const dateInput = document.getElementById('exam_date');
            if (dateInput) {
                const today = new Date();
                dateInput.value = today.toISOString().split('T')[0];
            }
        }

        // Update form action for edit
        const form = document.getElementById('examForm');
        if (isEdit && editExamId) {
            form.action = "/edit_exam/" + editExamId;
        } else {
            form.action = "/add_exam";
        }
    }
}

function loadExamData(examId, type) {
    fetch('/get_exam_data/' + examId)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert('Error loading exam data: ' + data.error);
                return;
            }
            document.getElementById('exam_name').value = data.exam_name || '';
            document.getElementById('teacher_name').value = data.teacher_name || '';
            document.getElementById('subject').value = data.subject || '';
            document.getElementById('full_marks').value = data.full_marks || '';
            document.getElementById('exam_date').value = data.exam_date || '';
            
            if (type === 'online') {
                document.getElementById('exam_class').value = data.class || '';
                document.getElementById('exam_time').value = data.exam_time || '';
                document.getElementById('duration').value = data.duration || '';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error loading exam data');
        });
}

function closeAddExamModal() {
    const modal = document.getElementById('addExamModal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
    // Reset edit mode
    document.getElementById('edit_mode').value = '0';
    document.getElementById('exam_id').value = '';
    editExamId = null;
    // Reset form action
    const form = document.getElementById('examForm');
    if (form) {
        form.action = "/add_exam";
    }
}

// =============================================
// 🔥 EDIT EXAM - FIXED VERSION
// =============================================
function editExam(id) {
    console.log('Edit clicked for exam ID:', id);
    editExamId = id;
    // Show confirmation modal
    const modal = document.getElementById('editConfirmModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeEditConfirmModal() {
    const modal = document.getElementById('editConfirmModal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
    // Don't reset editExamId here, keep it for proceedEdit
}

// =============================================
// 🔥 PROCEED EDIT - FIXED VERSION
// =============================================
function proceedEdit() {
    console.log('Proceed Edit called, exam ID:', editExamId);
    
    // Close confirmation modal first
    const confirmModal = document.getElementById('editConfirmModal');
    if (confirmModal) {
        confirmModal.style.display = 'none';
        confirmModal.classList.remove('show');
        document.body.style.overflow = '';
    }
    
    const examId = editExamId;
    if (!examId) {
        alert('No exam selected!');
        return;
    }

    console.log('Fetching exam data for ID:', examId);
    
    // Fetch exam data
    fetch('/get_exam_data/' + examId)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Exam data received:', data);
            
            if (data.error) {
                alert('Error loading exam data: ' + data.error);
                return;
            }
            
            // Set edit mode
            document.getElementById('edit_mode').value = '1';
            document.getElementById('exam_id').value = examId;
            
            // Set the exam type
            const examType = data.exam_type || 'offline';
            document.getElementById('exam_type').value = examType;
            
            // Open the add modal with the correct type
            const modal = document.getElementById('addExamModal');
            if (modal) {
                modal.style.display = 'flex';
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
            
            // Show/hide online fields
            const onlineFields = document.getElementById('onlineExamFields');
            const modalTitle = document.getElementById('examModalTitle');
            const submitBtn = document.getElementById('submitExamBtn');
            
            if (examType === 'online') {
                onlineFields.style.display = 'block';
                document.getElementById('exam_class').required = true;
                document.getElementById('exam_time').required = true;
                document.getElementById('duration').required = true;
                modalTitle.innerHTML = '<i class="fas fa-edit"></i> Edit Online Exam';
                submitBtn.innerHTML = '<i class="fas fa-save"></i> Update Exam';
            } else {
                onlineFields.style.display = 'none';
                document.getElementById('exam_class').required = false;
                document.getElementById('exam_time').required = false;
                document.getElementById('duration').required = false;
                modalTitle.innerHTML = '<i class="fas fa-edit"></i> Edit Offline Exam';
                submitBtn.innerHTML = '<i class="fas fa-save"></i> Update Exam';
            }
            
            // Load data into form
            document.getElementById('exam_name').value = data.exam_name || '';
            document.getElementById('teacher_name').value = data.teacher_name || '';
            document.getElementById('subject').value = data.subject || '';
            document.getElementById('full_marks').value = data.full_marks || '';
            document.getElementById('exam_date').value = data.exam_date || '';
            
            if (examType === 'online') {
                document.getElementById('exam_class').value = data.class || '';
                document.getElementById('exam_time').value = data.exam_time || '';
                document.getElementById('duration').value = data.duration || '';
            }
            
            // Update form action
            const form = document.getElementById('examForm');
            if (form) {
                form.action = "/edit_exam/" + examId;
            }
            
            console.log('Edit modal opened successfully');
        })
        .catch(error => {
            console.error('Error in proceedEdit:', error);
            alert('Error loading exam data. Please try again.');
        });
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

// View Exam
function viewExam(id) {
    alert('👁️ Viewing exam details for ID: ' + id);
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
        closeEditConfirmModal();
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
        if (modalContent && !modalContent.contains(e.target) && !e.target.closest('.exam-type-card') && !e.target.closest('.edit-btn')) {
            closeAddExamModal();
        }
    }
    const confirmModal = document.getElementById('editConfirmModal');
    if (confirmModal && confirmModal.style.display === 'flex') {
        const modalContent = confirmModal.querySelector('.modal-content');
        if (modalContent && !modalContent.contains(e.target) && !e.target.closest('.edit-btn')) {
            closeEditConfirmModal();
        }
    }
});

// Teacher Sidebar Navigation Functions
function showMyStudents() {
    window.location.href = "/teacher_home#students";
}

function showStudyMaterial() {
    window.location.href = "/teacher_home#study-material";
}

function showQuiz() {
    window.location.href = "/teacher_home#quiz";
}

// Make functions globally accessible
window.openExamTypeModal = openExamTypeModal;
window.closeExamTypeModal = closeExamTypeModal;
window.selectExamType = selectExamType;
window.closeAddExamModal = closeAddExamModal;
window.editExam = editExam;
window.viewExam = viewExam;
window.confirmDelete = confirmDelete;
window.closeEditConfirmModal = closeEditConfirmModal;
window.proceedEdit = proceedEdit;
