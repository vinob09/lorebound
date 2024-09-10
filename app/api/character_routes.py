from flask import Blueprint, jsonify, request, send_file, current_app
from flask_login import login_required, current_user
from app.models import db, Character, DeltaGreenCharacter, CharacterSkill, DeltaWeapon, Skill
from app.forms import DeltaGreenCharacterForm, DeltaWeaponForm, SkillForm
from .aws_boto import upload_file_to_s3, remove_file_from_s3
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
import io
import json
import requests


character_routes = Blueprint('characters', __name__)


# delta green character sheets
@character_routes.route("", methods=["POST"])
@login_required
def create_delta_green_character():
    """Create a New Delta Green Character"""

    form = DeltaGreenCharacterForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    def convert_to_int(value, default=0):
        try:
            return int(value)
        except (TypeError, ValueError):
            return default

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
            bonds_score = [convert_to_int(score) for score in json.loads(data.get('bonds_score', '[]'))]

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
                strength_score=convert_to_int(form.data['strength_score']),
                strength_x5=convert_to_int(form.data['strength_x5']),
                strength_features=form.data['strength_features'],
                constitution_score=convert_to_int(form.data['constitution_score']),
                constitution_x5=convert_to_int(form.data['constitution_x5']),
                constitution_features=form.data['constitution_features'],
                dexterity_score=convert_to_int(form.data['dexterity_score']),
                dexterity_x5=convert_to_int(form.data['dexterity_x5']),
                dexterity_features=form.data['dexterity_features'],
                intelligence_score=convert_to_int(form.data['intelligence_score']),
                intelligence_x5=convert_to_int(form.data['intelligence_x5']),
                intelligence_features=form.data['intelligence_features'],
                power_score=convert_to_int(form.data['power_score']),
                power_x5=convert_to_int(form.data['power_x5']),
                power_features=form.data['power_features'],
                charisma_score=convert_to_int(form.data['charisma_score']),
                charisma_x5=convert_to_int(form.data['charisma_x5']),
                charisma_features=form.data['charisma_features'],
                hit_points_maximum=convert_to_int(form.data['hit_points_maximum']),
                hit_points_current=convert_to_int(form.data['hit_points_current']),
                willpower_points_maximum=convert_to_int(form.data['willpower_points_maximum']),
                willpower_points_current=convert_to_int(form.data['willpower_points_current']),
                sanity_points_maximum=convert_to_int(form.data['sanity_points_maximum']),
                sanity_points_current=convert_to_int(form.data['sanity_points_current']),
                breaking_point_maximum=convert_to_int(form.data['breaking_point_maximum']),
                breaking_point_current=convert_to_int(form.data['breaking_point_current']),
                physical_description=form.data['physical_description'],
                motivations_mental_disorders=form.data['motivations_mental_disorders'],
                incidents_violence=convert_to_int(form.data['incidents_violence']),
                incidents_helplessness=convert_to_int(form.data['incidents_helplessness']),
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
                    skill_id=convert_to_int(skill_data['skillId']),
                    skill_level=convert_to_int(skill_data['skillLevel'])
                )
                db.session.add(character_skill)

            for weapon_data in weapons:
                new_weapon = DeltaWeapon(
                    character_id=new_character.id,
                    name=weapon_data.get('name'),
                    skill_percentage=convert_to_int(weapon_data.get('skillPercentage')),
                    base_range=weapon_data.get('baseRange'),
                    damage=weapon_data.get('damage'),
                    armor_piercing=weapon_data.get('armorPiercing'),
                    lethality=convert_to_int(weapon_data.get('lethality')),
                    kill_radius=weapon_data.get('killRadius'),
                    ammo=convert_to_int(weapon_data.get('ammo'))
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
            character.character_name = form.data['character_name']

            data = request.form
            skills = json.loads(data.get('skills', '[]'))
            weapons = json.loads(data.get('weapons', '[]'))
            deleted_weapons = json.loads(data.get('deletedWeapons', '[]'))
            bonds = json.loads(data.get('bonds', '[]'))
            bonds_score = json.loads(data.get('bonds_score', '[]'))

            bonds_score = [int(score) for score in bonds_score]

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
            delta_character.bonds = json.dumps(bonds)
            delta_character.bonds_score = json.dumps(bonds_score)

            # handle image
            if request.form.get('removeImage') == 'true':
                if character.url:
                    remove_file_from_s3(character.url)
                    character.url = None

            url = form.data['url']
            if url:
                if character.url:
                    remove_file_from_s3(character.url)

                upload = upload_file_to_s3(url)
                if "errors" in upload:
                    return jsonify(upload), 400
                character.url = upload['url']

            # handle skills
            for skill_data in skills:
                existing_skill = CharacterSkill.query.filter_by(character_id=character_id, skill_id=skill_data['skillId']).first()
                if existing_skill:
                    existing_skill.skill_level = skill_data['skillLevel']
                else:
                    new_skill = CharacterSkill(
                        character_id=character_id,
                        skill_id=skill_data['skillId'],
                        skill_level=skill_data['skillLevel']
                    )
                    db.session.add(new_skill)

            # Handle weapon deletions
            for deleted_weapon in deleted_weapons:
                weapon_id = deleted_weapon.get('id')
                weapon_to_delete = DeltaWeapon.query.get(weapon_id)
                if weapon_to_delete:
                    db.session.delete(weapon_to_delete)

            # Handle weapon updates and additions
            for weapon_data in weapons:
                weapon_id = weapon_data.get('id')
                if weapon_id:
                    # Update existing weapon
                    weapon = DeltaWeapon.query.get(weapon_id)
                    if weapon:
                        weapon.name = weapon_data['name']
                        weapon.skill_percentage = weapon_data['skillPercentage']
                        weapon.base_range = weapon_data['baseRange']
                        weapon.damage = weapon_data['damage']
                        weapon.armor_piercing = weapon_data['armorPiercing']
                        weapon.lethality = weapon_data['lethality']
                        weapon.kill_radius = weapon_data['killRadius']
                        weapon.ammo = weapon_data['ammo']
                else:
                    # Create new weapon
                    new_weapon = DeltaWeapon(
                        character_id=character_id,
                        name=weapon_data['name'],
                        skill_percentage=weapon_data['skillPercentage'],
                        base_range=weapon_data['baseRange'],
                        damage=weapon_data['damage'],
                        armor_piercing=weapon_data['armorPiercing'],
                        lethality=weapon_data['lethality'],
                        kill_radius=weapon_data['killRadius'],
                        ammo=weapon_data['ammo']
                    )
                    db.session.add(new_weapon)

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

    character_skills = db.session.query(
        CharacterSkill.id,
        CharacterSkill.character_id,
        CharacterSkill.skill_level,
        Skill.id.label('skillId'),
        Skill.name,
        Skill.base_value
    ).join(Skill, CharacterSkill.skill_id == Skill.id).filter(
        CharacterSkill.character_id == character_id
    ).all()

    if not character_skills:
        return jsonify({"errors": "No skills found for this character"}), 404

    # Transform to a dict structure
    skill_data = [{
        'id': cs.id,
        'characterId': cs.character_id,
        'skillId': cs.skillId,
        'skillLevel': cs.skill_level,
        'name': cs.name,
        'baseValue': cs.base_value
    } for cs in character_skills]

    return jsonify(skill_data), 200


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


@character_routes.route("/<int:character_id>/export-pdf", methods=["GET"])
@login_required
def export_character_pdf(character_id):
    """Generate a PDF character sheet for a specific character"""

    # fetch the character and delta character data from the database
    character = Character.query.get(character_id)
    delta_character = DeltaGreenCharacter.query.filter_by(character_id=character_id).first()
    weapons = DeltaWeapon.query.filter_by(character_id=character_id).all()
    skills = CharacterSkill.query.filter_by(character_id=character_id).all()

    if character.player_id != current_user.id:
        return jsonify({"errors": "Unauthorized access"}), 403

    # create PDF in memory using a byte stream
    buffer = io.BytesIO()
    pdf = canvas.Canvas(buffer, pagesize=letter)
    pdf.setTitle(f"{character.character_name} - Character Sheet")

    # set the initial y-coordinate (starting from the top)
    y = 750

    # helper function to move y-coordinate down and add content
    def add_text(pdf, content, y):
        if y < 50:
            pdf.showPage()
            y = 750
        pdf.drawString(100, y, content)
        y -= 20
        return y

    # add an image if character has one uploaded via AWS
    if character.url:
        try:
            image_url = character.url
            image_response = requests.get(image_url)
            if image_response.status_code == 200:
                image = ImageReader(io.BytesIO(image_response.content))
                pdf.drawImage(image, 50, 650, width=100, height=100)
                y -= 150
        except Exception as e:
            print(f"Error adding image: {e}")

    # add basic fields
    y = add_text(pdf, f"Character Name: {character.character_name}", y)
    y = add_text(pdf, f"Profession: {delta_character.profession}", y)
    y = add_text(pdf, f"Employer: {delta_character.employer}", y)
    y = add_text(pdf, f"Nationality: {delta_character.nationality}", y)
    y = add_text(pdf, f"Sex: {delta_character.sex}", y)
    y = add_text(pdf, f"Age and DOB: {delta_character.age_dob}", y)
    y = add_text(pdf, f"Education and Occupational History: {delta_character.education_occupation_history}", y)

    # add stats
    y = add_text(pdf, f"Strength: {delta_character.strength_score} (x5: {delta_character.strength_x5})", y)
    y = add_text(pdf, f"Strength Features: {delta_character.strength_features}", y)
    y = add_text(pdf, f"Constitution: {delta_character.constitution_score} (x5: {delta_character.constitution_x5})", y)
    y = add_text(pdf, f"Constitution Features: {delta_character.constitution_features}", y)
    y = add_text(pdf, f"Dexterity: {delta_character.dexterity_score} (x5: {delta_character.dexterity_x5})", y)
    y = add_text(pdf, f"Dexterity Features: {delta_character.dexterity_features}", y)
    y = add_text(pdf, f"Intelligence: {delta_character.intelligence_score} (x5: {delta_character.intelligence_x5})", y)
    y = add_text(pdf, f"Intelligence Features: {delta_character.intelligence_features}", y)
    y = add_text(pdf, f"Power: {delta_character.power_score} (x5: {delta_character.power_x5})", y)
    y = add_text(pdf, f"Power Features: {delta_character.power_features}", y)
    y = add_text(pdf, f"Charisma: {delta_character.charisma_score} (x5: {delta_character.charisma_x5})", y)
    y = add_text(pdf, f"Charisma Features: {delta_character.charisma_features}", y)

    # add hit points, willpower, sanity, and breaking points
    y = add_text(pdf, f"Hit Points: {delta_character.hit_points_current}/{delta_character.hit_points_maximum}", y)
    y = add_text(pdf, f"Willpower: {delta_character.willpower_points_current}/{delta_character.willpower_points_maximum}", y)
    y = add_text(pdf, f"Sanity: {delta_character.sanity_points_current}/{delta_character.sanity_points_maximum}", y)
    y = add_text(pdf, f"Breaking Point: {delta_character.breaking_point_current}/{delta_character.breaking_point_maximum}", y)

    # add bonds and bond scores
    bonds = json.loads(delta_character.bonds)
    bonds_score = json.loads(delta_character.bonds_score)

    if bonds and bonds_score:
        y = add_text(pdf, "Bonds and Bond Scores:", y)
        for i, (bond, score) in enumerate(zip(bonds, bonds_score), start=1):
            y = add_text(pdf, f"  Bond {i}: {bond} (Score: {score})", y)

    # add physical description, motivations, and incidents
    y = add_text(pdf, f"Physical Description: {delta_character.physical_description}", y)
    y = add_text(pdf, f"Motivations and Mental Disorders: {delta_character.motivations_mental_disorders}", y)
    y = add_text(pdf, f"Incidents of Sanity Loss - Violence: {delta_character.incidents_violence}", y)
    y = add_text(pdf, f"Incidents of Sanity Loss - Helplessness: {delta_character.incidents_helplessness}", y)
    y = add_text(pdf, f"Wounds and Ailments: {delta_character.wounds_ailments}", y)
    y = add_text(pdf, f"Armor and Gear: {delta_character.armor_gear}", y)
    y = add_text(pdf, f"Personal Details and Notes: {delta_character.personal_details_notes}", y)
    y = add_text(pdf, f"Developments Which Affect Home and Family: {delta_character.developments_home_family}", y)
    y = add_text(pdf, f"Special Training: {delta_character.special_training}", y)
    y = add_text(pdf, f"Skill or Stat Used: {delta_character.skill_stat_used}", y)

    # add weapons
    if weapons:
        y = add_text(pdf, "Weapons:", y)
        for i, weapon in enumerate(weapons, start=1):
            y = add_text(pdf, f"  {i}. {weapon.name} - Damage: {weapon.damage} - Skill: {weapon.skill_percentage}%", y)

    # add skills
    if skills:
        y = add_text(pdf, "Skills:", y)
        for i, skill in enumerate(skills, start=1):
            skill_name = skill.skill.name  # Access the related Skill model to get the name
            y = add_text(pdf, f"  {i}. {skill_name} - Level {skill.skill_level}", y)

    # save PDF to the byte stream and return it as a file
    pdf.showPage()
    pdf.save()
    buffer.seek(0)

    # return generated PDF as a response
    return send_file(
        buffer,
        as_attachment=True,
        download_name=f"{character.character_name}_sheet.pdf",
        mimetype='application/pdf'
    )
