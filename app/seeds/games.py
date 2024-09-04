from app.models import db, Game, environment, SCHEMA
from sqlalchemy.sql import text


# seed master data for games
def seed_games():
    game1 = Game(
        name="Delta Green",
        description="Delta Green plunges you into the dark and dangerous world of secret government organizations battling cosmic horrors. As an agent, you will confront the unimaginable, face moral dilemmas, and uncover conspiracies that threaten humanity. Are you ready to sacrifice everything to protect the world from the unknown?"
    )
    game2 = Game(
        name="D&D",
        description="Step into a world of limitless adventure with Dungeons & Dragons. Create your hero and explore fantastical realms filled with magic, monsters, and epic quests. Whether you seek glory, treasure, or the thrill of battle, your destiny awaits in the most beloved tabletop RPG of all time."
    )
    game3 = Game(
        name="Warhammer Wrath & Glory",
        description="Enter the grim, dark future of Warhammer 40,000 in Wrath & Glory. Experience intense role-playing in a galaxy torn apart by war, where you and your allies must fight for survival against all odds. Will you embrace the Emperor’s light, or succumb to the dark temptations of chaos? Your fate is in your hands."
    )


    all_games = [
        game1,
        game2,
        game3
    ]

    add_all_games = [db.session.add(game) for game in all_games]
    db.session.commit()
    print('All games added')


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_games():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.games RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM games"))

    db.session.commit()
