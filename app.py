from flask import Flask, render_template, request, redirect, session, flash, url_for, jsonify, send_file
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
            exam_type TEXT DEFAULT 'offline',
            exam_time TEXT,
            duration INTEGER DEFAULT 0,
            class TEXT,
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
    
    # Study Materials table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS study_materials (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            class TEXT NOT NULL,
            subject TEXT NOT NULL,
            topic TEXT NOT NULL,
            filename TEXT NOT NULL,
            file_path TEXT NOT NULL,
            file_type TEXT NOT NULL,
            uploaded_by TEXT NOT NULL,
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
# Database Download Route
# ------------------------
@app.route("/download_database")
def download_database():
    """Download the database file"""
    try:
        if os.path.exists(DB_PATH):
            return send_file(DB_PATH, as_attachment=True, download_name='tution.db')
        else:
            flash('Database file not found!', 'error')
            return redirect(url_for('login'))
    except Exception as e:
        flash('Error downloading database: ' + str(e), 'error')
        return redirect(url_for('login'))

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
    
    # Get all students
    cursor.execute('SELECT * FROM students ORDER BY created_at DESC')
    students = cursor.fetchall()
    
    # Get unique classes count
    cursor.execute('SELECT COUNT(DISTINCT class) as count FROM students')
    class_count = cursor.fetchone()['count']
    
    # Get total exams count
    cursor.execute('SELECT COUNT(*) as count FROM exams')
    total_exams = cursor.fetchone()['count']
    
    # Get study materials
    cursor.execute('SELECT * FROM study_materials ORDER BY created_at DESC')
    study_materials = cursor.fetchall()
    
    conn.close()
    
    return render_template('teacher_home.html', 
                         students=students,
                         class_count=class_count,
                         total_exams=total_exams,
                         study_materials=study_materials)

# ------------------------
# View Student Dashboard as Teacher
# ------------------------
@app.route("/student_dashboard_as_teacher/<int:student_id>")
def student_dashboard_as_teacher(student_id):
    if 'user_type' not in session or session['user_type'] != 'teacher':
        flash('Please login as teacher first!', 'error')
        return redirect(url_for('login'))
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Get student info
    cursor.execute('SELECT * FROM students WHERE id = ?', (student_id,))
    student = cursor.fetchone()
    
    if not student:
        flash('Student not found!', 'error')
        return redirect(url_for('teacher_home'))
    
    # Get student's results
    cursor.execute('''
        SELECT r.*, e.exam_name, e.subject, e.full_marks, e.exam_date
        FROM results r
        JOIN exams e ON r.exam_id = e.id
        WHERE r.student_id = ?
        ORDER BY r.created_at DESC
    ''', (student_id,))
    student_results = cursor.fetchall()
    
    # Get total students count
    cursor.execute('SELECT COUNT(*) as count FROM students')
    total_students = cursor.fetchone()['count']
    
    # Get student's rank
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
        if row['student_id'] == student_id:
            student_rank = idx + 1
            if total_students > 0:
                rank_percentage = round((student_rank / total_students) * 100, 1)
            break
    
    # Get class rank
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
            if row['id'] == student_id:
                class_rank = idx + 1
                break
    else:
        class_rank = None
    
    # Get total exams taken
    cursor.execute('SELECT COUNT(*) as count FROM results WHERE student_id = ?', (student_id,))
    total_exams_taken = cursor.fetchone()['count']
    
    # Get class notes
    cursor.execute('''
        SELECT * FROM study_materials 
        WHERE class = ? 
        ORDER BY created_at DESC
    ''', (student['class'],))
    class_notes = cursor.fetchall()
    
    # Get online exams for this student's class
    cursor.execute('''
        SELECT * FROM exams 
        WHERE exam_type = 'online' 
        AND class = ?
        ORDER BY created_at DESC
    ''', (student['class'],))
    my_exams = cursor.fetchall()
    
    conn.close()
    
    return render_template('student_dashboard.html', 
                         student=student,
                         student_results=student_results,
                         total_students=total_students,
                         student_rank=student_rank,
                         class_rank=class_rank,
                         rank_percentage=rank_percentage,
                         total_exams_taken=total_exams_taken,
                         class_notes=class_notes,
                         my_exams=my_exams)

