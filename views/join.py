from flask import Flask, render_template, request, jsonify, Blueprint
from pymongo import MongoClient
import certifi
import jwt
import datetime
import hashlib

bp = Blueprint("join", __name__, template_folder="templates")

ca = certifi.where()
client = MongoClient("mongodb+srv://bongdroid:qhdrbs88!@cluster0.hecgbmx.mongodb.net/Cluster0?retryWrites=true&w=majority", tlsCAFile = ca)
db = client.users

SECRET_KEY = 'omemu4$'

# @join.route('/')
# def main():
#     return render_template('join.html')

@bp.route('/')
def joinCall():
    return render_template('join.html')

# 회원가입
@bp.route('/', methods=['POST'])
def api_register():
    email_receive = request.form['email_give']
    password_receive = request.form['password_give']
    name_receive = request.form['name_give']
    password_hash = hashlib.sha256(password_receive.encode('utf-8')).hexdigest()

    # 이미 존재하는 아이디면 패스!
    result = db.user.find_one({'email': email_receive})
    if result is not None:
        return jsonify({'result': 'fail', 'msg': '이미 존재하는 ID(이메일)입니다.'})
    else:
        db.user.insert_one({'email': email_receive, 'password': password_hash, 'name': name_receive})
        return jsonify({'result': 'success'})