// static/js/student_dashboard.js

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
        // Toggle body class to prevent scrolling when sidebar is open
        document.body.classList.toggle('sidebar-open');
    }

    function closeSidebar() {
        sidebar.classList.remove('open');
        document.body.classList.remove('sidebar-open');
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
                closeSidebar();
            }
        }
    });

    // =============================================
    // CLOSE SIDEBAR ON NAVIGATION ITEM CLICK (MOBILE)
    // =============================================
    const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
    navItems.forEach(function(item) {
        item.addEventListener('click', function(e) {
            // Close sidebar on mobile when any nav item is clicked
            if (window.innerWidth <= 992) {
                // Don't close immediately for logout - let it navigate
                if (!this.classList.contains('logout')) {
                    // For normal navigation items
                    closeSidebar();
                } else {
                    // For logout, close after a tiny delay to allow navigation
                    setTimeout(closeSidebar, 100);
                }
            }
        });
    });

    // Notification bell click
    const notificationBell = document.querySelector('.notification-bell');
    if (notificationBell) {
        notificationBell.addEventListener('click', function() {
            alert('📬 You have 2 new notifications');
        });
    }

    // Animate rank progress on load
    setTimeout(function() {
        const rankFill = document.getElementById('rankProgressFill');
        if (rankFill) {
            const progressWidth = rankFill.getAttribute('data-progress') || 0;
            rankFill.style.width = '0%';
            rankFill.style.transition = 'width 1.5s ease';
            setTimeout(function() {
                rankFill.style.width = progressWidth + '%';
            }, 300);
        }
    }, 500);

    // Start all timers
    setTimeout(function() {
        initializeTimers();
    }, 1000);

    // Add animation to cards on load
    const cards = document.querySelectorAll('.action-card');
    cards.forEach(function(card, index) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(function() {
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

// =============================================
// TIMER FUNCTIONS
// =============================================

// Initialize all exam timers
function initializeTimers() {
    const examItems = document.querySelectorAll('.exam-item');
    console.log("🔍 Found exam items:", examItems.length);
    
    if (examItems.length === 0) {
        console.log("⚠️ No exam items found");
        return;
    }
    
    examItems.forEach(function(item) {
        const examId = item.id.replace('exam-item-', '');
        console.log("⏰ Starting timer for exam:", examId);
        startTimer(examId);
    });
}

// Start timer for a specific exam
function startTimer(examId) {
    const timerText = document.getElementById('timer-text-' + examId);
    const startBtn = document.getElementById('start-btn-' + examId);
    
    console.log("⏳ Timer for exam", examId, ":", timerText);
    
    if (!timerText) {
        console.log("❌ Timer text not found for exam:", examId);
        return;
    }
    
    // Get exam data from the DOM
    const examItem = document.getElementById('exam-item-' + examId);
    if (!examItem) {
        console.log("❌ Exam item not found:", examId);
        return;
    }
    
    // Extract exam date and time from the exam info
    const examInfo = examItem.querySelector('.exam-info');
    if (!examInfo) {
        console.log("❌ Exam info not found:", examId);
        return;
    }
    
    const text = examInfo.textContent || '';
    console.log("📝 Exam info text:", text);
    
    // Parse date and time
    let examDate = null;
    let examTime = null;
    
    const dateMatch = text.match(/Date:\s*([\d-]+)/);
    const timeMatch = text.match(/Time:\s*([\d:]+)/);
    
    if (dateMatch) {
        examDate = dateMatch[1];
        console.log("📅 Date found:", examDate);
    }
    if (timeMatch) {
        examTime = timeMatch[1];
        console.log("🕐 Time found:", examTime);
    }
    
    if (!examDate || !examTime) {
        timerText.textContent = '⏰ No date set';
        console.log("❌ Invalid date/time for exam:", examId);
        return;
    }
    
    // Create target date
    const targetDate = new Date(examDate + 'T' + examTime + ':00');
    const now = new Date();
    
    // Calculate difference in seconds
    let diffSeconds = Math.floor((targetDate - now) / 1000);
    console.log("⏱️ Difference in seconds:", diffSeconds);
    
    // If exam time has passed, show "Test Started"
    if (diffSeconds <= 0) {
        timerText.textContent = '✅ Test Started';
        timerText.className = 'time-up';
        if (startBtn) {
            startBtn.style.display = 'inline-flex';
        }
        return;
    }
    
    // Update timer every second
    const timerInterval = setInterval(function() {
        diffSeconds--;
        
        if (diffSeconds <= 0) {
            clearInterval(timerInterval);
            timerText.textContent = '✅ Test Started';
            timerText.className = 'time-up';
            if (startBtn) {
                startBtn.style.display = 'inline-flex';
            }
            return;
        }
        
        // Format time
        const hours = Math.floor(diffSeconds / 3600);
        const minutes = Math.floor((diffSeconds % 3600) / 60);
        const seconds = diffSeconds % 60;
        
        let displayTime = '';
        if (hours > 0) {
            displayTime = hours + 'h ' + minutes.toString().padStart(2, '0') + 'm ' + seconds.toString().padStart(2, '0') + 's';
        } else if (minutes > 0) {
            displayTime = minutes + 'm ' + seconds.toString().padStart(2, '0') + 's';
        } else {
            displayTime = seconds + 's';
        }
        
        timerText.textContent = displayTime;
        timerText.className = 'time-remaining';
        
    }, 1000);
}

// =============================================
// NAVIGATION FUNCTIONS
// =============================================

// Helper function to close sidebar on mobile
function closeSidebarOnMobile() {
    const sidebar = document.getElementById('sidebar');
    if (window.innerWidth <= 992 && sidebar && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        document.body.classList.remove('sidebar-open');
    }
}

// Select Gender for WhatsApp
function selectGender(gender) {
    const maleBtn = document.querySelector('.gender-btn.male');
    const femaleBtn = document.querySelector('.gender-btn.female');
    const linkContainer = document.getElementById('whatsappLinkContainer');
    const link = document.getElementById('whatsappLink');
    
    if (!maleBtn || !femaleBtn || !linkContainer || !link) return;
    
    maleBtn.classList.remove('selected');
    femaleBtn.classList.remove('selected');
    
    if (gender === 'male') {
        maleBtn.classList.add('selected');
        link.href = 'https://chat.whatsapp.com/Kbpkt2u9A3rC2Ggs49u5tC';
    } else {
        femaleBtn.classList.add('selected');
        link.href = 'https://chat.whatsapp.com/LAaHt6NR0lzAqrcDPUlSt8';
    }
    
    linkContainer.style.display = 'block';
    closeSidebarOnMobile();
}

// Show Class Notes
function showClassNotes() {
    const notesSection = document.getElementById('classNotesSection');
    const examsSection = document.getElementById('myExamsSection');
    const resultsSection = document.getElementById('resultsSection');
    const rankSection = document.getElementById('rankSection');
    const whatsappSection = document.getElementById('whatsappSection');
    
    if (notesSection) {
        notesSection.style.display = 'block';
        notesSection.scrollIntoView({ behavior: 'smooth' });
        notesSection.style.transition = 'all 0.3s ease';
        notesSection.style.boxShadow = '0 0 0 3px #4facfe';
        setTimeout(() => {
            notesSection.style.boxShadow = 'none';
        }, 2000);
    }
    
    if (examsSection) examsSection.style.display = 'none';
    if (resultsSection) resultsSection.style.display = 'none';
    if (rankSection) rankSection.style.display = 'none';
    if (whatsappSection) whatsappSection.style.display = 'none';
    
    closeSidebarOnMobile();
}

// Show My Exams / Online Test
function showMyExams() {
    const examsSection = document.getElementById('myExamsSection');
    const notesSection = document.getElementById('classNotesSection');
    const resultsSection = document.getElementById('resultsSection');
    const rankSection = document.getElementById('rankSection');
    const whatsappSection = document.getElementById('whatsappSection');
    
    if (examsSection) {
        examsSection.style.display = 'block';
        examsSection.scrollIntoView({ behavior: 'smooth' });
        examsSection.style.transition = 'all 0.3s ease';
        examsSection.style.boxShadow = '0 0 0 3px #4facfe';
        setTimeout(() => {
            examsSection.style.boxShadow = 'none';
        }, 2000);
        
        // Restart timers when section becomes visible
        setTimeout(function() {
            initializeTimers();
        }, 500);
    }
    
    if (notesSection) notesSection.style.display = 'none';
    if (resultsSection) resultsSection.style.display = 'none';
    if (rankSection) rankSection.style.display = 'none';
    if (whatsappSection) whatsappSection.style.display = 'none';
    
    closeSidebarOnMobile();
}

// Show Results
function showResults() {
    const resultsSection = document.getElementById('resultsSection');
    const notesSection = document.getElementById('classNotesSection');
    const examsSection = document.getElementById('myExamsSection');
    const rankSection = document.getElementById('rankSection');
    const whatsappSection = document.getElementById('whatsappSection');
    
    if (resultsSection) {
        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth' });
        resultsSection.style.transition = 'all 0.3s ease';
        resultsSection.style.boxShadow = '0 0 0 3px #4facfe';
        setTimeout(() => {
            resultsSection.style.boxShadow = 'none';
        }, 2000);
    }
    
    if (notesSection) notesSection.style.display = 'none';
    if (examsSection) examsSection.style.display = 'none';
    if (rankSection) rankSection.style.display = 'none';
    if (whatsappSection) whatsappSection.style.display = 'none';
    
    closeSidebarOnMobile();
}

// Show Rank
function showRank() {
    const rankSection = document.getElementById('rankSection');
    const resultsSection = document.getElementById('resultsSection');
    const notesSection = document.getElementById('classNotesSection');
    const examsSection = document.getElementById('myExamsSection');
    const whatsappSection = document.getElementById('whatsappSection');
    
    if (rankSection) {
        rankSection.style.display = 'block';
        rankSection.scrollIntoView({ behavior: 'smooth' });
        rankSection.style.transition = 'all 0.3s ease';
        rankSection.style.boxShadow = '0 0 0 3px #f6ad55';
        setTimeout(() => {
            rankSection.style.boxShadow = 'none';
        }, 2000);
    }
    
    if (resultsSection) resultsSection.style.display = 'none';
    if (notesSection) notesSection.style.display = 'none';
    if (examsSection) examsSection.style.display = 'none';
    if (whatsappSection) whatsappSection.style.display = 'none';
    
    closeSidebarOnMobile();
}

// Show WhatsApp
function showWhatsApp() {
    const whatsappSection = document.getElementById('whatsappSection');
    const resultsSection = document.getElementById('resultsSection');
    const notesSection = document.getElementById('classNotesSection');
    const examsSection = document.getElementById('myExamsSection');
    const rankSection = document.getElementById('rankSection');
    
    if (whatsappSection) {
        whatsappSection.style.display = 'block';
        whatsappSection.scrollIntoView({ behavior: 'smooth' });
        whatsappSection.style.transition = 'all 0.3s ease';
        whatsappSection.style.boxShadow = '0 0 0 3px #25D366';
        setTimeout(() => {
            whatsappSection.style.boxShadow = 'none';
        }, 2000);
    }
    
    if (resultsSection) resultsSection.style.display = 'none';
    if (notesSection) notesSection.style.display = 'none';
    if (examsSection) examsSection.style.display = 'none';
    if (rankSection) rankSection.style.display = 'none';
    
    closeSidebarOnMobile();
}

// =============================================
// QUIZ FUNCTION - NEW TAB OPEN
// =============================================
function showQuiz() {
    // নতুন ট্যাবে Quiz খুলবে
    window.open('/quiz', '_blank');
    closeSidebarOnMobile();
}

// Start Online Test
function startOnlineExam(examId) {
    if (confirm('📝 Are you ready to start the test?')) {
        window.location.href = '/online_test/' + examId;
    }
}

// Close sidebar on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const sidebar = document.getElementById('sidebar');
        if (sidebar && sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
            document.body.classList.remove('sidebar-open');
        }
    }
});

