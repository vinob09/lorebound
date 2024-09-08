from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Character, DeltaGreenCharacter, CharacterSkill, DeltaWeapon, Skill
from app.forms import DeltaGreenCharacterForm, DeltaWeaponForm, SkillForm
from .aws_boto import upload_file_to_s3, remove_file_from_s3
import json


character_routes = Blueprint('characters', __name__)


# delta green character sheets
@character_routes.route("", methods=["POST"])
@login_required
def create_delta_green_character():
    """Create a New Delta Green Character"""

    form = DeltaGreenCharacterForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        try:
            # image upload
            url = form.data['url']
            image = None

            if url:
                upload = upload_file_to_s3(url)
                if "errors" in upload:
                    return jsonify(upload), 400
                image = upload['url']

            data = request.form
            skills = json.loads(data.get('skills', '[]'))
            weapons = json.loads(data.get('weapons', '[]'))
            bonds = json.loads(data.get('bonds', '[]'))
            bonds_score = json.loads(data.get('bonds_score', '[]'))

            bonds_score = [int(score) for score in bonds_score]

            # main character entry
            new_character = Character(
                game_id=form.data['game_id'],
                player_id=current_user.id,
                character_name=form.data['character_name'],
                url = image
            )
            db.session.add(new_character)
            # populates new character id for dg specific creation below
            db.session.flush()

            # Delta Green specific entry
            delta_character = DeltaGreenCharacter(
                character_id=new_character.id,
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
                bonds=json.dumps(bonds),
                bonds_score=json.dumps(bonds_score)
            )

            db.session.add(delta_character)

            for skill_data in skills:
                character_skill = CharacterSkill(
                    character_id=new_character.id,
                    skill_id=skill_data['skillId'],
                    skill_level=skill_data['skillLevel']
                )
                db.session.add(character_skill)

            for weapon_data in weapons:
                new_weapon = DeltaWeapon(
                    character_id=new_character.id,
                    name=weapon_data.get('name'),
                    skill_percentage=weapon_data.get('skillPercentage'),
                    base_range=weapon_data.get('baseRange'),
                    damage=weapon_data.get('damage'),
                    armor_piercing=weapon_data.get('armorPiercing'),
                    lethality=weapon_data.get('lethality'),
                    kill_radius=weapon_data.get('killRadius'),
                    ammo=weapon_data.get('ammo')
                )
                db.session.add(new_weapon)


            db.session.commit()
            return jsonify(delta_character.to_dict()), 201
        except Exception as e:
            print(f"Exception while creating character: {str(e)}")
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


