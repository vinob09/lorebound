from app.models import db, Skill, environment, SCHEMA
from sqlalchemy.sql import text


# seed master data for skills
def seed_skills():
    dg1 = Skill(
        name="Delta Green",
        base_value = 0,
        game_type = "delta_green"
    )
    dg2 = Skill(
        name="D&D",
        description="Step into a world of limitless adventure with Dungeons & Dragons. Create your hero and explore fantastical realms filled with magic, monsters, and epic quests. Whether you seek glory, treasure, or the thrill of battle, your destiny awaits in the most beloved tabletop RPG of all time."
    )
    dg3 = Skill(
        name="Warhammer Wrath & Glory",
        description="Enter the grim, dark future of Warhammer 40,000 in Wrath & Glory. Experience intense role-playing in a galaxy torn apart by war, where you and your allies must fight for survival against all odds. Will you embrace the Emperor’s light, or succumb to the dark temptations of chaos? Your fate is in your hands."
    )


    all_skills = [
        dg1,
        dg2,
        dg3
    ]

    add_all_skills = [db.session.add(skill) for skill in all_skills]
    print('All skills added')
    db.session.commit()


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
