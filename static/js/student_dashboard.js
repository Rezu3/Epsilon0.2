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

    // Close sidebar on nav item click (mobile)
    const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
    navItems.forEach(function(item) {
        item.addEventListener('click', function(e) {
            if (window.innerWidth <= 992) {
                if (!this.classList.contains('logout')) {
                    closeSidebar();
                } else {
                    setTimeout(closeSidebar, 100);
                }
            }
        });
    });

    // Notification bell click - show notices
    const notificationBell = document.querySelector('.notification-bell');
    if (notificationBell) {
        notificationBell.addEventListener('click', function() {
            showNotices();
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

    // Load notices after 1.5 seconds
    setTimeout(function() {
        loadNotices();
    }, 1500);

    // Check notification permission after 3 seconds
    setTimeout(function() {
        checkNotificationPermission();
    }, 3000);

    // =============================================
    // FILTER EXAMS - Show only latest pending + all completed
    // =============================================
    filterExams();
});

// =============================================
// FILTER EXAMS - Core Logic
// =============================================
function filterExams() {
    const examItems = document.querySelectorAll('.exam-item');
    if (examItems.length === 0) return;

    // Get all exam IDs that the student has already taken (from results)
    const takenExamIds = new Set();
    const resultItems = document.querySelectorAll('.result-item');
    resultItems.forEach(function(item) {
        const resultText = item.querySelector('.result-info h4');
        if (resultText) {
            // Try to match exam name from results with exam items
            const examName = resultText.textContent.trim();
            examItems.forEach(function(examItem) {
                const examNameElement = examItem.querySelector('.exam-info h4');
                if (examNameElement && examNameElement.textContent.trim() === examName) {
                    const examId = examItem.getAttribute('data-exam-id');
                    if (examId) {
                        takenExamIds.add(examId);
                    }
                }
            });
        }
    });

    // Also check for exam status from hidden input
    examItems.forEach(function(item) {
        const statusInput = item.querySelector('.exam-status');
        if (statusInput && statusInput.value === 'taken') {
            const examId = item.getAttribute('data-exam-id');
            if (examId) {
                takenExamIds.add(examId);
            }
        }
    });

    // Separate pending and taken exams
    let pendingExams = [];
    let takenExams = [];

    examItems.forEach(function(item) {
        const examId = item.getAttribute('data-exam-id');
        if (takenExamIds.has(examId)) {
            takenExams.push(item);
        } else {
            pendingExams.push(item);
        }
    });

    // For pending exams: sort by date (newest first) and keep only the latest
    pendingExams.sort(function(a, b) {
        const dateA = a.getAttribute('data-exam-date') || '';
        const dateB = b.getAttribute('data-exam-date') || '';
        return dateB.localeCompare(dateA);
    });

    // Hide all pending exams first
    pendingExams.forEach(function(item) {
        item.style.display = 'none';
    });

    // Show ONLY the latest pending exam (first one after sorting)
    if (pendingExams.length > 0) {
        pendingExams[0].style.display = 'flex';
    }

    // Make sure all taken exams are visible
    takenExams.forEach(function(item) {
        item.style.display = 'flex';
    });

    // Update the total count
    const totalCountElement = document.getElementById('examTotalCount');
    if (totalCountElement) {
        const visibleCount = (pendingExams.length > 0 ? 1 : 0) + takenExams.length;
        const totalExams = pendingExams.length + takenExams.length;
        if (visibleCount < totalExams) {
            totalCountElement.textContent = visibleCount + ' Tests (Latest Pending + Completed)';
        } else {
            totalCountElement.textContent = visibleCount + ' Tests';
        }
    }

    // Re-initialize timers for visible exams
    setTimeout(function() {
        const visibleExamItems = document.querySelectorAll('.exam-item[style*="display: flex"]');
        visibleExamItems.forEach(function(item) {
            const examId = item.getAttribute('data-exam-id');
            if (examId) {
                startTimer(examId);
            }
        });
    }, 500);
}

// =============================================
// DATE & TIME
// =============================================

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

function initializeTimers() {
    const examItems = document.querySelectorAll('.exam-item[style*="display: flex"]');
    if (examItems.length === 0) {
        // Also check for items that might not have inline style but are visible
        const allExamItems = document.querySelectorAll('.exam-item');
        allExamItems.forEach(function(item) {
            if (item.style.display !== 'none') {
                const examId = item.getAttribute('data-exam-id');
                if (examId) {
                    startTimer(examId);
                }
            }
        });
        return;
    }
    
    examItems.forEach(function(item) {
        const examId = item.getAttribute('data-exam-id');
        if (examId) {
            startTimer(examId);
        }
    });
}

function startTimer(examId) {
    const timerText = document.getElementById('timer-text-' + examId);
    const startBtn = document.getElementById('start-btn-' + examId);
    
    if (!timerText) return;
    
    const examItem = document.getElementById('exam-item-' + examId);
    if (!examItem) return;
    
    const examInfo = examItem.querySelector('.exam-info');
    if (!examInfo) return;
    
    const text = examInfo.textContent || '';
    
    let examDate = null;
    let examTime = null;
    
    const dateMatch = text.match(/Date:\s*([\d-]+)/);
    const timeMatch = text.match(/Time:\s*([\d:]+)/);
    
    if (dateMatch) examDate = dateMatch[1];
    if (timeMatch) examTime = timeMatch[1];
    
    if (!examDate || !examTime) {
        timerText.textContent = '⏰ No date set';
        return;
    }
    
    const targetDate = new Date(examDate + 'T' + examTime + ':00');
    const now = new Date();
    let diffSeconds = Math.floor((targetDate - now) / 1000);
    
    if (diffSeconds <= 0) {
        timerText.textContent = '✅ Test Started';
        timerText.className = 'time-up';
        if (startBtn) {
            startBtn.style.display = 'inline-flex';
        }
        return;
    }
    
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
// NAVIGATION FUNCTIONS - EACH SHOWS ONLY ONE SECTION
// =============================================

// Helper: Hide all sections
function hideAllSections() {
    const sections = [
        'noticesSection',
        'classNotesSection',
        'myExamsSection',
        'resultsSection',
        'rankSection',
        'whatsappSection'
    ];
    
    sections.forEach(function(id) {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });
}

// Helper: Close sidebar on mobile
function closeSidebarOnMobile() {
    const sidebar = document.getElementById('sidebar');
    if (window.innerWidth <= 992 && sidebar && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        document.body.classList.remove('sidebar-open');
    }
}

// 1. Show Notices
function showNotices() {
    hideAllSections();
    
    const noticesSection = document.getElementById('noticesSection');
    if (noticesSection) {
        noticesSection.style.display = 'block';
        noticesSection.scrollIntoView({ behavior: 'smooth' });
        noticesSection.style.transition = 'all 0.3s ease';
        noticesSection.style.boxShadow = '0 0 0 3px #f093fb';
        setTimeout(() => {
            noticesSection.style.boxShadow = 'none';
        }, 2000);
        loadNotices();
    }
    closeSidebarOnMobile();
}

// 2. Show Class Notes
function showClassNotes() {
    hideAllSections();
    
    const classNotesSection = document.getElementById('classNotesSection');
    if (classNotesSection) {
        classNotesSection.style.display = 'block';
        classNotesSection.scrollIntoView({ behavior: 'smooth' });
        classNotesSection.style.transition = 'all 0.3s ease';
        classNotesSection.style.boxShadow = '0 0 0 3px #4facfe';
        setTimeout(() => {
            classNotesSection.style.boxShadow = 'none';
        }, 2000);
    }
    closeSidebarOnMobile();
}

// 3. Show My Exams
function showMyExams() {
    hideAllSections();
    
    const myExamsSection = document.getElementById('myExamsSection');
    if (myExamsSection) {
        myExamsSection.style.display = 'block';
        myExamsSection.scrollIntoView({ behavior: 'smooth' });
        myExamsSection.style.transition = 'all 0.3s ease';
        myExamsSection.style.boxShadow = '0 0 0 3px #4facfe';
        setTimeout(() => {
            myExamsSection.style.boxShadow = 'none';
        }, 2000);
        setTimeout(function() {
            filterExams();
            initializeTimers();
        }, 500);
    }
    closeSidebarOnMobile();
}

// 4. Show Results
function showResults() {
    hideAllSections();
    
    const resultsSection = document.getElementById('resultsSection');
    if (resultsSection) {
        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth' });
        resultsSection.style.transition = 'all 0.3s ease';
        resultsSection.style.boxShadow = '0 0 0 3px #4facfe';
        setTimeout(() => {
            resultsSection.style.boxShadow = 'none';
        }, 2000);
    }
    closeSidebarOnMobile();
}

// 5. Show Rank
function showRank() {
    hideAllSections();
    
    const rankSection = document.getElementById('rankSection');
    if (rankSection) {
        rankSection.style.display = 'block';
        rankSection.scrollIntoView({ behavior: 'smooth' });
        rankSection.style.transition = 'all 0.3s ease';
        rankSection.style.boxShadow = '0 0 0 3px #f6ad55';
        setTimeout(() => {
            rankSection.style.boxShadow = 'none';
        }, 2000);
    }
    closeSidebarOnMobile();
}

// 6. Show WhatsApp
function showWhatsApp() {
    hideAllSections();
    
    const whatsappSection = document.getElementById('whatsappSection');
    if (whatsappSection) {
        whatsappSection.style.display = 'block';
        whatsappSection.scrollIntoView({ behavior: 'smooth' });
        whatsappSection.style.transition = 'all 0.3s ease';
        whatsappSection.style.boxShadow = '0 0 0 3px #25D366';
        setTimeout(() => {
            whatsappSection.style.boxShadow = 'none';
        }, 2000);
    }
    closeSidebarOnMobile();
}

// 7. Show Quiz (opens in new tab)
function showQuiz() {
    window.open('/quiz', '_blank');
    closeSidebarOnMobile();
}

// =============================================
// 🔥 START ONLINE EXAM - POP-UP / SPLIT SCREEN DETECTION
// =============================================
function startOnlineExam(examId) {
    // =============================================
    // POP-UP / SPLIT SCREEN DETECTION
    // =============================================
    
    // 1. Picture-in-Picture (PiP) চেক
    const isPiPActive = document.pictureInPictureElement !== null;
    
    // 2. Window Openers (pop-up windows) চেক
    const hasPopups = window.opener !== null || window.parent !== window;
    
    // 3. Multiple windows/tabs detection (approximate)
    const isSplitScreen = window.outerWidth < window.screen.availWidth || 
                           window.outerHeight < window.screen.availHeight;
    
    // 4. Fullscreen API check - যদি fullscreen না থাকে তাহলে pop-up থাকতে পারে
    const isNotFullscreen = !document.fullscreenElement && 
                            !document.mozFullScreenElement && 
                            !document.webkitFullscreenElement;
    
    // 5. Window focus check
    const isWindowFocused = document.hasFocus();
    
    // 6. Screen orientation lock check (mobile split screen)
    const isSplitScreenMobile = window.screen.width < window.screen.availWidth || 
                                window.screen.height < window.screen.availHeight;
    
    // =============================================
    // CONDITION CHECK - কোনো একটি সত্য হলে ব্লক করবে
    // =============================================
    if (isPiPActive || hasPopups || isSplitScreen || isSplitScreenMobile || (isNotFullscreen && !isWindowFocused)) {
        // Pop-up বা split screen detected - Start button কাজ করবে না
        alert('⚠️ Please close all pop-ups, split screens, and PiP mode before starting the exam!');
        return;
    }
    
// =============================================
    // সব ঠিক থাকলে confirm দিয়ে start করবে
    // =============================================
    const confirmMessage = 
        "⚠️ পরীক্ষার জরুরি নিয়মাবলী:\n" +
        "1. Back ❌\n" +
        "2. Tab/Page Change ❌\n" +
        "3. Refresh ❌\n" +
        "4. Phone Off ❌\n" +
        "5. Pop-up Use❌\n" +
        "6. Split Screen Use❌\n\n" +
        "আপনি কি পরীক্ষা শুরু করতে প্রস্তুত?";

    if (confirm(confirmMessage)) {
        window.location.href = '/online_test/' + examId;
    }
}

// =============================================
// WHATSAPP - SELECT GENDER
// =============================================

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

// =============================================
// NOTICES - LOAD, MARK READ, AUTO REFRESH
// =============================================

function loadNotices() {
    const noticesList = document.getElementById('noticesList');
    const noticeCount = document.getElementById('noticeCount');
    const noticeBadge = document.getElementById('noticeBadge');
    const noticeNavBadge = document.getElementById('noticeNavBadge');
    
    if (!noticesList) return;
    
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
                
                // Update badges
                if (noticeBadge) {
                    noticeBadge.textContent = unreadCount;
                    noticeBadge.style.display = unreadCount > 0 ? 'flex' : 'none';
                }
                if (noticeNavBadge) {
                    noticeNavBadge.textContent = unreadCount;
                    noticeNavBadge.style.display = unreadCount > 0 ? 'inline' : 'none';
                }
                
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
        .catch(function(error) {
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
            loadNotices();
        }
    })
    .catch(function(error) {
        console.error('Error marking notice as read:', error);
    });
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Auto refresh notices every 30 seconds
setInterval(function() {
    if (!document.hidden) {
        loadNotices();
    }
}, 30000);

// Refresh when tab becomes visible
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        loadNotices();
    }
});

