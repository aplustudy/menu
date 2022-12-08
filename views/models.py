from app import db

class Board(db.Model): # 무조건 db.Model 써야함
    index = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    content = db.Column(db.Text(), nullable=False)
    datetime = db.Column(db.DateTime(), nullable=False)
    
class Comment(db.Model):
    index = db.Column(db.Integer, primary_key=True)
    post_index = db.Column(db.Integer, db.ForeignKey('board.index', ondelete='CASCADE'))
    post = db.relationship('Board', backref=db.backref('comment_set'))
    content = db.Column(db.Text(), nullable=False)
    datetime = db.Column(db.DateTime(), nullable=False)