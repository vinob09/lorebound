from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Character, DeltaGreenCharacter, CharacterSkill, DeltaWeapon
from app.forms import DeltaGreenCharacterForm, SkillForm, DeltaWeaponForm
import json


character_routes = Blueprint('characters', __name__)


# delta green character sheets
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

            new_character = DeltaGreenCharacter(
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


# delta green character skill management
@character_routes.route("/<int:character_id>/skills", methods=["POST"])
@login_required
def add_skill_delta_green_character(character_id):
    """Add skill values to Delta Green character"""

    form = DeltaGreenCharacterForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        try:
            for skill_form in form.skills:
                skill_id = skill_form.skill_id.data
                skill_level = skill_form.skill_level.data

                character_skill = CharacterSkill.query.filter_by(character_id=character_id, skill_id=skill_id).first()
                if character_skill:
                    character_skill.skill_level = skill_level
                else:
                    new_character_skill = CharacterSkill(
                        character_id=character_id,
                        skill_id=skill_id,
                        skill_level=skill_level
                    )
                    db.session.add(new_character_skill)
            db.session.commit()
            return jsonify({"message": "All skills added successfully"}), 201
        except Exception as e:
            print(f"Exception in add_skill_delta_green_character: {str(e)}")
            return jsonify({"errors": "An error occurred while adding skills"}), 500
    else:
        return jsonify(form.errors), 400


@character_routes.route("/<int:character_id>/skills", methods=["GET"])
@login_required
def get_character_skills(character_id):
    """Get a list of all the character's skills"""

    character_skills = CharacterSkill.query.filter_by(character_id=character_id).all()
    if not character_skills:
        return jsonify({"errors": "No skills found for this character"}), 404

    return jsonify([cs.to_dict() for cs in character_skills]), 200


@character_routes.route("/<int:character_id>/skills/<int:skill_id>", methods=["PUT"])
@login_required
def edit_skill_delta_green_character(character_id, skill_id):
    """Edit skill values to Delta Green character"""

    character = Character.query.get_or_404(character_id)
    if character.player_id != current_user.id:
        return jsonify({"errors": "Forbidden"}), 403

    character_skill = CharacterSkill.query.filter_by(character_id=character_id, skill_id=skill_id).first()
    if not character_skill:
        return jsonify({"errors": "Character skill not found"}), 404

    form = SkillForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        try:
            character_skill.skill_level = form.data['skill_level']
            db.session.commit()
            return jsonify(character_skill.to_dict()), 200
        except Exception as e:
            print(f"Exception in edit_skill_delta_green_character: {str(e)}")
            return jsonify({"errors": "An error occurred while updating the skill level"}), 500
    else:
        return jsonify(form.errors), 400


# delta green weapon management
@character_routes.route("/deltagreen/<int:character_id>/weapons", methods=["POST"])
@login_required
def add_a_weapon_delta_green(character_id):
    """Add a weapon to a specific character"""

    character = Character.query.get_or_404(character_id)
    if character.player_id != current_user.id:
        return jsonify({"errors": "Forbidden"}), 403

    form = DeltaWeaponForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        try:
            new_weapon = DeltaWeapon(
                character_id=character_id,
                name=form.data['name'],
                skill_percentage=form.data['skill_percentage'],
                base_range=form.data['base_range'],
                damage=form.data['damage'],
                armor_piercing=form.data['armor_piercing'],
                lethality=form.data['lethality'],
                kill_radius=form.data['kill_radius'],
                ammo=form.data['ammo']
            )
            db.session.add(new_weapon)
            db.session.commit()
            return jsonify(new_weapon.to_dict()), 201
        except Exception as e:
            print(f"Exception in add_a_weapon_delta_green: {str(e)}")
            return jsonify({"errors": "An error occurred while adding the weapon"}), 500
    else:
        return jsonify(form.errors), 400


@character_routes.route("/deltagreen/<int:character_id>/weapons", methods=["GET"])
@login_required
def get_character_weapons(character_id):
    """Get a list of all the character's weapons"""

    character = Character.query.get_or_404(character_id)
    if character.player_id != current_user.id:
        return jsonify({"errors": "Forbidden"}), 403

    try:
        weapons = DeltaWeapon.query.filter_by(character_id=character_id).all()
        weapons_data = [weapon.to_dict() for weapon in weapons]
        return jsonify(weapons_data), 200
    except Exception as e:
        print(f"Exception in get_character_weapons: {str(e)}")
        return jsonify({"errors": "An error occurred while fetching weapons"}), 500


@character_routes.route("/deltagreen/<int:character_id>/weapons/<int:weapon_id>", methods=["PUT"])
@login_required
def edit_character_weapon(character_id, weapon_id):
    """Edit a specific character's weapon by id"""

    character = Character.query.get_or_404(character_id)
    if character.player_id != current_user.id:
        return jsonify({"errors": "Forbidden"}), 403

    weapon = DeltaWeapon.query.get_or_404(weapon_id)
    if weapon.character_id != character_id:
        return jsonify({"errors": "Weapon does not belong to this character"}), 400

    form = DeltaWeaponForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        try:
            weapon.name = form.data['name']
            weapon.skill_percentage = form.data['skill_percentage']
            weapon.base_range = form.data['base_range']
            weapon.damage = form.data['damage']
            weapon.armor_piercing = form.data['armor_piercing']
            weapon.lethality = form.data['lethality']
            weapon.kill_radius = form.data['kill_radius']
            weapon.ammo = form.data['ammo']

            db.session.commit()
            return jsonify(weapon.to_dict()), 200
        except Exception as e:
            print(f"Exception in edit_character_weapon: {str(e)}")
            return jsonify({"errors": "An error occurred while updating the weapon"}), 500
    else:
        return jsonify(form.errors), 400


@character_routes.route("/deltagreen/<int:character_id>/weapons/<int:weapon_id>", methods=["DELETE"])
@login_required
def delete_character_weapon(character_id, weapon_id):
    """Delete a specific character's weapon by id"""

    character = Character.query.get_or_404(character_id)
    if character.player_id != current_user.id:
        return jsonify({"errors": "Forbidden"}), 403

    weapon = DeltaWeapon.query.get_or_404(weapon_id)
    if weapon.character_id != character_id:
        return jsonify({"errors": "Weapon does not belong to this character"}), 400

    try:
        db.session.delete(weapon)
        db.session.commit()
        return jsonify({"message": "Successfully deleted"}), 200
    except Exception as e:
        print(f"Exception in delete_character_weapon: {str(e)}")
        return jsonify({"errors": "An error occurred while deleting the weapon"}), 500
