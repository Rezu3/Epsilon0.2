// static/js/rank.js

document.addEventListener('DOMContentLoaded', function() {
    // Initialize date/time
    updateDateTime();
    setInterval(updateDateTime, 1000);

    // Sidebar toggle for mobile
    const menuBtn = document.getElementById('menuBtn');
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');

    function toggleSidebar() {
        if (sidebar) {
            sidebar.classList.toggle('open');
        }
    }

    if (menuBtn) {
        menuBtn.addEventListener('click', toggleSidebar);
    }

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 992 && sidebar) {
            const isSidebar = sidebar.contains(e.target);
            const isMenuBtn = menuBtn && menuBtn.contains(e.target);
            if (!isSidebar && !isMenuBtn && sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
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

    // Filter by exam - auto select subject
    const examSelect = document.getElementById('examSelect');
    if (examSelect) {
        examSelect.addEventListener('change', function() {
            const selectedOption = this.options[this.selectedIndex];
            const subject = selectedOption.getAttribute('data-subject') || '';
            const subjectSelect = document.getElementById('subjectSelect');
            
            if (subjectSelect && subject) {
                subjectSelect.value = subject;
                const event = new Event('change');
                subjectSelect.dispatchEvent(event);
            }
        });
    }
});

// ============================================
// TEACHER SIDEBAR FUNCTIONS
// ============================================
function showMyStudents() {
    window.location.href = "/teacher_home#students";
}

function showStudyMaterial() {
    window.location.href = "/teacher_home#study-material";
}

function showQuiz() {
    alert('🧠 Quiz Management\n\nYou can:\n• Create new quizzes\n• Manage quiz questions\n• Set quiz timings\n• View quiz results');
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
// FILTER RANK
// ============================================
function filterRank() {
    const examSelect = document.getElementById('examSelect');
    const classSelect = document.getElementById('classSelect');
    const rankListContainer = document.getElementById('rankListContainer');
    const downloadBtn = document.getElementById('downloadBtn');

    if (!examSelect || !classSelect || !rankListContainer) return;

    const examId = examSelect.value;
    const className = classSelect.value;

    if (!examId || !className) {
        rankListContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-trophy"></i>
                <h3>Select Exam & Class</h3>
                <p>Please select an exam and class to view rankings</p>
            </div>
        `;
        if (downloadBtn) downloadBtn.style.display = 'none';
        return;
    }

    rankListContainer.innerHTML = `
        <div class="empty-state">
            <i class="fas fa-spinner fa-spin"></i>
            <h3>Loading...</h3>
            <p>Please wait while we fetch ranking data</p>
        </div>
    `;

    fetch('/get_rank_data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'class_name=' + encodeURIComponent(className) + '&exam_id=' + encodeURIComponent(examId)
    })
    .then(response => response.text())
    .then(html => {
        rankListContainer.innerHTML = html;
        if (downloadBtn) downloadBtn.style.display = 'block';
    })
    .catch(error => {
        console.error('Error:', error);
        rankListContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-exclamation-circle" style="color: #f56565;"></i>
                <h3>Error Loading Data</h3>
                <p>Please try again or refresh the page</p>
            </div>
        `;
        if (downloadBtn) downloadBtn.style.display = 'none';
    });
}

// ============================================
// DOWNLOAD PDF - মোবাইল + ল্যাপটপ ফ্রেন্ডলি
// ============================================
function downloadPDF() {
    const container = document.getElementById('rankListContainer');
    const examSelect = document.getElementById('examSelect');
    const classSelect = document.getElementById('classSelect');
    const downloadBtn = document.getElementById('downloadBtn');
    
    if (!container || !examSelect || !classSelect) return;

    const examName = examSelect.options[examSelect.selectedIndex]?.text || 'All Exams';
    const className = classSelect.value || 'All Classes';
    
    const table = container.querySelector('table');
    if (!table) {
        alert('No data to export! Please select exam and class first.');
        return;
    }

    // Show loading
    const originalText = downloadBtn.innerHTML;
    downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
    downloadBtn.disabled = true;

    // Clone the table for PDF
    const tableClone = table.cloneNode(true);
    tableClone.querySelectorAll('.action-btn, .download-btn, .delete-btn, .show-password-btn').forEach(el => el.remove());

    // PDF STYLES
    const styles = `
        <style>
            @page {
                margin: 10mm;
                size: A4;
            }
            * {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
            }
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
                padding: 15px;
                background: white;
                font-size: 13px;
            }
            .pdf-container {
                max-width: 100%;
            }
            .header {
                text-align: center;
                border-bottom: 3px solid #667eea;
                padding-bottom: 12px;
                margin-bottom: 15px;
            }
            .header h1 {
                font-size: 24px;
                color: #2d3748;
                margin: 0 0 4px 0;
                background: linear-gradient(135deg, #667eea, #764ba2);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                display: inline-block;
            }
            .header p {
                color: #718096;
                font-size: 13px;
                margin: 2px 0;
            }
            table {
                width: 100%;
                border-collapse: collapse;
                font-size: 12px;
            }
            th {
                background: #667eea;
                padding: 8px 10px;
                text-align: left;
                font-weight: 600;
                color: white;
                border: 1px solid #5a4b8a;
            }
            td {
                padding: 7px 10px;
                border: 1px solid #d1d5db;
                color: #374151;
            }
            /* Rank 1,2,3 colors */
            tr:nth-child(1) td { background: #ffd700; color: #2d3748; }
            tr:nth-child(2) td { background: #c0c0c0; color: #2d3748; }
            tr:nth-child(3) td { background: #cd7f32; color: white; }
            /* Zebra coloring for remaining */
            tr:nth-child(4) td { background: #f8fafc; }
            tr:nth-child(5) td { background: #f1f5f9; }
            tr:nth-child(6) td { background: #f8fafc; }
            tr:nth-child(7) td { background: #f1f5f9; }
            tr:nth-child(8) td { background: #f8fafc; }
            tr:nth-child(9) td { background: #f1f5f9; }
            tr:nth-child(10) td { background: #f8fafc; }
            
            .rank-badge {
                display: inline-block;
                padding: 2px 12px;
                border-radius: 20px;
                font-size: 13px;
                font-weight: 700;
                background: #e2e8f0;
                color: #4a5568;
            }
            .rank-badge.gold { background: #ffd700; color: #2d3748; }
            .rank-badge.silver { background: #c0c0c0; color: #2d3748; }
            .rank-badge.bronze { background: #cd7f32; color: white; }
            .rank-badge.normal { background: #e2e8f0; color: #4a5568; }
            
            .grade-badge {
                display: inline-block;
                padding: 2px 10px;
                border-radius: 12px;
                font-size: 11px;
                font-weight: 600;
            }
            .grade-badge.grade-a-plus { background: #48bb78; color: white; }
            .grade-badge.grade-a { background: #48bb78; color: white; }
            .grade-badge.grade-a-minus { background: #68d391; color: white; }
            .grade-badge.grade-b { background: #f6ad55; color: white; }
            .grade-badge.grade-c { background: #fbd38d; color: #2d3748; }
            .grade-badge.grade-d { background: #fbd38d; color: #2d3748; }
            .grade-badge.grade-f { background: #fc8181; color: white; }
            .grade-badge.grade-default { background: #e2e8f0; color: #4a5568; }
            
            .student-name-cell {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .avatar-small {
                width: 26px;
                height: 26px;
                background: #667eea;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: 700;
                font-size: 11px;
                flex-shrink: 0;
            }
            .footer {
                text-align: center;
                border-top: 1px solid #e2e8f0;
                padding-top: 10px;
                margin-top: 12px;
                color: #a0aec0;
                font-size: 10px;
            }
            .empty-row {
                text-align: center;
                padding: 30px 20px !important;
            }
            .empty-row p {
                color: #718096;
            }
            @media print {
                body { margin: 0; padding: 8px; }
                .no-print { display: none !important; }
                tr:nth-child(1) td { background: #ffd700 !important; color: #2d3748 !important; }
                tr:nth-child(2) td { background: #c0c0c0 !important; color: #2d3748 !important; }
                tr:nth-child(3) td { background: #cd7f32 !important; color: white !important; }
                tr:nth-child(4) td { background: #f8fafc !important; }
                tr:nth-child(5) td { background: #f1f5f9 !important; }
                th { background: #667eea !important; color: white !important; }
                .grade-badge.grade-a-plus { background: #48bb78 !important; color: white !important; }
                .grade-badge.grade-a { background: #48bb78 !important; color: white !important; }
                .grade-badge.grade-b { background: #f6ad55 !important; color: white !important; }
                .grade-badge.grade-f { background: #fc8181 !important; color: white !important; }
            }
            @media screen and (max-width: 600px) {
                body { padding: 8px; font-size: 11px; }
                .header h1 { font-size: 18px; }
                .header p { font-size: 11px; }
                table { font-size: 10px; }
                th, td { padding: 4px 6px; }
                .rank-badge { font-size: 10px; padding: 1px 8px; }
                .grade-badge { font-size: 9px; padding: 1px 6px; }
                .avatar-small { width: 20px; height: 20px; font-size: 9px; }
            }
        </style>
    `;

    let tableHTML = tableClone.outerHTML;
    
    const content = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Rank - ${examName}</title>
            ${styles}
        </head>
        <body>
            <div class="pdf-container">
                <div class="header">
                    <h1>𝔼𝕡𝕤𝕚𝕝𝕠𝕟『𝜀』</h1>
                    <p><strong>Exam:</strong> ${examName} | <strong>Class:</strong> ${className}</p>
                    <p>Date: ${new Date().toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</p>
                </div>
                ${tableHTML}
                <div class="footer">
                    <p>Generated by 𝔼𝕡𝕤𝕚𝕝𝕠𝕟『𝜀』 - Learning Management System</p>
                </div>
            </div>
            <script>
                window.onload = function() {
                    setTimeout(function() {
                        window.print();
                        setTimeout(function() {
                            window.close();
                        }, 1500);
                    }, 600);
                };
            <\/script>
        </body>
        </html>
    `;

    // ============================================
    // মোবাইল + ডেস্কটপ - উভয়ের জন্য কাজ করবে
    // ============================================
    try {
        const printWindow = window.open('', '_blank');
        if (!printWindow || printWindow.closed) {
            throw new Error('Popup blocked');
        }
        printWindow.document.write(content);
        printWindow.document.close();
        printWindow.focus();
        
        setTimeout(function() {
            downloadBtn.innerHTML = originalText;
            downloadBtn.disabled = false;
        }, 3000);
        
    } catch (e) {
        // পপ-আপ ব্লক হলে - HTML ডাউনলোড
        console.log('Popup blocked, using fallback method');
        
        const blob = new Blob([content], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `rank_${examName.replace(/[^a-zA-Z0-9]/g, '_')}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        alert('📄 File downloaded as HTML. Open it in browser and print to save as PDF.');
        
        downloadBtn.innerHTML = originalText;
        downloadBtn.disabled = false;
    }
}

// ============================================
// MAKE FUNCTIONS GLOBALLY AVAILABLE
// ============================================
window.filterRank = filterRank;
window.downloadPDF = downloadPDF;
window.showMyStudents = showMyStudents;
window.showStudyMaterial = showStudyMaterial;
window.showQuiz = showQuiz;

console.log('✅ Rank.js loaded successfully');
