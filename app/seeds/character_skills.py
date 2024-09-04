from app.models import db, CharacterSkill, Skill, environment, SCHEMA
from sqlalchemy.sql import text


# seed character skills
def seed_characters_skills():
    # dale specific skills
    dale_skills = {
        "Alertness": 70,
        "Bureaucracy": 40,
        "Criminology": 50,
        "Drive": 50,
        "Firearms": 50,
        "First Aid": 50,
        "HUMINT": 70,
        "Law": 30,
        "Melee Weapons": 50,
        "Occult": 20,
        "Persuade": 50,
        "Pharmacy": 70,
        "Search": 60,
        "Stealth": 50,
        "Survival": 30,
        "Unarmed Combat": 60
    }

    # robert specific skills
    robert_skills = {
        "Alertness": 60,
        "Athletics": 50,
        "Bureaucracy": 40,
        "Drive": 40,
        "Firearms": 40,
        "First Aid": 60,
        "Forensics": 40,
        "Heavy Weapons": 20,
        "HUMINT": 60,
        "Medicine": 40,
        "Military Science": 20,
        "Persuade": 40,
        "Science": 40,
        "Search": 60,
        "Unarmed Combat": 60
    }

    # fetch all skills
    skills = Skill.query.all()

    character_skills = []

    # add dale's skills
    for skill in skills:
        skill_level = dale_skills.get(skill.name, skill.base_value)
        character_skill = CharacterSkill(
            character_id = 1,
            skill_id = skill.id,
            skill_level = skill_level
        )
        character_skills.append(character_skill)

    # add robert's skills
    for skill in skills:
        skill_level = robert_skills.get(skill.name, skill.base_value)
        character_skill = CharacterSkill(
            character_id = 2,
            skill_id = skill.id,
            skill_level = skill_level
        )
        character_skills.append(character_skill)

    # add all character's skills
    db.session.bulk_save_objects(character_skills)
    db.session.commit()
    print("All characters skills have been added.")


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_characters_skills():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.character_skills RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM character_skills"))

    db.session.commit()
