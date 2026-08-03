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

    // Auto-focus credential input when form appears
    const credentialInput = document.getElementById('credential');
    if (credentialInput) {
        credentialInput.focus();
    }
});

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
    formContainer.style.display = 'block';

    // Update based on type
    const configs = {
        'admin': {
            label: 'Username',
            placeholder: 'Enter admin username',
            icon: 'fa-user',
            title: 'Admin Login',
            subtitle: 'Enter your admin credentials',
            btnText: 'Sign In as Admin',
            registerText: 'New here?',
            registerLink: 'Register as Teacher',
            showStudentRegister: false
        },
        'teacher': {
            label: 'Phone Number',
            placeholder: 'Enter your phone number',
            icon: 'fa-phone',
            title: 'Teacher Login',
            subtitle: 'Enter your teacher credentials',
            btnText: 'Sign In as Teacher',
            registerText: 'New here?',
            registerLink: 'Register as Teacher',
            showStudentRegister: true
        },
        'student': {
            label: 'Phone Number',
            placeholder: 'Enter your phone number',
            icon: 'fa-phone',
            title: 'Student Login',
            subtitle: 'Enter your student credentials',
            btnText: 'Sign In as Student',
            registerText: 'New here?',
            registerLink: 'Register as Student',
            showStudentRegister: false
        }
    };

    const data = configs[type];

    // Update login type
    document.getElementById('loginType').value = type;

    // Update credential field
    credentialLabel.textContent = data.label;
    credentialInput.placeholder = data.placeholder;
    credentialIcon.className = 'fas ' + data.icon;
    inputIcon.className = 'fas input-icon ' + data.icon;

    // Update title and button
    formTitle.textContent = data.title;
    formSubtitle.textContent = data.subtitle;
    loginBtnText.textContent = data.btnText;

    // Update registration links
    if (type === 'admin') {
        registerText.style.display = 'none';
        studentRegisterText.style.display = 'none';
    } else if (type === 'teacher') {
        registerText.style.display = 'block';
        registerLink.textContent = 'Register as Teacher';
        registerLink.href = '/teacher_register';
        studentRegisterText.style.display = 'block';
    } else if (type === 'student') {
        registerText.style.display = 'block';
        registerLink.textContent = 'Register as Student';
        registerLink.href = '/student_register';
        studentRegisterText.style.display = 'none';
    }

    // Focus on credential input
    setTimeout(() => {
        credentialInput.focus();
    }, 300);
}

// Make functions globally available
window.selectLoginType = selectLoginType;
