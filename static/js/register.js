document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('studentRegisterForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            // আমরা e.preventDefault() ব্যবহার করবো না
            
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm_password').value;
            
            clearErrors();
            let isValid = true;
            
            // নাম ভ্যালিডেশন
            if (name.length < 3) {
                showError(document.getElementById('name'), 'Name must be at least 3 characters');
                isValid = false;
            }
            
            // ফোন নম্বর ভ্যালিডেশন
            const phoneRegex = /^[0-9]{10,15}$/;
            if (!phoneRegex.test(phone.replace(/[^0-9]/g, ''))) {
                showError(document.getElementById('phone'), 'Please enter a valid phone number (10-15 digits)');
                isValid = false;
            }
            
            // পাসওয়ার্ড ভ্যালিডেশন
            if (password.length < 6) {
                showError(document.getElementById('password'), 'Password must be at least 6 characters');
                isValid = false;
            }
            
            // কনফার্ম পাসওয়ার্ড ম্যাচ
            if (password !== confirmPassword) {
                showError(document.getElementById('confirm_password'), 'Passwords do not match');
                isValid = false;
            }
            
            // ভ্যালিডেশন ফেইল হলে ফর্ম সাবমিট ব্লক
            if (!isValid) {
                e.preventDefault();
                return;
            }
            
            // ভ্যালিডেশন পাস হলে ডেটা localStorage-এ সেভ
            const studentData = {
                name: name,
                phone: phone,
                password: password
            };
            localStorage.setItem('studentData', JSON.stringify(studentData));
            
            // ফর্মটি ব্যাকএন্ডে সাবমিট হতে দিবে
            // ব্যাকএন্ড রেজিস্ট্রেশন করবে এবং redirect করবে
        });
    }
    
    // পেজ লোড হলে চেক করা - রেজিস্ট্রেশন সফল হয়েছে কিনা
    checkRegistrationSuccess();
});

// রেজিস্ট্রেশন সফল হয়েছে কিনা চেক করা
function checkRegistrationSuccess() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // যদি URL-এ registered=success থাকে
    if (urlParams.get('registered') === 'success') {
        const studentData = JSON.parse(localStorage.getItem('studentData'));
        if (studentData) {
            // ফর্ম লুকানো
            const form = document.getElementById('studentRegisterForm');
            if (form) {
                form.style.display = 'none';
            }
            
            // Success Board দেখানো
            showSuccessBoard(studentData);
        }
    }
}

// Success Board দেখানো
function showSuccessBoard(studentData) {
    // পুরনো success board থাকলে মুছে ফেলা
    const existingBoard = document.getElementById('successBoard');
    if (existingBoard) {
        existingBoard.remove();
    }
    
    // নতুন Success Board তৈরি
    const successBoard = document.createElement('div');
    successBoard.id = 'successBoard';
    successBoard.className = 'success-board';
    successBoard.style.display = 'block';
    
    successBoard.innerHTML = `
        <div class="success-icon">
            <i class="fas fa-check-circle"></i>
        </div>
        <h2>Register Successfully</h2>
        <div class="success-info">
            <p><strong>Name:</strong> <span>${studentData.name}</span></p>
            <p><strong>Phone Number:</strong> <span>${studentData.phone}</span></p>
            <p><strong>Password:</strong> <span>${studentData.password}</span></p>
        </div>
        <button class="save-btn" onclick="saveToWhatsApp()">
            <i class="fab fa-whatsapp"></i> Save My ID & Password
         
    `;
    
    // কার্ডের ভিতরে যোগ করা
    const registerCard = document.querySelector('.register-card');
    registerCard.appendChild(successBoard);
    
    // স্ক্রল উপরে
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Error দেখানো
function showError(input, message) {
    if (!input) return;
    input.classList.add('error');
    clearError(input);
    
    const errorMsg = document.createElement('small');
    errorMsg.className = 'error-message';
    errorMsg.style.cssText = 'display: block; color: #f56565; font-size: 12px; margin-top: 4px;';
    errorMsg.textContent = message;
    
    input.parentElement.appendChild(errorMsg);
}

// Error মুছে ফেলা
function clearError(input) {
    if (!input) return;
    input.classList.remove('error');
    const parent = input.parentElement;
    const errorMsg = parent.querySelector('.error-message');
    if (errorMsg) {
        errorMsg.remove();
    }
}

// সব Error মুছে ফেলা
function clearErrors() {
    document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    document.querySelectorAll('.error-message').forEach(el => el.remove());
}

// পাসওয়ার্ড টগল
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const icon = document.querySelector('.toggle-btn i');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// কনফার্ম পাসওয়ার্ড টগল
function toggleConfirmPassword() {
    const confirmPasswordInput = document.getElementById('confirm_password');
    const icon = document.querySelectorAll('.toggle-btn i')[1];
    if (confirmPasswordInput.type === 'password') {
        confirmPasswordInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        confirmPasswordInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// WhatsApp-এ সেভ করা
function saveToWhatsApp() {
    // localStorage থেকে ডেটা নেওয়া
    const studentData = JSON.parse(localStorage.getItem('studentData'));
    
    if (!studentData) {
        alert('No data found. Please register again.');
        return;
    }
    
    const message = `The Epsilon - Student Registration Successful\n\n👤 Name: ${studentData.name}\n📱 Phone: ${studentData.phone}\n🔒 Password: ${studentData.password}\n\nThank you for registering!`;
    const phone = studentData.phone.replace(/[^0-9]/g, '');
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}
