// ব্যাক বাটনে ক্লিক করলে ল্যান্ডিং পেজে ফেরত যাবে
function goBack() {
    window.location.href = "/";
}

// ফর্ম সাবমিট হওয়ার সময় ছোট একটা লোডিং ইফেক্ট (ঐচ্ছিক)
const form = document.getElementById("adminLoginForm");
form.addEventListener("submit", () => {
    const btn = document.querySelector(".login-btn");
    btn.innerHTML = 'Signing In... <i class="fa-solid fa-spinner fa-spin"></i>';
});