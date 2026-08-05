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

// Teacher Sidebar Navigation Functions
function showMyStudents() {
    window.location.href = "/teacher_home#students";
}

function showStudyMaterial() {
    window.location.href = "/teacher_home#study-material";
}

function showQuiz() {
    window.location.href = "/teacher_home#quiz";
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

// Filter rank based on selections
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

// Download PDF - Print Method
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

    const originalText = downloadBtn.innerHTML;
    downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
    downloadBtn.disabled = true;

    const tableClone = table.cloneNode(true);
    tableClone.querySelectorAll('.action-btn, .download-btn, .delete-btn, .show-password-btn').forEach(el => el.remove());

    const printWindow = window.open('', '_blank', 'width=1100,height=800');
    
    if (!printWindow) {
        alert('Please allow popups for this site to download PDF.');
        downloadBtn.innerHTML = originalText;
        downloadBtn.disabled = false;
        return;
    }

    const styles = `
        <style>
            @page { margin: 1in; size: A4; }
            * { box-sizing: border-box; }
            body { font-family: Arial, Helvetica, sans-serif; padding: 0; margin: 0; background: white; }
            .pdf-container { padding: 10px; max-width: 100%; }
            .header { text-align: center; border-bottom: 3px solid #2d3748; padding-bottom: 15px; margin-bottom: 20px; }
            .header h1 { font-size: 26px; color: #2d3748; margin: 0 0 5px 0; }
            .header p { color: #718096; font-size: 14px; margin: 3px 0; }
            table { width: 100%; border-collapse: collapse; font-size: 12px; }
            th { background: #f7fafc; padding: 8px 10px; text-align: left; font-weight: 700; color: #2d3748; border: 1px solid #d1d5db; }
            td { padding: 8px 10px; border: 1px solid #d1d5db; color: #374151; }
            tr:nth-child(1) { background: #fffbeb; }
            tr:nth-child(2) { background: #f7fafc; }
            tr:nth-child(3) { background: #fef3e8; }
            .rank-badge { display: inline-block; padding: 2px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; }
            .rank-badge.gold { background: #fef3c7; color: #92400e; }
            .rank-badge.silver { background: #f3f4f6; color: #4b5563; }
            .rank-badge.bronze { background: #fef3e8; color: #92400e; }
            .rank-badge.normal { background: #e2e8f0; color: #4a5568; }
            .grade-badge { display: inline-block; padding: 2px 10px; border-radius: 12px; font-size: 11px; font-weight: 600; }
            .footer { text-align: center; border-top: 1px solid #e2e8f0; padding-top: 12px; margin-top: 15px; color: #a0aec0; font-size: 11px; }
        </style>
    `;

    const content = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
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
                ${tableClone.outerHTML}
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
                        }, 1000);
                    }, 500);
                };
            <\/script>
        </body>
        </html>
    `;

    printWindow.document.write(content);
    printWindow.document.close();

    setTimeout(function() {
        downloadBtn.innerHTML = originalText;
        downloadBtn.disabled = false;
    }, 3000);
}

// Global Exports
window.filterRank = filterRank;
window.downloadPDF = downloadPDF;
window.showMyStudents = showMyStudents;
window.showStudyMaterial = showStudyMaterial;
window.showQuiz = showQuiz;