# ------------------------
# Study Material Routes
# ------------------------
@app.route("/upload_study_material", methods=["POST"])
def upload_study_material():
    if 'user_type' not in session or session['user_type'] != 'teacher':
        flash('Unauthorized access!', 'error')
        return redirect(url_for('login'))
    
    class_name = request.form.get('class')
    subject = request.form.get('subject')
    topic = request.form.get('topic')
    file = request.files.get('file')
    
    if not all([class_name, subject, topic, file]):
        flash('All fields are required!', 'error')
        return redirect(url_for('teacher_home'))
    
    # Create study_materials directory if not exists
    upload_dir = os.path.join(BASE_DIR, 'static', 'study_materials')
    if not os.path.exists(upload_dir):
        os.makedirs(upload_dir)
    
    # Save file
    filename = f"{datetime.now().strftime('%Y%m%d_%H%M%S')}_{file.filename}"
    file_path = os.path.join(upload_dir, filename)
    file.save(file_path)
    
    # Get file extension
    file_ext = file.filename.split('.')[-1].lower()
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    try:
        cursor.execute('''
            INSERT INTO study_materials (class, subject, topic, filename, file_path, file_type, uploaded_by)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (class_name, subject, topic, file.filename, filename, file_ext, session['username']))
        
        conn.commit()
        flash('Study material uploaded successfully!', 'success')
    except Exception as e:
        flash('Error uploading: ' + str(e), 'error')
    finally:
        conn.close()
    
    return redirect(url_for('teacher_home'))

@app.route("/download_material/<int:material_id>")
def download_material(material_id):
    if 'user_type' not in session:
        flash('Please login first!', 'error')
        return redirect(url_for('login'))
    
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM study_materials WHERE id = ?', (material_id,))
    material = cursor.fetchone()
    conn.close()
    
    if not material:
        flash('Material not found!', 'error')
        return redirect(url_for('teacher_home'))
    
    file_path = os.path.join(BASE_DIR, 'static', 'study_materials', material['file_path'])
    if os.path.exists(file_path):
        return send_file(file_path, as_attachment=True, download_name=material['filename'])
    else:
        flash('File not found!', 'error')
        return redirect(url_for('teacher_home'))

@app.route("/delete_material/<int:material_id>", methods=["POST"])
def delete_material(material_id):
    if 'user_type' not in session or session['user_type'] != 'teacher':
        flash('Unauthorized access!', 'error')
        return redirect(url_for('login'))
    
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM study_materials WHERE id = ?', (material_id,))
    material = cursor.fetchone()
    
    if material:
        # Delete file from disk
        file_path = os.path.join(BASE_DIR, 'static', 'study_materials', material['file_path'])
        if os.path.exists(file_path):
            os.remove(file_path)
        
        # Delete from database
        cursor.execute('DELETE FROM study_materials WHERE id = ?', (material_id,))
        conn.commit()
        flash('Material deleted successfully!', 'success')
    else:
        flash('Material not found!', 'error')
    
    conn.close()
    return redirect(url_for('teacher_home'))

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
    
    # Check and add new columns if not exists
    cursor.execute("PRAGMA table_info(exams)")
    columns = [col['name'] for col in cursor.fetchall()]
    
    if 'exam_type' not in columns:
        cursor.execute("ALTER TABLE exams ADD COLUMN exam_type TEXT DEFAULT 'offline'")
    if 'exam_time' not in columns:
        cursor.execute("ALTER TABLE exams ADD COLUMN exam_time TEXT")
    if 'duration' not in columns:
        cursor.execute("ALTER TABLE exams ADD COLUMN duration INTEGER DEFAULT 0")
    if 'class' not in columns:
        cursor.execute("ALTER TABLE exams ADD COLUMN class TEXT")
    
    cursor.execute('SELECT * FROM exams ORDER BY created_at DESC')
    exams = cursor.fetchall()
    
    cursor.execute('SELECT name FROM teachers ORDER BY name')
    teachers = cursor.fetchall()
    
    # Get all students for class dropdown
    cursor.execute('SELECT DISTINCT class FROM students ORDER BY class')
    all_students = cursor.fetchall()
    
    conn.close()
    
    if session['user_type'] == 'admin':
        return render_template('exam.html', exams=exams, teachers=teachers, all_students=all_students, user_type='admin')
    elif session['user_type'] == 'teacher':
        return render_template('exam.html', exams=exams, teachers=teachers, all_students=all_students, user_type='teacher')
    else:
        return render_template('exam.html', exams=exams, teachers=teachers, all_students=all_students, user_type='student')

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
    exam_type = request.form.get('exam_type', 'offline')
    exam_time = request.form.get('exam_time')
    duration = request.form.get('duration')
    exam_class = request.form.get('class')
    
    if not all([exam_name, teacher_name, subject, full_marks, exam_date]):
        flash('All fields are required!', 'error')
        return redirect(url_for('exam'))
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    try:
        cursor.execute('''
            INSERT INTO exams (exam_name, teacher_name, subject, full_marks, exam_date, exam_type, exam_time, duration, class) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (exam_name, teacher_name, subject, full_marks, exam_date, exam_type, exam_time, duration, exam_class))
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
# Online Test Routes
# ------------------------
@app.route("/online_test/<int:exam_id>")
def online_test(exam_id):
    if 'user_type' not in session or session['user_type'] != 'student':
        flash('Please login as student first!', 'error')
        return redirect(url_for('login'))
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Get exam details
    cursor.execute('SELECT * FROM exams WHERE id = ? AND exam_type = "online"', (exam_id,))
    exam = cursor.fetchone()
    
    if not exam:
        flash('Exam not found!', 'error')
        return redirect(url_for('student_dashboard'))
    
    # Check if student has already taken this exam
    cursor.execute('SELECT * FROM results WHERE exam_id = ? AND student_id = ?', 
                  (exam_id, session['user_id']))
    existing_result = cursor.fetchone()
    
    if existing_result:
        flash('You have already taken this test!', 'error')
        return redirect(url_for('student_dashboard'))
    
    conn.close()
    
    return render_template('test.html', exam=exam)

