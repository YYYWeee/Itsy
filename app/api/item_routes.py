from datetime import datetime
from random import randint
from flask import Blueprint, jsonify, request, redirect, url_for
from flask_login import login_required, current_user
from .AWS_helpers import upload_file_to_s3, get_unique_filename
from .auth_routes import validation_errors_to_error_messages


from app.models import db, Shop, Product, User
from sqlalchemy import and_, case
from sqlalchemy.sql import func

item_routes = Blueprint('items', __name__)

# get all items
@item_routes.route('/', methods=['GET'])
def get_all_items():
    items = Product.query.all()
    return {'items': [item.to_dict() for item in items]}
