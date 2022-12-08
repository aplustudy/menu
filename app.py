from flask import Flask, render_template, Blueprint
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
import config
import os
import sys

# views를 import하기 위해 sys에 현재 폴더의 절대 경로 추가 : https://redfox.tistory.com/80 https://redfox.tistory.com/81
dir = os.path.realpath(__file__)
dir = os.path.abspath(os.path.join(dir, os.pardir))
sys.path.append(dir)

# DB 준비
db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object(config)

    db.init_app(app)
    migrate.init_app(app, db)

    # ---------- Blueprint ----------
    from views import food_db, ladder, roulette, test, login, join, board, board_comment
    app.register_blueprint(food_db.bp, url_prefix="/food_db")
    app.register_blueprint(ladder.bp, url_prefix="/ladder")
    app.register_blueprint(roulette.bp, url_prefix="/roulette")
    app.register_blueprint(test.bp, url_prefix="/test")
    app.register_blueprint(login.bp, url_prefix="/login")
    app.register_blueprint(join.bp, url_prefix="/join")
    app.register_blueprint(board.bp, url_prefix="/board")
    app.register_blueprint(board_comment.bp, url_prefix="/board_comment")
    # ---------- Blueprint ----------

    @app.route("/") 		
    def main():			
        return render_template("index.html")

    return app