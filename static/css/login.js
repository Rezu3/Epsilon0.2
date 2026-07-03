// static/js/login.js

document.addEventListener('DOMContentLoaded', function() {
    // Set default active card
    const defaultCard = document.querySelector('.login-card.admin');
    if (defaultCard) {
        defaultCard.classList.add('active');
        updateFormForType('admin');
    }

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
            const phone = document.getElementById('phone').value.trim();
            const password = document.getElementById('password').value.trim();
            const loginType = document.getElementById('loginType').value;

            if (!phone || !password) {
                e.preventDefault();
                alert('Please fill in all fields!');
                return false;
            }

            // Phone validation for teacher and student
            if ((loginType === 'teacher' || loginType === 'student') && !/^\d{10,15}$/.test(phone)) {
                e.preventDefault();
                alert('Please enter a valid phone number (10-15 digits)!');
                return false;
            }

            return true;
        });
    }

    // Auto-focus first input
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.focus();
    }
});

// Select login type
function selectLoginType(type) {
    // Remove active class from all cards
    document.querySelectorAll('.login-card').forEach(card => {
        card.classList.remove('active');
    });
    
    // Add active class to selected card
    const selectedCard = document.querySelector(`.login-card.${type}`);
    if (selectedCard) {
        selectedCard.classList.add('active');
    }
    
    // Update login type input
    document.getElementById('loginType').value = type;
    
    // Update form
    updateFormForType(type);
}

// Update form based on login type
function updateFormForType(type) {
    const titles = {
        'admin': { label: 'Username', placeholder: 'Enter admin username', registerText: 'New here?', registerLink: 'Register as Teacher', showStudentRegister: false },
        'teacher': { label: 'Phone Number', placeholder: 'Enter your phone number', registerText: 'New here?', registerLink: 'Register as Teacher', showStudentRegister: true },
        'student': { label: 'Phone Number', placeholder: 'Enter your phone number', registerText: 'New here?', registerLink: 'Register as Student', showStudentRegister: false }
    };

    const data = titles[type];
    const phoneLabel = document.getElementById('phoneLabel');
    const phoneInput = document.getElementById('phone');
    const registerText = document.getElementById('registerText');
    const registerLink = document.getElementById('registerLink');
    const studentRegisterText = document.getElementById('studentRegisterText');

    if (phoneLabel) phoneLabel.textContent = data.label;
    if (phoneInput) phoneInput.placeholder = data.placeholder;

    if (type === 'admin') {
        if (registerText) registerText.style.display = 'none';
        if (studentRegisterText) studentRegisterText.style.display = 'none';
    } else if (type === 'teacher') {
        if (registerText) registerText.style.display = 'block';
        if (registerLink) {
            registerLink.textContent = 'Register as Teacher';
            registerLink.href = '/teacher_register';
        }
        if (studentRegisterText) studentRegisterText.style.display = 'block';
    } else if (type === 'student') {
        if (registerText) registerText.style.display = 'block';
        if (registerLink) {
            registerLink.textContent = 'Register as Student';
            registerLink.href = '/student_register';
        }
        if (studentRegisterText) studentRegisterText.style.display = 'none';
    }
}

// Make functions globally available
window.selectLoginType = selectLoginType;