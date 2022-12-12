from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired

class BoardForm(FlaskForm):
    title = StringField('제목', validators=[DataRequired('제목을 입력해주세요!')])
    content = TextAreaField('내용', validators=[DataRequired('내용을 입력해주세요!')])
    login_name = TextAreaField('user')
    #StringField 글자수 제한, TextAreaField 글자수 제한 없음

class CommentForm(FlaskForm):
    content = TextAreaField('내용', validators=[DataRequired('내용을 입력해주세요!')])