from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text

def seed_products():
    products = [
        # total 15 item
        {
        'title':'Wildflowers | Beeswax Candle | 100% Pure Beeswax & Floral Pure Essential Oils - Geranium, Lavender, Ylang Ylang, Clary Sage | Handmade',
        'price':28,
        'description':'The epitome of Spring: smells like a fresh bouquet of flowers. Fresh geranium and ylang ylang complemented by sweet lavender and clary sage. Enjoy this bespoke hand-crafted blend of the following 100% pure, sustainably-sourced plant-based essential oils',
        'shop_id':1,
        'img_1':'https://i.etsystatic.com/24951730/r/il/c9e9d0/3795149860/il_794xN.3795149860_bdc7.jpg',
        'img_2':'https://i.etsystatic.com/24951730/r/il/85eba5/3795149866/il_794xN.3795149866_elve.jpg',
        'img_3':'https://i.etsystatic.com/24951730/r/il/01c2a3/3795149862/il_794xN.3795149862_1jpg.jpg'
        },
        {
        'title':'Balsam Fir: Room & Linen Spray | All Natural Fabric Freshener, Bathroom and Shower Spray, Aromatherapy Room Refresher, Air Spritz, Mist',
        'price':18,
        'description':'Enliven and refresh your home with this all-natural room & linen spray. Ideal for refreshing the air, linens, upholstery, bedding, bathrooms, cars, clothing and carpeting.',
        'shop_id':1,
        'img_1':'https://i.etsystatic.com/24951730/r/il/7227ca/4125161587/il_794xN.4125161587_ke1t.jpg',
        'img_2':'https://i.etsystatic.com/24951730/r/il/0372fa/4077516046/il_794xN.4077516046_aufc.jpg',
        'img_3':'https://i.etsystatic.com/24951730/r/il/c2a0ec/4125160809/il_794xN.4125160809_hkw4.jpg'
        },
        {
        'title':'Balsam Fir Pure Beeswax Melts | Honey Comb & Bee Tarts for Wax Warmers - 100% Pure Organic Beeswax + Essential Oils | Non-Toxic | Pack of 8',
        'price':22,
        'description':'High-quality pure beeswax melts from local U.S. beekeepers. The wax tarts are made only with 2 ingredients: 100% pure beeswax and 100% pure essential oils to ensure a clean, non-toxic experience.',
        'shop_id':1,
        'img_1':'https://i.etsystatic.com/24951730/r/il/1ef516/4077555132/il_794xN.4077555132_eeit.jpg',
        'img_2':'https://i.etsystatic.com/24951730/r/il/509540/4077555128/il_794xN.4077555128_koaj.jpg',
        'img_3':'https://i.etsystatic.com/24951730/r/il/5435f0/3708546908/il_794xN.3708546908_3l48.jpg'
        },
        {
        'title':'Modern Cloud LED Pendant Light,Living Children Room Light Decor,Indoor Nordic Chandelier,Housewarming Gift Hanging,New Design Light Fixture',
        'price':76,
        'description':'Modern Cloud LED Pendant Light,Living Children Room Light Decor,Indoor Nordic Chandelier,Housewarming Gift Hanging,New Design Light Fixture',
        'shop_id':2,
        'img_1':'https://i.etsystatic.com/37886388/r/il/ddc08d/5103034211/il_794xN.5103034211_gohq.jpg',
        'img_2':'https://i.etsystatic.com/37886388/r/il/9936ac/5054803734/il_794xN.5054803734_2oi7.jpg',
        'img_3':'https://i.etsystatic.com/37886388/r/il/404d0b/5054803742/il_794xN.5054803742_21qs.jpg'
        },
        {
        'title':'Modern Colorful LED Wall Lamp,Nordic Bedside Sconce,New Design Creative Night Light,Living Room Decorative Wall Light,Housewarming Gifts',
        'price':54,
        'description':'Modern Colorful LED Wall Lamp,Nordic Bedside Sconce,New Design Creative Night Light,Living Room Decorative Wall Light,Housewarming Gift',
        'shop_id':2,
        'img_1':'https://i.etsystatic.com/37886388/r/il/bfa7b4/5098278611/il_794xN.5098278611_py59.jpg',
        'img_2':'https://i.etsystatic.com/37886388/r/il/56c531/5082759205/il_794xN.5082759205_58ta.jpg',
        'img_3':'https://i.etsystatic.com/37886388/r/il/b40e53/5050049556/il_794xN.5050049556_kcol.jpg'
        },
        {
        'title':'Nordic Handmade Fabric Hanging Lamp,New Design Fabric Chandelier,Minimalist Lightning Fixture,Living Room Home Decor,Modern Ceiling Light',
        'price':80,
        'description':'Nordic Wabi Sabi Fabric Hanging Lamp,Modern Fabric Chandelier,Minimalist Lightning Fixture,Living Room Home Decor Gift,Modern Ceiling Light',
        'shop_id':2,
        'img_1':'https://i.etsystatic.com/37886388/r/il/79eac4/4984213500/il_794xN.4984213500_cvim.jpg',
        'img_2':'https://i.etsystatic.com/37886388/r/il/6bcc07/4984212152/il_794xN.4984212152_d7xg.jpg',
        'img_3':'https://i.etsystatic.com/37886388/r/il/6aa689/5032457973/il_794xN.5032457973_dur8.jpg'
        },
        {
        'title':'3 Piece Wall Art, Nature Wall Art Poster Print, Botanical Prints Set of 3 Wall Art, Green Wall Art Nature Prints, Tropical Wall Art',
        'price':250,
        'description':'Items are made to order and typically ship within 4-5 business days. If you would like to make any changes to your order, please contact me within 4 hours of ordering. After 4 hours changes cannot be made.',
        'shop_id':3,
        'img_1':'https://i.etsystatic.com/21701052/r/il/5233e5/4891960001/il_794xN.4891960001_jxaf.jpg',
        'img_2':'https://i.etsystatic.com/21701052/r/il/05b788/4843686486/il_794xN.4843686486_ec64.jpg',
        'img_3':'https://i.etsystatic.com/21701052/r/il/79c2ac/4891948427/il_794xN.4891948427_pxwd.jpg'
        },
        {
        'title':'Boho Wall Art Gallery Wall Set, Mid Century Modern Prints, Bohemian Decor Wall Art Prints, Printable Wall Art, Boho Home Decor Neutral',
        'price':330,
        'description':'** Colors may vary slightly due to different monitor settings and it may appear differently in print than on screen. The final print quality will depend on the printer and paper used.',
        'shop_id':3,
        'img_1':'https://i.etsystatic.com/21701052/r/il/51e17d/2736541859/il_794xN.2736541859_9gju.jpg',
        'img_2':'https://i.etsystatic.com/21701052/r/il/d799cf/2688855500/il_794xN.2688855500_mrjg.jpg',
        'img_3':'https://i.etsystatic.com/21701052/r/il/41e0ed/2736537741/il_794xN.2736537741_tut0.jpg'
        },
        {
        'title':'Abstract Landscape 3 Piece Wall Art, Mountain Wall Art Gallery Wall Set, Watercolor Mountain Print, Landscape Print Set, Modern Home Decor',
        'price':130,
        'description':'These hair claws are very unique, sturdy, high quality, and trendy great for daily use or as a gift. Stronghold hair claw, no-slip grip claw, vibrant color hair claw, effortless styling for everyday look or outing',
        'shop_id':3,
        'img_1':'https://i.etsystatic.com/21701052/r/il/6b0475/4785728846/il_794xN.4785728846_o594.jpg',
        'img_2':'https://i.etsystatic.com/21701052/r/il/f026bd/4785755702/il_794xN.4785755702_gbu4.jpg',
        'img_3':'https://i.etsystatic.com/21701052/r/il/c8550d/4834021371/il_794xN.4834021371_k39k.jpg'
        },
        {
        'title':'Opal Inlay Huggie Earrings by Caitlyn Minimalist • Fire Opal Hoop Earrings • Dainty Blue & Green Gemstone Earrings • Gift for Her • ER212',
        'price':22,
        'description':'Stack our Opal Inlay Hoops with your everyday jewelry pieces to add a sparkle of color and uniqueness. With our three different opal colors, these huggie hoop earrings are a great gift for someone just as special and one of a kind.',
        'shop_id':4,
        'img_1':'https://i.etsystatic.com/10204022/r/il/656c6e/4601143021/il_794xN.4601143021_3nrr.jpg',
        'img_2':'https://i.etsystatic.com/10204022/r/il/7cf553/4766895233/il_794xN.4766895233_ochy.jpg',
        'img_3':'https://i.etsystatic.com/10204022/r/il/77d7a4/4536147838/il_794xN.4536147838_jw22.jpg'
        },
        {
        'title':'Dainty Mama Necklace by Caitlyn Minimalist in Sterling Silver, Gold & Rose Gold • Mom Necklace • Perfect Gift for Mom • NR014',
        'price':25,
        'description':'The dainty Mama Script Necklace features the word "mama" in lowercase custom script font. It sits beautifully on the neckline and looks stunning, whether worn alone or layered.',
        'shop_id':4,
        'img_1':'https://i.etsystatic.com/10204022/r/il/cc2717/2565112188/il_794xN.2565112188_agp4.jpg',
        'img_2':'https://i.etsystatic.com/10204022/r/il/2e4f30/2612751841/il_794xN.2612751841_j0ik.jpg',
        'img_3':'https://i.etsystatic.com/10204022/r/il/b3935f/2754530389/il_794xN.2754530389_13s7.jpg'
        },
        {
        'title':'Pearl Beaded Ring by Caitlyn Minimalist • Minimalist Pearl Ring • A Must Have for Your Minimalist Style • Perfect Gift for Her • RR023',
        'price':18,
        'description':'Next to diamonds, pearls are also forever. A timeless piece, the Pearl Beaded Ring is a classy, minimalist accessory for your wardrobe. Delicate oval freshwater pearls lay adjacent creating a ring tied together with a golden bead for a touch of regality.',
        'shop_id':4,
        'img_1':'https://i.etsystatic.com/10204022/r/il/8bb8fa/3126258271/il_794xN.3126258271_dagm.jpg',
        'img_2':'https://i.etsystatic.com/10204022/r/il/5424da/3078514824/il_794xN.3078514824_pywh.jpg',
        'img_3':'https://i.etsystatic.com/10204022/r/il/028a0b/3078514810/il_794xN.3078514810_ph1z.jpg'
        },
        {
        'title':'Kids Activity Table and Chair, Montessori Furniture for Toddler, Wooden Table with Drawer, Paper Holder, Activity Desk Chair, Baby Furniture',
        'price':169,
        'description':'Are you looking for a functional and eco-friendly furniture set for your toddler? Our Wooden Desk and Chair Set is thoughtfully designed with children in mind, providing a comfortable and engaging learning environment. Crafted from high-quality, eco-friendly wood, this set ensures durability and longevity, making it a lasting investment for your child growth. This children-sized furniture set is perfect for toddlers, providing them with their own dedicated space to engage in various activities. The desk features a convenient drawer and paper holder, promoting organization and creativity during playtime. With the set delivered in a disassembled form, easy-to-follow instructions are included, ensuring a hassle-free assembly process.',
        'shop_id':5,
        'img_1':'https://i.etsystatic.com/22537583/r/il/f5757b/5166646418/il_794xN.5166646418_b9wi.jpg',
        'img_2':'https://i.etsystatic.com/22537583/r/il/eeb302/5068441888/il_794xN.5068441888_q732.jpg',
        'img_3':'https://i.etsystatic.com/22537583/r/il/7f3439/5068168936/il_794xN.5068168936_79zd.jpg'
        },
        {
        'title':'Montessori Toy Shelf, Toy Storage, Kids Furniture and Decor, Wood Open Shelf for Kids, Playroom Shelf for Nursery, Toddler Room Decor',
        'price':149,
        'description':'To make a nursery interior a complete haven for childhood, add a Montessori toy shelf to it.One of the best things about our Montessori wooden toy shelf is that it allows kids to develop active engagement with objects displayed on it. Toys, books, clothes, pencils, etc. – whatever you choose our shelf for, the little ones will have freedom of choice (greater independence!). This, in turn, will let them discover great functions of the shelf, as well as promote analytical thinking, fine motor skills, and coordination.',
        'shop_id':5,
        'img_1':'https://i.etsystatic.com/22537583/r/il/c91a6f/5167059178/il_794xN.5167059178_kwru.jpg',
        'img_2':'https://i.etsystatic.com/22537583/r/il/d93806/4369929310/il_794xN.4369929310_e7e6.jpg',
        'img_3':'https://i.etsystatic.com/22537583/r/il/2ef8d7/4914996173/il_794xN.4914996173_gvzc.jpg'
        },
        {
        'title':'Mountain Nursery Decor, Wooden Wall Hanger, Kids Bedroom Decor, Stylish and Functional Wall Hooks for Clothes and Accessories, Playroom Art',
        'price':45,
        'description':'Looking for a stylish and functional way to hang your towels, blankets, baby clothes, and other accessories? Look no further than this beautiful Wall Hanger for Nursery! Handcrafted with care, this hanger features a charming design that\'s sure to add a touch of whimsy to your little one\'s space.',
        'shop_id':5,
        'img_1':'https://i.etsystatic.com/22537583/r/il/1a6b02/5024575647/il_794xN.5024575647_gn5x.jpg',
        'img_2':'https://i.etsystatic.com/22537583/r/il/1b94c2/5024346943/il_794xN.5024346943_ox9m.jpg',
        'img_3':'https://i.etsystatic.com/22537583/r/il/40f75b/4975825392/il_794xN.4975825392_toho.jpg'
        }]

    seed_products = [db.session.add(Product(**product))
                      for product in products]
    db.session.commit()




def undo_products():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
