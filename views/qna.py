from flask import Flask, render_template, request, jsonify, Blueprint
from pymongo import MongoClient
import certifi
import jwt
import datetime
import hashlib
import requests
from bs4 import BeautifulSoup

bp = Blueprint("qna", __name__, template_folder="templates")

ca = certifi.where()
client = MongoClient("mongodb+srv://bongdroid:qhdrbs88!@cluster0.hecgbmx.mongodb.net/Cluster0?retryWrites=true&w=majority", tlsCAFile = ca)
db = client.users

SECRET_KEY = 'omemu4$'

@bp.route('/')
def qna():			
    return render_template("qna.html")

# 포스팅 박스 기능
@bp.route("/", methods=["POST"])
def qna_post():
    email_receive = request.form['email_give']
    comment_receive = request.form['comment_give']


    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}


    doc = {
        'email': email_receive,
        'comment':comment_receive
    }
    db.qna.insert_one(doc)

    return jsonify({'msg':'등록 완료!'})

@bp.route("/", methods=["GET"])
def qna_get():
    qna_list = list(db.qna.find({}, {'_id': False}))
    return jsonify({'qna':qna_list})