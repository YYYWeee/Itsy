from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


class OrderItem(db.Model):
    __tablename__ = 'orderitems'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("orders.id")), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("products.id")), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now(), onupdate=func.now())

    # one-to-many
    productitem = db.relationship("Product", back_populates="orderitems")
    order = db.relationship("Order", back_populates="orderitems")



    def to_dict(self):
        orderitem_dict={
            'id': self.id,
            'order_id': self.order_id,
            'product_id':self.product_id,
            'product_img':self.productitem.img_1,
            'product_name':self.productitem.title,
            'product_price':self.productitem.price,
            'quantity':self.quantity,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
        return orderitem_dict
