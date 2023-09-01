from app.models import db, OrderItem, environment, SCHEMA
from sqlalchemy.sql import text


def seed_orderitems():
    orderitems=[
    {'order_id':1,'product_id':79,'quantity':1,},
    {'order_id':1,'product_id':151,'quantity':1,},
    {'order_id':1,'product_id':21,'quantity':2,},
    {'order_id':2,'product_id':59,'quantity':2,},
    {'order_id':2,'product_id':63,'quantity':1,},
    {'order_id':3,'product_id':85,'quantity':1,},
    {'order_id':4,'product_id':2,'quantity':1,},
    {'order_id':4,'product_id':33,'quantity':1,},
    ]

    seed_orderitems = [db.session.add(
        OrderItem(**orderitem)) for orderitem in orderitems]
    db.session.commit()


def undo_orderitems():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.orderitems RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM orderitems"))

    db.session.commit()
