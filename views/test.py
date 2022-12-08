from flask import Blueprint, render_template

bp = Blueprint("test", __name__, template_folder="templates")

@bp.route("/") 		
def main():
    return render_template("test.html")