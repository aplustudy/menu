from flask import Blueprint, jsonify
import certifi
from pymongo import MongoClient

bp = Blueprint("food_db", __name__, template_folder="templates")

ca = certifi.where()
client = MongoClient('mongodb+srv://test:1zVXDk4pUjJSb8Qy@cluster0.htk9v1y.mongodb.net/test?retryWrites=true&w=majority', tlsCAFile = ca)
db = client.dbsparta

@bp.route("/") 		
def food_get():
    food_list = list(db.food.find({}, {'_id': False}))
    return jsonify({'foods' : food_list})