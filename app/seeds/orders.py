from app.models import db, Order, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime, timedelta
import random


def seed_orders():
  orders = [
    { #id : 1
    'user_id':1,
    'shipping_address':'718 N Highland Ave, Los Angeles, CA 90038',
    },
    { # id : 2
      'user_id':1,
      'shipping_address':'718 N Highland Ave, Los Angeles, CA 90038',
    },
    { # id : 3
      'user_id':1,
      'shipping_address':'718 N Highland Ave, Los Angeles, CA 90038',
    },
    { # id : 4
      'user_id':2,
      'shipping_address':'3737 Moraga Ave # B307, San Diego, CA 92117',
    },
  ]


  today = datetime.now()
  # define the range of 2 years ago from today
  two_years_ago = today - timedelta(days=365*2)
  # generate 4 elements for 4 orders with random datetimes within the 2-year range
  randomCreatedAtDates = []
  for _ in range(4):
        created_at = datetime.fromtimestamp(random.randint(
            int(two_years_ago.timestamp()), int(today.timestamp())))
        randomCreatedAtDates.append(created_at)
  randomCreatedAtDates.sort(reverse=True)

  for i, product in enumerate(orders):
        product["created_at"] = randomCreatedAtDates[i]
        product["updated_at"] = product["created_at"]



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
