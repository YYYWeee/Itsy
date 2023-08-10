from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, DecimalField, BooleanField, SubmitField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired, URL, NumberRange, Length,ValidationError
from ..api.AWS_helpers import ALLOWED_EXTENSIONS
from app.models import Shop


def name_exists(form, field):
    # Checking if shop name exists
    name = field.data
    shopName = Shop.query.filter(Shop.name == name).first()
    if shopName:
        raise ValidationError('Shop name is already in use')




class ShopForm(FlaskForm):

    name = StringField('Name', validators=[DataRequired(),name_exists])
    description = StringField('Description')
    image = FileField("Image File", validators=[
                      FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