@character_routes.route("/<int:character_id>", methods=["PUT"])
@login_required
def edit_delta_green_character(character_id):
    """Edit a specific Delta Green character by id"""

    character = Character.query.get_or_404(character_id)
    delta_character = DeltaGreenCharacter.query.filter_by(character_id=character_id).first()

    if character.player_id != current_user.id:
        return jsonify({"errors": "Forbidden"}), 403

    form = DeltaGreenCharacterForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        try:
            # update
            delta_character.profession = form.data['profession']
            delta_character.employer = form.data['employer']
            delta_character.nationality = form.data['nationality']
            delta_character.sex = form.data['sex']
            delta_character.age_dob = form.data['age_dob']
            delta_character.education_occupation_history = form.data['education_occupation_history']
            delta_character.strength_score = form.data['strength_score']
            delta_character.strength_x5 = form.data['strength_x5']
            delta_character.strength_features = form.data['strength_features']
            delta_character.constitution_score = form.data['constitution_score']
            delta_character.constitution_x5 = form.data['constitution_x5']
            delta_character.constitution_features = form.data['constitution_features']
            delta_character.dexterity_score = form.data['dexterity_score']
            delta_character.dexterity_x5 = form.data['dexterity_x5']
            delta_character.dexterity_features = form.data['dexterity_features']
            delta_character.intelligence_score = form.data['intelligence_score']
            delta_character.intelligence_x5 = form.data['intelligence_x5']
            delta_character.intelligence_features = form.data['intelligence_features']
            delta_character.power_score = form.data['power_score']
            delta_character.power_x5 = form.data['power_x5']
            delta_character.power_features = form.data['power_features']
            delta_character.charisma_score = form.data['charisma_score']
            delta_character.charisma_x5 = form.data['charisma_x5']
            delta_character.charisma_features = form.data['charisma_features']
            delta_character.hit_points_maximum = form.data['hit_points_maximum']
            delta_character.hit_points_current = form.data['hit_points_current']
            delta_character.willpower_points_maximum = form.data['willpower_points_maximum']
            delta_character.willpower_points_current = form.data['willpower_points_current']
            delta_character.sanity_points_maximum = form.data['sanity_points_maximum']
            delta_character.sanity_points_current = form.data['sanity_points_current']
            delta_character.breaking_point_maximum = form.data['breaking_point_maximum']
            delta_character.breaking_point_current = form.data['breaking_point_current']
            delta_character.physical_description = form.data['physical_description']
            delta_character.motivations_mental_disorders = form.data['motivations_mental_disorders']
            delta_character.incidents_violence = form.data['incidents_violence']
            delta_character.incidents_helplessness = form.data['incidents_helplessness']
            delta_character.wounds_ailments = form.data['wounds_ailments']
            delta_character.armor_gear = form.data['armor_gear']
            delta_character.personal_details_notes = form.data['personal_details_notes']
            delta_character.developments_home_family = form.data['developments_home_family']
            delta_character.special_training = form.data['special_training']
            delta_character.skill_stat_used = form.data['skill_stat_used']
            delta_character.bonds = json.dumps(form.bonds.data)
            delta_character.bonds_score = json.dumps(form.bonds_score.data)

            if request.form.get('removeImage') == 'true':
                if delta_character.url:
                    remove_file_from_s3(delta_character.url)
                    delta_character.url = None

            url = form.data['url']
            if url:
                if delta_character.url:
                    remove_file_from_s3(delta_character.url)

                upload = upload_file_to_s3(url)
                if "errors" in upload:
                    return jsonify(upload), 400
                delta_character.url = upload['url']

            db.session.commit()
            return jsonify(delta_character.to_dict()), 200
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
@character_routes.route("/<int:character_id>/skills/<int:skill_id>", methods=["PUT"])
@login_required
def edit_delta_skill(character_id, skill_id):
    """Update a character's skill level"""

    form = SkillForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    # load skills
    available_skills = Skill.query.all()
    form.skill_id.choices = [(skill.id, skill.name) for skill in available_skills]

    character = Character.query.get_or_404(character_id)
    if character.player_id != current_user.id:
        return jsonify({"errors": "Forbidden"}), 403

    character_skill = CharacterSkill.query.filter_by(character_id=character_id, skill_id=skill_id).first()
    if not character_skill:
        return jsonify({"errors": "Skill not found for this character"}), 404

    if form.validate_on_submit():
        try:
            character_skill.skill_level = form.data['skill_level']
            db.session.commit()
            return jsonify(character_skill.to_dict()), 200
        except Exception as e:
            print(f"Exception in edit_delta_skill: {str(e)}")
            return jsonify({"errors": "An error occurred while editing this skill"}), 500
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


# delta green weapon management
@character_routes.route("/<int:character_id>/weapons", methods=["POST"])
@login_required
def add_delta_weapon(character_id):
    """Add a new weapon to a character"""

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
            print(f"Exception in add_delta_weapon: {str(e)}")
            return jsonify({"errors": "An error occurred while adding a weapon"}), 500
    else:
        return jsonify(form.errors), 400


@character_routes.route("/<int:character_id>/weapons/<int:weapon_id>", methods=["PUT"])
@login_required
def edit_delta_weapon(character_id, weapon_id):
    """Edit an existing weapon"""

    character = Character.query.get_or_404(character_id)
    if character.player_id != current_user.id:
        return jsonify({"errors": "Forbidden"}), 403

    weapon = DeltaWeapon.query.get_or_404(weapon_id)
    if weapon.character_id != character_id:
        return jsonify({"errors": "Weapon does not belong to this character"}), 403

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
            print(f"Exception in edit_delta_weapon: {str(e)}")
            return jsonify({"errors": "An error occurred while editing this weapon"}), 500
    else:
        return jsonify(form.errors), 400


@character_routes.route("/<int:character_id>/weapons/<int:weapon_id>", methods=["DELETE"])
@login_required
def delete_delta_weapon(character_id, weapon_id):
    """Delete a weapon from a character"""

    character = Character.query.get_or_404(character_id)
    if character.player_id != current_user.id:
        return jsonify({"errors": "Forbidden"}), 403

    weapon = DeltaWeapon.query.get_or_404(weapon_id)
    if weapon.character_id != character_id:
        return jsonify({"errors": "Weapon does not belong to this character"}), 403

    try:
        db.session.delete(weapon)
        db.session.commit()
        return jsonify({"message": "Successfully deleted"}), 200
    except Exception as e:
        print(f"Exception in delete_delta_weapon: {str(e)}")
        return jsonify({"errors": "An error occurred while deleting this weapon"}), 500


@character_routes.route("/<int:character_id>/weapons", methods=["GET"])
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
