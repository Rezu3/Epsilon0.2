// static/js/register.js

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.register-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const password = document.getElementById('password');
            const confirmPassword = document.getElementById('confirm_password');
            const phone = document.getElementById('phone');
            
            // Reset errors
            clearErrors();
            
            let isValid = true;
            
            // Validate password
            if (password && password.value.length < 6) {
                showError(password, 'Password must be at least 6 characters');
                isValid = false;
            }
            
            // Validate confirm password
            if (confirmPassword && password && confirmPassword.value !== password.value) {
                showError(confirmPassword, 'Passwords do not match');
                isValid = false;
            }
            
            // Validate phone
            if (phone) {
                const phoneRegex = /^[0-9]{10,15}$/;
                if (!phoneRegex.test(phone.value.replace(/[^0-9]/g, ''))) {
                    showError(phone, 'Please enter a valid phone number (10-15 digits)');
                    isValid = false;
                }
            }
            
            if (isValid) {
                this.submit();
            }
        });
    }
    
    // Real-time validation
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm_password');
    
    if (password) {
        password.addEventListener('input', function() {
            if (this.value.length > 0 && this.value.length < 6) {
                showError(this, 'Password must be at least 6 characters');
            } else {
                clearError(this);
            }
            
            // Check confirm password if it has value
            if (confirmPassword && confirmPassword.value.length > 0) {
                if (confirmPassword.value !== this.value) {
                    showError(confirmPassword, 'Passwords do not match');
                } else {
                    clearError(confirmPassword);
                }
            }
        });
    }
    
    if (confirmPassword) {
        confirmPassword.addEventListener('input', function() {
            if (password && this.value !== password.value) {
                showError(this, 'Passwords do not match');
            } else {
                clearError(this);
            }
        });
    }
    
    // Phone validation
    const phone = document.getElementById('phone');
    if (phone) {
        phone.addEventListener('input', function() {
            const phoneRegex = /^[0-9]{10,15}$/;
            if (this.value.length > 0 && !phoneRegex.test(this.value.replace(/[^0-9]/g, ''))) {
                showError(this, 'Please enter a valid phone number (10-15 digits)');
            } else {
                clearError(this);
            }
        });
    }
});

// Toggle password visibility
function togglePassword() {
    const password = document.getElementById('password');
    const btn = document.querySelector('.password-wrapper .toggle-btn');
    toggleVisibility(password, btn);
}

// Toggle confirm password visibility
function toggleConfirmPassword() {
    const confirmPassword = document.getElementById('confirm_password');
    const btns = document.querySelectorAll('.password-wrapper .toggle-btn');
    const btn = btns[1] || btns[0];
    toggleVisibility(confirmPassword, btn);
}

// Toggle visibility helper
function toggleVisibility(input, btn) {
    if (!input || !btn) return;
    
    const icon = btn.querySelector('i');
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Show error
function showError(input, message) {
    if (!input) return;
    input.classList.add('error');
    
    // Remove existing error message
    clearError(input);
    
    // Add error message
    const errorMsg = document.createElement('small');
    errorMsg.className = 'error-message';
    errorMsg.style.cssText = 'display: block; color: #f56565; font-size: 12px; margin-top: 4px;';
    errorMsg.textContent = message;
    
    input.parentElement.appendChild(errorMsg);
}

// Clear error
function clearError(input) {
    if (!input) return;
    input.classList.remove('error');
    
    const parent = input.parentElement;
    const errorMsg = parent.querySelector('.error-message');
    if (errorMsg) {
        errorMsg.remove();
    }
}

// Clear all errors
function clearErrors() {
    document.querySelectorAll('.error').forEach(el => {
        el.classList.remove('error');
    });
    document.querySelectorAll('.error-message').forEach(el => {
        el.remove();
    });
}