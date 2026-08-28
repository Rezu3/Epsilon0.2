 // static/js/login.js

document.addEventListener('DOMContentLoaded', function() {
    // Password toggle
    const toggleBtn = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    
    if (toggleBtn && passwordInput) {
        toggleBtn.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.querySelector('i').classList.toggle('fa-eye');
            this.querySelector('i').classList.toggle('fa-eye-slash');
        });
    }

    // Form validation
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            const credential = document.getElementById('credential').value.trim();
            const password = document.getElementById('password').value.trim();
            const loginType = document.getElementById('loginType').value;

            if (!credential || !password) {
                e.preventDefault();
                alert('Please fill in all fields!');
                return false;
            }

            // Phone validation for teacher and student
            if ((loginType === 'teacher' || loginType === 'student') && !/^\d{10,15}$/.test(credential)) {
                e.preventDefault();
                alert('Please enter a valid phone number (10-15 digits)!');
                return false;
            }

            return true;
        });
    }

    // Flash message auto close
    const flashMessages = document.querySelectorAll('.flash-message');
    flashMessages.forEach(message => {
        setTimeout(() => {
            message.style.opacity = '0';
            message.style.transform = 'translateX(100px)';
            setTimeout(() => message.remove(), 500);
        }, 5000);
    });
});

