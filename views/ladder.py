from flask import Blueprint, render_template

bp = Blueprint("ladder", __name__, template_folder="templates")

@bp.route("/") 		
def main():
    return render_template("ladder.html")