from flask import Blueprint, render_template

ladder = Blueprint("ladder", __name__, template_folder="templates")

@ladder.route("/") 		
def main():
    return render_template("ladder.html")