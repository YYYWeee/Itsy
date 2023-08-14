from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, DecimalField, BooleanField, SubmitField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired, URL, NumberRange, Length,ValidationError
from ..api.AWS_helpers import ALLOWED_EXTENSIONS
from app.models import Shop


class EditProductForm(FlaskForm):

    title =  StringField('Name', validators=[DataRequired()])
    price =  IntegerField('Price', validators=[DataRequired()])
    description = StringField('Description')
    image = FileField("Image File 1", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    image2 = FileField("Image File 2", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    image3 = FileField("Image File 3", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
