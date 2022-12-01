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

app = Flask(__name__)
app.register_blueprint(food_db, url_prefix="/food_db")
app.register_blueprint(ladder, url_prefix="/ladder")
app.register_blueprint(roulette, url_prefix="/roulette")
app.register_blueprint(test, url_prefix="/test")

ca = certifi.where()
client = MongoClient("mongodb+srv://bongdroid:qhdrbs88!@cluster0.hecgbmx.mongodb.net/Cluster0?retryWrites=true&w=majority", tlsCAFile = ca)
db = client.users

SECRET_KEY = 'omemu4$'

@app.route("/") 		
def main():			
    return render_template("index.html")

# 회원가입 완료(join 페이지)했을 때 post로 값 저장하고, 클라이언트(ajax)에서 서버(flask)로 화면에서 입력된 정보 전달 > 서버에서 클라이언트로 잘 전달받았다는 메시지 전달
# 로딩이 완료되면 로그인할 때(login 페이지) 값 일치 여부 확인 후 로그인 진행 (if문으로 구분)

## 이하 작업
@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/join')
def join():
    return render_template('join.html')


# 회원가입
@app.route('/api/join', methods=['POST'])
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


# 로그인
@app.route('/api/login', methods=['POST'])
def api_login():
    email_receive = request.form['email_give']
    password_receive = request.form['password_give']

    # 회원가입 때와 같은 방법으로 pw를 암호화합니다.
    password_hash = hashlib.sha256(password_receive.encode('utf-8')).hexdigest()

    # id, 암호화된pw을 가지고 해당 유저를 찾습니다.
    result = db.user.find_one({'email': email_receive, 'password': password_hash})

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


# 보안: 로그인한 사용자만 통과할 수 있는 API
@app.route('/api/isAuth', methods=['GET'])
def api_valid():
    token_receive = request.cookies.get('mytoken')
    try:
        # token을 시크릿키로 디코딩합니다.
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        # payload 안에 id가 들어있습니다. 이 id로 유저정보를 찾습니다.
        userinfo = db.user.find_one({'email': payload['email']}, {'_id': 0})
        return jsonify({'result': 'success', 'name': userinfo['name']})
    except jwt.ExpiredSignatureError:
        # 위를 실행했는데 만료시간이 지났으면 에러가 납니다.
        return jsonify({'result': 'fail', 'msg': '로그인 시간이 만료되었습니다.'})
    except jwt.exceptions.DecodeError:
        # 로그인 정보가 없으면 에러가 납니다!
        return jsonify({'result': 'fail', 'msg': '로그인 정보가 존재하지 않습니다.'})

if __name__ == "__main__": 	
    app.run(debug=True)