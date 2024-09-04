from app.models import db, Skill, environment, SCHEMA
from sqlalchemy.sql import text


# seed master data for skills
def seed_skills():
    dg1 = Skill(
        name="Accounting",
        base_value = 10,
        game_type = "delta_green"
    )
    dg2 = Skill(
        name="Alertness",
        base_value = 20,
        game_type = "delta_green"
    )
    dg3 = Skill(
        name="Anthropology",
        base_value = 0,
        game_type = "delta_green"
    )
    dg4 = Skill(
        name="Archeology",
        base_value=0,
        game_type="delta_green"
    )
    dg5 = Skill(
        name="Art",
        base_value=0,
        game_type="delta_green"
    )
    dg6 = Skill(
        name="Artillery",
        base_value=0,
        game_type="delta_green"
    )
    dg7 = Skill(
        name="Athletics",
        base_value=30,
        game_type="delta_green"
    )
    dg8 = Skill(
        name="Bureaucracy",
        base_value=10,
        game_type="delta_green"
    )
    dg9 = Skill(
        name="Computer Science",
        base_value=0,
        game_type="delta_green"
    )
    dg10 = Skill(
        name="Craft",
        base_value=0,
        game_type="delta_green"
    )
    dg11 = Skill(
        name="Criminology",
        base_value=10,
        game_type="delta_green"
    )
    dg12 = Skill(
        name="Demolitions",
        base_value=0,
        game_type="delta_green"
    )
    dg13 = Skill(
        name="Disguise",
        base_value=10,
        game_type="delta_green"
    )
    dg14 = Skill(
        name="Dodge",
        base_value=30,
        game_type="delta_green"
    )
    dg15 = Skill(
        name="Drive",
        base_value=20,
        game_type="delta_green"
    )
    dg16 = Skill(
        name="Firearms",
        base_value=20,
        game_type="delta_green"
    )
    dg17 = Skill(
        name="First Aid",
        base_value=10,
        game_type="delta_green"
    )
    dg18 = Skill(
        name="Forensics",
        base_value=0,
        game_type="delta_green"
    )
    dg19 = Skill(
        name="Heavy Machinery",
        base_value=10,
        game_type="delta_green"
    )
    dg20 = Skill(
        name="Heavy Weapons",
        base_value=0,
        game_type="delta_green"
    )
    dg21 = Skill(
        name="History",
        base_value=10,
        game_type="delta_green"
    )
    dg22 = Skill(
        name="HUMINT",
        base_value=10,
        game_type="delta_green"
    )
    dg23 = Skill(
        name="Law",
        base_value=0,
        game_type="delta_green"
    )
    dg24 = Skill(
        name="Medicine",
        base_value=0,
        game_type="delta_green"
    )
    dg25 = Skill(
        name="Melee Weapons",
        base_value=30,
        game_type="delta_green"
    )
    dg26 = Skill(
        name="Military Science",
        base_value=0,
        game_type="delta_green"
    )
    dg27 = Skill(
        name="Navigate",
        base_value=10,
        game_type="delta_green"
    )
    dg28 = Skill(
        name="Occult",
        base_value=10,
        game_type="delta_green"
    )
    dg29 = Skill(
        name="Persuade",
        base_value=20,
        game_type="delta_green"
    )
    dg30 = Skill(
        name="Pharmacy",
        base_value=0,
        game_type="delta_green"
    )
    dg31 = Skill(
        name="Pilot",
        base_value=0,
        game_type="delta_green"
    )
    dg32 = Skill(
        name="Psychotherapy",
        base_value=10,
        game_type="delta_green"
    )
    dg33 = Skill(
        name="Ride",
        base_value=10,
        game_type="delta_green"
    )
    dg34 = Skill(
        name="Science",
        base_value=0,
        game_type="delta_green"
    )
    dg35 = Skill(
        name="Search",
        base_value=20,
        game_type="delta_green"
    )
    dg36 = Skill(
        name="SIGINT",
        base_value=0,
        game_type="delta_green"
    )
    dg37 = Skill(
        name="Stealth",
        base_value=10,
        game_type="delta_green"
    )
    dg38 = Skill(
        name="Surgery",
        base_value=0,
        game_type="delta_green"
    )
    dg39 = Skill(
        name="Survival",
        base_value=10,
        game_type="delta_green"
    )
    dg40 = Skill(
        name="Swim",
        base_value=20,
        game_type="delta_green"
    )
    dg41 = Skill(
        name="Unarmed Combat",
        base_value=40,
        game_type="delta_green"
    )
    dg42 = Skill(
        name="Unnatural",
        base_value=0,
        game_type="delta_green"
    )
    dg43 = Skill(
        name="Foreign Languages and Other Skills",
        base_value=0,
        game_type="delta_green"
    )

    all_skills = [
        dg1, dg2, dg3, dg4, dg5, dg6, dg7, dg8, dg9, dg10,
        dg11, dg12, dg13, dg14, dg15, dg16, dg17, dg18, dg19, dg20,
        dg21, dg22, dg23, dg24, dg25, dg26, dg27, dg28, dg29, dg30,
        dg31, dg32, dg33, dg34, dg35, dg36, dg37, dg38, dg39, dg40,
        dg41, dg42, dg43
    ]

    add_all_skills = [db.session.add(skill) for skill in all_skills]
    db.session.commit()
    print('All skills added')


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_skills():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.skills RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM skills"))

    db.session.commit()
