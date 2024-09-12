from app.models import db, Character, environment, SCHEMA
from sqlalchemy.sql import text


# seed character
def seed_characters():
    dg1 = Character(
        game_id = 1,
        player_id = 1,
        character_name = "Dale Price",
        url = "https://chansbucket.s3.us-east-2.amazonaws.com/Notes-Images/agent-1.png"
    )
    dg2 = Character(
        game_id = 1,
        player_id = 1,
        character_name = "Robert Johnson",
        url = "https://chansbucket.s3.us-east-2.amazonaws.com/Notes-Images/agent-2.png"
    )
    dg3 = Character(
        game_id=1,
        player_id=1,
        character_name="Sophia Davis",
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Notes-Images/psych.png"
    )
    dg4 = Character(
        game_id=1,
        player_id=1,
        character_name="Johnathan Reed",
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Notes-Images/contractor.png"
    )
    dg5 = Character(
        game_id=1,
        player_id=1,
        character_name="Margaret Fisher",
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Notes-Images/scientist.png"
    )

    all_characters = [
        dg1, dg2, dg3, dg4, dg5
    ]

    db.session.bulk_save_objects(all_characters)
    db.session.commit()
    print('All characters added')


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_characters():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.characters RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM characters"))

    db.session.commit()
