# quiz/__init__.py
from flask import Blueprint, render_template, jsonify, current_app
import os
import json

# Blueprint তৈরি
quiz_bp = Blueprint('quiz', __name__, 
                    template_folder='templates',
                    static_folder='static',
                    static_url_path='/quiz/static')

def load_all_quiz_data():
    """Load all quiz data from JSON files in quiz/static/data/"""
    combined_batches = {}
    
    # সঠিক পাথ বের করা
    data_dir = os.path.join(os.path.dirname(__file__), 'static', 'data')
    
    print(f"🔍 Looking for quiz data in: {data_dir}")
    
    if os.path.exists(data_dir):
        for filename in os.listdir(data_dir):
            if filename.endswith('.json'):
                file_path = os.path.join(data_dir, filename)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        file_data = json.load(f)
                        if "batches" in file_data:
                            combined_batches.update(file_data["batches"])
                            print(f"✅ Loaded: {filename} - {len(file_data['batches'])} batches")
                except Exception as e:
                    print(f"❌ Error loading {filename}: {e}")
    else:
        print(f"⚠️ Data directory not found: {data_dir}")
        # Fallback: main app এর data ফোল্ডার চেক করা
        fallback_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data')
        print(f"🔍 Checking fallback: {fallback_dir}")
        if os.path.exists(fallback_dir):
            for filename in os.listdir(fallback_dir):
                if filename.endswith('.json'):
                    file_path = os.path.join(fallback_dir, filename)
                    try:
                        with open(file_path, 'r', encoding='utf-8') as f:
                            file_data = json.load(f)
                            if "batches" in file_data:
                                combined_batches.update(file_data["batches"])
                                print(f"✅ Loaded from fallback: {filename}")
                    except Exception as e:
                        print(f"❌ Error loading {filename}: {e}")
    
    return {"batches": combined_batches}

# =============================================
# QUIZ ROUTES
# =============================================

@quiz_bp.route('/')
def quiz_home():
    """Main quiz page"""
    return render_template('index.html')

@quiz_bp.route('/api/batches', methods=['GET'])
def get_batches():
    """Get all batches"""
    data = load_all_quiz_data()
    batches = []
    for batch_id, batch_info in data.get('batches', {}).items():
        batches.append({
            'id': batch_id,
            'name': batch_info.get('name', batch_id)
        })
    return jsonify(batches)

@quiz_bp.route('/api/batches/<batch_id>/subjects', methods=['GET'])
def get_subjects(batch_id):
    """Get subjects for a batch"""
    data = load_all_quiz_data()
    batch = data.get('batches', {}).get(batch_id)
    if not batch:
        return jsonify({'error': 'Batch not found'}), 404
    
    subjects = []
    for subject_id, subject_info in batch.get('subjects', {}).items():
        subjects.append({
            'id': subject_id,
            'name': subject_info.get('name', subject_id)
        })
    return jsonify(subjects)

@quiz_bp.route('/api/batches/<batch_id>/subjects/<subject_id>/chapters', methods=['GET'])
def get_chapters(batch_id, subject_id):
    """Get chapters for a subject"""
    data = load_all_quiz_data()
    subject = data.get('batches', {}).get(batch_id, {}).get('subjects', {}).get(subject_id)
    if not subject:
        return jsonify({'error': 'Subject not found'}), 404
    
    chapters = []
    for chapter_id, chapter_info in subject.get('chapters', {}).items():
        chapters.append({
            'id': chapter_id,
            'name': chapter_info.get('name', chapter_id)
        })
    return jsonify(chapters)

@quiz_bp.route('/api/batches/<batch_id>/subjects/<subject_id>/chapters/<chapter_id>/questions', methods=['GET'])
def get_questions(batch_id, subject_id, chapter_id):
    """Get questions for a chapter"""
    data = load_all_quiz_data()
    chapter = (data.get('batches', {})
               .get(batch_id, {})
               .get('subjects', {})
               .get(subject_id, {})
               .get('chapters', {})
               .get(chapter_id))
    
    if not chapter:
        return jsonify({'error': 'Chapter not found'}), 404
    
    questions = chapter.get('questions', [])
    # প্রতিটি প্রশ্নে id যোগ করা (যদি না থাকে)
    for idx, q in enumerate(questions):
        if 'id' not in q:
            q['id'] = idx + 1
    
    return jsonify(questions)

# ডিবাগ করার জন্য - সব ডেটা দেখাবে
@quiz_bp.route('/api/all-data', methods=['GET'])
def get_all_data():
    """Get all quiz data (for debugging)"""
    return jsonify(load_all_quiz_data())