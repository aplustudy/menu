from flask import Blueprint, render_template, url_for, request, jsonify
from views.models import Board, Comment
from views.forms import BoardForm
from datetime import datetime
from app import db 
from werkzeug.utils import redirect, secure_filename
from pymongo import MongoClient
import certifi
import jwt
import os
bp = Blueprint("board", __name__, template_folder="templates")

ca = certifi.where()
client = MongoClient("mongodb+srv://bongdroid:qhdrbs88!@cluster0.hecgbmx.mongodb.net/Cluster0?retryWrites=true&w=majority", tlsCAFile = ca)
mongodb = client.users
SECRET_KEY = 'omemu4$'

@bp.route("/") 		
def _list():	
    page = request.args.get('page', type=int, default=1)  # 페이지
    kw = request.args.get('kw', type=str, default='')
    tab = request.args.get('tab', type=str, default='')
    board_list = Board.query.order_by(Board.datetime.desc()) 
    if tab:
        search = '%%{}%%'.format(tab)
        board_list = board_list.filter(Board.tab.like(search)).distinct()
    if kw:
        search = '%%{}%%'.format(kw)
        sub_query = db.session.query(Comment.post_index, Comment.content, Comment.user).subquery()
        board_list = board_list \
            .outerjoin(sub_query, sub_query.c.post_index == Board.index) \
            .filter(Board.title.ilike(search) |  # 질문제목
                    Board.content.ilike(search) |  # 질문내용
                    Board.user.ilike(search) |  # 질문작성자
                    Board.user_email.ilike(search)  | # 질문작성자 이메일
                    sub_query.c.content.ilike(search) |  # 답변내용
                    sub_query.c.user.ilike(search)   # 답변작성자
                    ) \
            .distinct()
    board_list = board_list.paginate(page=page, per_page=10)
    return render_template('board_list.html', board_list = board_list, page=page, kw=kw, tab=tab)

@bp.errorhandler(404)
def page_not_found(error):
    page = request.args.get('page', type=int, default=1)
    board_list = Board.query.order_by(Board.datetime.desc()) 
    board_list = board_list.paginate(page=page, per_page=10)
    return render_template('board_list.html', board_list = board_list, page=page, kw='')

@bp.route("/<int:board_index>/") 		
def detail(board_index):
    form = BoardForm()
    board = Board.query.get_or_404(board_index)
    # email 획득
    token_receive = request.cookies.get('mytoken')
    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        userinfo = mongodb.user.find_one({'email': payload['email']}, {'_id': 0})
        user_email = userinfo['email']
    except:
        user_email = userinfo['익명']
    # email 획득
    return render_template('/board_detail.html', board = board, form = form, user_email = user_email)

@bp.route("/create/", methods = ["GET", "POST"]) 		
def create():	
    form = BoardForm()
    today = datetime.now()
    if request.method == "POST" and form.validate_on_submit():
        file = request.files[form.file_upload.name]
        extension = file.filename.split('.')[-1]
        if extension in ['png', 'jpg', 'bmp', 'gif', 'webp']:
            file_name = today.strftime('%Y-%m-%d-%H-%M-%S-%f')
            file_name = secure_filename(file_name)
            os.makedirs('static/uploaded', exist_ok=True)
            file.save(os.path.join('static/uploaded', f'{file_name}.{extension}'))
            final_file_name = f'uploaded/{file_name}.{extension}'
        else:
            final_file_name = None
        post = Board(title = form.title.data, content = form.content.data, user = form.login_name.data, 
                     user_email = form.login_email.data, datetime = today, file_name = final_file_name, tab = form.tab.data)
        db.session.add(post)
        db.session.commit()
        return redirect(url_for('board._list'))
    return render_template('/board_form.html', form=form)
    # 질문 등록하기 버튼을 누르는 것은 GET, 질문 등록하는 것은 POST

@bp.route("/delete", methods=["POST"])
def post_delete():
    index_receive = request.form['index_give']
    email_receive = request.form['email_give']
    q = Board.query.get_or_404(index_receive)
    if q.user_email == email_receive:
        db.session.delete(q)
        db.session.commit()
    return jsonify({'msg': 'DONE!'})

@bp.route("/modify/<int:board_index>", methods = ["GET", "POST"]) 		
def modify(board_index):	
    q = Board.query.get_or_404(board_index)
    if request.method == "POST":
        form = BoardForm()
        if form.validate_on_submit():
            form.populate_obj(q)
            #파일
            file = request.files[form.file_upload.name]
            extension = file.filename.split('.')[-1]
            today = datetime.now()
            print(q.file_name)
            if extension in ['png', 'jpg', 'bmp', 'gif', 'webp']:
                file_name = today.strftime('%Y-%m-%d-%H-%M-%S-%f')
                file_name = secure_filename(file_name)
                os.makedirs('static/uploaded', exist_ok=True)
                file.save(os.path.join('static/uploaded', f'{file_name}.{extension}'))
                final_file_name = f'uploaded/{file_name}.{extension}'
            else:
                final_file_name = f'{q.file_name}'
            #파일
            q.file_name = final_file_name
            db.session.commit()
            return redirect(url_for('board.detail', board_index=board_index))
    else:
        form = BoardForm(obj = q)
    return render_template('/board_form.html', form=form)
    # 질문 등록하기 버튼을 누르는 것은 GET, 질문 등록하는 것은 POST