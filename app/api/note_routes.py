from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Note
from app.forms import NoteForm
from .aws_boto import upload_file_to_s3, remove_file_from_s3
from bleach import clean


note_routes = Blueprint('notes', __name__)

# Define allowed tags and attributes
ALLOWED_TAGS = ['a', 'b', 'em', 'i', 'li', 'ol', 'p', 'strong', 'ul', 'h1', 'h2', 'h3', 'u', 's', 'bold', 'italic', 'underline', 'br']
ALLOWED_ATTRIBUTES = {
    '*': ['style'],
    'a': ['href', 'title'],
    'ol': ['type', 'start'],
    'ul': ['type']
}


@note_routes.route("", methods=["POST"])
@login_required
def create_note():
    """Creating a new note"""

    try:
        form = NoteForm()
        form['csrf_token'].data = request.cookies['csrf_token']

        if form.validate_on_submit():
            sanitized_content = clean(
                form.data['content'], tags=ALLOWED_TAGS, attributes=ALLOWED_ATTRIBUTES
            )

            url = form.data['url']
            image = None

            if url:
                upload = upload_file_to_s3(url)
                if "errors" in upload:
                    return jsonify(upload), 400
                image = upload['url']

            new_note = Note(
                user_id = current_user.id,
                title = form.data['title'],
                content = sanitized_content,
                url = image
            )

            db.session.add(new_note)
            db.session.commit()

            return jsonify(new_note.to_dict()), 201
        else:
            return jsonify(form.errors), 400
    except Exception as e:
        print(f"Exception in create_note: {str(e)}")
        return jsonify({"errors": f"An error occurred while creating a new note: {str(e)}"}), 500



@note_routes.route("", methods=["GET"])
@login_required
def all_notes():
    """Get a list of all notes for the current user"""

    try:
        notes = Note.query.filter_by(user_id=current_user.id).all()
        notes_data = [note.to_dict() for note in notes]
        return jsonify(notes_data), 200
    except Exception as e:
        print(f"Exception in all_note: {str(e)}")
        return jsonify({"error": "An error occurred while fetching all notes"}), 500



@note_routes.route("/<int:note_id>", methods=["GET"])
@login_required
def get_note_by_id(note_id):
    """Get details of a specific note by id"""

    try:
        note = Note.query.get_or_404(note_id)
        if note.user_id != current_user.id:
            return jsonify({"errors": "Forbidden"}), 403

        note_data = note.to_dict()
        return jsonify(note_data), 200
    except Exception as e:
        print(f"Exception in get_note_by_id: {str(e)}")
        return jsonify({"errors": "An error occurred while fetching this note"}), 500



@note_routes.route("/<int:note_id>", methods=["PUT"])
@login_required
def update_note(note_id):
    """Edit a specific note by id"""

    try:
        note = Note.query.get_or_404(note_id)
        if note.user_id != current_user.id:
            return jsonify({"errors": "Forbidden"}), 403

        form = NoteForm()
        form['csrf_token'].data = request.cookies['csrf_token']

        if form.validate_on_submit():
            sanitized_content = clean(
                form.data['content'], tags=ALLOWED_TAGS, attributes=ALLOWED_ATTRIBUTES
            )

            note.title = form.data['title']
            note.content = sanitized_content

            if request.form.get('removeImage') == 'true':
                if note.url:
                    remove_file_from_s3(note.url)
                    note.url = None

            url = form.data['url']
            if url:
                if note.url:
                    remove_file_from_s3(note.url)
                    
                upload = upload_file_to_s3(url)
                if "errors" in upload:
                    return jsonify(upload), 400
                note.url = upload['url']

            db.session.commit()

            return jsonify(note.to_dict()), 200
        else:
            return jsonify(form.errors), 400
    except Exception as e:
        print(f"Exception in update_note: {str(e)}")
        return jsonify({"errors": f"An error occurred while updating the note: {str(e)}"}), 500



@note_routes.route("/<int:note_id>", methods=["DELETE"])
@login_required
def delete_note(note_id):
    """Delete a specific note by id"""

    try:
        note = Note.query.get_or_404(note_id)
        if note.user_id != current_user.id:
            return jsonify({"errors": "Forbidden"}), 403

        db.session.delete(note)
        db.session.commit()
        return jsonify({"message": "Successfully deleted"}), 200
    except Exception as e:
        print(f"Exception in delete_note: {str(e)}")
        return jsonify({"errors": "An error occurred while deleting this note"}), 500
