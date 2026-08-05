// static/js/admin_dashboard.js

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Admin Dashboard JS loaded');
    
    // ============================================
    // UPDATE DATE & TIME
    // ============================================
    updateDateTime();
    setInterval(updateDateTime, 1000);

    // ============================================
    // SIDEBAR TOGGLE - FIXED FOR MOBILE
    // ============================================
    const menuBtn = document.getElementById('menuBtn');
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');

    // Function to toggle sidebar
    function toggleSidebar(e) {
        // Prevent default behavior
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        if (sidebar) {
            // Toggle 'open' class
            sidebar.classList.toggle('open');
            console.log('Sidebar toggled:', sidebar.classList.contains('open') ? 'OPEN' : 'CLOSED');
            
            // Create or toggle overlay for mobile
            let overlay = document.querySelector('.sidebar-overlay');
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.className = 'sidebar-overlay';
                document.body.appendChild(overlay);
            }
            
            if (sidebar.classList.contains('open')) {
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scroll
            } else {
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    }

    // Menu button click (3 lines button)
    if (menuBtn) {
        // Click event
        menuBtn.addEventListener('click', toggleSidebar);
        
        // Touch event for mobile (prevent double tap)
        menuBtn.addEventListener('touchstart', function(e) {
            // Just prevent double tap zoom
        }, { passive: true });
        
        console.log('✅ Menu button event added');
    } else {
        console.warn('⚠️ Menu button not found!');
    }

    // Sidebar toggle button (inside sidebar)
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
        console.log('✅ Sidebar toggle event added');
    }

    // ============================================
    // CLOSE SIDEBAR ON OVERLAY CLICK
    // ============================================
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('sidebar-overlay')) {
            if (sidebar && sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
                e.target.classList.remove('active');
                document.body.style.overflow = '';
                console.log('Sidebar closed by overlay');
            }
        }
    });

    // ============================================
    // CLOSE SIDEBAR ON OUTSIDE CLICK (MOBILE ONLY)
    // ============================================
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 992) {
            const isSidebar = sidebar && sidebar.contains(e.target);
            const isMenuBtn = menuBtn && menuBtn.contains(e.target);
            const isSidebarToggle = sidebarToggle && sidebarToggle.contains(e.target);
            const isNavItem = e.target.closest('.nav-item');
            
            // Don't close if clicking nav items
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
                console.log('Sidebar closed by outside click');
            }
        }
    });

    // ============================================
    // CLOSE SIDEBAR ON ESCAPE KEY
    // ============================================
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (sidebar && sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
                const overlay = document.querySelector('.sidebar-overlay');
                if (overlay) {
                    overlay.classList.remove('active');
                }
                document.body.style.overflow = '';
                console.log('Sidebar closed by Escape key');
            }
        }
    });

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
    // CARD ANIMATION
    // ============================================
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

    // ============================================
    // SET ACTIVE NAV ITEM
    // ============================================
    setActiveNavItem();

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
            } else if (window.innerWidth <= 992 && sidebar) {
                // On mobile, keep it closed by default
                sidebar.classList.remove('open');
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
// INITIALIZE SIDEBAR
// ============================================
function initializeSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.style.display = 'flex';
        sidebar.style.visibility = 'visible';
        sidebar.style.opacity = '1';
        
        // On desktop, keep open; on mobile, keep closed
        if (window.innerWidth <= 992) {
            sidebar.classList.remove('open');
        } else {
            sidebar.classList.add('open');
        }
    }
}

// ============================================
// SET ACTIVE NAV ITEM
// ============================================
function setActiveNavItem() {
    const currentPath = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href && href !== '#') {
            const cleanHref = href.replace(/\/$/, '');
            const cleanPath = currentPath.replace(/\/$/, '');
            
            if (cleanPath === cleanHref || (cleanHref !== '/' && cleanPath.startsWith(cleanHref + '/'))) {
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
            }
        }
    });
}

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
// DATABASE DOWNLOAD FUNCTION
// ============================================
function downloadDatabase(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    if (confirm('⚠️ Are you sure you want to download the database backup?\n\nThis will download the entire database file.')) {
        showFlashMessage('info', '⏳ Downloading database... Please wait.');
        
        fetch('/download_database')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.blob();
            })
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'tution.db';
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
                
                showFlashMessage('success', '✅ Database downloaded successfully!<br><small>File: tution.db</small>');
            })
            .catch(error => {
                console.error('Error downloading database:', error);
                showFlashMessage('error', '❌ Error downloading database. Please try again.');
            });
    }
}

// ============================================
// SHOW FLASH MESSAGE
// ============================================
function showFlashMessage(type, message) {
    const existingMessages = document.querySelectorAll('.flash-message');
    existingMessages.forEach(msg => msg.remove());
    
    const flashDiv = document.createElement('div');
    flashDiv.className = `flash-message flash-${type}`;
    
    let icon = '';
    if (type === 'success') icon = 'fa-check-circle';
    else if (type === 'error') icon = 'fa-exclamation-circle';
    else if (type === 'info') icon = 'fa-info-circle';
    else icon = 'fa-bell';
    
    flashDiv.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
        <button class="flash-close" onclick="this.parentElement.remove()">&times;</button>
    `;
    
    const mainContent = document.querySelector('.main-content');
    const quickActions = document.querySelector('.quick-actions');
    if (mainContent && quickActions) {
        mainContent.insertBefore(flashDiv, quickActions);
    } else if (mainContent) {
        mainContent.insertBefore(flashDiv, mainContent.firstChild);
    }
    
    setTimeout(() => {
        if (flashDiv.parentElement) {
            flashDiv.style.transition = 'opacity 0.5s ease';
            flashDiv.style.opacity = '0';
            setTimeout(() => {
                if (flashDiv.parentElement) {
                    flashDiv.remove();
                }
            }, 500);
        }
    }, 5000);
}

// ============================================
// VIEW FEES DETAILS
// ============================================
function viewFeesDetails(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    alert('💰 Fees Details Page\n\nYou can view:\n• Total fees collected\n• Pending dues\n• Payment history\n• Student-wise fees');
}

// ============================================
// MAKE FUNCTIONS GLOBALLY ACCESSIBLE
// ============================================
window.downloadDatabase = downloadDatabase;
window.viewFeesDetails = viewFeesDetails;
window.showFlashMessage = showFlashMessage;

console.log('✅ All functions loaded successfully');
