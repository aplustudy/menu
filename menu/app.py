from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

import certifi
ca = certifi.where()

from pymongo import MongoClient
client = MongoClient("mongodb+srv://bongdroid:qhdrbs88!@cluster0.hecgbmx.mongodb.net/Cluster0?retryWrites=true&w=majority", tlsCAFile = ca)

db = client.user

@app.route("/") 		
def main():			
    return render_template("index.html")

# 회원가입 완료(join 페이지)했을 때 post로 값 저장하고, 클라이언트(ajax)에서 서버(flask)로 화면에서 입력된 정보 전달 > 서버에서 클라이언트로 잘 전달받았다는 메시지 전달
# 로딩이 완료되면 로그인할 때(login 페이지) 값 일치 여부 확인 후 로그인 진행 (if문으로 구분)

@app.route("/roulette") 		
def roulette():			
    return render_template("roulette.html")


@app.route('/user', methods=['POST'])
def test_post():
    name_receive = request.form['name_give']
    email_receive = request.form['email_give']
    password_receive = request.form['password_give']
    all_listnum = list(db.user.find({},{'_id':False}))
    count = len(all_listnum) + 1
    doc = {
        'name' : name_receive,
        'email' : email_receive,
        'password' : password_receive,
        # ‘num’ : count,  //고객번호같은거 넣는다면? client ID 같은거 넣기도 하니까
        # ‘done’ : 0  //뭔가 액션을 한 회원가 아닌 회원 구분용
        }
    db.user.insert_one(doc)
    return jsonify({'result':'success', 'msg': '이 요청은 POST!'})

if __name__ == "__main__": 	
    app.run(debug=True)