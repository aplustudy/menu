from flask import Blueprint, render_template, request, jsonify
import certifi
from pymongo import MongoClient
from datetime import datetime

ca = certifi.where()
client = MongoClient('mongodb+srv://test:1zVXDk4pUjJSb8Qy@cluster0.htk9v1y.mongodb.net/test?retryWrites=true&w=majority', tlsCAFile = ca)
db = client.dbsparta

board = Blueprint("board", __name__, template_folder="templates")

@board.route('/')
def board_main():
   return render_template('board.html')

@board.route('/write')
def board_write():
   return render_template('write.html')

@board.route("/get", methods=["GET"])
def board_get():
    post_list = list(db.board.find({}, {'_id': False}))
    return jsonify({'posts' : post_list})

@board.route("/post", methods=["POST"])
def board_post():
    title_receive = request.form['title_give']
    text_receive = request.form['text_give']
    id_receive = request.form['id_give']
    now = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    last_index = db.metadata.find_one({'name' : 'board_index'})['value']
    doc = {'index' : last_index + 1, 'time' : now, 'id' : id_receive, 'title' : title_receive, 'text' : text_receive}
    db.board.insert_one(doc)
    db.metadata.update_one({'name' : 'board_index'}, {'$set' : {'value' : last_index + 1}})
    return jsonify({'msg': '등록 완료!'})

@board.route("/update", methods=["POST"]) 		
def board_update():
    index_receive = int(request.form['index_give'])
    title_receive = request.form['title_give']
    text_receive = request.form['text_give']
    db.board.update_one({'index' : index_receive}, {'$set' : {'title' : title_receive, 'text' : text_receive}})
    return jsonify({'msg' : '수정 완료!'})
    
@board.route("/delete", methods=["POST"]) 		
def board_delete():
    index_receive = int(request.form['index_give'])
    db.board.delete_one({'index' : index_receive})
    return jsonify({'msg' : '삭제 완료!'})