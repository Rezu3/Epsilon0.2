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
            alert('📬 Write a new message');
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



// =============================================
// CHANGE PASSWORD FUNCTIONS
// =============================================

// Show Change Password Modal
function showChangePassword() {
    const modal = document.getElementById('changePasswordModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Clear previous form data
        document.getElementById('changePasswordForm').reset();
        document.getElementById('passwordError').style.display = 'none';
        document.getElementById('passwordSuccess').style.display = 'none';
        
        // Remove any previous error states
        document.querySelectorAll('.password-input-wrapper input').forEach(input => {
            input.style.borderColor = '#e2e8f0';
        });
    }
}

// Close Change Password Modal
function closeChangePassword() {
    const modal = document.getElementById('changePasswordModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Toggle password visibility
function togglePasswordVisibility(inputId, button) {
    const input = document.getElementById(inputId);
    const icon = button.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fas fa-eye-slash';
    } else {
        input.type = 'password';
        icon.className = 'fas fa-eye';
    }
}

// Change Password Form Submit
function changePassword(event) {
    event.preventDefault();
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorDiv = document.getElementById('passwordError');
    const successDiv = document.getElementById('passwordSuccess');
    
    // Reset error states
    errorDiv.style.display = 'none';
    successDiv.style.display = 'none';
    document.querySelectorAll('.password-input-wrapper input').forEach(input => {
        input.style.borderColor = '#e2e8f0';
    });
    
    // Validate new password
    if (newPassword.length < 6) {
        errorDiv.textContent = '⚠️ New password must be at least 6 characters long';
        errorDiv.style.display = 'block';
        document.getElementById('newPassword').style.borderColor = '#f56565';
        return;
    }
    
    // Validate confirm password
    if (newPassword !== confirmPassword) {
        errorDiv.textContent = '⚠️ New password and confirm password do not match';
        errorDiv.style.display = 'block';
        document.getElementById('confirmPassword').style.borderColor = '#f56565';
        return;
    }
    
    // Disable submit button
    const submitBtn = document.querySelector('.submit-password-btn');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Updating...';
    
    // Send request to server
    fetch('/change_password_teacher', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            current_password: currentPassword,
            new_password: newPassword
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            successDiv.textContent = '✅ ' + data.message;
            successDiv.style.display = 'block';
            errorDiv.style.display = 'none';
            
            // Reset form
            document.getElementById('changePasswordForm').reset();
            
            // Auto close after 2 seconds
            setTimeout(() => {
                closeChangePassword();
            }, 2000);
        } else {
            errorDiv.textContent = '❌ ' + data.message;
            errorDiv.style.display = 'block';
            if (data.message.includes('Current password')) {
                document.getElementById('currentPassword').style.borderColor = '#f56565';
            }
        }
    })
    .catch(error => {
        console.error('Error:', error);
        errorDiv.textContent = '❌ An error occurred. Please try again.';
        errorDiv.style.display = 'block';
    })
    .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-save"></i> Update Password';
    });
}

// Make functions globally available
window.showChangePassword = showChangePassword;
window.closeChangePassword = closeChangePassword;
window.togglePasswordVisibility = togglePasswordVisibility;
window.changePassword = changePassword;




// =============================================
// NOTICE MODAL FUNCTIONS
// =============================================

// Open Notice Modal
function openNoticeModal() {
    const modal = document.getElementById('noticeModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Reset form
        document.getElementById('noticeForm').reset();
        document.getElementById('noticePreview').style.display = 'none';
        document.getElementById('noticeStatus').style.display = 'none';
        document.getElementById('classSelectGroup').style.display = 'none';
        document.getElementById('subjectSelectGroup').style.display = 'none';
        
        // Reset target radio
        document.querySelector('input[name="target"][value="all"]').checked = true;
    }
}