// Sidebar Toggle
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    
    if (!sidebar) return;
    
    sidebar.classList.toggle('open');
    
    if (overlay) {
        overlay.classList.toggle('active');
    }
    
    if (sidebar.classList.contains('open')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

// Show Section
function showSection(section) {
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => link.classList.remove('active'));
    
    // Set active class on clicked link
    event.currentTarget.classList.add('active');
    
    // Show/hide sections
    const homeSection = document.getElementById('homeSection');
    const loginSection = document.getElementById('loginSection');
    
    // Hide all sections first
    if (homeSection) homeSection.style.display = 'none';
    if (loginSection) loginSection.style.display = 'none';
    
    switch(section) {
        case 'home':
            if (homeSection) homeSection.style.display = 'block';
            break;
        case 'login':
            if (loginSection) loginSection.style.display = 'flex';
            break;
        case 'notice':
            if (homeSection) {
                homeSection.style.display = 'block';
                setTimeout(() => {
                    const noticeBoard = document.getElementById('noticeBoard');
                    if (noticeBoard) {
                        noticeBoard.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            }
            break;
        case 'help':
            window.open('https://wa.me/919749469918', '_blank');
            return;
    }
    
    // Close sidebar on mobile
    if (window.innerWidth <= 992) {
        toggleSidebar();
    }
}

// Share App
function shareApp() {
    const appUrl = 'https://epsilon0-2.onrender.com';
    const message = `Join The Epsilon - Learning Platform!\n\n${appUrl}`;
    
    if (navigator.share) {
        navigator.share({
            title: 'The Epsilon',
            text: message,
            url: appUrl
        }).catch(() => {});
    } else {
        // WhatsApp Share
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
    }
}

// Select login type
function selectLoginType(type) {
    const formContainer = document.getElementById('loginFormContainer');
    const credentialLabel = document.getElementById('credentialLabel');
    const credentialInput = document.getElementById('credential');
    const credentialIcon = document.getElementById('credentialIcon');
    const inputIcon = document.getElementById('inputIcon');
    const loginBtnText = document.getElementById('loginBtnText');
    const formTitle = document.getElementById('formTitle');
    const formSubtitle = document.getElementById('formSubtitle');
    const registerText = document.getElementById('registerText');
    const registerLink = document.getElementById('registerLink');
    const studentRegisterText = document.getElementById('studentRegisterText');

    // Show the form
    if (formContainer) {
        formContainer.style.display = 'block';
    }

    // Update based on type
    const configs = {
        'admin': {
            label: 'Username',
            placeholder: 'Enter admin username',
            icon: 'fa-user',
            title: 'Admin Login',
            subtitle: 'Enter your admin credentials',
            btnText: 'Sign In as Admin'
        },
        'teacher': {
            label: 'Phone Number',
            placeholder: 'Enter your phone number',
            icon: 'fa-phone',
            title: 'Teacher Login',
            subtitle: 'Enter your teacher credentials',
            btnText: 'Sign In as Teacher'
        },
        'student': {
            label: 'Phone Number',
            placeholder: 'Enter your phone number',
            icon: 'fa-phone',
            title: 'Student Login',
            subtitle: 'Enter your student credentials',
            btnText: 'Sign In as Student'
        }
    };

    const data = configs[type];

    // Update login type
    document.getElementById('loginType').value = type;

    // Update credential field
    if (credentialLabel) credentialLabel.textContent = data.label;
    if (credentialInput) {
        credentialInput.placeholder = data.placeholder;
        
        // ✅ এই লাইনটি বসান: সব সময় phone পাঠান
        credentialInput.name = 'phone';
    }
    if (credentialIcon) credentialIcon.className = 'fas ' + data.icon;
    if (inputIcon) inputIcon.className = 'fas input-icon ' + data.icon;

    // Update title and button
    if (formTitle) formTitle.textContent = data.title;
    if (formSubtitle) formSubtitle.textContent = data.subtitle;
    if (loginBtnText) loginBtnText.textContent = data.btnText;

    // Hide all register links (Login এ Register link দরকার নেই)
    if (registerText) registerText.style.display = 'none';
    if (studentRegisterText) studentRegisterText.style.display = 'none';

    // Focus on credential input
    setTimeout(() => {
        if (credentialInput) credentialInput.focus();
    }, 300);
}

// Make functions globally available
window.selectLoginType = selectLoginType;
window.toggleSidebar = toggleSidebar;
window.showSection = showSection;
window.shareApp = shareApp;



// =============================================
// NOTICE FUNCTIONS (Login Page - Public)
// =============================================

// Load Notices and Start Ticker
function loadPublicNotices() {
    const tickerContent = document.getElementById('tickerContent');
    const recentNotices = document.getElementById('recentNotices');
    const noticeCount = document.getElementById('noticeCount');
    
    if (!tickerContent) return;
    
    // Show loading state
    tickerContent.innerHTML = `
        <span class="ticker-item">
            <i class="fas fa-spinner fa-spin"></i>
            <span class="ticker-message">Loading notices...</span>
        </span>
    `;
    
    if (recentNotices) {
        recentNotices.innerHTML = `
            <div class="loading-notices">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Loading notices...</p>
            </div>
        `;
    }
    
    // Fetch from existing API
    fetch('/get_all_notices_public')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const notices = data.notices || [];
                
                // Update count
                if (noticeCount) {
                    noticeCount.textContent = notices.length + ' Notice' + (notices.length > 1 ? 's' : '');
                }
                
                if (notices.length === 0) {
                    // No notices
                    tickerContent.innerHTML = `
                        <span class="ticker-item">
                            <i class="fas fa-bullhorn"></i>
                            <span class="ticker-message">Welcome to The Epsilon! No notices available yet.</span>
                        </span>
                    `;
                    
                    if (recentNotices) {
                        recentNotices.innerHTML = `
                            <div class="empty-notices">
                                <i class="fas fa-bullhorn"></i>
                                <h3>No Notices Yet</h3>
                                <p>Teachers will post notices here</p>
                            </div>
                        `;
                    }
                    return;
                }
                
                // Build ticker items (duplicate for seamless loop)
                let tickerHtml = '';
                notices.forEach(function(notice) {
                    const date = new Date(notice.created_at);
                    const dateStr = date.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                    });
                    
                    tickerHtml += `
                        <span class="ticker-item">
                            <i class="fas fa-bullhorn"></i>
                            <span class="ticker-title">${escapeHtml(notice.title)}</span>
                            <span class="ticker-message">${escapeHtml(notice.message)}</span>
                            <span class="ticker-teacher">
                                <i class="fas fa-chalkboard-teacher"></i> ${escapeHtml(notice.teacher_name)}
                            </span>
                            <span class="ticker-date">
                                <i class="far fa-calendar-alt"></i> ${dateStr}
                            </span>
                        </span>
                    `;
                });
                
                // Duplicate for seamless infinite scroll
                tickerContent.innerHTML = tickerHtml + tickerHtml;
                
                // Build recent notices (সর্বশেষ 3 টি)
                if (recentNotices) {
                    const recentThree = notices.slice(0, 3);
                    let recentHtml = '';
                    
                    recentThree.forEach(function(notice, index) {
                        const date = new Date(notice.created_at);
                        const dateStr = date.toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                        });
                        
                        recentHtml += `
                            <div class="recent-notice-card">
                                ${index === 0 ? '<span class="notice-badge"><i class="fas fa-star"></i> Latest</span>' : ''}
                                <div class="notice-title">
                                    <i class="fas fa-bullhorn"></i>
                                    ${escapeHtml(notice.title)}
                                </div>
                                <p class="notice-message">${escapeHtml(notice.message)}</p>
                                <div class="notice-footer">
                                    <span class="notice-teacher">
                                        <i class="fas fa-chalkboard-teacher"></i> ${escapeHtml(notice.teacher_name)}
                                    </span>
                                    <span class="notice-date">
                                        <i class="far fa-calendar-alt"></i> ${dateStr}
                                    </span>
                                </div>
                            </div>
                        `;
                    });
                    
                    recentNotices.innerHTML = recentHtml;
                }
            } else {
                // Error state
                tickerContent.innerHTML = `
                    <span class="ticker-item">
                        <i class="fas fa-exclamation-circle"></i>
                        <span class="ticker-message">Unable to load notices. Please refresh.</span>
                    </span>
                `;
                
                if (recentNotices) {
                    recentNotices.innerHTML = `
                        <div class="empty-notices error">
                            <i class="fas fa-exclamation-circle"></i>
                            <h3>Error Loading Notices</h3>
                            <p>${data.message || 'Please try again later'}</p>
                        </div>
                    `;
                }
            }
        })
        .catch(function(error) {
            console.error('Error loading notices:', error);
            tickerContent.innerHTML = `
                <span class="ticker-item">
                    <i class="fas fa-exclamation-circle"></i>
                    <span class="ticker-message">Connection error. Please refresh.</span>
                </span>
            `;
        });
}

