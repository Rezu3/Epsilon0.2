from flask import Blueprint, render_template, jsonify
import os
import json

quiz_bp = Blueprint('quiz', __name__, 
                    template_folder='templates',
                    static_folder='static',
                    static_url_path='/quiz/static')

# Simple In-Memory Cache
_DATA_CACHE = None

def load_all_quiz_data(force_reload=False):
    """Load all quiz data from JSON files and cache in memory"""
    global _DATA_CACHE
    if _DATA_CACHE is not None and not force_reload:
        return _DATA_CACHE

    combined_batches = {}
    data_dir = os.path.join(os.path.dirname(__file__), 'static', 'data')
    
    if not os.path.exists(data_dir):
        data_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data')

    if os.path.exists(data_dir):
        for filename in os.listdir(data_dir):
            if filename.endswith('.json'):
                file_path = os.path.join(data_dir, filename)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        file_data = json.load(f)
                        if "batches" in file_data:
                            combined_batches.update(file_data["batches"])
                except Exception as e:
                    print(f"❌ Error loading {filename}: {e}")

    _DATA_CACHE = {"batches": combined_batches}
    return _DATA_CACHE

@quiz_bp.route('/')
def quiz_home():
    return render_template('index.html')

@quiz_bp.route('/api/batches', methods=['GET'])
def get_batches():
    data = load_all_quiz_data()
    batches = [{'id': b_id, 'name': b_info.get('name', b_id)} 
               for b_id, b_info in data.get('batches', {}).items()]
    return jsonify(batches)

@quiz_bp.route('/api/batches/<batch_id>/subjects', methods=['GET'])
def get_subjects(batch_id):
    data = load_all_quiz_data()
    batch = data.get('batches', {}).get(batch_id)
    if not batch:
        return jsonify({'error': 'Batch not found'}), 404
    
    subjects = [{'id': s_id, 'name': s_info.get('name', s_id)} 
                for s_id, s_info in batch.get('subjects', {}).items()]
    return jsonify(subjects)

@quiz_bp.route('/api/batches/<batch_id>/subjects/<subject_id>/chapters', methods=['GET'])
def get_chapters(batch_id, subject_id):
    data = load_all_quiz_data()
    subject = data.get('batches', {}).get(batch_id, {}).get('subjects', {}).get(subject_id)
    if not subject:
        return jsonify({'error': 'Subject not found'}), 404
    
    chapters = [{'id': c_id, 'name': c_info.get('name', c_id)} 
                for c_id, c_info in subject.get('chapters', {}).items()]
    return jsonify(chapters)

@quiz_bp.route('/api/batches/<batch_id>/subjects/<subject_id>/chapters/<chapter_id>/questions', methods=['GET'])
def get_questions(batch_id, subject_id, chapter_id):
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
        formatted_questions.append(q_copy)
    
    return jsonify(formatted_questions)
