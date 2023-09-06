from datetime import datetime
from random import randint
from flask import Blueprint, jsonify, request, redirect, url_for
from flask_login import login_required, current_user
from .AWS_helpers import upload_file_to_s3, get_unique_filename
from .auth_routes import validation_errors_to_error_messages

from app.models import db, Shop, Product, User
from sqlalchemy import and_, case
from sqlalchemy.sql import func

category_routes = Blueprint('categories', __name__)

#*************************************************************************#


@category_routes.route('/<string:category_name>')
def get_category_items(category_name):
    items = Product.query.filter(Product.category == category_name)
    return {'items': [item.to_dict() for item in items]}
