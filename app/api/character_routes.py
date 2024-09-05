from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Game, Character, DeltaGreenCharacter, CharacterSkill, DeltaWeapon
from app.forms import DeltaGreenCharacterForm, SkillForm, DeltaWeaponForm
import json


character_routes = Blueprint('characters', __name__)


@character_routes.route("/deltagreen", methods=["POST"])
@login_required
def create_delta_green_character():
    """Create a New Delta Green Character"""

    form = DeltaGreenCharacterForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        try:
            bonds_json = json.dumps(form.bonds.data)
            bonds_score_json = json.dumps(form.bonds_score.data)

            new_character = DeltaGreenCharacterForm(
                profession=form.data['profession'],
                employer=form.data['employer'],
                nationality=form.data['nationality'],
                sex=form.data['sex'],
                age_dob=form.data['age_dob'],
                education_occupation_history=form.data['education_occupation_history'],
                strength_score=form.data['strength_score'],
                strength_x5=form.data['strength_x5'],
                strength_features=form.data['strength_features'],
                constitution_score=form.data['constitution_score'],
                constitution_x5=form.data['constitution_x5'],
                constitution_features=form.data['constitution_features'],
                dexterity_score=form.data['dexterity_score'],
                dexterity_x5=form.data['dexterity_x5'],
                dexterity_features=form.data['dexterity_features'],
                intelligence_score=form.data['intelligence_score'],
                intelligence_x5=form.data['intelligence_x5'],
                intelligence_features=form.data['intelligence_features'],
                power_score=form.data['power_score'],
                power_x5=form.data['power_x5'],
                power_features=form.data['power_features'],
                charisma_score=form.data['charisma_score'],
                charisma_x5=form.data['charisma_x5'],
                charisma_features=form.data['charisma_features'],
                hit_points_maximum=form.data['hit_points_maximum'],
                hit_points_current=form.data['hit_points_current'],
                willpower_points_maximum=form.data['willpower_points_maximum'],
                willpower_points_current=form.data['willpower_points_current'],
                sanity_points_maximum=form.data['sanity_points_maximum'],
                sanity_points_current=form.data['sanity_points_current'],
                breaking_point_maximum=form.data['breaking_point_maximum'],
                breaking_point_current=form.data['breaking_point_current'],
                physical_description=form.data['physical_description'],
                motivations_mental_disorders=form.data['motivations_mental_disorders'],
                incidents_violence=form.data['incidents_violence'],
                incidents_helplessness=form.data['incidents_helplessness'],
                wounds_ailments=form.data['wounds_ailments'],
                armor_gear=form.data['armor_gear'],
                personal_details_notes=form.data['personal_details_notes'],
                developments_home_family=form.data['developments_home_family'],
                special_training=form.data['special_training'],
                skill_stat_used=form.data['skill_stat_used'],
                bonds=bonds_json,
                bonds_score=bonds_score_json
            )

            db.session.add(new_character)
            db.session.commit()
            return jsonify(new_character.to_dict()), 201
        except Exception as e:
            print(f"Exception in create_delta_green_character: {str(e)}")
            return jsonify({"errors": "An error occurred while creating a new character"}), 500
    else:
        return jsonify(form.errors), 400


@character_routes.route("", methods=["GET"])
@login_required
def get_all_characters():
    """Get a list of all characters for the current user"""

    try:
        characters = Character.query.filter_by(player_id=current_user.id).all()
        characters_data = [character.to_dict() for character in characters]
        return jsonify(characters_data), 200
    except Exception as e:
        print(f"Exception in get_all_characters: {str(e)}")
        return jsonify({"error": "An error occurred while fetching all characters"}), 500


@character_routes.route("/<int:character_id>", methods=["GET"])
@login_required
def get_character_by_id(character_id):
    """Get details of a specific character by id"""

    try:
        character = Character.query.get_or_404(character_id)
        if character.player_id != current_user.id:
            return jsonify({"errors": "Forbidden"}), 403

        character_data = character.to_dict()
        return jsonify(character_data), 200
    except Exception as e:
        print(f"Exception in get_character_by_id: {str(e)}")
        return jsonify({"errors": "An error occurred while fetching this character"}), 500


