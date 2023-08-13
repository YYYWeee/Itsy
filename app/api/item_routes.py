from datetime import datetime
from random import randint
from flask import Blueprint, jsonify, request, redirect, url_for
from flask_login import login_required, current_user
from .AWS_helpers import upload_file_to_s3, get_unique_filename
from .auth_routes import validation_errors_to_error_messages

from app.models import db, Shop, Product, User
from app.forms.create_product_form import ProductForm
from app.forms.edit_product_form import EditProductForm
from sqlalchemy import and_, case
from sqlalchemy.sql import func

item_routes = Blueprint('items', __name__)

#*************************************************************************#
# get all items
# http://localhost:5000/api/items/

@item_routes.route('/', methods=['GET'])
def get_all_items():
    items = Product.query.all()
    return {'items': [item.to_dict() for item in items]}

#*************************************************************************#
# create a product
@item_routes.route('', methods=["POST"])
@login_required
def new_item():
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        print('Pass validation')
        image_file = form.data["image"]
        image_file2 = form.data["image2"]
        image_file3 = form.data["image3"]

        image_file.filename = get_unique_filename(image_file.filename)
        image_file2.filename = get_unique_filename(image_file2.filename)
        image_file3.filename = get_unique_filename(image_file3.filename)

        upload = upload_file_to_s3(image_file)
        upload2 = upload_file_to_s3(image_file2)
        upload3 = upload_file_to_s3(image_file3)

        new_product = Product(
            title = form.data['title'],
            price = form.data['price'],
            description = form.data['description'],
            shop_id = current_user.to_dict()['shop'],  # !!
            img_1 = upload["url"],
            img_2 = upload2["url"],
            img_3 = upload3["url"],
        )
        db.session.add(new_product)
        db.session.commit()
        return new_product.to_dict()
    print(form.errors)
    return {"errors": validation_errors_to_error_messages(form.errors)}


#*************************************************************************#
#update a product
@item_routes.route('/<int:itemId>', methods=["PUT"])
@login_required
def edit_item(itemId):
    print('In the backend!!!!!!!!!')
    form = EditProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    target_item = Product.query.get(itemId)
    print('backend@@@@@@',target_item)

    if form.validate_on_submit():
        image_file = form.data["image"]
        image_file2 = form.data["image2"]
        image_file3 = form.data["image3"]

        image_file.filename = get_unique_filename(image_file.filename)
        image_file2.filename = get_unique_filename(image_file2.filename)
        image_file3.filename = get_unique_filename(image_file3.filename)

        upload = upload_file_to_s3(image_file)
        upload2 = upload_file_to_s3(image_file2)
        upload3 = upload_file_to_s3(image_file3)

        target_item.name = form.data['title']
        target_item.description = form.data['price']
        target_item.description = form.data['description']
        target_item.img_1 = upload["url"]
        target_item.img_2 = upload2["url"]
        target_item.img_3 = upload3["url"]

        db.session.commit()
        response = target_item.to_dict()
        return response
    if form.errors:
        print(form.errors)
        return form.errors

#*************************************************************************#
# delete a product
@item_routes.route('<int:itemId>', methods=["DELETE"])
@login_required
def delete_item(itemId):
    targetItem = Product.query.get(itemId)
    db.session.delete(targetItem)
    db.session.commit()
    return {"id": targetItem.id}

#*************************************************************************#
