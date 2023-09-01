from app.models import db, Order, environment, SCHEMA
from sqlalchemy.sql import text



def seed_orders():
  orders = [
    { #id : 1
    'user_id':1,
    'shipping_address':'718 N Highland Ave, Los Angeles, CA 90038'
    },
    { # id : 2
      'user_id':1,
      'shipping_address':'718 N Highland Ave, Los Angeles, CA 90038'
    },
    { # id : 3
      'user_id':1,
      'shipping_address':'718 N Highland Ave, Los Angeles, CA 90038'
    },
    { # id : 4
      'user_id':2,
      'shipping_address':'3737 Moraga Ave # B307, San Diego, CA 92117'
    },
  ]
  seed_orders = [db.session.add(
    Order(**order)) for order in orders]
  db.session.commit()

def undo_orders():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.orders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM orders"))

    db.session.commit()
