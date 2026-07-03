from flask import Flask, render_template, request, redirect, session, flash, url_for, jsonify
import sqlite3
import os
from datetime import datetime

app = Flask(__name__)
app.secret_key = "tution_management_secret_key_2026"

# ------------------------
# Database configuration
# ------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "tution.db")

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_database():
    """Initialize database with all required tables"""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Admin table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS admin (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    ''')
    
    # Teachers table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS teachers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            phone TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Students table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            class TEXT NOT NULL,
            school TEXT NOT NULL,
            phone TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            fees_total REAL DEFAULT 0,
            fees_paid REAL DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Exams table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS exams (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            exam_name TEXT NOT NULL,
            teacher_name TEXT NOT NULL,
            subject TEXT NOT NULL,
            full_marks INTEGER NOT NULL,
            exam_date DATE NOT NULL,
            status TEXT DEFAULT 'Upcoming',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Results table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS results (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            exam_id INTEGER NOT NULL,
            student_id INTEGER NOT NULL,
            marks REAL DEFAULT 0,
            grade TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (exam_id) REFERENCES exams(id),
            FOREIGN KEY (student_id) REFERENCES students(id)
        )
    ''')
    
    # Quizzes table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS quizzes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            quiz_name TEXT NOT NULL,
            subject TEXT NOT NULL,
            total_marks INTEGER DEFAULT 10,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Insert default admin
    cursor.execute('SELECT * FROM admin WHERE username = ?', ('admin',))
    if not cursor.fetchone():
        cursor.execute('INSERT INTO admin (username, password) VALUES (?, ?)', 
                      ('admin', 'admin123'))
    
    conn.commit()
    conn.close()

init_database()

