from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
import certifi
import jwt
import datetime
import hashlib

from food_db import food_db
from ladder import ladder
from roulette import roulette
from test import test
from board import board
from login import login
from join import join

app = Flask(__name__)
app.register_blueprint(food_db, url_prefix="/food_db")
app.register_blueprint(ladder, url_prefix="/ladder")
app.register_blueprint(roulette, url_prefix="/roulette")
app.register_blueprint(test, url_prefix="/test")
app.register_blueprint(board, url_prefix="/board")
app.register_blueprint(login, url_prefix="/login")
app.register_blueprint(join, url_prefix="/join")

ca = certifi.where()
client = MongoClient("mongodb+srv://bongdroid:qhdrbs88!@cluster0.hecgbmx.mongodb.net/Cluster0?retryWrites=true&w=majority", tlsCAFile = ca)
db = client.users

SECRET_KEY = 'omemu4$'

@app.route("/") 		
def main():			
    return render_template("index.html")


if __name__ == "__main__": 	
    app.run(debug=True)