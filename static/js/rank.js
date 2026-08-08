// static/js/rank.js

document.addEventListener('DOMContentLoaded', function() {
    updateDateTime();
    setInterval(updateDateTime, 1000);

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

    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 992 && sidebar) {
            const isSidebar = sidebar.contains(e.target);
            const isMenuBtn = menuBtn && menuBtn.contains(e.target);
            if (!isSidebar && !isMenuBtn && sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
            }
        }
    });

    const notificationBell = document.querySelector('.notification-bell');
    if (notificationBell) {
        notificationBell.addEventListener('click', function() {
            alert('📬 You have 3 new notifications');
        });
    }

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
// TEACHER FUNCTIONS
// ============================================
function showMyStudents() {
    window.location.href = "/teacher_home#students";
}

function showStudyMaterial() {
    window.location.href = "/teacher_home#study-material";
}

function showQuiz() {
    alert('🧠 Quiz Management');
}

// ============================================
// UPDATE DATE TIME
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
// নাম ঠিক করার ফাংশন
// ============================================
function fixStudentName(name) {
    if (!name) return 'N/A';
    
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
        const firstPart = parts[0];
        const secondPart = parts.slice(1).join(' ');
        if (firstPart.length === 1 && secondPart.length > 0 && firstPart === secondPart[0]) {
            return secondPart;
        }
    }
    return name;
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
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        
        tempDiv.querySelectorAll('td').forEach(cell => {
            const text = cell.textContent.trim();
            if (text && text.length > 0 && !cell.querySelector('.avatar-small')) {
                const fixedName = fixStudentName(text);
                if (fixedName !== text) {
                    cell.textContent = fixedName;
                }
            }
        });
        
        rankListContainer.innerHTML = tempDiv.innerHTML;
        if (downloadBtn) {
            downloadBtn.style.display = 'block';
            downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        rankListContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-exclamation-circle" style="color: #f56565;"></i>
                <h3>Error Loading Data</h3>
                <p>Please try again</p>
            </div>
        `;
        if (downloadBtn) downloadBtn.style.display = 'none';
    });
}

// ============================================
// MAIN DOWNLOAD FUNCTION - ২টি অপশন
// ============================================
function downloadPDF() {
    const container = document.getElementById('rankListContainer');
    const examSelect = document.getElementById('examSelect');
    const classSelect = document.getElementById('classSelect');
    
    if (!container || !examSelect || !classSelect) return;

    const examName = examSelect.options[examSelect.selectedIndex]?.text || 'All Exams';
    const className = classSelect.value || 'All Classes';
    
    const table = container.querySelector('table');
    if (!table) {
        alert('No data to export! Please select exam and class first.');
        return;
    }

    const choice = confirm(
        '📄 Choose an option:\n\n' +
        '🟢 Click "OK" → Direct Download PDF\n' +
        '🟡 Click "Cancel" → Print\n\n' +
        'Which one do you want?'
    );

    if (choice) {
        directDownloadPDF(examName, className, table);
    } else {
        printPDF(examName, className, table);
    }
}

// ============================================
// ১. DIRECT DOWNLOAD PDF
// ============================================
function directDownloadPDF(examName, className, table) {
    const downloadBtn = document.getElementById('downloadBtn');
    const originalText = downloadBtn.innerHTML;
    downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
    downloadBtn.disabled = true;

    const tableClone = table.cloneNode(true);
    tableClone.querySelectorAll('.action-btn, .download-btn, .delete-btn, .show-password-btn').forEach(el => el.remove());

    tableClone.querySelectorAll('td').forEach(cell => {
        const text = cell.textContent.trim();
        if (text && text.length > 0) {
            const fixedName = fixStudentName(text);
            if (fixedName !== text) {
                cell.textContent = fixedName;
            }
        }
    });

    const styles = getPDFStyles();
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
        </body>
        </html>
    `;

    try {
        if (typeof html2pdf !== 'undefined') {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = content;
            tempDiv.style.position = 'fixed';
            tempDiv.style.left = '-9999px';
            tempDiv.style.top = '0';
            document.body.appendChild(tempDiv);
            
            const opt = {
                margin: 10,
                filename: `rank_${examName.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };
            
            html2pdf().set(opt).from(tempDiv).save().then(() => {
                document.body.removeChild(tempDiv);
                downloadBtn.innerHTML = '✅ Downloaded!';
                setTimeout(() => {
                    downloadBtn.innerHTML = originalText;
                    downloadBtn.disabled = false;
                }, 2000);
            }).catch(() => {
                document.body.removeChild(tempDiv);
                fallbackPrint(content, downloadBtn, originalText);
            });
        } else {
            fallbackPrint(content, downloadBtn, originalText);
        }
        
    } catch (e) {
        console.log('PDF generation error:', e);
        fallbackPrint(content, downloadBtn, originalText);
    }
}

// ============================================
// FALLBACK: PRINT METHOD
// ============================================
function fallbackPrint(content, downloadBtn, originalText) {
    try {
        const printWindow = window.open('', '_blank');
        if (!printWindow || printWindow.closed) {
            throw new Error('Popup blocked');
        }
        printWindow.document.write(content);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        
        setTimeout(() => {
            downloadBtn.innerHTML = originalText;
            downloadBtn.disabled = false;
        }, 3000);
    } catch (e) {
        alert('⚠️ Please allow popups. Or use Print option.');
        downloadBtn.innerHTML = originalText;
        downloadBtn.disabled = false;
    }
}

// ============================================
// ২. PRINT PDF
// ============================================
function printPDF(examName, className, table) {
    const downloadBtn = document.getElementById('downloadBtn');
    const originalText = downloadBtn.innerHTML;
    downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Opening Print...';
    downloadBtn.disabled = true;

    const tableClone = table.cloneNode(true);
    tableClone.querySelectorAll('.action-btn, .download-btn, .delete-btn, .show-password-btn').forEach(el => el.remove());

    tableClone.querySelectorAll('td').forEach(cell => {
        const text = cell.textContent.trim();
        if (text && text.length > 0) {
            const fixedName = fixStudentName(text);
            if (fixedName !== text) {
                cell.textContent = fixedName;
            }
        }
    });

    const styles = getPDFStyles();
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
                    }, 500);
                };
            <\/script>
        </body>
        </html>
    `;

    try {
        const printWindow = window.open('', '_blank');
        if (!printWindow || printWindow.closed) {
            throw new Error('Popup blocked');
        }
        printWindow.document.write(content);
        printWindow.document.close();
        printWindow.focus();
        
        setTimeout(() => {
            downloadBtn.innerHTML = originalText;
            downloadBtn.disabled = false;
        }, 3000);
        
    } catch (e) {
        alert('⚠️ Please allow popups for printing.');
        downloadBtn.innerHTML = originalText;
        downloadBtn.disabled = false;
    }
}

// ============================================
// PDF STYLES - Rank ১,২,৩ এর কালার বাদ
// ============================================
function getPDFStyles() {
    return `
        <style>
            @page { margin: 10mm; size: A4; }
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: Arial, sans-serif; padding: 15px; background: white; font-size: 13px; }
            .pdf-container { max-width: 100%; }
            .header { text-align: center; border-bottom: 3px solid #667eea; padding-bottom: 12px; margin-bottom: 15px; }
            .header h1 { font-size: 24px; color: #2d3748; margin: 0; background: linear-gradient(135deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; display: inline-block; }
            .header p { color: #718096; font-size: 13px; margin: 2px 0; }
            table { width: 100%; border-collapse: collapse; font-size: 12px; }
            th { background: #667eea; padding: 8px 10px; text-align: left; font-weight: 600; color: white; border: 1px solid #5a4b8a; }
            td { padding: 7px 10px; border: 1px solid #d1d5db; color: #374151; }
            /* ============================================ */
            /* সব র‍্যাঙ্কের জন্য Normal Zebra Color */
            /* ============================================ */
            tr:nth-child(odd) td { background: #f8fafc; }
            tr:nth-child(even) td { background: #f1f5f9; }
            .rank-badge { display: inline-block; padding: 2px 12px; border-radius: 20px; font-size: 13px; font-weight: 700; background: #e2e8f0; color: #4a5568; }
            .grade-badge { display: inline-block; padding: 2px 10px; border-radius: 12px; font-size: 11px; font-weight: 600; }
            .grade-badge.grade-a-plus { background: #48bb78; color: white; }
            .grade-badge.grade-a { background: #48bb78; color: white; }
            .grade-badge.grade-a-minus { background: #68d391; color: white; }
            .grade-badge.grade-b { background: #f6ad55; color: white; }
            .grade-badge.grade-c { background: #fbd38d; color: #2d3748; }
            .grade-badge.grade-d { background: #fbd38d; color: #2d3748; }
            .grade-badge.grade-f { background: #fc8181; color: white; }
            .grade-badge.grade-default { background: #e2e8f0; color: #4a5568; }
            .footer { text-align: center; border-top: 1px solid #e2e8f0; padding-top: 10px; margin-top: 12px; color: #a0aec0; font-size: 10px; }
            @media print {
                body { margin: 0; padding: 8px; }
                tr:nth-child(odd) td { background: #f8fafc !important; }
                tr:nth-child(even) td { background: #f1f5f9 !important; }
                th { background: #667eea !important; color: white !important; }
            }
            @media screen and (max-width: 600px) {
                body { padding: 8px; font-size: 11px; }
                .header h1 { font-size: 18px; }
                table { font-size: 10px; }
                th, td { padding: 4px 6px; }
            }
        </style>
    `;
}

// ============================================
// GLOBAL EXPORTS
// ============================================
window.filterRank = filterRank;
window.downloadPDF = downloadPDF;
window.showMyStudents = showMyStudents;
window.showStudyMaterial = showStudyMaterial;
window.showQuiz = showQuiz;

console.log('✅ Rank.js loaded successfully');
