// teacher_login.js - Teacher Login Interactive Functions

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

// Fill demo credentials
function fillCredentials(phone, password) {
    const phoneInput = document.getElementById('phone');
    const passwordInput = document.getElementById('password');
    
    // Animate fill
    phoneInput.value = phone;
    phoneInput.style.borderColor = '#2ecc71';
    phoneInput.style.background = '#f0fff4';
    
    passwordInput.value = password;
    passwordInput.style.borderColor = '#2ecc71';
    passwordInput.style.background = '#f0fff4';
    
    setTimeout(() => {
        phoneInput.style.borderColor = '#e0e0e0';
        phoneInput.style.background = '#f8f9fa';
        passwordInput.style.borderColor = '#e0e0e0';
        passwordInput.style.background = '#f8f9fa';
    }, 2000);
    
    // Show success notification
    showNotification('Credentials filled successfully!', 'success');
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
        ${message}
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add notification styles
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 12px;
        color: white;
        font-family: 'Poppins', sans-serif;
        font-size: 14px;
        font-weight: 500;
        transform: translateX(120%);
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification.success {
        background: linear-gradient(135deg, #2ecc71, #27ae60);
    }
    
    .notification.info {
        background: linear-gradient(135deg, #3498db, #2980b9);
    }
    
    .notification i {
        font-size: 20px;
    }
`;
document.head.appendChild(notificationStyle);

// Form validation with animation
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('teacherLoginForm');
    const phoneInput = document.getElementById('phone');
    const passwordInput = document.getElementById('password');
    
    // Add focus animations
    const inputs = document.querySelectorAll('.form-group input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.querySelector('label').style.color = '#f5576c';
            this.style.borderColor = '#f5576c';
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.querySelector('label').style.color = '#555';
                this.style.borderColor = '#e0e0e0';
            }
        });
    });
    
    // Phone number formatting
    phoneInput.addEventListener('input', function() {
        // Remove non-numeric characters
        this.value = this.value.replace(/\D/g, '');
        
        // Limit to 11 digits
        if (this.value.length > 11) {
            this.value = this.value.slice(0, 11);
        }
        
        // Add formatting
        if (this.value.length > 0) {
            this.style.borderColor = '#2ecc71';
        }
    });
    
    // Form submit with validation
    form.addEventListener('submit', function(e) {
        const phone = phoneInput.value.trim();
        const password = passwordInput.value.trim();
        
        // Validate phone number
        if (!phone || phone.length < 11) {
            e.preventDefault();
            showError('Please enter a valid 11-digit phone number');
            phoneInput.style.borderColor = '#e74c3c';
            return;
        }
        
        if (!password || password.length < 6) {
            e.preventDefault();
            showError('Password must be at least 6 characters long');
            passwordInput.style.borderColor = '#e74c3c';
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
    
    const form = document.getElementById('teacherLoginForm');
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
document.querySelectorAll('.login-btn, .back-link, .toggle-password, .register-btn').forEach(button => {
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
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
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
    
    .login-btn, .back-link, .toggle-password, .register-btn {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(rippleStyle);

// Console information
console.log('📚 Teacher Login Page Loaded');
console.log('👨‍🏫 Demo Teacher: 01712345678 / teacher123');
console.log('⌨️ Press ESC to go back to home');
console.log('💡 Click on demo badges to auto-fill credentials');
console.log('📱 Phone number automatically formatted (11 digits)');

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}