from flask import Blueprint, render_template, request
from pymongo import MongoClient
import jwt
import certifi

bp = Blueprint("secret_page", __name__, template_folder="templates")

ca = certifi.where()
client = MongoClient("mongodb+srv://bongdroid:qhdrbs88!@cluster0.hecgbmx.mongodb.net/Cluster0?retryWrites=true&w=majority", tlsCAFile = ca)
mongodb = client.users
SECRET_KEY = 'omemu4$'

@bp.route("/") 		
def main():
    # email 획득
    token_receive = request.cookies.get('mytoken')
    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        userinfo = mongodb.user.find_one({'email': payload['email']}, {'_id': 0})
        user_email = userinfo['email']
    except:
        user_email = ''
    # email 획득
    if user_email == "administrator@administrator.com":
        return render_template('/secret_page.html')
    else:
        return render_template('/index.html')