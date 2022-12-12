from flask import Blueprint, render_template, url_for, request, jsonify
from views.models import Board, Comment
from views.forms import BoardForm
from datetime import datetime
from app import db
from werkzeug.utils import redirect

bp = Blueprint("board", __name__, template_folder="templates")

@bp.route("/") 		
def _list():	
    page = request.args.get('page', type=int, default=1)  # 페이지
    kw = request.args.get('kw', type=str, default='')
    board_list = Board.query.order_by(Board.datetime.desc()) 
    if kw:
        search = '%%{}%%'.format(kw)
        sub_query = db.session.query(Comment.post_index, Comment.content, Comment.user).subquery()
        board_list = board_list \
            .outerjoin(sub_query, sub_query.c.post_index == Board.index) \
            .filter(Board.title.ilike(search) |  # 질문제목
                    Board.content.ilike(search) |  # 질문내용
                    Board.user.ilike(search) |  # 질문작성자
                    sub_query.c.content.ilike(search) |  # 답변내용
                    sub_query.c.user.ilike(search)  # 답변작성자
                    ) \
            .distinct()
    board_list = board_list.paginate(page=page, per_page=10)
    return render_template('board_list.html', board_list = board_list, page=page, kw=kw)

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
    return render_template('/board_detail.html', board=board, form=form)

@bp.route("/create/", methods = ["GET", "POST"]) 		
def create():	
    form = BoardForm()
    if request.method == "POST" and form.validate_on_submit():
        post = Board(title = form.title.data, content = form.content.data, datetime = datetime.now(), user = 'temp')
        db.session.add(post)
        db.session.commit()
        return redirect(url_for('board._list'))
    return render_template('/board_form.html', form=form)
    # 질문 등록하기 버튼을 누르는 것은 GET, 질문 등록하는 것은 POST