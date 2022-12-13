from flask import Flask, render_template, request, jsonify, Blueprint
from pymongo import MongoClient
import certifi
import jwt
import datetime
import hashlib

bp = Blueprint("change_pw", __name__, template_folder="templates")

ca = certifi.where()
client = MongoClient("mongodb+srv://bongdroid:qhdrbs88!@cluster0.hecgbmx.mongodb.net/Cluster0?retryWrites=true&w=majority", tlsCAFile = ca)
db = client.users

SECRET_KEY = 'omemu4$'

@bp.route('/')
def change_pw():
    return render_template("change_pw.html")

# 비밀번호 변경
@bp.route('/api', methods=['POST'])
def api_change_pw():
    email_receive = request.form['email_give']
    pw1_receive = request.form['pw1_give']
    pw2_receive = request.form['pw2_give']

    # 회원가입 때와 같은 방법으로 pw를 암호화합니다.
    pw1_hash = hashlib.sha256(pw1_receive.encode('utf-8')).hexdigest()
    pw2_hash = hashlib.sha256(pw2_receive.encode('utf-8')).hexdigest()

    # id를 가지고 해당 유저를 찾아 변경한 비밀번호로 변경합니다.
    result = db.user.update_one({'email': email_receive}, {'$set': {'password': pw2_hash}})

    # 찾으면 JWT 토큰을 만들어 발급합니다.
    if result is not None:
        # JWT 토큰 생성
        payload = {
            'email': email_receive,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=100)
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')

        # token을 줍니다.
        return jsonify({'result': 'success', 'token': token})
    # 찾지 못하면
    else:
        return jsonify({'result': 'fail', 'msg': '아이디/비밀번호가 일치하지 않습니다.'})