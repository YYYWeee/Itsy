from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password',first_name='Demo', last_name='Lition',photo_url='https://static.vecteezy.com/system/resources/previews/002/002/257/original/beautiful-woman-avatar-character-icon-free-vector.jpg')
    marnie = User(
        username='Marnie', email='marnie@aa.io', password='password',first_name='Marnie', last_name='Pola',photo_url='https://static.vecteezy.com/system/resources/previews/002/002/403/original/man-with-beard-avatar-character-isolated-icon-free-vector.jpg')
    bobbie = User(
        username='Bobbie', email='bobbie@aa.io', password='password',first_name='Bobbie', last_name='Tenla',photo_url='https://static.vecteezy.com/system/resources/thumbnails/001/993/889/small/beautiful-latin-woman-avatar-character-icon-free-vector.jpg')
    winnie = User(
        username='Winnie', email='winnie@aa.io', password='password',first_name='Winnie', last_name='Carter',photo_url='https://static.vecteezy.com/system/resources/thumbnails/004/899/680/small/beautiful-blonde-woman-with-makeup-avatar-for-a-beauty-salon-illustration-in-the-cartoon-style-vector.jpg')
    kris = User(
         username='Kris', email='kris@aa.io', password='password',first_name='kris', last_name='Allen',photo_url='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR-dnvon3n5jgi6P_RCSYCMbIHsrI897fc139SSkHrHkB5edJMkXDUNufmNm41cWYazTU&usqp=CAU')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(winnie)
    db.session.add(kris)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
