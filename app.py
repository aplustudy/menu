from flask import Flask, render_template, Blueprint
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
import config
import os
import sys

# views를 import하기 위해 sys에 현재 폴더의 절대 경로 추가 : https://redfox.tistory.com/80 https://redfox.tistory.com/81
dir = os.path.realpath(__file__)
dir = os.path.abspath(os.path.join(dir, os.pardir))
sys.path.append(dir)

# DB 준비
naming_convention = {
    "ix": 'ix_%(column_0_label)s',
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(column_0_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}
db = SQLAlchemy(metadata=MetaData(naming_convention=naming_convention))
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object(config)

    db.init_app(app)
    if app.config['SQLALCHEMY_DATABASE_URI'].startswith("sqlite"):
        migrate.init_app(app, db, render_as_batch=True)
    else:
        migrate.init_app(app, db)

    from filter import format_datetime
    app.jinja_env.filters['datetime'] = format_datetime

    # ---------- Blueprint ----------
    from views import food_db, ladder, roulette, test, login, join, board, board_comment, user_page
    app.register_blueprint(food_db.bp, url_prefix="/food_db")
    app.register_blueprint(ladder.bp, url_prefix="/ladder")
    app.register_blueprint(roulette.bp, url_prefix="/roulette")
    app.register_blueprint(test.bp, url_prefix="/test")
    app.register_blueprint(login.bp, url_prefix="/login")
    app.register_blueprint(join.bp, url_prefix="/join")
    app.register_blueprint(board.bp, url_prefix="/board")
    app.register_blueprint(board_comment.bp, url_prefix="/board_comment")
    app.register_blueprint(user_page.bp, url_prefix="/user_page")
    # ---------- Blueprint ----------

    @app.route("/") 		
    def main():			
        return render_template("index.html")
    
    if __name__ == "__main__": 
        app.run(host='0.0.0.0', port=5000)
    return app

create_app()