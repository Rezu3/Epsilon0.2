// static/js/results.js

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
                // Trigger change event to filter
                const event = new Event('change');
                subjectSelect.dispatchEvent(event);
            }
        });
    }

    // Auto filter if all fields are pre-selected
    const examSelect2 = document.getElementById('examSelect');
    const classSelect = document.getElementById('classSelect');
    
    if (examSelect2 && examSelect2.value && classSelect && classSelect.value) {
        filterStudents();
    }

    // Add event listener for Enter key on marks inputs
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const target = e.target;
            if (target.classList && target.classList.contains('marks-input')) {
                e.preventDefault();
                // Find next marks input
                const inputs = document.querySelectorAll('.marks-input');
                const currentIndex = Array.from(inputs).indexOf(target);
                if (currentIndex < inputs.length - 1) {
                    inputs[currentIndex + 1].focus();
                }
            }
        }
    });
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

// Calculate grade based on marks (auto detect full marks from table)
function calculateGrade(input) {
    const marks = parseFloat(input.value);
    const studentId = input.closest('tr').querySelector('input[name="student_id[]"]').value;
    const gradeSpan = document.getElementById('grade-' + studentId);
    
    if (!gradeSpan) return;
    
    // Get full marks from the table header
    const fullMarksText = document.querySelector('.marks-table th span')?.textContent || '';
    const fullMarksMatch = fullMarksText.match(/\d+/);
    const fullMarks = fullMarksMatch ? parseInt(fullMarksMatch[0]) : 100;
    
    // Check if marks is valid
    if (isNaN(marks) || marks < 0) {
        gradeSpan.textContent = '-';
        gradeSpan.className = 'grade-badge grade-default';
        input.classList.remove('has-marks');
        input.style.borderColor = '';
        input.style.background = '';
        return;
    }
    
    // Check if marks exceeds full marks
    if (marks > fullMarks) {
        gradeSpan.textContent = 'Invalid';
        gradeSpan.className = 'grade-badge grade-f';
        input.classList.add('has-marks');
        input.style.borderColor = '#f56565';
        input.style.background = '#fff5f5';
        return;
    } else {
        input.style.borderColor = '';
        input.style.background = '';
    }
    
    input.classList.add('has-marks');
    
    // Calculate percentage
    const percentage = (marks / fullMarks) * 100;
    
    let grade, gradeClass;
    
    if (percentage >= 80) {
        grade = 'A+';
        gradeClass = 'grade-a-plus';
    } else if (percentage >= 70) {
        grade = 'A';
        gradeClass = 'grade-a';
    } else if (percentage >= 60) {
        grade = 'A-';
        gradeClass = 'grade-a-minus';
    } else if (percentage >= 50) {
        grade = 'B';
        gradeClass = 'grade-b';
    } else if (percentage >= 40) {
        grade = 'C';
        gradeClass = 'grade-c';
    } else if (percentage >= 33) {
        grade = 'D';
        gradeClass = 'grade-d';
    } else {
        grade = 'F';
        gradeClass = 'grade-f';
    }
    
    gradeSpan.textContent = grade;
    gradeSpan.className = 'grade-badge ' + gradeClass;
}

// Filter students based on selections
function filterStudents() {
    const examId = document.getElementById('examSelect').value;
    const subject = document.getElementById('subjectSelect').value;
    const className = document.getElementById('classSelect').value;

    // Check if all required fields are selected
    if (!examId || !className) {
        document.getElementById('studentsListContainer').innerHTML = `
            <div class="empty-state">
                <i class="fas fa-user-graduate"></i>
                <h3>Select Exam & Class</h3>
                <p>Please select an exam and class to view students</p>
                <p style="font-size:13px; color:#a0aec0; margin-top:5px;">
                    <i class="fas fa-info-circle"></i> 
                    Students will appear based on their registered class
                </p>
            </div>
        `;
        return;
    }

    // Show loading
    document.getElementById('studentsListContainer').innerHTML = `
        <div class="empty-state">
            <i class="fas fa-spinner fa-spin"></i>
            <h3>Loading...</h3>
            <p>Please wait while we fetch student data</p>
        </div>
    `;

    // Fetch students by class
    fetch('/get_students_by_class', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'class_name=' + encodeURIComponent(className) + '&exam_id=' + encodeURIComponent(examId)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(html => {
        document.getElementById('studentsListContainer').innerHTML = html;
        document.getElementById('studentsListContainer').classList.add('students-list-loaded');
        
        // Get full marks from the table header
        const fullMarksText = document.querySelector('.marks-table th span')?.textContent || '';
        const fullMarksMatch = fullMarksText.match(/\d+/);
        const fullMarks = fullMarksMatch ? parseInt(fullMarksMatch[0]) : 100;
        
        // Auto-calculate grades for existing marks
        document.querySelectorAll('.marks-input').forEach(input => {
            if (input.value && input.value !== '' && !isNaN(input.value)) {
                calculateGrade(input);
            }
        });
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('studentsListContainer').innerHTML = `
            <div class="empty-state">
                <i class="fas fa-exclamation-circle" style="color: #f56565;"></i>
                <h3>Error Loading Data</h3>
                <p>Please try again or refresh the page</p>
                <p style="font-size:13px; color:#a0aec0; margin-top:5px;">
                    <i class="fas fa-info-circle"></i> 
                    Error: ${error.message}
                </p>
            </div>
        `;
    });
}

// Save all results
function saveResults() {
    const form = document.getElementById('marksForm');
    if (!form) {
        alert('No results to save! Please select exam and class first.');
        return;
    }
    
    const examId = document.getElementById('examSelect').value;
    if (!examId) {
        alert('Please select an exam first!');
        return;
    }
    
    const className = document.getElementById('classSelect').value;
    if (!className) {
        alert('Please select a class first!');
        return;
    }
    
    const marksInputs = form.querySelectorAll('input[name="marks[]"]');
    let hasMarks = false;
    let hasError = false;
    
    // Get full marks
    const fullMarksText = document.querySelector('.marks-table th span')?.textContent || '';
    const fullMarksMatch = fullMarksText.match(/\d+/);
    const fullMarks = fullMarksMatch ? parseInt(fullMarksMatch[0]) : 100;
    
    marksInputs.forEach(input => {
        if (input.value && parseFloat(input.value) >= 0) {
            const marks = parseFloat(input.value);
            if (marks > fullMarks) {
                hasError = true;
                input.style.borderColor = '#f56565';
                input.style.background = '#fff5f5';
            } else {
                hasMarks = true;
                input.style.borderColor = '';
                input.style.background = '';
            }
        }
    });
    
    if (hasError) {
        alert('⚠️ Some students have marks exceeding the full marks (' + fullMarks + '). Please correct them!');
        return;
    }
    
    if (!hasMarks) {
        alert('Please enter marks for at least one student!');
        return;
    }
    
    // Confirm save
    if (!confirm('Are you sure you want to save these results for Class ' + className + '?')) {
        return;
    }
    
    // Submit form
    const formData = new FormData(form);
    
    fetch('/save_results', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(() => {
        // Reload the page to show success message
        window.location.reload();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error saving results. Please try again.');
    });
}

// Close sidebar on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const sidebar = document.getElementById('sidebar');
        if (sidebar && sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
        }
        // Close any open modals
        const modal = document.getElementById('addExamModal');
        if (modal && modal.style.display === 'flex') {
            modal.style.display = 'none';
            modal.classList.remove('show');
        }
    }
});

// Make functions globally available
window.filterStudents = filterStudents;
window.calculateGrade = calculateGrade;
window.saveResults = saveResults;