from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from sqlalchemy.sql import func



class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title= db.Column(db.String, nullable=False)
    price= db.Column(db.Float, nullable=False)
    description=db.Column(db.String, nullable=True)
    # category_id
    #one user can only have one shop
    shop_id= db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('shops.id')), nullable=False)
    img_1= db.Column(db.String, nullable=False)
    img_2= db.Column(db.String)
    img_3= db.Column(db.String)
    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now(), onupdate=func.now())
    #one to many
    carts = db.relationship('Cart', back_populates='products', cascade='all, delete-orphan')
    favorites = db.relationship('Favorite', back_populates='products', cascade='all, delete-orphan')
    shop = db.relationship('Shop', back_populates='products')
    # orders = db.relationship('Order', back_populates='products')
    orderitems = db.relationship(
        "OrderItem", back_populates="productitem", cascade="all, delete-orphan")

    def to_dict(self):
        product_dict = {
            'id': self.id,
            'title': self.title,
            'price': self.price,
            'description': self.description,
            'shop_id': self.shop_id,
            'img_1': self.img_1,
            'img_2': self.img_2,
            'img_3': self.img_3,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'shop': self.shop.name
            # 'shop': self.shop[0].id if self.shop else None,
        }
        return product_dict
