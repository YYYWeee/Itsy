from datetime import datetime
from random import randint
from flask import Blueprint, jsonify, request, redirect, url_for
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages

from app.models import db, Shop, Product, User, Cart, Order
from sqlalchemy import and_, case
from sqlalchemy.sql import func

order_routes = Blueprint('orders', __name__)

@order_routes.route('/old')
@login_required
def get_all_old_order():
    past_orders = Order.query.filter(Order.user_id == current_user.id).order_by(
        Order.updated_at.desc()).all()

    return {"old_orders": {order.id: order.to_dict() for order in past_orders}}


@order_routes.route('/old/<int:orderId>')
@login_required
def get_single_old_order(orderId):
    single_past_order = Order.query.get(orderId)
    if not single_past_order:
        return jsonify({"message": "Order not found"}), 404
    return {"single_old_order": single_past_order.to_dict()}


@order_routes.route('/old/newest')
@login_required
def get_newest_old_order():
    last_past_order = Order.query.filter(
        Order.user_id == current_user.id).order_by(Order.updated_at.desc()).first()
    if not last_past_order:
        return jsonify({"message": "Order not found"}), 404
    return {"newest_order": last_past_order.to_dict()}