# ------------------------
# Submit Online Test (JSON)
# ------------------------
@app.route("/submit_online_test", methods=["POST"])
def submit_online_test():
    if 'user_type' not in session or session['user_type'] != 'student':
        return jsonify({'success': False, 'error': 'Unauthorized'}), 401
    
    data = request.get_json()
    exam_id = data.get('exam_id')
    marks = data.get('marks', 0)
    grade = data.get('grade', '')
    
    if not exam_id:
        return jsonify({'success': False, 'error': 'Exam ID required'}), 400
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Check if already submitted
    cursor.execute('SELECT * FROM results WHERE exam_id = ? AND student_id = ?', 
                  (exam_id, session['user_id']))
    existing = cursor.fetchone()
    
    if existing:
        conn.close()
        return jsonify({'success': False, 'error': 'Already submitted'}), 400
    
    try:
        cursor.execute('''
            INSERT INTO results (exam_id, student_id, marks, grade)
            VALUES (?, ?, ?, ?)
        ''', (exam_id, session['user_id'], marks, grade))
        
        conn.commit()
        conn.close()
        return jsonify({'success': True, 'message': 'Exam submitted successfully!'})
    except Exception as e:
        conn.close()
        return jsonify({'success': False, 'error': str(e)}), 500

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
    
    if not student:
        flash('Student not found!', 'error')
        return redirect(url_for('login'))
    
    # Debug
    print("=" * 50)
    print("👨‍🎓 STUDENT DASHBOARD")
    print(f"   Student: {student['name']}")
    print(f"   Class: {student['class']}")
    print("=" * 50)
    
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
    
    # Get student's rank
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
    
    # Get class rank
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
    
    # Get class notes
    cursor.execute('''
        SELECT * FROM study_materials 
        WHERE class = ? 
        ORDER BY created_at DESC
    ''', (student['class'],))
    class_notes = cursor.fetchall()
    
    # =============================================
    # GET ONLINE EXAMS FOR STUDENT'S CLASS
    # =============================================
    
    # সব Online Exam বের করুন (class filter ছাড়া)
    cursor.execute('''
        SELECT * FROM exams 
        WHERE exam_type = 'online'
        ORDER BY created_at DESC
    ''')
    all_online_exams = cursor.fetchall()
    
    print(f"📚 Total Online Exams Found: {len(all_online_exams)}")
    for exam in all_online_exams:
        print(f"   - {exam['exam_name']} (Class: {exam['class']}, Status: {exam['status']})")
    
    # Student এর Class এর সাথে মিলান
    my_exams = []
    student_class = str(student['class']) if student['class'] is not None else ''
    
    # Also check which exams the student has already taken
    cursor.execute('SELECT exam_id FROM results WHERE student_id = ?', (session['user_id'],))
    taken_exams = [row['exam_id'] for row in cursor.fetchall()]
    
    for exam in all_online_exams:
        exam_class = str(exam['class']) if exam['class'] is not None else ''
        # যদি class খালি থাকে অথবা মেলে, এবং exam taken না থাকে
        if (exam_class == '' or exam_class == student_class) and exam['id'] not in taken_exams:
            my_exams.append(exam)
    
    # যদি কিছু না পাওয়া যায়, সব Online Exam দেখান (শুধু যেগুলো taken না)
    if len(my_exams) == 0:
        for exam in all_online_exams:
            if exam['id'] not in taken_exams:
                my_exams.append(exam)
        print("⚠️ No matching exams found, showing all online exams (not taken)")
    
    print(f"📚 My Exams: {len(my_exams)}")
    for exam in my_exams:
        print(f"   - {exam['exam_name']} (Class: {exam['class']})")
    print("=" * 50)
    
    conn.close()
    
    return render_template('student_dashboard.html', 
                         student=student,
                         student_results=student_results,
                         total_students=total_students,
                         student_rank=student_rank,
                         class_rank=class_rank,
                         rank_percentage=rank_percentage,
                         total_exams_taken=total_exams_taken,
                         class_notes=class_notes,
                         my_exams=my_exams)

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
    
    # Get all students
    cursor.execute('SELECT * FROM students ORDER BY created_at DESC')
    students = cursor.fetchall()
    
    # Dictionary to store results for each student
    student_results = {}
    student_ranks = {}
    
    # Get all results with exam details
    cursor.execute('''
        SELECT 
            r.student_id, 
            r.marks, 
            r.grade, 
            e.exam_name, 
            e.full_marks,
            e.subject
        FROM results r
        JOIN exams e ON r.exam_id = e.id
        ORDER BY r.created_at DESC
    ''')
    all_results = cursor.fetchall()
    
    # Group results by student_id
    for result in all_results:
        student_id = result['student_id']
        if student_id not in student_results:
            student_results[student_id] = []
        student_results[student_id].append({
            'exam_name': result['exam_name'],
            'subject': result['subject'],
            'marks': result['marks'],
            'full_marks': result['full_marks'],
            'grade': result['grade']
        })
    
    # Get ranks for each student
    cursor.execute('''
        SELECT 
            student_id, 
            SUM(marks) as total_marks,
            RANK() OVER (ORDER BY SUM(marks) DESC) as rank_position
        FROM results
        GROUP BY student_id
    ''')
    rank_data = cursor.fetchall()
    
    for rank in rank_data:
        student_ranks[rank['student_id']] = rank['rank_position']
    
    conn.close()
    
    return render_template('admin_students.html', 
                         students=students,
                         student_results=student_results,
                         student_ranks=student_ranks)

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
# Edit Student Route
# ------------------------
@app.route("/edit_student", methods=["POST"])
def edit_student():
    if 'user_type' not in session or session['user_type'] != 'admin':
        flash('Unauthorized access!', 'error')
        return redirect(url_for('login'))
    
    student_id = request.form.get('student_id')
    name = request.form.get('name')
    class_name = request.form.get('class')
    school = request.form.get('school')
    phone = request.form.get('phone')
    password = request.form.get('password')
    
    if not all([student_id, name, class_name, school, phone]):
        flash('All fields are required!', 'error')
        return redirect(url_for('admin_students'))
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    try:
        if password and len(password) >= 6:
            cursor.execute('''UPDATE students 
                          SET name = ?, class = ?, school = ?, phone = ?, password = ?
                          WHERE id = ?''',
                          (name, class_name, school, phone, password, student_id))
        else:
            cursor.execute('''UPDATE students 
                          SET name = ?, class = ?, school = ?, phone = ?
                          WHERE id = ?''',
                          (name, class_name, school, phone, student_id))
        
        conn.commit()
        flash('Student updated successfully!', 'success')
    except sqlite3.IntegrityError:
        flash('Phone number already exists!', 'error')
    except Exception as e:
        flash('Error updating student: ' + str(e), 'error')
    finally:
        conn.close()
    
    return redirect(url_for('admin_students'))

@app.route("/get_student_data/<int:student_id>")
def get_student_data(student_id):
    if 'user_type' not in session or session['user_type'] != 'admin':
        return jsonify({'error': 'Unauthorized'}), 401
    
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM students WHERE id = ?', (student_id,))
    student = cursor.fetchone()
    conn.close()
    
    if student:
        return jsonify(dict(student))
    else:
        return jsonify({'error': 'Student not found'}), 404

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
