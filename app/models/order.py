from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from sqlalchemy.sql import func


class Order(db.Model):
    __tablename__ = 'orders'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    # product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    # quantity = db.Column(db.Integer, nullable=False)
    shipping_address = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now(), onupdate=func.now())

    #one to many
    user =  db.relationship('User', back_populates='orders')
    # products = db.relationship('Product',back_populates='orders')
    orderitems = db.relationship(
        "OrderItem", back_populates="order", cascade="all, delete-orphan")



    def to_dict(self):
        order_dict = {
            'id': self.id,
            # 'product_id': self.product_id,
            'user_id': self.user_id,
            # 'quantity': self.quantity,
            'shipping_address': self.shipping_address,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
        return order_dict
