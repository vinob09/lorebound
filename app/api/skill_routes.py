from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Skill


skill_routes = Blueprint('skills', __name__)


@skill_routes.route("", methods=["GET"])
@login_required
def get_all_skills():
    """Get a list of all skills"""

    skills = Skill.query.all()

    if not skills:
        return jsonify({"message": "No skills available"}), 404

    return jsonify([skill.to_dict() for skill in skills]), 200
