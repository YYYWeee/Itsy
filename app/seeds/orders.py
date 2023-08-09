from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text


# pending
def seed_orders():
  orders = [{
    'product_id':4,
    'user_id':1,
    'quantity':3,
    'shipping_address':'67 Wagon Lane Sioux Falls, SD 57103'
    },
    {
      'product_id':5,
      'user_id':1,
      'quantity':1,
      'shipping_address':'67 Wagon Lane Sioux Falls, SD 57103'
    },
    {
      'product_id':6,
      'user_id':1,
      'quantity':6,
      'shipping_address':'67 Wagon Lane Sioux Falls, SD 57103'
    },
    # {
    #   'product_id':,
    #   'user_id':2,
    #   'quantity':,
    #   'shipping_address':'8323 Berkshire Street Ballston Spa, NY 12020'
    # }
    ]