# ------------------------
# Login Page
# ------------------------
@app.route("/", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        login_type = request.form.get("login_type")
        phone = request.form.get("phone")
        password = request.form.get("password")
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        if login_type == "admin":
            cursor.execute('SELECT * FROM admin WHERE username = ? AND password = ?', 
                          (phone, password))
            user = cursor.fetchone()
            if user:
                session['user_type'] = 'admin'
                session['user_id'] = user['id']
                session['username'] = user['username']
                conn.close()
                flash('Login successful! Welcome Admin.', 'success')
                return redirect(url_for('admin_dashboard'))
                
        elif login_type == "teacher":
            cursor.execute('SELECT * FROM teachers WHERE phone = ? AND password = ?', 
                          (phone, password))
            user = cursor.fetchone()
            if user:
                session['user_type'] = 'teacher'
                session['user_id'] = user['id']
                session['username'] = user['name']
                conn.close()
                flash('Login successful! Welcome Teacher.', 'success')
                return redirect(url_for('teacher_home'))
                
        elif login_type == "student":
            cursor.execute('SELECT * FROM students WHERE phone = ? AND password = ?', 
                          (phone, password))
            user = cursor.fetchone()
            if user:
                session['user_type'] = 'student'
                session['user_id'] = user['id']
                session['username'] = user['name']
                conn.close()
                flash('Login successful! Welcome Student.', 'success')
                return redirect(url_for('student_dashboard'))
        
        conn.close()
        flash('Invalid credentials! Please try again.', 'error')
        return redirect(url_for('login'))
    
    return render_template('login.html')

# ------------------------
# Registration Pages
# ------------------------
@app.route("/teacher_register", methods=["GET", "POST"])
def teacher_register():
    if request.method == "POST":
        name = request.form.get("name")
        phone = request.form.get("phone")
        password = request.form.get("password")
        confirm_password = request.form.get("confirm_password")
        
        if not name or not phone or not password:
            flash('All fields are required!', 'error')
            return render_template('teacher_register.html')
        
        if password != confirm_password:
            flash('Passwords do not match!', 'error')
            return render_template('teacher_register.html')
        
        if len(password) < 6:
            flash('Password must be at least 6 characters!', 'error')
            return render_template('teacher_register.html')
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        try:
            cursor.execute('INSERT INTO teachers (name, phone, password) VALUES (?, ?, ?)',
                          (name, phone, password))
            conn.commit()
            flash('Teacher registration successful! Please login.', 'success')
            conn.close()
            return redirect(url_for('login'))
        except sqlite3.IntegrityError:
            flash('Phone number already registered!', 'error')
            conn.close()
            return render_template('teacher_register.html')
    
    return render_template('teacher_register.html')

@app.route("/student_register", methods=["GET", "POST"])
def student_register():
    if request.method == "POST":
        name = request.form.get("name")
        class_name = request.form.get("class")
        school = request.form.get("school")
        phone = request.form.get("phone")
        password = request.form.get("password")
        confirm_password = request.form.get("confirm_password")
        
        if not all([name, class_name, school, phone, password]):
            flash('All fields are required!', 'error')
            return render_template('student_register.html')
        
        if password != confirm_password:
            flash('Passwords do not match!', 'error')
            return render_template('student_register.html')
        
        if len(password) < 6:
            flash('Password must be at least 6 characters!', 'error')
            return render_template('student_register.html')
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        try:
            cursor.execute('''INSERT INTO students 
                          (name, class, school, phone, password) 
                          VALUES (?, ?, ?, ?, ?)''',
                          (name, class_name, school, phone, password))
            conn.commit()
            flash('Student registration successful! Please login.', 'success')
            conn.close()
            return redirect(url_for('login'))
        except sqlite3.IntegrityError:
            flash('Phone number already registered!', 'error')
            conn.close()
            return render_template('student_register.html')
    
    return render_template('student_register.html')

# ------------------------
# Admin Dashboard
# ------------------------
@app.route("/admin_dashboard")
def admin_dashboard():
    if 'user_type' not in session or session['user_type'] != 'admin':
        flash('Please login as admin first!', 'error')
        return redirect(url_for('login'))
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute('SELECT COUNT(*) as count FROM students')
    total_students = cursor.fetchone()['count']
    
    cursor.execute('SELECT COUNT(*) as count FROM teachers')
    total_teachers = cursor.fetchone()['count']
    
    cursor.execute('SELECT SUM(fees_total) as total, SUM(fees_paid) as paid FROM students')
    fees_data = cursor.fetchone()
    total_fees = fees_data['total'] or 0
    total_paid = fees_data['paid'] or 0
    total_due = total_fees - total_paid
    
    conn.close()
    
    return render_template('admin_dashboard.html', 
                         total_students=total_students,
                         total_teachers=total_teachers,
                         total_fees=total_fees,
                         total_paid=total_paid,
                         total_due=total_due)

# ------------------------
# Teacher Home
# ------------------------
@app.route("/teacher_home")
def teacher_home():
    if 'user_type' not in session or session['user_type'] != 'teacher':
        flash('Please login as teacher first!', 'error')
        return redirect(url_for('login'))
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute('SELECT * FROM students ORDER BY created_at DESC')
    students = cursor.fetchall()
    
    conn.close()
    
    return render_template('teacher_home.html', students=students)

# ------------------------
# Student Dashboard
# ------------------------
@app.route("/student_dashboard")
def student_dashboard():
    if 'user_type' not in session or session['user_type'] != 'student':
        flash('Please login as student first!', 'error')
        return redirect(url_for('login'))
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Get student info
    cursor.execute('SELECT * FROM students WHERE id = ?', (session['user_id'],))
    student = cursor.fetchone()
    
    # Get student's results
    cursor.execute('''
        SELECT r.*, e.exam_name, e.subject, e.full_marks, e.exam_date
        FROM results r
        JOIN exams e ON r.exam_id = e.id
        WHERE r.student_id = ?
        ORDER BY r.created_at DESC
    ''', (session['user_id'],))
    student_results = cursor.fetchall()
    
    # Get total students count
    cursor.execute('SELECT COUNT(*) as count FROM students')
    total_students = cursor.fetchone()['count']
    
    # Get student's rank based on TOTAL marks (SUM of all marks)
    cursor.execute('''
        SELECT student_id, SUM(marks) as total_marks
        FROM results
        GROUP BY student_id
        ORDER BY total_marks DESC
    ''')
    all_ranks = cursor.fetchall()
    
    student_rank = None
    rank_percentage = 0
    
    for idx, row in enumerate(all_ranks):
        if row['student_id'] == session['user_id']:
            student_rank = idx + 1
            if total_students > 0:
                rank_percentage = round((student_rank / total_students) * 100, 1)
            break
    
    # Get class rank based on TOTAL marks
    if student:
        cursor.execute('''
            SELECT s.id, SUM(r.marks) as total_marks
            FROM results r
            JOIN students s ON r.student_id = s.id
            WHERE s.class = ?
            GROUP BY r.student_id
            ORDER BY total_marks DESC
        ''', (student['class'],))
        class_ranks = cursor.fetchall()
        
        class_rank = None
        for idx, row in enumerate(class_ranks):
            if row['id'] == session['user_id']:
                class_rank = idx + 1
                break
    else:
        class_rank = None
    
    # Get total exams taken
    cursor.execute('SELECT COUNT(*) as count FROM results WHERE student_id = ?', (session['user_id'],))
    total_exams_taken = cursor.fetchone()['count']
    
    conn.close()
    
    return render_template('student_dashboard.html', 
                         student=student,
                         student_results=student_results,
                         total_students=total_students,
                         student_rank=student_rank,
                         class_rank=class_rank,
                         rank_percentage=rank_percentage,
                         total_exams_taken=total_exams_taken)

# ------------------------
# Admin - Students & Teachers
# ------------------------
@app.route("/admin/students")
def admin_students():
    if 'user_type' not in session or session['user_type'] != 'admin':
        flash('Please login as admin first!', 'error')
        return redirect(url_for('login'))
    
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM students ORDER BY created_at DESC')
    students = cursor.fetchall()
    conn.close()
    
    return render_template('admin_students.html', students=students)

@app.route("/admin/teachers")
def admin_teachers():
    if 'user_type' not in session or session['user_type'] != 'admin':
        flash('Please login as admin first!', 'error')
        return redirect(url_for('login'))
    
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM teachers ORDER BY created_at DESC')
    teachers = cursor.fetchall()
    conn.close()
    
    return render_template('admin_teachers.html', teachers=teachers)

@app.route("/admin/delete_student/<int:student_id>", methods=["POST"])
def delete_student(student_id):
    if 'user_type' not in session or session['user_type'] != 'admin':
        flash('Unauthorized access!', 'error')
        return redirect(url_for('login'))
    
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM students WHERE id = ?', (student_id,))
    conn.commit()
    conn.close()
    
    flash('Student deleted successfully!', 'success')
    return redirect(url_for('admin_students'))

@app.route("/admin/delete_teacher/<int:teacher_id>", methods=["POST"])
def delete_teacher(teacher_id):
    if 'user_type' not in session or session['user_type'] != 'admin':
        flash('Unauthorized access!', 'error')
        return redirect(url_for('login'))
    
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM teachers WHERE id = ?', (teacher_id,))
    conn.commit()
    conn.close()
    
    flash('Teacher deleted successfully!', 'success')
    return redirect(url_for('admin_teachers'))

# ------------------------
# Exam Routes
# ------------------------
@app.route("/exam")
def exam():
    if 'user_type' not in session:
        flash('Please login first!', 'error')
        return redirect(url_for('login'))
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute('SELECT * FROM exams ORDER BY created_at DESC')
    exams = cursor.fetchall()
    
    cursor.execute('SELECT name FROM teachers ORDER BY name')
    teachers = cursor.fetchall()
    conn.close()
    
    if session['user_type'] == 'admin':
        return render_template('exam.html', exams=exams, teachers=teachers, user_type='admin')
    elif session['user_type'] == 'teacher':
        return render_template('exam.html', exams=exams, teachers=teachers, user_type='teacher')
    else:
        return render_template('exam.html', exams=exams, teachers=teachers, user_type='student')

@app.route("/add_exam", methods=["POST"])
def add_exam():
    if 'user_type' not in session:
        flash('Please login first!', 'error')
        return redirect(url_for('login'))
    
    exam_name = request.form.get('exam_name')
    teacher_name = request.form.get('teacher_name')
    subject = request.form.get('subject')
    full_marks = request.form.get('full_marks')
    exam_date = request.form.get('exam_date')
    
    if not all([exam_name, teacher_name, subject, full_marks, exam_date]):
        flash('All fields are required!', 'error')
        return redirect(url_for('exam'))
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    try:
        cursor.execute('''INSERT INTO exams (exam_name, teacher_name, subject, full_marks, exam_date) 
                          VALUES (?, ?, ?, ?, ?)''',
                       (exam_name, teacher_name, subject, full_marks, exam_date))
        conn.commit()
        flash('Exam created successfully!', 'success')
    except Exception as e:
        flash('Error creating exam: ' + str(e), 'error')
    finally:
        conn.close()
    
    return redirect(url_for('exam'))

@app.route("/delete_exam/<int:exam_id>", methods=["POST"])
def delete_exam(exam_id):
    if 'user_type' not in session:
        flash('Please login first!', 'error')
        return redirect(url_for('login'))
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    try:
        cursor.execute('DELETE FROM exams WHERE id = ?', (exam_id,))
        conn.commit()
        flash('Exam deleted successfully!', 'success')
    except Exception as e:
        flash('Error deleting exam: ' + str(e), 'error')
    finally:
        conn.close()
    
    return redirect(url_for('exam'))

# ------------------------
# Result Routes
# ------------------------
def calculate_grade(marks, full_marks):
    if full_marks <= 0:
        return 'N/A'
    
    try:
        marks = float(marks)
    except (ValueError, TypeError):
        return 'N/A'
    
    percentage = (marks / full_marks) * 100
    
    if percentage >= 80:
        return 'A+'
    elif percentage >= 70:
        return 'A'
    elif percentage >= 60:
        return 'A-'
    elif percentage >= 50:
        return 'B'
    elif percentage >= 40:
        return 'C'
    elif percentage >= 33:
        return 'D'
    else:
        return 'F'

@app.route("/results")
def results():
    if 'user_type' not in session:
        flash('Please login first!', 'error')
        return redirect(url_for('login'))
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute('SELECT id, exam_name, subject, full_marks FROM exams ORDER BY created_at DESC')
    exams = cursor.fetchall()
    
    cursor.execute('SELECT DISTINCT class FROM students ORDER BY class')
    classes = cursor.fetchall()
    
    conn.close()
    
    if session['user_type'] == 'admin':
        return render_template('results.html', exams=exams, classes=classes, user_type='admin')
    elif session['user_type'] == 'teacher':
        return render_template('results.html', exams=exams, classes=classes, user_type='teacher')
    else:
        return render_template('results.html', exams=exams, classes=classes, user_type='student')

@app.route("/get_students_by_class", methods=["POST"])
def get_students_by_class():
    if 'user_type' not in session:
        return jsonify({'error': 'Unauthorized'}), 401
    
    class_name = request.form.get('class_name')
    exam_id = request.form.get('exam_id')
    
    if not class_name or not exam_id:
        return jsonify({'error': 'Missing parameters'}), 400
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute('SELECT * FROM students WHERE class = ? ORDER BY name', (class_name,))
    students = cursor.fetchall()
    
    cursor.execute('SELECT id, exam_name, subject, full_marks FROM exams WHERE id = ?', (exam_id,))
    exam = cursor.fetchone()
    
    if exam:
        cursor.execute('SELECT student_id, marks FROM results WHERE exam_id = ?', (exam_id,))
        results = cursor.fetchall()
        result_dict = {r['student_id']: r['marks'] for r in results}
        
        students_list = []
        for student in students:
            student_dict = dict(student)
            student_dict['marks'] = result_dict.get(student['id'], '')
            if student_dict['marks'] != '' and student_dict['marks'] is not None:
                student_dict['grade'] = calculate_grade(float(student_dict['marks']), exam['full_marks'])
            else:
                student_dict['grade'] = ''
            students_list.append(student_dict)
    else:
        students_list = [dict(student) for student in students]
    
    conn.close()
    
    return render_template('partials/student_marks.html', students=students_list, exam=exam)

@app.route("/save_results", methods=["POST"])
def save_results():
    if 'user_type' not in session:
        flash('Please login first!', 'error')
        return redirect(url_for('login'))
    
    exam_id = request.form.get('exam_id')
    student_ids = request.form.getlist('student_id[]')
    marks = request.form.getlist('marks[]')
    
    if not exam_id or not student_ids:
        flash('No data to save!', 'error')
        return redirect(url_for('results'))
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute('SELECT full_marks FROM exams WHERE id = ?', (exam_id,))
    exam = cursor.fetchone()
    full_marks = exam['full_marks'] if exam else 100
    
    try:
        for i, student_id in enumerate(student_ids):
            mark = marks[i] if i < len(marks) and marks[i] else 0
            mark = float(mark) if mark else 0
            
            grade = calculate_grade(mark, full_marks)
            
            cursor.execute('SELECT * FROM results WHERE exam_id = ? AND student_id = ?', 
                          (exam_id, student_id))
            existing = cursor.fetchone()
            
            if existing:
                cursor.execute('''UPDATE results SET marks = ?, grade = ? 
                              WHERE exam_id = ? AND student_id = ?''',
                              (mark, grade, exam_id, student_id))
            else:
                cursor.execute('''INSERT INTO results (exam_id, student_id, marks, grade) 
                              VALUES (?, ?, ?, ?)''',
                              (exam_id, student_id, mark, grade))
        
        conn.commit()
        flash('Results saved successfully!', 'success')
    except Exception as e:
        conn.rollback()
        flash('Error saving results: ' + str(e), 'error')
    finally:
        conn.close()
    
    return redirect(url_for('results'))

# ------------------------
# Rank Routes
# ------------------------
@app.route("/rank")
def rank():
    if 'user_type' not in session:
        flash('Please login first!', 'error')
        return redirect(url_for('login'))
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Get all exams
    cursor.execute('SELECT id, exam_name, subject, full_marks FROM exams ORDER BY created_at DESC')
    exams = cursor.fetchall()
    
    # Get all distinct classes
    cursor.execute('SELECT DISTINCT class FROM students ORDER BY class')
    classes = cursor.fetchall()
    
    conn.close()
    
    if session['user_type'] == 'admin':
        return render_template('rank.html', exams=exams, classes=classes, user_type='admin')
    elif session['user_type'] == 'teacher':
        return render_template('rank.html', exams=exams, classes=classes, user_type='teacher')
    else:
        return render_template('rank.html', exams=exams, classes=classes, user_type='student')

@app.route("/get_rank_data", methods=["POST"])
def get_rank_data():
    if 'user_type' not in session:
        return jsonify({'error': 'Unauthorized'}), 401
    
    class_name = request.form.get('class_name')
    exam_id = request.form.get('exam_id')
    
    if not class_name or not exam_id:
        return jsonify({'error': 'Missing parameters'}), 400
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Get students by class with their results
    cursor.execute('''
        SELECT s.id, s.name, s.class, s.school, 
               r.marks, r.grade,
               e.full_marks, e.exam_name, e.subject
        FROM students s
        LEFT JOIN results r ON s.id = r.student_id AND r.exam_id = ?
        LEFT JOIN exams e ON e.id = ?
        WHERE s.class = ?
        ORDER BY r.marks DESC NULLS LAST
    ''', (exam_id, exam_id, class_name))
    
    students = cursor.fetchall()
    
    # Get exam details
    cursor.execute('SELECT exam_name, subject, full_marks FROM exams WHERE id = ?', (exam_id,))
    exam = cursor.fetchone()
    
    conn.close()
    
    return render_template('partials/rank_list.html', students=students, exam=exam, class_name=class_name)

# ------------------------
# Logout
# ------------------------
@app.route("/logout")
def logout():
    session.clear()
    flash('Logged out successfully!', 'success')
    return redirect(url_for('login'))

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)  