@character_routes.route("/deltagreen/<int:character_id>", methods=["PUT"])
@login_required
def edit_delta_green_character(character_id):
    """Edit a specific Delta Green character by id"""

    character = Character.query.get_or_404(character_id)

    if character.player_id != current_user.id:
        return jsonify({"errors": "Forbidden"}), 403

    form = DeltaGreenCharacterForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        try:
            bonds_json = json.dumps(form.bonds.data)
            bonds_score_json = json.dumps(form.bonds_score.data)

            character.profession = form.data['profession']
            character.employer = form.data['employer']
            character.nationality = form.data['nationality']
            character.sex = form.data['sex']
            character.age_dob = form.data['age_dob']
            character.education_occupation_history = form.data['education_occupation_history']
            character.strength_score = form.data['strength_score']
            character.strength_x5 = form.data['strength_x5']
            character.strength_features = form.data['strength_features']
            character.constitution_score = form.data['constitution_score']
            character.constitution_x5 = form.data['constitution_x5']
            character.constitution_features = form.data['constitution_features']
            character.dexterity_score = form.data['dexterity_score']
            character.dexterity_x5 = form.data['dexterity_x5']
            character.dexterity_features = form.data['dexterity_features']
            character.intelligence_score = form.data['intelligence_score']
            character.intelligence_x5 = form.data['intelligence_x5']
            character.intelligence_features = form.data['intelligence_features']
            character.power_score = form.data['power_score']
            character.power_x5 = form.data['power_x5']
            character.power_features = form.data['power_features']
            character.charisma_score = form.data['charisma_score']
            character.charisma_x5 = form.data['charisma_x5']
            character.charisma_features = form.data['charisma_features']
            character.hit_points_maximum = form.data['hit_points_maximum']
            character.hit_points_current = form.data['hit_points_current']
            character.willpower_points_maximum = form.data['willpower_points_maximum']
            character.willpower_points_current = form.data['willpower_points_current']
            character.sanity_points_maximum = form.data['sanity_points_maximum']
            character.sanity_points_current = form.data['sanity_points_current']
            character.breaking_point_maximum = form.data['breaking_point_maximum']
            character.breaking_point_current = form.data['breaking_point_current']
            character.physical_description = form.data['physical_description']
            character.motivations_mental_disorders = form.data['motivations_mental_disorders']
            character.incidents_violence = form.data['incidents_violence']
            character.incidents_helplessness = form.data['incidents_helplessness']
            character.wounds_ailments = form.data['wounds_ailments']
            character.armor_gear = form.data['armor_gear']
            character.personal_details_notes = form.data['personal_details_notes']
            character.developments_home_family = form.data['developments_home_family']
            character.special_training = form.data['special_training']
            character.skill_stat_used = form.data['skill_stat_used']
            character.bonds = bonds_json,
            character.bonds_score = bonds_score_json

            db.session.commit()
            return jsonify(character.to_dict()), 200
        except Exception as e:
            print(f"Exception in edit_delta_green_character: {str(e)}")
            return jsonify({"errors": "An error occurred while updating the character."}), 500
    else:
        return jsonify(form.errors), 400


@character_routes.route("/<int:character_id>", methods=["DELETE"])
@login_required
def delete_character(character_id):
    """Delete a specific character by id"""

    character = Character.query.get_or_404(character_id)
    if character.player_id != current_user.id:
        return jsonify({"errors": "Forbidden"}), 403

    try:
        db.session.delete(character)
        db.session.commit()
        return jsonify({"message": "Successfully deleted"}), 200
    except Exception as e:
        print(f"Exception in delete_character: {str(e)}")
        return jsonify({"errors": "An error occurred while deleting this character"}), 500
