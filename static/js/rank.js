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

// Download PDF - সব Student নিয়ে (সংশোধিত)
function downloadPDF() {
    // Show loading
    const downloadBtn = document.getElementById('downloadBtn');
    const originalText = downloadBtn.innerHTML;
    downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
    downloadBtn.disabled = true;

    setTimeout(function() {
        const container = document.getElementById('rankListContainer');
        const examSelect = document.getElementById('examSelect');
        const classSelect = document.getElementById('classSelect');
        
        const examName = examSelect.options[examSelect.selectedIndex]?.text || 'All Exams';
        const className = classSelect.value || 'All Classes';
        
        // Get all table content
        const content = container.innerHTML;
        
        // Create full PDF content with all students
        const pdfContent = `
            <div class="pdf-content" style="padding: 20px; font-family: 'Poppins', sans-serif; width: 100%;">
                <div class="pdf-header" style="text-align: center; border-bottom: 3px solid #2d3748; padding-bottom: 15px; margin-bottom: 20px;">
                    <h1 style="font-size: 28px; color: #2d3748; margin-bottom: 5px;">𝔼𝕡𝕤𝕚𝕝𝕠𝕟『𝜀』</h1>
                    <p style="color: #718096; font-size: 14px;"><strong>Exam:</strong> ${examName} | <strong>Class:</strong> ${className}</p>
                    <p style="color: #718096; font-size: 14px;">Date: ${new Date().toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</p>
                </div>
                <div style="overflow-x: auto; width: 100%;">
                    ${content}
                </div>
                <div class="pdf-footer" style="text-align: center; border-top: 1px solid #e2e8f0; padding-top: 15px; margin-top: 20px; color: #a0aec0; font-size: 12px;">
                    <p>Generated by 𝔼𝕡𝕤𝕚𝕝𝕠𝕟『𝜀』 - Learning Management System</p>
                </div>
            </div>
        `;

        // Create a temporary container for PDF
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = pdfContent;
        tempDiv.style.padding = '20px';
        tempDiv.style.fontFamily = 'Poppins, sans-serif';
        tempDiv.style.width = '100%';
        tempDiv.style.maxWidth = '1200px';
        tempDiv.style.margin = '0 auto';
        tempDiv.style.background = 'white';
        document.body.appendChild(tempDiv);

        // PDF options - A4 Landscape
        const opt = {
            margin: {
                top: 10,
                bottom: 10,
                left: 10,
                right: 10
            },
            filename: `Rank_${examName.replace(/\s+/g, '_')}_Class_${className.replace(/\s+/g, '_')}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { 
                scale: 2,
                useCORS: true,
                logging: false,
                width: tempDiv.scrollWidth,
                height: tempDiv.scrollHeight,
                windowWidth: tempDiv.scrollWidth,
                windowHeight: tempDiv.scrollHeight
            },
            jsPDF: { 
                unit: 'mm', 
                format: 'a4', 
                orientation: 'landscape'
            },
            pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
        };

        // Generate PDF
        html2pdf().set(opt).from(tempDiv).save().then(function() {
            document.body.removeChild(tempDiv);
            downloadBtn.innerHTML = originalText;
            downloadBtn.disabled = false;
        }).catch(function(error) {
            console.error('PDF Generation Error:', error);
            document.body.removeChild(tempDiv);
            downloadBtn.innerHTML = originalText;
            downloadBtn.disabled = false;
            alert('Error generating PDF. Please try again.');
        });
    }, 500);
}

// Make functions globally available
window.filterRank = filterRank;
window.downloadPDF = downloadPDF;