// Show All Notices Modal
function showAllNotices() {
    const modal = document.getElementById('allNoticesModal');
    const allNoticesList = document.getElementById('allNoticesList');
    
    if (!modal || !allNoticesList) {
        console.error('Modal or list not found!');
        return;
    }
    
    // Show loading
    allNoticesList.innerHTML = `
        <div class="loading-notices">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Loading all notices...</p>
        </div>
    `;
    
    // Show modal
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Fetch all notices
    fetch('/get_all_notices_public')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const notices = data.notices || [];
                
                if (notices.length === 0) {
                    allNoticesList.innerHTML = `
                        <div class="empty-notices">
                            <i class="fas fa-bullhorn"></i>
                            <h3>No Notices Yet</h3>
                            <p>Teachers will post notices here</p>
                        </div>
                    `;
                    return;
                }
                
                let html = '';
                notices.forEach(function(notice) {
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
                        <div class="notice-item">
                            <div class="notice-status-dot read-dot"></div>
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
                                        <i class="fas fa-chalkboard-teacher"></i> ${escapeHtml(notice.teacher_name)}
                                    </span>
                                    ${notice.is_global ? '<span class="notice-global-badge"><i class="fas fa-globe"></i> All</span>' : ''}
                                    ${notice.target_class ? `<span class="notice-target"><i class="fas fa-users"></i> Class: ${escapeHtml(notice.target_class)}</span>` : ''}
                                </div>
                            </div>
                        </div>
                    `;
                });
                
                allNoticesList.innerHTML = html;
            } else {
                allNoticesList.innerHTML = `
                    <div class="empty-notices error">
                        <i class="fas fa-exclamation-circle"></i>
                        <h3>Error Loading Notices</h3>
                        <p>${data.message || 'Please try again later'}</p>
                    </div>
                `;
            }
        })
        .catch(function(error) {
            console.error('Error loading notices:', error);
            allNoticesList.innerHTML = `
                <div class="empty-notices error">
                    <i class="fas fa-exclamation-circle"></i>
                    <h3>Connection Error</h3>
                    <p>Unable to load notices. Please check your connection.</p>
                </div>
            `;
        });
}

// Close All Notices Modal
function closeAllNotices() {
    const modal = document.getElementById('allNoticesModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Make functions globally available
window.loadPublicNotices = loadPublicNotices;
window.showAllNotices = showAllNotices;
window.closeAllNotices = closeAllNotices;
window.escapeHtml = escapeHtml;

// =============================================
// EVENT LISTENERS (Modal & Button)
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    // ... আপনার আগের কোড ...
    
    // Load notices after page loads
    setTimeout(function() {
        loadPublicNotices();
    }, 500);
    
    // Auto refresh notices every 60 seconds
    setInterval(function() {
        if (!document.hidden) {
            loadPublicNotices();
        }
    }, 60000);
    
    // View All Notices Button Click (Event Listener)
    const viewAllBtn = document.querySelector('.view-all-btn');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            showAllNotices();
        });
    }
    
    // Close Modal Button Click (Event Listener)
    const closeModalBtn = document.querySelector('.close-modal');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeAllNotices();
        });
    }
    
    // Modal Outside Click Close (Event Listener)
    const modal = document.getElementById('allNoticesModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeAllNotices();
            }
        });
    }
    
    // Escape Key Close (Event Listener)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllNotices();
        }
    });
});

// =============================================
// ✅ AUTO SHOW LOGIN SECTION IF FLASH EXISTS
// =============================================
document.addEventListener('DOMContentLoaded', function() {
    const flashMessages = document.querySelectorAll('.flash-message');
    
    if (flashMessages.length > 0) {
        // Home Section Hide করুন
        const homeSection = document.getElementById('homeSection');
        if (homeSection) homeSection.style.display = 'none';
        
        // Login Section Show করুন
        const loginSection = document.getElementById('loginSection');
        if (loginSection) loginSection.style.display = 'flex';
        
        // Login Form Show করুন
        const loginFormContainer = document.getElementById('loginFormContainer');
        if (loginFormContainer) loginFormContainer.style.display = 'block';
        
        // Admin Login Default Select করুন
        selectLoginType('admin');
        
        // Login Form-এ Focus করুন
        setTimeout(function() {
            const credentialInput = document.getElementById('credential');
            if (credentialInput) credentialInput.focus();
        }, 300);
    }
});
