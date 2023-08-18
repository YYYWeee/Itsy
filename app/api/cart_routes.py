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

@cart_routes.route('')
@login_required
def get_all__items():
    cart_items =Cart.query.filter_by(user_id=current_user.id).all()
    product_ids = [item.product_id for item in cart_items]
    products = Product.query.filter(Product.id.in_(product_ids)).all()

    print('cart_items!!!!!!!!!!!!',cart_items)
    print('products!!!!!!!!!!!!',products)

    return {'items' : [item.to_dict() for  item in cart_items],
            'products':[product.to_dict() for  product in products]
            }


#*************************************************************************#
# add  item (quantioty = 1)  in the shopping cart

@cart_routes.route('/<int:itemId>', methods=["POST"])
@login_required
def add_item(itemId):
    cart_item = Cart.query.filter(Cart.user_id == current_user.id, Cart.product_id == itemId).first()

    if cart_item:
        cart_item.quantity +=1
        db.session.commit()
        return cart_item.to_dict()
    else:
        new_item = Cart(
            user_id = current_user.id,
            product_id = itemId,
            quantity = 1
        )
        db.session.add(new_item)
        db.session.commit()
        return new_item.to_dict()


#*************************************************************************#
# remove specific items in the shopping cart
@cart_routes.route('/<int:itemId>', methods=["DELETE"])
@login_required
def delete_items(itemId):
    targetItem = Cart.query.filter(Cart.user_id == current_user.id,Cart.product_id ==itemId).first()
    db.session.delete(targetItem)
    db.session.commit()
    return {"id": targetItem.id}



#*************************************************************************#
# modify quantity of specific item in the shopping cart
@cart_routes.route('/<int:itemId>', methods=["PUT"])
@login_required
def edit_item_qty(itemId):
    data = request.json  # Retrieve the JSON data from the request body
    qty = data.get('qty')  # Retrieve the 'qty' from the JSON data

    target_item = Cart.query.filter(Cart.user_id == current_user.id,Cart.product_id ==itemId).first()
    target_item.quantity = qty

    db.session.commit()
    return target_item.to_dict()
