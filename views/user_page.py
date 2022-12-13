from flask import Blueprint, render_template, request, redirect, url_for
from pymongo import MongoClient
import certifi
import jwt

bp = Blueprint("user_page", __name__, template_folder="templates")

ca = certifi.where()
client = MongoClient("mongodb+srv://bongdroid:qhdrbs88!@cluster0.hecgbmx.mongodb.net/Cluster0?retryWrites=true&w=majority", tlsCAFile = ca)
db = client.users
SECRET_KEY = 'omemu4$'

@bp.route("/") 		
def main():
    token_receive = request.cookies.get('mytoken')
    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        userinfo = db.user.find_one({'email': payload['email']}, {'_id': 0})
        user_email = userinfo['email']
    except:
        return redirect(url_for('login.loginCall'))
    return render_template("user_page.html", user_email = user_email)