// Make functions globally available
window.showClassNotes = showClassNotes;
window.showMyExams = showMyExams;
window.showResults = showResults;
window.showRank = showRank;
window.showQuiz = showQuiz;
window.showWhatsApp = showWhatsApp;
window.selectGender = selectGender;
window.startOnlineExam = startOnlineExam;
window.initializeTimers = initializeTimers;
window.closeSidebarOnMobile = closeSidebarOnMobile;

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
    closeSidebarOnMobile();
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
    fetch('/change_password', {
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
            document.getElementById('currentPassword').style.borderColor = '#f56565';
        }
    })
    .catch(error => {
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

// Close modal on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeChangePassword();
    }
});



// =============================================
// NOTICE FUNCTIONS - Student
// =============================================

// Load Notices on page load
document.addEventListener('DOMContentLoaded', function() {
    // ... আপনার existing DOMContentLoaded কোড ...
    
    // Load notices after 1 second
    setTimeout(function() {
        loadNotices();
    }, 1500);
});

// Show Notices (called from notification bell)
function showNotices() {
    const noticesSection = document.getElementById('noticesSection');
    if (noticesSection) {
        // Hide other sections
        document.getElementById('classNotesSection').style.display = 'none';
        document.getElementById('myExamsSection').style.display = 'none';
        document.getElementById('resultsSection').style.display = 'none';
        document.getElementById('rankSection').style.display = 'none';
        document.getElementById('whatsappSection').style.display = 'none';
        
        // Show notices section
        noticesSection.style.display = 'block';
        noticesSection.scrollIntoView({ behavior: 'smooth' });
        
        // Highlight the section
        noticesSection.style.transition = 'all 0.3s ease';
        noticesSection.style.boxShadow = '0 0 0 3px #f093fb';
        setTimeout(() => {
            noticesSection.style.boxShadow = 'none';
        }, 2000);
        
        // Reload notices
        loadNotices();
    }
    closeSidebarOnMobile();
}

