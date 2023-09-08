from datetime import datetime
from random import randint
from flask import Blueprint, jsonify, request, redirect, url_for
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages

from app.forms.order_form import OrderForm
from app.models import db, Shop, Product, User, Cart, Order, OrderItem
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

    # print('cart_items!!!!!!!!!!!!',cart_items)
    # print('products!!!!!!!!!!!!',products)

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


#*************************************************************************#
#checkout all the items in the cart
@cart_routes.route('/checkout', methods=['POST'])
@login_required
def checkout_shoppingcart():
    # print('checkout backend')
    cart_items =Cart.query.filter_by(user_id=current_user.id).all()

    form = OrderForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # print('Pass validatation####################')
        new_order = Order(
            user_id=current_user.id,
            shipping_address=form.data['shipping_address'],
        )
        db.session.add(new_order)
        db.session.commit()
        # print('new_order*****************',new_order.to_dict())
        for cart_item in cart_items:
            order_item = OrderItem(
                order_id=new_order.id,
                product_id=cart_item.product_id,
                quantity=cart_item.quantity
            )
            db.session.add(order_item)
            db.session.commit()

        for cart_item in cart_items:
            db.session.delete(cart_item)
        db.session.commit()
        return {'message': 'order successfully placed'}, 201

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
