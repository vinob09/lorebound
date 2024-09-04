from app.models import db, DeltaWeapon, environment, SCHEMA
from sqlalchemy.sql import text


# seed character weapons
def seed_characters_weapons():
    # dale's weapons
    dale_fists = DeltaWeapon(
        character_id=1,
        name="Fists",
        skill_percentage=60,
        base_range=None,
        damage="1d4",
        armor_piercing=None,
        lethality=None,
        kill_radius="",
        ammo=None
    )

    dale_glock = DeltaWeapon(
        character_id=1,
        name="Glock 22",
        skill_percentage=50,
        base_range="15 meters",
        damage="1d10",
        armor_piercing=None,
        lethality=None,
        kill_radius="",
        ammo=16
    )

    # robert's weapons
    robert_fists = DeltaWeapon(
        character_id=2,
        name="Fists",
        skill_percentage=60,
        base_range=None,
        damage="1d4 - 1",
        armor_piercing=None,
        lethality=None,
        kill_radius="",
        ammo=None
    )

    weapons = [dale_fists, dale_glock, robert_fists]
    db.session.bulk_save_objects(weapons)
    db.session.commit()
    print("All character weapons have been added.")


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_characters_weapons():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.delta_weapons RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM delta_weapons"))

    db.session.commit()
