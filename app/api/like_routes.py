from datetime import datetime
from random import randint
from flask import Blueprint, jsonify, request, redirect, url_for
from flask_login import login_required, current_user
from .AWS_helpers import upload_file_to_s3, get_unique_filename
from .auth_routes import validation_errors_to_error_messages

from app.models import db, Shop, Product, User, Favorite
from app.forms.create_product_form import ProductForm
from app.forms.edit_product_form import EditProductForm
from sqlalchemy import and_, case
from sqlalchemy.sql import func

like_routes = Blueprint('likes', __name__)


# *************************************************************************#

@like_routes.route('/<int:item_id>', methods=['POST', 'DELETE'])
@login_required
def like_item(item_id):
  try:
        liked_item = Favorite.query.filter(Favorite.user_id == current_user.id, Favorite.product_id == item_id).first()

        if request.method == 'POST': # Add to like
            if not liked_item:
                db.session.add(Favorite(user_id=current_user.id, product_id=item_id))
        else:  # delete the like
            if liked_item:
                print('it exists!!!!!')
                db.session.delete(liked_item)

        db.session.commit()
        liked_Allitems = Favorite.query.filter(Favorite.user_id == current_user.id).all()

        return {'message': 'successfully done'}, 201
        # return {'fav_items': [liked_Allitems.to_dict() for item in liked_Allitems]}

  except:
        return {'error': 'something went wrong'}, 500

# *************************************************************************#
@like_routes.route('/favorites')
@login_required
def load_all_like_item():
    subquery = (
        db.session.query(Favorite.product_id)
        .filter(Favorite.user_id == current_user.id)
        .subquery()
    )
    favorited_items = (
        Product.query
        .filter(Product.id.in_(subquery))
        .all()
    )

    return {'items': [item.to_dict() for item in favorited_items]}
    # items: need to be consistent in  Action Creators
