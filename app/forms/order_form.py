from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, DecimalField, BooleanField, SubmitField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired, URL, NumberRange, Length,ValidationError


class OrderForm(FlaskForm):
    shipping_address = StringField('Shipping Address', validators=[DataRequired()])
