from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Game, Skill, Character, DeltaGreenCharacter, CharacterSkill, DeltaWeapon
from app.forms import DeltaGreenCharacterForm
import json


character_routes = Blueprint('characters', __name__)


# delta green character sheets
@character_routes.route("/deltagreen", methods=["POST"])
@login_required
def create_delta_green_character():
    """Create a New Delta Green Character"""

    form = DeltaGreenCharacterForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    # dynamically load choices for games
    form.game_id.choices = [(game.id, game.name) for game in Game.query.all()]
    # dynamically load choices for skills
    form.skills.skill_id.choices = [(skill.id, skill.name) for skill in Skill.query.all()]

    if form.validate_on_submit():
        try:
            # main character entry
            new_character = Character(
                game_id=form.data['game_id'],
                player_id=current_user.id,
                character_name=form.data['character_name']
            )
            db.session.add(new_character)
            # populates new character id for dg specific creation below
            db.session.flush()

            # Delta Green specific entry
            bonds_json = json.dumps(form.bonds.data)
            bonds_score_json = json.dumps(form.bonds_score.data)

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
                bonds=bonds_json,
                bonds_score=bonds_score_json
            )

            db.session.add(delta_character)

            # add all skills with values from form or base values if not provided
            character_skills = [
                CharacterSkill(
                    character_id=new_character.id,
                    skill_id=skill_form.skill_id.data,
                    skill_level=skill_form.skill_level.data if skill_form.skill_level.data is not None else Skill.query.get(skill_form.skill_id.data).base_value
                )
                for skill_form in form.skills
            ]
            db.session.bulk_save_objects(character_skills)

            # add weapons if user chooses to do so
            weapons = [
                DeltaWeapon(
                    character_id=new_character.id,
                    name=weapon_form.name.data,
                    skill_percentage=weapon_form.skill_percentage.data,
                    base_range=weapon_form.base_range.data,
                    damage=weapon_form.damage.data,
                    armor_piercing=weapon_form.armor_piercing.data,
                    lethality=weapon_form.lethality.data,
                    kill_radius=weapon_form.kill_radius.data,
                    ammo=weapon_form.ammo.data
                )
                for weapon_form in form.weapons if weapon_form.name.data
            ]
            if weapons:
                db.session.bulk_save_objects(weapons)

            db.session.commit()
            return jsonify(delta_character.to_dict()), 201
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
    delta_character = DeltaGreenCharacter.query.filter_by(character_id=character_id).first()

    if character.player_id != current_user.id:
        return jsonify({"errors": "Forbidden"}), 403

    form = DeltaGreenCharacterForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    # dynamically load choices for skills
    form.skills.skill_id.choices = [(skill.id, skill.name) for skill in Skill.query.all()]

    if form.validate_on_submit():
        try:
            bonds_json = json.dumps(form.bonds.data)
            bonds_score_json = json.dumps(form.bonds_score.data)

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
            delta_character.bonds = bonds_json,
            delta_character.bonds_score = bonds_score_json

            # update skills
            existing_skills = {cs.skill_id: cs for cs in CharacterSkill.query.filter_by(character_id=character_id).all()}
            updated_skills = []
            for skill_form in form.skills:
                skill_id = skill_form.skill_id.data
                skill_level = skill_form.skill_level.data

                if skill_id in existing_skills:
                    existing_skills[skill_id].skill_level = skill_level
                else:
                    updated_skills.append(CharacterSkill(
                        character_id=character_id,
                        skill_id=skill_id,
                        skill_level=skill_level
                    ))
            db.session.bulk_save_objects(updated_skills)

            # update weapon
            existing_weapons = DeltaWeapon.query.filter_by(character_id=character_id).all()
            for i, weapon_form in enumerate(form.weapons):
                if i < len(existing_weapons):
                    existing_weapons[i].name = weapon_form.name.data
                    existing_weapons[i].skill_percentage = weapon_form.skill_percentage.data
                    existing_weapons[i].base_range = weapon_form.base_range.data
                    existing_weapons[i].damage = weapon_form.damage.data
                    existing_weapons[i].armor_piercing = weapon_form.armor_piercing.data
                    existing_weapons[i].lethality = weapon_form.lethality.data
                    existing_weapons[i].kill_radius = weapon_form.kill_radius.data
                    existing_weapons[i].ammo = weapon_form.ammo.data
                else:
                    # add new weapon
                    new_weapon = DeltaWeapon(
                        character_id=character_id,
                        name=weapon_form.name.data,
                        skill_percentage=weapon_form.skill_percentage.data,
                        base_range=weapon_form.base_range.data,
                        damage=weapon_form.damage.data,
                        armor_piercing=weapon_form.armor_piercing.data,
                        lethality=weapon_form.lethality.data,
                        kill_radius=weapon_form.kill_radius.data,
                        ammo=weapon_form.ammo.data
                    )
                    db.session.add(new_weapon)

            # delete weapons if the user removed any
            if len(form.weapons) < len(existing_weapons):
                for i in range(len(form.weapons), len(existing_weapons)):
                    db.session.delete(existing_weapons[i])

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
@character_routes.route("/<int:character_id>/skills", methods=["GET"])
@login_required
def get_character_skills(character_id):
    """Get a list of all the character's skills"""

    character_skills = CharacterSkill.query.filter_by(character_id=character_id).all()
    if not character_skills:
        return jsonify({"errors": "No skills found for this character"}), 404

    return jsonify([cs.to_dict() for cs in character_skills]), 200


# delta green weapon management
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
