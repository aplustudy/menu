from flask import Blueprint, render_template

roulette = Blueprint("roulette", __name__, template_folder="templates")

@roulette.route("/") 		
def main():
    return render_template("roulette.html")