from app.models import db, Favorite, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime, timedelta
import random


def seed_favorites():
  favorites = [
        {"user_id": 1, "product_id": 22},
        {"user_id": 1, "product_id": 38},
        {"user_id": 1, "product_id": 114},
        {"user_id": 1, "product_id": 11},
        {"user_id": 1, "product_id": 18},
        {"user_id": 2, "product_id": 15},
        {"user_id": 2, "product_id": 100},
        {"user_id": 2, "product_id": 209},
    ]
  seed_favorites = [db.session.add(
        Favorite(**favorite)) for favorite in favorites]
  db.session.commit()




def undo_favorites():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.favorites RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM favorites"))

    db.session.commit()
