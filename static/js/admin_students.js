// static/js/admin_students.js

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
            const rows = document.querySelectorAll('.students-table tbody tr');
            
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

// Toggle password visibility - প্রতিটি Student এর জন্য আলাদা
function togglePassword(studentId) {
    const dotsSpan = document.getElementById('password-dots-' + studentId);
    const textSpan = document.getElementById('password-text-' + studentId);
    const icon = document.getElementById('password-icon-' + studentId);
    
    if (!dotsSpan || !textSpan || !icon) {
        console.error('Elements not found for student:', studentId);
        return;
    }
    
    if (dotsSpan.style.display === 'none') {
        // Currently showing password, hide it
        dotsSpan.style.display = 'inline';
        textSpan.style.display = 'none';
        icon.className = 'fas fa-eye';
    } else {
        // Currently hiding password, show it
        dotsSpan.style.display = 'none';
        textSpan.style.display = 'inline';
        icon.className = 'fas fa-eye-slash';
    }
}

// View student
function viewStudent(id) {
    alert('👤 Viewing student details for ID: ' + id);
}

// Edit student - Open Modal with data
function editStudent(id) {
    // Fetch student data
    fetch('/get_student_data/' + id)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert('Error: ' + data.error);
                return;
            }
            
            // Fill the form
            document.getElementById('edit_student_id').value = data.id;
            document.getElementById('edit_name').value = data.name;
            document.getElementById('edit_class').value = data.class;
            document.getElementById('edit_school').value = data.school;
            document.getElementById('edit_phone').value = data.phone;
            document.getElementById('edit_password').value = '';
            
            // Show modal
            const modal = document.getElementById('editStudentModal');
            modal.classList.add('show');
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error loading student data');
        });
}

// Close edit modal
function closeEditModal() {
    const modal = document.getElementById('editStudentModal');
    modal.classList.remove('show');
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

// Confirm delete
function confirmDelete() {
    return confirm('⚠️ Are you sure you want to delete this student? This action cannot be undone!');
}

// Close modal on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeEditModal();
        const sidebar = document.getElementById('sidebar');
        if (sidebar && sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
        }
    }
});

// Close modal on outside click
document.addEventListener('click', function(e) {
    const modal = document.getElementById('editStudentModal');
    if (modal && modal.classList.contains('show')) {
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent && !modalContent.contains(e.target)) {
            closeEditModal();
        }
    }
});

// Make functions globally available
window.viewStudent = viewStudent;
window.editStudent = editStudent;
window.togglePassword = togglePassword;
window.confirmDelete = confirmDelete;
window.closeEditModal = closeEditModal;
