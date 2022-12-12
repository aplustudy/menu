from flask import Blueprint, render_template

bp = Blueprint("user_page", __name__, template_folder="templates")

@bp.route("/") 		
def main():
    return render_template("user_page.html")