from app.models import db, Note, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo note
def seed_notes():
    note1 = Note(
        user_id=1,
        title='The Call',
        content="There's been a series of murders out in Glenridge, dubbed the 'Chiropracter Killer'. Gotta meet up with the Handler soon...",
        url='https://chansbucket.s3.us-east-2.amazonaws.com/Notes-Images/1-1.jpg'
    )
    note2 = Note(
        user_id=1,
        title='Crazy House',
        content="The doctor over at the crazy house didn't provide much to us. To be honest, he was kind of creepy. Will have to keep his name in the books, this Dr. Adrian Gunther.",
        url='https://chansbucket.s3.us-east-2.amazonaws.com/Notes-Images/1-2.jpg'
    )
    note3 = Note(
        user_id=1,
        title='Missing!',
        content="The team has planned to stake out the high school with Kirk and Fish as bait. I hope we don't eaten by a teradactyl...",
        url='https://chansbucket.s3.us-east-2.amazonaws.com/Notes-Images/1-3.jpg'
    )
    note4 = Note(
        user_id=2,
        title='Card Reading',
        content="Everyone got a card reading done by Madame Eva. It seems that these are to point us in different points of interest around Barovia.",
        url='https://chansbucket.s3.us-east-2.amazonaws.com/Notes-Images/2-1.jpg'
    )
    note5 = Note(
        user_id=2,
        title='Baba Lysaga',
        content='Fought the horrid Baba Lysaga! We barely scraped on by, with too many player deaths...must do better!',
        url='https://chansbucket.s3.us-east-2.amazonaws.com/Notes-Images/2-2.jpg'
    )
    note6 = Note(
        user_id=2,
        title='Strahd Dinner',
        content='Apparently we are being watched by Strahd, the evil curse that plagues these lands. He has definitely heard our names being thrown around.',
        url='https://chansbucket.s3.us-east-2.amazonaws.com/Notes-Images/2-3.jpg'
    )
    note7 = Note(
        user_id=3,
        title='Purging the Heretic',
        content="Today, I led the charge against a group of cultists worshipping the Dark Gods. My faith in the Emperor is my shield, and with His guidance, we purged the heretics from this world. However, the whispers of chaos still linger in my mind. I must remain vigilant.",
        url='https://chansbucket.s3.us-east-2.amazonaws.com/Notes-Images/3-1.jpg'
    )
    note8 = Note(
        user_id=3,
        title='Mission Briefing',
        content="Our next mission takes us deep into the hive city of Necromunda. Rumors of a Genestealer infestation have reached us, and it is our duty to cleanse the city. The Emperor's light shall guide us through the darkness.",
        url='https://chansbucket.s3.us-east-2.amazonaws.com/Notes-Images/3-2.jpg'
    )
    note9 = Note(
        user_id=3,
        title='Written by Faith and Fire',
        content='I am Sister Amelia of the Order of the Martyred Lady. When the xenos scum invaded my home planet of Thithus 1, I knew my calling from that day forward. My faith is my weapon and I will never waver in my duty. For the Emperor!',
        url='https://chansbucket.s3.us-east-2.amazonaws.com/Notes-Images/3-3.jpg'
    )
    note10 = Note(
        user_id=4,
        title='The Dream',
        content="I've been having the same dream over and over again. I'm standing in front of a door, and beyond it, there's something ancient, something powerful. I know that if I open it, I will unleash something terrible. But the dream always ends before I make a choice. I fear that this dream is more than just a figment of my imagination.",
        url='https://chansbucket.s3.us-east-2.amazonaws.com/Notes-Images/4-1.jpg'
    )
    note11 = Note(
        user_id=4,
        title='The Conspiracy Deepens',
        content="After our last mission, I discovered a connection between the disappearances and a shadowy organization within the government. Whoever they are, they're powerful, and they're watching us. I need to find out more before it's too late.",
        url='https://chansbucket.s3.us-east-2.amazonaws.com/Notes-Images/4-2.jpg'
    )
    note12 = Note(
        user_id=4,
        title='Crazy Town',
        content='My agent is going insane and had a psychotic breakdown in our last session. It seems that seeing the ghastly alien creature destroy my friends did me in.',
        url='https://chansbucket.s3.us-east-2.amazonaws.com/Notes-Images/4-3.jpg'
    )
    note13 = Note(
        user_id=5,
        title='The Hunt',
        content="We tracked the traitor across five systems before finally cornering him on a barren world. I took the shot that ended his miserable existence. But even now, I wonder if it was too easy. Traitors are never truly alone, and I fear we have only seen the beginning of this hunt.",
        url='https://chansbucket.s3.us-east-2.amazonaws.com/Notes-Images/5-1.jpg'
    )
    note14 = Note(
        user_id=5,
        title='Wolfbrother',
        content="In a rare moment of respite, I visited the shrine of Leman Russ. As I stood before the statue of our Primarch, I felt a connection to my Wolfbrothers that I had never experienced before. Perhaps I am not as alone as I thought.",
        url='https://chansbucket.s3.us-east-2.amazonaws.com/Notes-Images/5-2.jpg'
    )

    all_notes = [
        note1,
        note2,
        note3,
        note4,
        note5,
        note6,
        note7,
        note8,
        note9,
        note10,
        note11,
        note12,
        note13,
        note14
    ]

    add_all_notes = [db.session.add(note) for note in all_notes]
    print('All notes added')
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_notes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.notes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM notes"))

    db.session.commit()
