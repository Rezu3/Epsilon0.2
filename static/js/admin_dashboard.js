// static/js/admin_dashboard.js

document.addEventListener('DOMContentLoaded', function() {
    // Initialize date/time
    updateDateTime();
    setInterval(updateDateTime, 1000);

    // Initialize sidebar - ensure it's always visible
    initializeSidebar();

    // Sidebar toggle for mobile
    const menuBtn = document.getElementById('menuBtn');
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');

    function toggleSidebar() {
        if (sidebar) {
            sidebar.classList.toggle('open');
            // Save state to localStorage
            const isOpen = sidebar.classList.contains('open');
            localStorage.setItem('sidebarOpen', isOpen);
        }
    }

    if (menuBtn) {
        menuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleSidebar();
        });
    }

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleSidebar();
        });
    }

    // Prevent sidebar from closing when clicking nav items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Don't close sidebar when clicking nav items
            e.stopPropagation();
            
            // If it's a regular link (not a function call)
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                // Allow navigation
                return true;
            }
        });
    });

    // Close sidebar when clicking outside on mobile (only if not clicking nav items)
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 992) {
            const isSidebar = sidebar && sidebar.contains(e.target);
            const isMenuBtn = menuBtn && menuBtn.contains(e.target);
            const isNavItem = e.target.closest('.nav-item');
            
            // Don't close if clicking nav items
            if (isNavItem) {
                return;
            }
            
            if (!isSidebar && !isMenuBtn && sidebar && sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
                localStorage.setItem('sidebarOpen', 'false');
            }
        }
    });

    // Notification bell click
    const notificationBell = document.querySelector('.notification-bell');
    if (notificationBell) {
        notificationBell.addEventListener('click', function() {
            alert('📬 You have 3 new notifications');
        });
    }

    // Add animation to cards on load
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

    // Set active nav item based on current page
    setActiveNavItem();

    // Handle page show event (for back/forward navigation)
    window.addEventListener('pageshow', function() {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            // Ensure sidebar is visible
            sidebar.style.display = '';
            sidebar.style.visibility = '';
            sidebar.style.opacity = '';
            
            // Restore sidebar state from localStorage
            const isOpen = localStorage.getItem('sidebarOpen') === 'true';
            if (isOpen) {
                sidebar.classList.add('open');
            } else {
                sidebar.classList.remove('open');
            }
        }
    });
});

// Initialize Sidebar - ensure it's always visible
function initializeSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        // Ensure sidebar is visible
        sidebar.style.display = 'flex';
        sidebar.style.visibility = 'visible';
        sidebar.style.opacity = '1';
        
        // Restore sidebar state from localStorage
        const isOpen = localStorage.getItem('sidebarOpen');
        if (isOpen === 'true') {
            sidebar.classList.add('open');
        } else if (isOpen === 'false') {
            sidebar.classList.remove('open');
        } else {
            // Default: open on desktop, closed on mobile
            if (window.innerWidth <= 992) {
                sidebar.classList.remove('open');
            } else {
                sidebar.classList.add('open');
            }
        }
    }
}

// Set Active Nav Item based on current page
function setActiveNavItem() {
    const currentPath = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href && href !== '#') {
            // Remove trailing slashes for comparison
            const cleanHref = href.replace(/\/$/, '');
            const cleanPath = currentPath.replace(/\/$/, '');
            
            // Check if current path matches or starts with href
            if (cleanPath === cleanHref || (cleanHref !== '/' && cleanPath.startsWith(cleanHref + '/'))) {
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
            }
        }
    });
}

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

// Database Download Function
function downloadDatabase(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    if (confirm('⚠️ Are you sure you want to download the database backup?\n\nThis will download the entire database file.')) {
        // Show loading message
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
                
                // Show success message
                showFlashMessage('success', '✅ Database downloaded successfully!<br><small>File: tution.db</small>');
            })
            .catch(error => {
                console.error('Error downloading database:', error);
                showFlashMessage('error', '❌ Error downloading database. Please try again.');
            });
    }
}

// Show Flash Message
function showFlashMessage(type, message) {
    // Remove existing flash messages
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
    
    // Auto remove after 5 seconds for success, 8 seconds for others
    const timeout = type === 'success' ? 5000 : 8000;
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
    }, timeout);
}

// Function for Fees Details
function viewFeesDetails(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    alert('💰 Fees Details Page\n\nYou can view:\n• Total fees collected\n• Pending dues\n• Payment history\n• Student-wise fees');
    // window.location.href = '/fees_details';
}

// Function for Exam Management
function manageExams(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    alert('📝 Exam Management Page\n\nYou can:\n• Schedule new exams\n• Manage exam subjects\n• Set exam dates\n• View exam lists');
    // window.location.href = '/exams';
}

// Function for Results
function viewResults(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    alert('📄 Results Page\n\nYou can:\n• Publish exam results\n• View student results\n• Generate report cards\n• Analyze performance');
    // window.location.href = '/results';
}

// Function for Rankings
function viewRank(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    alert('🏆 Rankings Page\n\nYou can view:\n• Class-wise rankings\n• Subject-wise rankings\n• Overall performance\n• Top performers');
    // window.location.href = '/rankings';
}

// Close sidebar on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const sidebar = document.getElementById('sidebar');
        if (sidebar && sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
            localStorage.setItem('sidebarOpen', 'false');
        }
    }
});

// Handle window resize for sidebar
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            // Ensure sidebar is visible on resize
            sidebar.style.display = 'flex';
            sidebar.style.visibility = 'visible';
            sidebar.style.opacity = '1';
            
            // Adjust for mobile/desktop
            if (window.innerWidth > 992) {
                // On desktop, keep sidebar open by default
                if (!sidebar.classList.contains('open')) {
                    // Only if not manually closed by user
                    const isOpen = localStorage.getItem('sidebarOpen');
                    if (isOpen === null || isOpen === 'true') {
                        sidebar.classList.add('open');
                    }
                }
            }
        }
    }, 250);
});

// Make functions globally accessible
window.downloadDatabase = downloadDatabase;
window.viewFeesDetails = viewFeesDetails;
window.manageExams = manageExams;
window.viewResults = viewResults;
window.viewRank = viewRank;
window.showFlashMessage = showFlashMessage;
