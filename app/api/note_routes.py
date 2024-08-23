from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Note
from app.forms import NoteForm


note_routes = Blueprint('notes', __name__)


@note_routes.route("", methods=["POST"])
@login_required
def create_note():
    """Creating a new note"""

    form = NoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_note = Note(
            user_id = current_user.id,
            title = form.data['title'],
            content = form.data['content'],
            url = form.data['url']
        )

        db.session.add(new_note)
        db.session.commit()

        return jsonify(new_note.to_dict()), 201
    return jsonify(form.errors), 400



@note_routes.route("", methods=["GET"])
@login_required
def all_notes():
    """Get a list of all notes for the current user"""
    try:
        notes = Note.query.filter_by(user_id=current_user.id).all()
        notes_data = [note.to_dict() for note in notes]
        return jsonify(notes_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500



@note_routes.route("/<int:note_id>", methods=["GET"])
@login_required
def get_note_by_id(note_id):
    """Get details of a specific note by id"""
    try:
        note = Note.query.get_or_404(note_id)
        note_auth = Note.query.filter_by(user_id=current_user.id).first()
        if (note and note_auth):
            note_data = note.to_dict()
            return jsonify(note_data)
    except Exception as e:
        return jsonify({"errors": str(e)}), 500
