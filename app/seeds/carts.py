from app.models import db, Cart, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime, timedelta
import random



def seed_carts():
    carts = [
        {
        'user_id':1,
        'product_id':126,
        'quantity':1
        },
        {
        'user_id':1,
        'product_id':2,
        'quantity':1
        },
        {
        'user_id':1,
        'product_id':157,
        'quantity':4
        },
        {
        'user_id':1,
        'product_id':187,
        'quantity':1
        },
        {
        'user_id':1,
        'product_id':12,
        'quantity':1
        },
        {
        'user_id':2,
        'product_id':105,
        'quantity':2
        },
        {
        'user_id':2,
        'product_id':112,
        'quantity':5
        },

    ]
    seed_carts = [db.session.add(Cart(**cart))
                      for cart in carts]
    db.session.commit()



def undo_carts():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.carts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM carts"))

    db.session.commit()
