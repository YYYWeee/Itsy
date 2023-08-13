from datetime import datetime
from random import randint
from flask import Blueprint, jsonify, request, redirect, url_for
from flask_login import login_required, current_user
from .AWS_helpers import upload_file_to_s3, get_unique_filename
from .auth_routes import validation_errors_to_error_messages


from app.models import db, Shop, Product, User
from app.forms.create_shop_form import ShopForm
from app.forms.update_shop_form import EditShopForm
from sqlalchemy import and_, case
from sqlalchemy.sql import func

shop_routes = Blueprint('shops', __name__)



#*************************************************************************#
@shop_routes.route('/<int:shopId>')
def get_one_shop(shopId):
    """
    Query for single shop and returns it
    """
    shop = Shop.query.get(shopId)
    if not shop:
       return jsonify({"message": "Shop not found"}), 404
    response = shop.to_dict()
    return response


#*************************************************************************#

# Query for shop that is own by current user
# also add all the items in the shop
# important
@shop_routes.route('')
@login_required
def get_your_shop():
    target_shop = Shop.query.filter_by(owner_id=current_user.id).first()

    if not target_shop:
        return jsonify({"message": "No shop"}), 404

    products = Product.query.filter_by(shop_id=target_shop.id).all()
    response = {
        "shop": target_shop.to_dict(),
        "products": [product.to_dict() for product in products]
    }
    return response


#*************************************************************************#
# Create a new shop
@shop_routes.route('', methods=["POST"])
@login_required
def new_shop():
    form = ShopForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        print('Pass validation')
        image_file = form.data["image"]
        image_file.filename = get_unique_filename(image_file.filename)
        upload = upload_file_to_s3(image_file)
        print('@@@@@@@@@',form.data["name"])

        new_shop = Shop(
            owner_id=current_user.to_dict()['id'],
            shop_img=upload["url"],
            name = form.data['name'],
            description = form.data['description']
        )
        print("!!!!!!!!!!!!!!!!!!!!!!!!!!!",new_shop)
        db.session.add(new_shop)
        db.session.commit()
        return new_shop.to_dict()

    print(form.errors)
    return {"errors": validation_errors_to_error_messages(form.errors)}

#*************************************************************************#
# Update a shop
@shop_routes.route('', methods=['PUT'])
@login_required
def edit_shop():
    form = EditShopForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    target_shop = Shop.query.filter_by(owner_id=current_user.id).first()
    print('Form Data:@@@@@@@@@@@@', form)

    if form.validate_on_submit():
        target_shop.name = form.data['name']
        target_shop.description = form.data['description']

        db.session.commit()
        response = target_shop.to_dict()
    return response

    # if form.errors:
    #     print(form.errors)
    #     return form.errors


#*************************************************************************#
# Delete shop
@shop_routes.route('', methods=['DELETE'])
@login_required
def delete_shop():
    target_shop = Shop.query.filter_by(owner_id=current_user.id).first()
    db.session.delete(target_shop)
    db.session.commit()
    return {"id": target_shop.id}

#*************************************************************************#

# # get all items of specific shop
# @shop_routes.route('/<int:shopId>', methods=['GET'])
# def get_all_items_by_shop(shopId):
#     shop =Shop.query.get(shopId)
#     if not shop:
#         return {'errors': ['No shop found']}

#     else:
#         productList = Product.query.filter(Product.shop_id ==shop.id).all()
#         response= [product.to_dict() for product in productList]
#         return response