// =============================================
// CHANGE PASSWORD
// =============================================

function showChangePassword() {
    const modal = document.getElementById('changePasswordModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        document.getElementById('changePasswordForm').reset();
        document.getElementById('passwordError').style.display = 'none';
        document.getElementById('passwordSuccess').style.display = 'none';
        document.querySelectorAll('.password-input-wrapper input').forEach(function(input) {
            input.style.borderColor = '#e2e8f0';
        });
    }
    closeSidebarOnMobile();
}

function closeChangePassword() {
    const modal = document.getElementById('changePasswordModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

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

function changePassword(event) {
    event.preventDefault();
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorDiv = document.getElementById('passwordError');
    const successDiv = document.getElementById('passwordSuccess');
    
    errorDiv.style.display = 'none';
    successDiv.style.display = 'none';
    document.querySelectorAll('.password-input-wrapper input').forEach(function(input) {
        input.style.borderColor = '#e2e8f0';
    });
    
    if (newPassword.length < 6) {
        errorDiv.textContent = '⚠️ New password must be at least 6 characters long';
        errorDiv.style.display = 'block';
        document.getElementById('newPassword').style.borderColor = '#f56565';
        return;
    }
    
    if (newPassword !== confirmPassword) {
        errorDiv.textContent = '⚠️ New password and confirm password do not match';
        errorDiv.style.display = 'block';
        document.getElementById('confirmPassword').style.borderColor = '#f56565';
        return;
    }
    
    const submitBtn = document.querySelector('.submit-password-btn');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Updating...';
    
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
    .then(function(response) { return response.json(); })
    .then(function(data) {
        if (data.success) {
            successDiv.textContent = '✅ ' + data.message;
            successDiv.style.display = 'block';
            errorDiv.style.display = 'none';
            document.getElementById('changePasswordForm').reset();
            setTimeout(function() {
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
    .catch(function(error) {
        errorDiv.textContent = '❌ An error occurred. Please try again.';
        errorDiv.style.display = 'block';
    })
    .finally(function() {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-save"></i> Update Password';
    });
}

// Close password modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeChangePassword();
    }
});

// =============================================
// PUSH NOTIFICATION
// =============================================

const VAPID_PUBLIC_KEY = 'BP9fT8x3Lgk7yX5pM2nR6vW8zQ4sA1bC3dE5fG7hI9jK1lM3nO5pQ7rS9tU1vW3xY5z';

function checkNotificationPermission() {
    if (!('Notification' in window)) {
        console.log('⚠️ Notification not supported');
        return;
    }
    
    if (Notification.permission === 'granted') {
        console.log('✅ Permission granted');
        subscribeToPush();
        document.getElementById('notificationPermissionSection').style.display = 'none';
    } else if (Notification.permission === 'default') {
        const dismissed = localStorage.getItem('notification_dismissed');
        if (dismissed !== 'true') {
            document.getElementById('notificationPermissionSection').style.display = 'block';
        }
    } else {
        document.getElementById('notificationPermissionSection').style.display = 'none';
    }
}

function requestNotificationPermission() {
    Notification.requestPermission().then(function(permission) {
        if (permission === 'granted') {
            console.log('✅ Permission granted');
            document.getElementById('notificationPermissionSection').style.display = 'none';
            subscribeToPush();
        } else {
            console.log('❌ Permission denied');
            document.getElementById('notificationPermissionSection').style.display = 'none';
        }
    });
}

function dismissNotificationPermission() {
    document.getElementById('notificationPermissionSection').style.display = 'none';
    localStorage.setItem('notification_dismissed', 'true');
}

function subscribeToPush() {
    if (!('serviceWorker' in navigator)) {
        console.log('⚠️ Service Worker not supported');
        return;
    }
    
    navigator.serviceWorker.ready.then(function(registration) {
        registration.pushManager.getSubscription().then(function(subscription) {
            if (subscription) {
                console.log('✅ Already subscribed');
                return;
            }
            
            const applicationServerKey = urlBase64ToUint8Array(VAPID_PUBLIC_KEY);
            
            registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: applicationServerKey
            }).then(function(subscription) {
                console.log('✅ Subscribed!');
                savePushSubscription(subscription);
            }).catch(function(error) {
                console.log('❌ Subscription failed:', error);
            });
        });
    });
}

function savePushSubscription(subscription) {
    const data = {
        endpoint: subscription.endpoint,
        auth_key: btoa(String.fromCharCode.apply(null, new Uint8Array(subscription.getKey('auth')))),
        p256dh_key: btoa(String.fromCharCode.apply(null, new Uint8Array(subscription.getKey('p256dh'))))
    };
    
    fetch('/save_push_subscription', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(function(response) { return response.json(); })
    .then(function(data) {
        if (data.success) {
            console.log('✅ Subscription saved to server');
        }
    })
    .catch(function(error) {
        console.log('❌ Error saving subscription:', error);
    });
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

// =============================================
// MAKE FUNCTIONS GLOBALLY AVAILABLE
// =============================================

window.showNotices = showNotices;
window.showClassNotes = showClassNotes;
window.showMyExams = showMyExams;
window.showResults = showResults;
window.showRank = showRank;
window.showWhatsApp = showWhatsApp;
window.showQuiz = showQuiz;
window.showChangePassword = showChangePassword;
window.closeChangePassword = closeChangePassword;
window.togglePasswordVisibility = togglePasswordVisibility;
window.changePassword = changePassword;
window.selectGender = selectGender;
window.startOnlineExam = startOnlineExam;
window.initializeTimers = initializeTimers;
window.closeSidebarOnMobile = closeSidebarOnMobile;
window.loadNotices = loadNotices;
window.markNoticeRead = markNoticeRead;
window.requestNotificationPermission = requestNotificationPermission;
window.dismissNotificationPermission = dismissNotificationPermission;
window.checkNotificationPermission = checkNotificationPermission;
window.subscribeToPush = subscribeToPush;
window.savePushSubscription = savePushSubscription;
window.filterExams = filterExams;
