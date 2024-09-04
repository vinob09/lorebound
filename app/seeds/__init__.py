from flask.cli import AppGroup
from .users import seed_users, undo_users
from .notes import seed_notes, undo_notes
from .games import seed_games, undo_games
from .skills import seed_skills, undo_skills
from .characters import seed_characters, undo_characters
from .character_skills import seed_characters_skills, undo_characters_skills
from .delta_green_chars import seed_dg_chars, undo_dg_chars
from .delta_weapons import seed_characters_weapons, undo_characters_weapons

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_characters_weapons()
        undo_characters_skills()
        undo_dg_chars()
        undo_characters()
        undo_skills()
        undo_games()
        undo_notes()
        undo_users()
    seed_users()
    seed_notes()
    seed_games()
    seed_skills()
    seed_characters()
    seed_dg_chars()
    seed_characters_skills()
    seed_characters_weapons()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_characters_weapons()
    undo_characters_skills()
    undo_dg_chars()
    undo_characters()
    undo_skills()
    undo_games()
    undo_notes()
    undo_users()
