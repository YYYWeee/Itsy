from datetime import datetime
from random import randint
from flask import Blueprint, jsonify, request, redirect, url_for
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages

from app.models import db, Shop, Product, User, Cart
from sqlalchemy import and_, case
from sqlalchemy.sql import func


cart_routes = Blueprint('carts', __name__)

#*************************************************************************#
# get all items in current user's shopping cart
# http://localhost:5000/api/carts

@cart_routes.route('/')
@login_required
def get_all__items():
    cart_items =Cart.query.filter_by(user_id=current_user.id).all()
    return {'carts' : [item.to_dict()] for  item in cart_items }


#*************************************************************************#
@cart_routes.route('/')
@login_required
def add_item():
    pass
