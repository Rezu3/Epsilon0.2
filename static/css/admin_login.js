// admin_login.js - Admin Login Interactive Functions

// Toggle password visibility
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.classList.remove('fa-eye');
        eyeIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        eyeIcon.classList.remove('fa-eye-slash');
        eyeIcon.classList.add('fa-eye');
    }
}

// Form validation with animation
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('adminLoginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    
    // Add focus animations
    const inputs = document.querySelectorAll('.form-group input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.querySelector('label').style.color = '#764ba2';
            this.style.borderColor = '#764ba2';
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.querySelector('label').style.color = '#555';
                this.style.borderColor = '#e0e0e0';
            }
        });
    });
    
    // Form submit with loading state
    form.addEventListener('submit', function(e) {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        
        if (!username || !password) {
            e.preventDefault();
            showError('Please fill in all fields');
            return;
        }
        
        // Show loading state
        const btn = this.querySelector('.login-btn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
        btn.disabled = true;
        
        // Re-enable after 3 seconds if not redirected
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 3000);
    });
    
    // Auto-fill demo credentials
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    
    // Add click to demo badge to auto-fill
    const demoBadges = document.querySelectorAll('.demo-badge');
    if (demoBadges.length >= 2) {
        const userBadge = demoBadges[0];
        const passBadge = demoBadges[1];
        
        userBadge.style.cursor = 'pointer';
        passBadge.style.cursor = 'pointer';
        
        userBadge.addEventListener('click', function() {
            username.value = 'admin';
            username.style.borderColor = '#2ecc71';
            username.style.background = '#f0fff4';
            setTimeout(() => {
                username.style.borderColor = '#e0e0e0';
                username.style.background = '#f8f9fa';
            }, 2000);
        });
        
        passBadge.addEventListener('click', function() {
            password.value = 'admin123';
            password.style.borderColor = '#2ecc71';
            password.style.background = '#f0fff4';
            setTimeout(() => {
                password.style.borderColor = '#e0e0e0';
                password.style.background = '#f8f9fa';
            }, 2000);
        });
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Press Escape to go back
        if (e.key === 'Escape') {
            window.location.href = '/';
        }
    });
    
    // Add smooth entrance animation
    const wrapper = document.querySelector('.login-wrapper');
    wrapper.style.opacity = '0';
    wrapper.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        wrapper.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        wrapper.style.opacity = '1';
        wrapper.style.transform = 'scale(1)';
    }, 100);
});

// Show error message function
function showError(message) {
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        ${message}
    `;
    
    const form = document.getElementById('adminLoginForm');
    form.parentElement.insertBefore(errorDiv, form);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        errorDiv.style.transition = 'opacity 0.5s ease';
        errorDiv.style.opacity = '0';
        setTimeout(() => {
            errorDiv.remove();
        }, 500);
    }, 5000);
}

// Add ripple effect to buttons
document.querySelectorAll('.login-btn, .back-link, .toggle-password').forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = e.clientX - rect.left - size/2 + 'px';
        ripple.style.top = e.clientY - rect.top - size/2 + 'px';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple styles
const style = document.createElement('style');
style.textContent = `
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: rippleAnim 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes rippleAnim {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .login-btn, .back-link, .toggle-password {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Console information
console.log('🔐 Admin Login Page Loaded');
console.log('👤 Demo Admin: admin / admin123');
console.log('⌨️ Press ESC to go back to home');
console.log('💡 Click on demo badges to auto-fill credentials');

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}