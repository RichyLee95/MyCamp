from flask_wtf import FlaskForm
from wtforms import StringField, TimeField, SubmitField
from wtforms.validators import DataRequired, Length
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..api.AWS_helpers import ALLOWED_EXTENSIONS
class CampsiteForm(FlaskForm):
  title = StringField("Title", validators=[DataRequired(), Length(max=255, min=5)])
  address = StringField("Address", validators=[DataRequired(), Length(max=255)])
  hours_open = TimeField("Hours Open", validators=[DataRequired()],format="%H:%M")
  hours_close = TimeField("Hours Closed",validators=[DataRequired()],format="%H:%M")
  phone_number = StringField("Phone Number", validators=[DataRequired()])
  image = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
  prev_image = FileField("Prev_Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
  submit = SubmitField("Submit")