// static/js/admin_students.js

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Admin Students JS loaded');
    
    // Initialize date/time
    updateDateTime();
    setInterval(updateDateTime, 1000);

    // ============================================
    // SIDEBAR TOGGLE - FIXED FOR MOBILE
    // ============================================
    const menuBtn = document.getElementById('menuBtn');
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');

    function toggleSidebar(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        if (sidebar) {
            sidebar.classList.toggle('open');
            console.log('Sidebar toggled:', sidebar.classList.contains('open') ? 'OPEN' : 'CLOSED');
            
            // Toggle overlay
            let overlay = document.querySelector('.sidebar-overlay');
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.className = 'sidebar-overlay';
                document.body.appendChild(overlay);
            }
            
            if (sidebar.classList.contains('open')) {
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            } else {
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    }

    if (menuBtn) {
        menuBtn.addEventListener('click', toggleSidebar);
        menuBtn.addEventListener('touchstart', function(e) {
            e.preventDefault();
        }, { passive: false });
        console.log('✅ Menu button event added');
    }

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }

    // Close sidebar on overlay click
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('sidebar-overlay')) {
            if (sidebar && sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
                e.target.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 992) {
            const isSidebar = sidebar && sidebar.contains(e.target);
            const isMenuBtn = menuBtn && menuBtn.contains(e.target);
            const isSidebarToggle = sidebarToggle && sidebarToggle.contains(e.target);
            const isNavItem = e.target.closest('.nav-item');
            
            if (isNavItem) {
                return;
            }
            
            if (!isSidebar && !isMenuBtn && !isSidebarToggle && sidebar && sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
                const overlay = document.querySelector('.sidebar-overlay');
                if (overlay) {
                    overlay.classList.remove('active');
                }
                document.body.style.overflow = '';
            }
        }
    });

    // ============================================
    // STUDENT SEARCH FUNCTIONALITY
    // ============================================
    const searchInput = document.getElementById('searchStudent');
    if (searchInput) {
        searchInput.addEventListener('keyup', function() {
            const filter = this.value.toLowerCase();
            const rows = document.querySelectorAll('.students-table tbody tr');
            
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(filter) ? '' : 'none';
            });
        });
    }

    // ============================================
    // NOTIFICATION BELL
    // ============================================
    const notificationBell = document.querySelector('.notification-bell');
    if (notificationBell) {
        notificationBell.addEventListener('click', function() {
            alert('📬 You have 3 new notifications');
        });
    }

    // ============================================
    // DESKTOP: KEEP SIDEBAR OPEN
    // ============================================
    if (window.innerWidth > 992 && sidebar) {
        sidebar.classList.add('open');
    }

    // ============================================
    // HANDLE WINDOW RESIZE
    // ============================================
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 992 && sidebar) {
                sidebar.classList.add('open');
                const overlay = document.querySelector('.sidebar-overlay');
                if (overlay) {
                    overlay.classList.remove('active');
                }
                document.body.style.overflow = '';
            }
        }, 250);
    });

    console.log('✅ All initialized successfully');
});

// ============================================
// UPDATE DATE AND TIME
// ============================================
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

// ============================================
// TOGGLE PASSWORD VISIBILITY
// ============================================
function togglePassword(studentId) {
    const dotsSpan = document.getElementById('password-dots-' + studentId);
    const textSpan = document.getElementById('password-text-' + studentId);
    const icon = document.getElementById('password-icon-' + studentId);
    
    if (!dotsSpan || !textSpan || !icon) {
        console.error('Elements not found for student:', studentId);
        return;
    }
    
    if (dotsSpan.style.display === 'none') {
        dotsSpan.style.display = 'inline';
        textSpan.style.display = 'none';
        icon.className = 'fas fa-eye';
    } else {
        dotsSpan.style.display = 'none';
        textSpan.style.display = 'inline';
        icon.className = 'fas fa-eye-slash';
    }
}

// ============================================
// VIEW STUDENT
// ============================================
function viewStudent(id) {
    alert('👤 Viewing student details for ID: ' + id);
}

// ============================================
// EDIT STUDENT - Open Modal with data
// ============================================
function editStudent(id) {
    fetch('/get_student_data/' + id)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert('Error: ' + data.error);
                return;
            }
            
            document.getElementById('edit_student_id').value = data.id;
            document.getElementById('edit_name').value = data.name;
            document.getElementById('edit_class').value = data.class;
            document.getElementById('edit_school').value = data.school;
            document.getElementById('edit_phone').value = data.phone;
            document.getElementById('edit_password').value = '';
            
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

// ============================================
// CLOSE EDIT MODAL
// ============================================
function closeEditModal() {
    const modal = document.getElementById('editStudentModal');
    modal.classList.remove('show');
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

// ============================================
// CONFIRM DELETE
// ============================================
function confirmDelete() {
    return confirm('⚠️ Are you sure you want to delete this student? This action cannot be undone!');
}

// ============================================
// CLOSE MODAL ON ESCAPE KEY
// ============================================
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeEditModal();
        const sidebar = document.getElementById('sidebar');
        if (sidebar && sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
            const overlay = document.querySelector('.sidebar-overlay');
            if (overlay) {
                overlay.classList.remove('active');
            }
            document.body.style.overflow = '';
        }
    }
});

// ============================================
// CLOSE MODAL ON OUTSIDE CLICK
// ============================================
document.addEventListener('click', function(e) {
    const modal = document.getElementById('editStudentModal');
    if (modal && modal.classList.contains('show')) {
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent && !modalContent.contains(e.target)) {
            closeEditModal();
        }
    }
});

// ============================================
// MAKE FUNCTIONS GLOBALLY AVAILABLE
// ============================================
window.viewStudent = viewStudent;
window.editStudent = editStudent;
window.togglePassword = togglePassword;
window.confirmDelete = confirmDelete;
window.closeEditModal = closeEditModal;

console.log('✅ All functions loaded successfully');
