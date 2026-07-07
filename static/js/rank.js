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
        sidebar.classList.toggle('open');
    }

    if (menuBtn) {
        menuBtn.addEventListener('click', toggleSidebar);
    }

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 992) {
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
    const examId = document.getElementById('examSelect').value;
    const className = document.getElementById('classSelect').value;

    if (!examId || !className) {
        document.getElementById('rankListContainer').innerHTML = `
            <div class="empty-state">
                <i class="fas fa-trophy"></i>
                <h3>Select Exam & Class</h3>
                <p>Please select an exam and class to view rankings</p>
            </div>
        `;
        document.getElementById('downloadBtn').style.display = 'none';
        return;
    }

    document.getElementById('rankListContainer').innerHTML = `
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
        document.getElementById('rankListContainer').innerHTML = html;
        document.getElementById('downloadBtn').style.display = 'block';
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('rankListContainer').innerHTML = `
            <div class="empty-state">
                <i class="fas fa-exclamation-circle" style="color: #f56565;"></i>
                <h3>Error Loading Data</h3>
                <p>Please try again or refresh the page</p>
            </div>
        `;
        document.getElementById('downloadBtn').style.display = 'none';
    });
}

// Download PDF - Print Method (নির্ভরযোগ্য)
function downloadPDF() {
    const container = document.getElementById('rankListContainer');
    const examSelect = document.getElementById('examSelect');
    const classSelect = document.getElementById('classSelect');
    
    const examName = examSelect.options[examSelect.selectedIndex]?.text || 'All Exams';
    const className = classSelect.value || 'All Classes';
    
    // Get the table
    const table = container.querySelector('table');
    if (!table) {
        alert('No data to export! Please select exam and class first.');
        return;
    }

    // Show loading
    const downloadBtn = document.getElementById('downloadBtn');
    const originalText = downloadBtn.innerHTML;
    downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
    downloadBtn.disabled = true;

    // Clone the table for PDF
    const tableClone = table.cloneNode(true);
    
    // Remove action buttons from clone
    tableClone.querySelectorAll('.action-btn, .download-btn, .delete-btn, .show-password-btn').forEach(el => el.remove());

    // Create print window
    const printWindow = window.open('', '_blank', 'width=1100,height=800');
    
    if (!printWindow) {
        alert('Please allow popups for this site to download PDF.');
        downloadBtn.innerHTML = originalText;
        downloadBtn.disabled = false;
        return;
    }

    const styles = `
        <style>
            @page {
                margin: 1in;
                size: A4;
            }
            * {
                box-sizing: border-box;
            }
            body {
                font-family: Arial, Helvetica, sans-serif;
                padding: 0;
                margin: 0;
                background: white;
            }
            .pdf-container {
                padding: 10px;
                max-width: 100%;
            }
            .header {
                text-align: center;
                border-bottom: 3px solid #2d3748;
                padding-bottom: 15px;
                margin-bottom: 20px;
            }
            .header h1 {
                font-size: 26px;
                color: #2d3748;
                margin: 0 0 5px 0;
            }
            .header p {
                color: #718096;
                font-size: 14px;
                margin: 3px 0;
            }
            table {
                width: 100%;
                border-collapse: collapse;
                font-size: 12px;
                font-family: Arial, Helvetica, sans-serif;
            }
            th {
                background: #f7fafc;
                padding: 8px 10px;
                text-align: left;
                font-weight: 700;
                color: #2d3748;
                border: 1px solid #d1d5db;
            }
            td {
                padding: 8px 10px;
                border: 1px solid #d1d5db;
                color: #374151;
            }
            /* Rank colors */
            tr:nth-child(1) { background: #fffbeb; }
            tr:nth-child(2) { background: #f7fafc; }
            tr:nth-child(3) { background: #fef3e8; }
            
            .rank-badge {
                display: inline-block;
                padding: 2px 12px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 700;
            }
            .rank-badge.gold { background: #fef3c7; color: #92400e; }
            .rank-badge.silver { background: #f3f4f6; color: #4b5563; }
            .rank-badge.bronze { background: #fef3e8; color: #92400e; }
            .rank-badge.normal { background: #e2e8f0; color: #4a5568; }
            
            .grade-badge {
                display: inline-block;
                padding: 2px 10px;
                border-radius: 12px;
                font-size: 11px;
                font-weight: 600;
            }
            .grade-badge.grade-a-plus { background: #d4edda; color: #155724; }
            .grade-badge.grade-a { background: #d4edda; color: #155724; }
            .grade-badge.grade-a-minus { background: #d4edda; color: #155724; }
            .grade-badge.grade-b { background: #d4edda; color: #155724; }
            .grade-badge.grade-c { background: #fff3cd; color: #856404; }
            .grade-badge.grade-d { background: #fff3cd; color: #856404; }
            .grade-badge.grade-f { background: #f8d7da; color: #721c24; }
            .grade-badge.grade-default { background: #e2e8f0; color: #718096; }
            
            .student-name-cell {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .avatar-small {
                width: 26px;
                height: 26px;
                background: linear-gradient(135deg, #f6ad55, #ed8936);
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
                padding-top: 12px;
                margin-top: 15px;
                color: #a0aec0;
                font-size: 11px;
            }
            .empty-row {
                text-align: center;
                padding: 30px 20px !important;
            }
            .empty-row p {
                color: #718096;
            }
            .no-print {
                display: none;
            }
            @media print {
                .no-print { display: none; }
                body { margin: 0; padding: 0; }
            }
        </style>
    `;

    // Get table HTML
    let tableHTML = tableClone.outerHTML;
    
    // Fix class names for grade badges
    tableHTML = tableHTML.replace(/grade-a-plus/g, 'grade-a-plus');
    tableHTML = tableHTML.replace(/grade-a/g, 'grade-a');
    tableHTML = tableHTML.replace(/grade-a-minus/g, 'grade-a-minus');
    tableHTML = tableHTML.replace(/grade-b/g, 'grade-b');
    tableHTML = tableHTML.replace(/grade-c/g, 'grade-c');
    tableHTML = tableHTML.replace(/grade-d/g, 'grade-d');
    tableHTML = tableHTML.replace(/grade-f/g, 'grade-f');
    tableHTML = tableHTML.replace(/grade-default/g, 'grade-default');

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
                ${tableHTML}
                <div class="footer">
                    <p>Generated by 𝔼𝕡𝕤𝕚𝕝𝕠𝕟『𝜀』 - Learning Management System</p>
                </div>
            </div>
            <script>
                // Auto print after load
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

    // Restore button after print dialog
    setTimeout(function() {
        downloadBtn.innerHTML = originalText;
        downloadBtn.disabled = false;
    }, 3000);
}

// Make functions globally available
window.filterRank = filterRank;
window.downloadPDF = downloadPDF;
