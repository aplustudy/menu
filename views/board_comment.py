from flask import Blueprint, url_for, request, render_template
from views.models import Board, Comment
from views.forms import CommentForm
from datetime import datetime, timedelta
from app import db
from werkzeug.utils import redirect

bp = Blueprint("comment", __name__, template_folder="templates")

@bp.route("/create/<int:board_index>/", methods = ["POST"]) 		
def create(board_index):
    form = CommentForm()
    board = Board.query.get_or_404(board_index)
    if form.validate_on_submit():
        content = request.form['content']
        login_name = request.form['login_name']
        login_email = request.form['login_email']
        comment = Comment(content=content, datetime=datetime.now()+timedelta(hours=9), user = login_name, user_email = login_email)
        board.comment_set.append(comment)
        db.session.commit()
        return redirect(url_for('board.detail', board_index = board_index))
    return render_template('board_detail.html', board=board, form=form)