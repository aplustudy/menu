from flask import Flask, render_template, request, jsonify, Blueprint
from pymongo import MongoClient
import certifi
import jwt
import datetime
import hashlib

bp = Blueprint("member_del", __name__, template_folder="templates")

ca = certifi.where()
client = MongoClient("mongodb+srv://bongdroid:qhdrbs88!@cluster0.hecgbmx.mongodb.net/Cluster0?retryWrites=true&w=majority", tlsCAFile = ca)
db = client.users

SECRET_KEY = 'omemu4$'

@bp.route('/')
def member_del():			
    return render_template("member_del.html")

# 회원정보 삭제
@bp.route('/api', methods=['POST'])
def api_member_del():
    email_receive = request.form['email_give']
    pw_receive = request.form['pw_give']

    # 회원가입 때와 같은 방법으로 pw를 암호화합니다.
    pw_hash = hashlib.sha256(pw_receive.encode('utf-8')).hexdigest()

    # id, 암호화된pw을 가지고 해당 유저를 찾아 회원정보를 삭제합니다.
    result = db.user.delete_one({'email': email_receive, 'password': pw_hash})

    # 찾으면 JWT 토큰을 만들어 발급합니다.
    if result is not None:
        return jsonify({'result': 'success'})
    # 찾지 못하면
    else:
        return jsonify({'result': 'fail', 'msg': '아이디/비밀번호가 일치하지 않습니다.'})