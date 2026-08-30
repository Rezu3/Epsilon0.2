from flask import Blueprint, render_template, jsonify, session, redirect, url_for, flash, request
import os
import json
from functools import wraps
from datetime import datetime

quiz_bp = Blueprint('quiz', __name__, 
                    template_folder='templates',
                    static_folder='static',
                    static_url_path='/quiz/static')

# Simple In-Memory Cache
_DATA_CACHE = None

# ===== CLASS MAPPING =====
CLASS_MAPPING = {
    '7': 'class_7',
    '8': 'class_8', 
    '9': 'class_9',
    '10': 'class_10',
    '11': 'class_11',
    'seven': 'class_7',
    'eight': 'class_8',
    'nine': 'class_9',
    'ten': 'class_10',
    'eleven': 'class_11',
    'gnm': 'gnm_anm',
    'anm': 'gnm_anm',
    'gnm_anm': 'gnm_anm',
    'gnm/anm': 'gnm_anm',
    'nursing': 'gnm_anm',
}

# ===== ডেটাবেস সংযোগ ফাংশন =====
def get_db_connection():
    """Get database connection"""
    try:
        from app import DB_PATH, get_db_connection as app_get_db
        return app_get_db()
    except:
        import sqlite3
        from app import DB_PATH
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        return conn

def load_all_quiz_data(force_reload=False):
    """Load all quiz data from JSON files and cache in memory"""
    global _DATA_CACHE
    if _DATA_CACHE is not None and not force_reload:
        return _DATA_CACHE

    combined_batches = {}
    
    possible_dirs = [
        os.path.join(os.path.dirname(__file__), 'static', 'data'),
        os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data'),
        os.path.join(os.path.dirname(__file__), 'data')
    ]
    
    data_dir = None
    for dir_path in possible_dirs:
        if os.path.exists(dir_path):
            data_dir = dir_path
            break
    
    if data_dir:
        print(f"📂 Data directory found: {data_dir}")
        for filename in os.listdir(data_dir):
            if filename.endswith('.json'):
                file_path = os.path.join(data_dir, filename)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        file_data = json.load(f)
                        print(f"✅ Loaded: {filename}")
                        if "batches" in file_data:
                            for batch_id, batch_info in file_data["batches"].items():
                                combined_batches[batch_id] = batch_info
                except Exception as e:
                    print(f"❌ Error loading {filename}: {e}")
    else:
        print("❌ No data directory found!")

    if not combined_batches:
        print("⚠️ No batches found in JSON! Creating default batch...")
        combined_batches = {
            "class_10": {
                "name": "Class 10",
                "subjects": {
                    "math": {
                        "name": "Mathematics",
                        "chapters": {
                            "1": {
                                "name": "Chapter 1",
                                "questions": [
                                    {
                                        "question": "What is 2 + 2?",
                                        "options": ["2", "3", "4", "5"],
                                        "answer": 2
                                    }
                                ]
                            }
                        }
                    }
                }
            }
        }

    _DATA_CACHE = {"batches": combined_batches}
    return _DATA_CACHE

# ===== সেশন চেক ডেকোরেটর =====
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_type' not in session:
            flash('Please login first!', 'error')
            return redirect(url_for('login'))
        if session.get('user_type') not in ['student', 'teacher', 'admin']:
            flash('Unauthorized access!', 'error')
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorated_function

def get_student_class():
    """Get student's class from database and map to JSON batch ID"""
    if session.get('user_type') != 'student':
        return None
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT class FROM students WHERE id = ?', (session.get('user_id'),))
        student = cursor.fetchone()
        conn.close()
        
        if student:
            class_name = student['class'].strip()
            print(f"📚 Student Class from DB: '{class_name}'")
            
            if class_name in CLASS_MAPPING:
                mapped_batch = CLASS_MAPPING[class_name]
                print(f"   Mapped to batch: '{mapped_batch}'")
                return mapped_batch
            
            class_lower = class_name.lower()
            if class_lower in CLASS_MAPPING:
                mapped_batch = CLASS_MAPPING[class_lower]
                print(f"   Mapped to batch: '{mapped_batch}'")
                return mapped_batch
            
            if class_name.isdigit():
                batch_id = f"class_{class_name}"
                print(f"   Using batch: '{batch_id}'")
                return batch_id
            
            print(f"   Using as is: '{class_name}'")
            return class_name
        return None
    except Exception as e:
        print(f"❌ Error getting student class: {e}")
        return None

