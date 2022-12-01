from flask import Blueprint, render_template

test = Blueprint("test", __name__, template_folder="templates")

@test.route("/") 		
def main():
    return render_template("test.html")