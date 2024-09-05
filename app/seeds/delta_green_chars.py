from app.models import db, DeltaGreenCharacter, environment, SCHEMA
from sqlalchemy.sql import text
import json


# seed DG chars
def seed_dg_chars():
    dale_bonds = json.dumps(["Spouse", "Children"])
    dale_bonds_scores = json.dumps([12, 12])

    robert_bonds = json.dumps(["Brother: Alex", "Lover", "Parents"])
    robert_bonds_scores = json.dumps([11, 11, 11])

    dale = DeltaGreenCharacter(
        character_id=1,
        profession="Agent",
        employer="Drug Enforcement Agency",
        nationality="US Citizen",
        sex="M",
        age_dob="39 02/14/1985",
        education_occupation_history="",
        strength_score=13,
        strength_x5=65,
        strength_features="",
        constitution_score=13,
        constitution_x5=65,
        constitution_features="",
        dexterity_score=11,
        dexterity_x5=55,
        dexterity_features="",
        intelligence_score=12,
        intelligence_x5=60,
        intelligence_features="",
        power_score=11,
        power_x5=55,
        power_features="",
        charisma_score=12,
        charisma_x5=60,
        charisma_features="",
        hit_points_maximum=13,
        hit_points_current=13,
        willpower_points_maximum=11,
        willpower_points_current=11,
        sanity_points_maximum=55,
        sanity_points_current=55,
        breaking_point_maximum=44,
        breaking_point_current=44,
        physical_description="",
        bonds=dale_bonds,
        bonds_score=dale_bonds_scores,
        motivations_mental_disorders="",
        incidents_violence=None,
        incidents_helplessness=None,
        wounds_ailments="",
        armor_gear="Badge, Kevlar Vest (armor 3), Cell Phone, Glock 22",
        personal_details_notes="",
        developments_home_family="",
        special_training="",
        skill_stat_used=""
    )
    robert = DeltaGreenCharacter(
        character_id=2,
        profession="Medic, Senior Airman",
        employer="US Air Force",
        nationality="US Citizen",
        sex="M",
        age_dob="Classified",
        education_occupation_history="",
        strength_score=12,
        strength_x5=60,
        strength_features="",
        constitution_score=14,
        constitution_x5=70,
        constitution_features="",
        dexterity_score=10,
        dexterity_x5=50,
        dexterity_features="",
        intelligence_score=15,
        intelligence_x5=75,
        intelligence_features="",
        power_score=10,
        power_x5=50,
        power_features="",
        charisma_score=11,
        charisma_x5=55,
        charisma_features="",
        hit_points_maximum=13,
        hit_points_current=13,
        willpower_points_maximum=10,
        willpower_points_current=10,
        sanity_points_maximum=50,
        sanity_points_current=50,
        breaking_point_maximum=40,
        breaking_point_current=40,
        physical_description="",
        bonds=robert_bonds,
        bonds_score=robert_bonds_scores,
        motivations_mental_disorders="",
        incidents_violence=None,
        incidents_helplessness=None,
        wounds_ailments="",
        armor_gear="First aid kit, dog tags",
        personal_details_notes="Slept with a senior officer. Sent here after affair was discovered.",
        developments_home_family="",
        special_training="",
        skill_stat_used=""
    )

    all_dg_characters = [
        dale, robert
    ]

    db.session.bulk_save_objects(all_dg_characters)
    db.session.commit()
    print('All DG Characters added.')


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_dg_chars():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.delta_green_characters RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM delta_green_characters"))

    db.session.commit()