// Close Notice Modal
function closeNoticeModal() {
    const modal = document.getElementById('noticeModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Target selection change
document.addEventListener('DOMContentLoaded', function() {
    const targetRadios = document.querySelectorAll('input[name="target"]');
    targetRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const classGroup = document.getElementById('classSelectGroup');
            const subjectGroup = document.getElementById('subjectSelectGroup');
            
            if (this.value === 'class') {
                classGroup.style.display = 'block';
                subjectGroup.style.display = 'none';
            } else if (this.value === 'subject') {
                classGroup.style.display = 'none';
                subjectGroup.style.display = 'block';
            } else {
                classGroup.style.display = 'none';
                subjectGroup.style.display = 'none';
            }
            
            // Hide preview when target changes
            document.getElementById('noticePreview').style.display = 'none';
        });
    });
    
    // Real-time preview on input
    document.getElementById('noticeTitle').addEventListener('input', function() {
        if (document.getElementById('noticePreview').style.display === 'block') {
            previewNotice();
        }
    });
    
    document.getElementById('noticeMessage').addEventListener('input', function() {
        if (document.getElementById('noticePreview').style.display === 'block') {
            previewNotice();
        }
    });
});

// Preview Notice
function previewNotice() {
    const title = document.getElementById('noticeTitle').value || 'No Title';
    const message = document.getElementById('noticeMessage').value || 'No Message';
    const target = document.querySelector('input[name="target"]:checked');
    const targetClass = document.getElementById('noticeClass').value;
    const targetSubject = document.getElementById('noticeSubject').value;
    
    let targetText = 'All Students';
    if (target && target.value === 'class' && targetClass) {
        targetText = 'Class ' + targetClass;
    } else if (target && target.value === 'subject' && targetSubject) {
        targetText = 'Subject: ' + targetSubject;
    }
    
    document.getElementById('previewTitle').textContent = title;
    document.getElementById('previewMessage').textContent = message;
    document.getElementById('previewTarget').textContent = 'To: ' + targetText;
    document.getElementById('noticePreview').style.display = 'block';
}

// Send Notice
function sendNotice(event) {
    event.preventDefault();
    
    const title = document.getElementById('noticeTitle').value.trim();
    const message = document.getElementById('noticeMessage').value.trim();
    const target = document.querySelector('input[name="target"]:checked').value;
    const targetClass = document.getElementById('noticeClass').value;
    const targetSubject = document.getElementById('noticeSubject').value;
    
    // Validate
    if (!title) {
        showNoticeStatus('error', 'Please enter a notice title!');
        document.getElementById('noticeTitle').focus();
        return;
    }
    
    if (!message) {
        showNoticeStatus('error', 'Please enter a notice message!');
        document.getElementById('noticeMessage').focus();
        return;
    }
    
    if (target === 'class' && !targetClass) {
        showNoticeStatus('error', 'Please select a class!');
        return;
    }
    
    if (target === 'subject' && !targetSubject) {
        showNoticeStatus('error', 'Please select a subject!');
        return;
    }
    
    // Disable submit button
    const submitBtn = document.querySelector('.send-notice-btn');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    // Prepare data
    const data = {
        title: title,
        message: message,
        target: target,
        target_class: targetClass,
        target_subject: targetSubject
    };
    
    // Send to server
    fetch('/send_notice', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showNoticeStatus('success', '✅ ' + data.message);
            
            // Reset form
            document.getElementById('noticeForm').reset();
            document.getElementById('noticePreview').style.display = 'none';
            
            // Close modal after 2 seconds
            setTimeout(() => {
                closeNoticeModal();
                // Update notification badge
                updateNotificationBadge();
            }, 2000);
        } else {
            showNoticeStatus('error', '❌ ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showNoticeStatus('error', '❌ An error occurred. Please try again.');
    })
    .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Notice';
    });
}

// Show notice status
function showNoticeStatus(type, message) {
    const statusDiv = document.getElementById('noticeStatus');
    statusDiv.style.display = 'block';
    statusDiv.className = 'notice-status ' + type;
    statusDiv.textContent = message;
}

// Update notification badge (will be implemented in step 4)
function updateNotificationBadge() {
    // This will be implemented later
    console.log('📬 Notification badge updated');
}

// Make functions globally available
window.openNoticeModal = openNoticeModal;
window.closeNoticeModal = closeNoticeModal;
window.previewNotice = previewNotice;
window.sendNotice = sendNotice;
