from flask import Blueprint, render_template, url_for, request
from views.models import Board, Comment
from views.forms import BoardForm
from datetime import datetime
from app import db
from werkzeug.utils import redirect

bp = Blueprint("board", __name__, template_folder="templates")

@bp.route("/") 		
def board_main():	
    board_list = Board.query.order_by(Board.datetime.desc())
    return render_template('/board_list.html', board_list=board_list)

@bp.route("/<int:board_index>/") 		
def detail(board_index):	
    form = BoardForm()
    board = Board.query.get_or_404(board_index)
    return render_template('/board_detail.html', board=board, form=form)

@bp.route("/create/", methods = ["GET", "POST"]) 		
def create():	
    form = BoardForm()
    if request.method == "POST" and form.validate_on_submit():
        post = Board(title = form.title.data, content = form.content.data, datetime = datetime.now())
        db.session.add(post)
        db.session.commit()
        return redirect(url_for('board.board_main'))
    return render_template('/board_form.html', form=form)
    # 질문 등록하기 버튼을 누르는 것은 GET, 질문 등록하는 것은 POST