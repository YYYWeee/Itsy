from app.models import db, Shop, environment, SCHEMA
from sqlalchemy.sql import text

def seed_shops():
    shops = [{
        'name':'beEsom',
        'owner_id':1,
        'description':'Hello friends! Welcome to beEsom. All of our designs are made with love and care, and printed with eco-friendly ink on the best quality cotton tees. Orders will be processed and shipped within 2-7 business days.',
        'shop_img':'https://i.etsystatic.com/isbl/9e28d8/65058667/isbl_3360x840.65058667_a2n0sv0i.jpg?version=0'
    },
    {
        'name':'CaitlynMinimalist',
        'owner_id':2,
        'description':'Welcome to our little shop, where you can find minimal custom pieces and more, for you and your loved ones. Our current turnaround time is about 6 to 9 business days. Shipping times within US takes about 3 - 4 days. If you would like to rush your order, please feel free to email us.',
        'shop_img':'https://i.etsystatic.com/isbl/fcc110/65261467/isbl_3360x840.65261467_43a22u4q.jpg?version=0'
    },
    {
        'name':'JJDesignHouse',
        'owner_id':3,
        'description':'Welcome! CURRENT SALE: 40% OFF ALL LISTINGS | 50% OFF 3+ LISTINGS No code needed, simply add the items to your cart and the discount will be taken automatically.',
        'shop_img':'https://i.etsystatic.com/isbl/8813f0/60151060/isbl_3360x840.60151060_l8ig7w43.jpg?version=0'
    },
    {
       'name':'CeramiStore',
       'owner_id':4,
       'description':'Welcome to CeramiStore - where you can find gorgeous environmentally friendly decorations for your house! ✨✨✨',
       'shop_img':'https://i.etsystatic.com/isbl/73b89a/64676849/isbl_3360x840.64676849_q0wey9s4.jpg?version=0'

    },
    {
        'name':'ChildUniverse',
        'owner_id':5,
        'description':'ChildUniverse is the first shop with wooden printed name puzzles on Etsy. We prioritize the use of top-quality wood and non-toxic paints, ensuring the safest and best materials for your little ones.💛',
        'shop_img':'https://i.etsystatic.com/isbl/fd8679/61057384/isbl_3360x840.61057384_ecrh8567.jpg?version=0'
    }
    ]
    seed_shops = [db.session.add(Shop(**shop))
                      for shop in shops]
    db.session.commit()


def undo_shops():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.shops RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM shops"))

    db.session.commit()