// Load Notices from Server
function loadNotices() {
    const noticesList = document.getElementById('noticesList');
    const noticeCount = document.getElementById('noticeCount');
    const noticeBadge = document.getElementById('noticeBadge');
    
    // Show loading state
    noticesList.innerHTML = `
        <div class="loading-notices">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Loading notices...</p>
        </div>
    `;
    
    fetch('/get_student_notices')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const notices = data.notices || [];
                const unreadCount = data.unread_count || 0;
                
                // Update badge
                if (noticeBadge) {
                    noticeBadge.textContent = unreadCount;
                    if (unreadCount > 0) {
                        noticeBadge.style.display = 'flex';
                        noticeBadge.style.background = '#f56565';
                    } else {
                        noticeBadge.style.display = 'none';
                    }
                }
                
                // Update count
                if (noticeCount) {
                    noticeCount.textContent = notices.length + ' Notices';
                }
                
                if (notices.length === 0) {
                    noticesList.innerHTML = `
                        <div class="empty-notices">
                            <i class="fas fa-bullhorn"></i>
                            <h3>No Notices Yet</h3>
                            <p>Your teachers will send notices here</p>
                        </div>
                    `;
                    return;
                }
                
                // Display notices
                let html = '';
                notices.forEach(function(notice) {
                    const isRead = notice.is_read || false;
                    const date = new Date(notice.created_at);
                    const dateStr = date.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                    });
                    const timeStr = date.toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                    });
                    
                    html += `
                        <div class="notice-item ${isRead ? 'read' : 'unread'}" onclick="markNoticeRead(${notice.id})">
                            <div class="notice-status-dot ${isRead ? 'read-dot' : 'unread-dot'}"></div>
                            <div class="notice-content">
                                <div class="notice-header">
                                    <h4>${escapeHtml(notice.title)}</h4>
                                    <span class="notice-date">
                                        <i class="far fa-calendar-alt"></i> ${dateStr} at ${timeStr}
                                    </span>
                                </div>
                                <p class="notice-message">${escapeHtml(notice.message)}</p>
                                <div class="notice-footer">
                                    <span class="notice-teacher">
                                        <i class="fas fa-chalkboard-teacher"></i> From: ${escapeHtml(notice.teacher_name)}
                                    </span>
                                    ${!isRead ? '<span class="notice-unread-badge">New</span>' : ''}
                                </div>
                            </div>
                        </div>
                    `;
                });
                
                noticesList.innerHTML = html;
                
            } else {
                noticesList.innerHTML = `
                    <div class="empty-notices error">
                        <i class="fas fa-exclamation-circle"></i>
                        <h3>Error Loading Notices</h3>
                        <p>${data.message || 'Please try again later'}</p>
                        <button onclick="loadNotices()" class="retry-btn">
                            <i class="fas fa-sync-alt"></i> Retry
                        </button>
                    </div>
                `;
            }
        })
        .catch(error => {
            console.error('Error loading notices:', error);
            noticesList.innerHTML = `
                <div class="empty-notices error">
                    <i class="fas fa-exclamation-circle"></i>
                    <h3>Connection Error</h3>
                    <p>Unable to load notices. Please check your connection.</p>
                    <button onclick="loadNotices()" class="retry-btn">
                        <i class="fas fa-sync-alt"></i> Retry
                    </button>
                </div>
            `;
        });
}

// Mark Notice as Read
function markNoticeRead(noticeId) {
    fetch('/mark_notice_read', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notice_id: noticeId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Reload notices to update UI
            loadNotices();
        }
    })
    .catch(error => {
        console.error('Error marking notice as read:', error);
    });
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Check for new notices periodically (every 30 seconds)
setInterval(function() {
    // Only check if page is visible
    if (!document.hidden) {
        loadNotices();
    }
}, 30000);

// Listen for visibility change to reload when tab becomes active
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        loadNotices();
    }
});

// Make functions globally available
window.showNotices = showNotices;
window.loadNotices = loadNotices;
window.markNoticeRead = markNoticeRead;
