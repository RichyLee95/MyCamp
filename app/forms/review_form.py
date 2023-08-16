from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length

class ReviewForm(FlaskForm):
    review_text = StringField("Review", validators=[DataRequired(), Length(max=255, min=5)]),
    stars= IntegerField("Stars", validators=[DataRequired(), Length(max=5, min=1)])