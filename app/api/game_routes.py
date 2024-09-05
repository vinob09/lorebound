from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Game


game_routes = Blueprint('games', __name__)


@game_routes.route("", methods=["GET"])
@login_required
def get_all_games():
    """Get all games"""

    try:
        games = Game.query.all()
        games_data = [game.to_dict() for game in games]
        return jsonify(games_data), 200
    except Exception as e:
        print(f"Exception in get_all_games: {str(e)}")
        return jsonify({"error": "An error occurred while fetching all games"}), 500