def get_student_progress_db(student_id, batch_id=None, subject_id=None, chapter_id=None):
    """Get student progress from database"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        if batch_id and subject_id and chapter_id:
            cursor.execute('''
                SELECT * FROM quiz_progress 
                WHERE student_id = ? AND batch_id = ? AND subject_id = ? AND chapter_id = ?
            ''', (student_id, batch_id, subject_id, chapter_id))
            result = cursor.fetchone()
            conn.close()
            return dict(result) if result else None
        
        if batch_id and subject_id:
            cursor.execute('''
                SELECT * FROM quiz_progress 
                WHERE student_id = ? AND batch_id = ? AND subject_id = ?
            ''', (student_id, batch_id, subject_id))
            results = cursor.fetchall()
            conn.close()
            return [dict(r) for r in results]
        
        cursor.execute('''
            SELECT * FROM quiz_progress WHERE student_id = ?
        ''', (student_id,))
        results = cursor.fetchall()
        conn.close()
        return [dict(r) for r in results]
    except Exception as e:
        print(f"❌ Error getting progress: {e}")
        return None

def update_student_progress_db(student_id, batch_id, subject_id, chapter_id, score, total, percentage, is_completed=True):
    """Update student progress in database"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Check if exists
        cursor.execute('''
            SELECT id FROM quiz_progress 
            WHERE student_id = ? AND batch_id = ? AND subject_id = ? AND chapter_id = ?
        ''', (student_id, batch_id, subject_id, chapter_id))
        existing = cursor.fetchone()
        
        now = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        
        if existing:
            cursor.execute('''
                UPDATE quiz_progress 
                SET is_completed = ?, score = ?, total = ?, percentage = ?, 
                    completed_at = ?, updated_at = ?
                WHERE student_id = ? AND batch_id = ? AND subject_id = ? AND chapter_id = ?
            ''', (is_completed, score, total, percentage, now, now, 
                  student_id, batch_id, subject_id, chapter_id))
        else:
            cursor.execute('''
                INSERT INTO quiz_progress 
                (student_id, batch_id, subject_id, chapter_id, is_completed, 
                 score, total, percentage, completed_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (student_id, batch_id, subject_id, chapter_id, is_completed,
                  score, total, percentage, now, now))
        
        conn.commit()
        conn.close()
        print(f"✅ Progress saved to DB: Student {student_id}, Chapter {chapter_id} = {is_completed}")
        return True
    except Exception as e:
        print(f"❌ Error updating progress: {e}")
        return False

def save_quiz_result_db(student_id, batch_id, subject_id, chapter_id, score, total, percentage, is_completed):
    """Save quiz result to results table"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Calculate grade based on percentage
        if percentage >= 80:
            grade = 'A+'
        elif percentage >= 70:
            grade = 'A'
        elif percentage >= 60:
            grade = 'A-'
        elif percentage >= 50:
            grade = 'B'
        elif percentage >= 40:
            grade = 'C'
        elif percentage >= 33:
            grade = 'D'
        else:
            grade = 'F'
        
        now = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        
        cursor.execute('''
            INSERT INTO results 
            (student_id, quiz_batch, quiz_subject, quiz_chapter, 
             marks, total_questions, correct_answers, percentage, 
             grade, is_completed, completed_at, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (student_id, batch_id, subject_id, chapter_id,
              percentage, total, score, percentage,
              grade, is_completed, now, now))
        
        conn.commit()
        conn.close()
        print(f"✅ Result saved to DB: Student {student_id}, Chapter {chapter_id}, Score: {score}/{total}")
        return True
    except Exception as e:
        print(f"❌ Error saving result: {e}")
        return False

@quiz_bp.route('/')
@login_required
def quiz_home():
    """Quiz Home Page"""
    user_type = session.get('user_type')
    username = session.get('username')
    student_id = session.get('user_id')
    
    print("=" * 60)
    print("🎯 QUIZ HOME")
    print(f"   User: {username}")
    print(f"   Type: {user_type}")
    print(f"   ID: {student_id}")
    print("=" * 60)
    
    if user_type == 'student':
        return_url = url_for('student_dashboard')
    elif user_type == 'teacher':
        return_url = url_for('teacher_home')
    elif user_type == 'admin':
        return_url = url_for('admin_dashboard')
    else:
        return_url = url_for('login')
    
    student_batch_id = None
    if user_type == 'student':
        student_batch_id = get_student_class()
        print(f"📚 Student Batch ID: '{student_batch_id}'")
    
    data = load_all_quiz_data()
    all_batches = data.get('batches', {})
    print(f"📂 Available Batches: {list(all_batches.keys())}")
    
    matched_batch = None
    if student_batch_id and user_type == 'student':
        for batch_id, batch_info in all_batches.items():
            batch_name = batch_info.get('name', '').strip().lower()
            
            if batch_id == student_batch_id or batch_name == student_batch_id.lower():
                matched_batch = {
                    'id': batch_id,
                    'name': batch_info.get('name', batch_id),
                    'subjects': batch_info.get('subjects', {})
                }
                print(f"✅ Matched Batch: {batch_id}")
                break
    
    if not matched_batch and all_batches and user_type == 'student':
        first_batch_id = list(all_batches.keys())[0]
        matched_batch = {
            'id': first_batch_id,
            'name': all_batches[first_batch_id].get('name', first_batch_id),
            'subjects': all_batches[first_batch_id].get('subjects', {})
        }
        print(f"⚠️ Using fallback batch: {first_batch_id}")
    
    # ===== Get student progress from database =====
    student_progress = {}
    if student_id and matched_batch:
        progress_list = get_student_progress_db(student_id, matched_batch['id'])
        if progress_list:
            for p in progress_list:
                subject_id = p.get('subject_id')
                chapter_id = p.get('chapter_id')
                if subject_id and chapter_id:
                    if subject_id not in student_progress:
                        student_progress[subject_id] = {}
                    student_progress[subject_id][chapter_id] = {
                        'is_completed': p.get('is_completed', False),
                        'score': p.get('score', 0),
                        'total': p.get('total', 0),
                        'percentage': p.get('percentage', 0)
                    }
    
    return render_template('index.html', 
                         user_type=user_type,
                         username=username,
                         return_url=return_url,
                         matched_batch=matched_batch,
                         student_class=student_batch_id,
                         student_id=student_id,
                         student_progress=student_progress)

@quiz_bp.route('/api/batches', methods=['GET'])
@login_required
def get_batches():
    user_type = session.get('user_type')
    
    data = load_all_quiz_data()
    all_batches = data.get('batches', {})
    
    if user_type == 'student':
        student_batch_id = get_student_class()
        if student_batch_id:
            filtered_batches = []
            for batch_id, batch_info in all_batches.items():
                batch_name = batch_info.get('name', '').strip().lower()
                if batch_id == student_batch_id or batch_name == student_batch_id.lower():
                    filtered_batches.append({
                        'id': batch_id,
                        'name': batch_info.get('name', batch_id)
                    })
            if filtered_batches:
                return jsonify(filtered_batches)
    
    batches = [{'id': b_id, 'name': b_info.get('name', b_id)} 
               for b_id, b_info in all_batches.items()]
    return jsonify(batches)

@quiz_bp.route('/api/batches/<batch_id>/subjects', methods=['GET'])
@login_required
def get_subjects(batch_id):
    student_id = session.get('user_id')
    
    data = load_all_quiz_data()
    batch = data.get('batches', {}).get(batch_id)
    if not batch:
        return jsonify({'error': 'Batch not found'}), 404
    
    # Get progress from database
    progress_list = get_student_progress_db(student_id, batch_id) if student_id else []
    progress_dict = {}
    for p in progress_list:
        subject_id = p.get('subject_id')
        if subject_id:
            if subject_id not in progress_dict:
                progress_dict[subject_id] = {}
            progress_dict[subject_id][p.get('chapter_id')] = p.get('is_completed', False)
    
    subjects = []
    for s_id, s_info in batch.get('subjects', {}).items():
        chapters = s_info.get('chapters', {})
        total_chapters = len(chapters)
        
        subject_progress = progress_dict.get(s_id, {})
        completed_chapters = sum(1 for c_id in chapters.keys() if subject_progress.get(c_id, False))
        
        subjects.append({
            'id': s_id,
            'name': s_info.get('name', s_id),
            'total_chapters': total_chapters,
            'completed_chapters': completed_chapters,
            'progress_percentage': round((completed_chapters / total_chapters * 100) if total_chapters > 0 else 0)
        })
    
    return jsonify(subjects)

@quiz_bp.route('/api/batches/<batch_id>/subjects/<subject_id>/chapters', methods=['GET'])
@login_required
def get_chapters(batch_id, subject_id):
    student_id = session.get('user_id')
    user_type = session.get('user_type')
    is_teacher = user_type in ('teacher', 'admin')
    
    data = load_all_quiz_data()
    subject = data.get('batches', {}).get(batch_id, {}).get('subjects', {}).get(subject_id)
    if not subject:
        return jsonify({'error': 'Subject not found'}), 404
    
    chapters = list(subject.get('chapters', {}).items())
    chapters.sort(key=lambda x: x[0])
    
    # Get progress from database
    progress_list = get_student_progress_db(student_id, batch_id, subject_id) if student_id else []
    progress_dict = {}
    for p in progress_list:
        chapter_id = p.get('chapter_id')
        if chapter_id:
            progress_dict[chapter_id] = {
                'is_completed': p.get('is_completed', False),
                'score': p.get('score', 0),
                'total': p.get('total', 0),
                'percentage': p.get('percentage', 0)
            }
    
    result = []
    for idx, (c_id, c_info) in enumerate(chapters):
        progress = progress_dict.get(c_id, {})
        is_completed = progress.get('is_completed', False)
        
        # ===== Teacher হলে সবসময় unlock থাকবে =====
        is_locked = False
        if not is_teacher:
            if idx > 0 and not is_completed:
                prev_chapter_id = chapters[idx - 1][0]
                prev_progress = progress_dict.get(prev_chapter_id, {})
                if not prev_progress.get('is_completed', False):
                    is_locked = True
        
        result.append({
            'id': c_id,
            'name': c_info.get('name', c_id),
            'is_completed': is_completed,
            'is_locked': is_locked,
            'order': idx + 1,
            'score': progress.get('score', 0),
            'total': progress.get('total', 0),
            'percentage': progress.get('percentage', 0)
        })
    
    return jsonify(result)

@quiz_bp.route('/api/batches/<batch_id>/subjects/<subject_id>/chapters/<chapter_id>/questions', methods=['GET'])
@login_required
def get_questions(batch_id, subject_id, chapter_id):
    user_type = session.get('user_type')
    student_id = session.get('user_id')
    is_teacher = user_type in ('teacher', 'admin')
    
    # ===== Teacher হলে সরাসরি access দিবে =====
    if is_teacher:
        print(f"👨‍🏫 Teacher access: {session.get('username')}")
        data = load_all_quiz_data()
        chapter = (data.get('batches', {})
                   .get(batch_id, {})
                   .get('subjects', {})
                   .get(subject_id, {})
                   .get('chapters', {})
                   .get(chapter_id))
        
        if not chapter:
            return jsonify({'error': 'Chapter not found'}), 404
        
        raw_questions = chapter.get('questions', [])
        formatted_questions = []
        
        for idx, q in enumerate(raw_questions):
            q_copy = dict(q)
            q_copy['id'] = q_copy.get('id', idx + 1)
            q_copy['chapter_name'] = chapter.get('name', '')
            formatted_questions.append(q_copy)
        
        return jsonify(formatted_questions)
    
    # ===== Student হলে lock check করবে =====
    data = load_all_quiz_data()
    chapter = (data.get('batches', {})
               .get(batch_id, {})
               .get('subjects', {})
               .get(subject_id, {})
               .get('chapters', {})
               .get(chapter_id))
    
    if not chapter:
        return jsonify({'error': 'Chapter not found'}), 404
    
    # Check if chapter is locked
    subject_chapters = list(data.get('batches', {})
                           .get(batch_id, {})
                           .get('subjects', {})
                           .get(subject_id, {})
                           .get('chapters', {}).items())
    subject_chapters.sort(key=lambda x: x[0])
    
    # Check progress from database
    progress_list = get_student_progress_db(student_id, batch_id, subject_id) if student_id else []
    progress_dict = {}
    for p in progress_list:
        progress_dict[p.get('chapter_id')] = p.get('is_completed', False)
    
    chapter_index = next((i for i, (c_id, _) in enumerate(subject_chapters) if c_id == chapter_id), None)
    if chapter_index is not None and chapter_index > 0:
        prev_chapter_id = subject_chapters[chapter_index - 1][0]
        if not progress_dict.get(prev_chapter_id, False):
            return jsonify({'error': 'Chapter is locked! Complete previous chapter first.'}), 403
    
    raw_questions = chapter.get('questions', [])
    formatted_questions = []
    
    for idx, q in enumerate(raw_questions):
        q_copy = dict(q)
        q_copy['id'] = q_copy.get('id', idx + 1)
        q_copy['chapter_name'] = chapter.get('name', '')
        formatted_questions.append(q_copy)
    
    return jsonify(formatted_questions)

@quiz_bp.route('/api/submit_result', methods=['POST'])
@login_required
def submit_result():
    """Submit quiz result and save to database"""
    student_id = session.get('user_id')
    if not student_id:
        return jsonify({'success': False, 'error': 'Student not found'}), 401
    
    data = request.get_json()
    batch_id = data.get('batch_id')
    subject_id = data.get('subject_id')
    chapter_id = data.get('chapter_id')
    score = data.get('score', 0)
    total = data.get('total', 1)
    percentage = data.get('percentage', 0)
    
    if not batch_id or not subject_id or not chapter_id:
        return jsonify({'success': False, 'error': 'Missing data'}), 400
    
    print(f"📊 Quiz Result Submission:")
    print(f"   Student: {student_id}")
    print(f"   Batch: {batch_id}")
    print(f"   Subject: {subject_id}")
    print(f"   Chapter: {chapter_id}")
    print(f"   Score: {score}/{total} ({percentage}%)")
    
    # Check if chapter is already completed
    progress_list = get_student_progress_db(student_id, batch_id, subject_id)
    progress_dict = {}
    for p in progress_list or []:
        progress_dict[p.get('chapter_id')] = p.get('is_completed', False)
    
    if progress_dict.get(chapter_id, False):
        return jsonify({
            'success': False,
            'error': 'This chapter is already completed!',
            'already_completed': True
        }), 400
    
    # Check if score is >= 95%
    is_completed = percentage >= 95
    
    # ===== SAVE TO DATABASE =====
    # 1. Save to quiz_progress table
    update_student_progress_db(
        student_id, batch_id, subject_id, chapter_id,
        score, total, percentage, is_completed
    )
    
    # 2. Save to results table
    save_quiz_result_db(
        student_id, batch_id, subject_id, chapter_id,
        score, total, percentage, is_completed
    )
    
    if is_completed:
        # Check next chapter
        data = load_all_quiz_data()
        subject_chapters = []
        for b_id, b_info in data.get('batches', {}).items():
            for s_id, s_info in b_info.get('subjects', {}).items():
                if s_id == subject_id:
                    subject_chapters = list(s_info.get('chapters', {}).keys())
                    subject_chapters.sort()
                    break
            if subject_chapters:
                break
        
        current_index = subject_chapters.index(chapter_id) if chapter_id in subject_chapters else -1
        next_chapter = None
        if current_index != -1 and current_index + 1 < len(subject_chapters):
            next_chapter = subject_chapters[current_index + 1]
        
        return jsonify({
            'success': True,
            'message': '🎉 Excellent! Chapter completed!',
            'chapter_completed': True,
            'percentage': percentage,
            'score': score,
            'total': total,
            'next_chapter': next_chapter,
            'next_chapter_unlocked': next_chapter is not None
        })
    else:
        return jsonify({
            'success': False,
            'message': f'❌ You need 95% to pass. You got {percentage}%. Try again!',
            'chapter_completed': False,
            'percentage': percentage,
            'score': score,
            'total': total
        }), 400
