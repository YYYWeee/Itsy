from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text

def seed_products():
    products = [
        # total 15 item
        {
        'title':'Wildflowers | Beeswax Candle | 100% Pure Beeswax & Floral Pure Essential Oils - Geranium, Lavender, Ylang Ylang, Clary Sage | Handmade',
        'price':28,
        'description':'The epitome of Spring: smells like a fresh bouquet of flowers. Fresh geranium and ylang ylang complemented by sweet lavender and clary sage. Enjoy this bespoke hand-crafted blend of the following 100% pure, sustainably-sourced plant-based essential oils',
        'shop_id':2,
        'img_1':'https://i.etsystatic.com/24951730/r/il/c9e9d0/3795149860/il_794xN.3795149860_bdc7.jpg',
        'img_2':'https://i.etsystatic.com/24951730/r/il/85eba5/3795149866/il_794xN.3795149866_elve.jpg',
        'img_3':'https://i.etsystatic.com/24951730/r/il/01c2a3/3795149862/il_794xN.3795149862_1jpg.jpg'
        },
        {
        'title':'Balsam Fir: Room & Linen Spray | All Natural Fabric Freshener, Bathroom and Shower Spray, Aromatherapy Room Refresher, Air Spritz, Mist',
        'price':18,
        'description':'Enliven and refresh your home with this all-natural room & linen spray. Ideal for refreshing the air, linens, upholstery, bedding, bathrooms, cars, clothing and carpeting.',
        'shop_id':2,
        'img_1':'https://i.etsystatic.com/24951730/r/il/7227ca/4125161587/il_794xN.4125161587_ke1t.jpg',
        'img_2':'https://i.etsystatic.com/24951730/r/il/0372fa/4077516046/il_794xN.4077516046_aufc.jpg',
        'img_3':'https://i.etsystatic.com/24951730/r/il/c2a0ec/4125160809/il_794xN.4125160809_hkw4.jpg'
        },
        {
        'title':'Balsam Fir Pure Beeswax Melts | Honey Comb & Bee Tarts for Wax Warmers - 100% Pure Organic Beeswax + Essential Oils | Non-Toxic | Pack of 8',
        'price':22,
        'description':'High-quality pure beeswax melts from local U.S. beekeepers. The wax tarts are made only with 2 ingredients: 100% pure beeswax and 100% pure essential oils to ensure a clean, non-toxic experience.',
        'shop_id':2,
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
        },
        {
        'title':'Montessori set 3in1, climbing triangle, arch, and ramp, montessori toys, climbing triangle set for playroom, playground, LOVE color',
        'price':95,
        'description':'PELTES® BIG Montessori transformable climbing Set is an ideal combination for children of different ages. You can use this set separately or all together.  Triangle (Length X Height X Width) - L: 73 cm, H: 57,5 cm, W: 71 cm',
        'shop_id':1,
        'img_1':'https://i.etsystatic.com/36215832/r/il/b8b0f6/4764637072/il_1140xN.4764637072_ih5x.jpg',
        'img_2':'https://i.etsystatic.com/36215832/r/il/82918f/4782587103/il_1140xN.4782587103_sxut.jpg',
        'img_3':'https://i.etsystatic.com/36215832/r/il/eec3c7/4734330156/il_1140xN.4734330156_pkmd.jpg'
        },
        {
        'title':'Personalised Musical Carousel Wooden - Custom Heirloom Music Box - Engraved Keepsake Gift - Baby Shower - New Mom - Baby Girl - Baby Boy',
        'price':58,
        'description':'Our beautiful musical carousels are the perfect keepsake for your little love. Made from beech wood and featuring a sweet tune when turned, our carousels are the perfect piece to treasure for years to come. Each carousel is 11cm wide x 18cm high, and can be lovingly engraved on the front in our timeless script and serif fonts. Choose from ballerinas or horse etched design.',
        'shop_id':1,
        'img_1':'https://i.etsystatic.com/11573738/r/il/b90087/4022552700/il_794xN.4022552700_k8sf.jpg',
        'img_2':'https://i.etsystatic.com/11573738/r/il/4da0cb/3670581028/il_794xN.3670581028_1hh2.jpg',
        'img_3':'https://i.etsystatic.com/11573738/r/il/057aea/3988797638/il_794xN.3988797638_d4y2.jpg'
        },
        {
        'title':'Activity table for kids, weaning table, toddler table with chairs, kids furniture, montessori set, 1st birthday gift, wooden set for child',
        'price':125,
        'description':'Animal figures and familiar shapes that allow to feel safe in the serious grown up environment. Fauna is a set created for meals, playtime and rest and is perfectly suited for child’s height. Rounded keeps the parent’s mind at ease and makes the furniture safe even for the youngest ones. The legs are made of solid wood yet remain light enough for independent use by the child.',
        'shop_id':1,
        'img_1':'https://i.etsystatic.com/22023724/r/il/f596a3/3983076254/il_794xN.3983076254_j2hg.jpg',
        'img_2':'https://i.etsystatic.com/22023724/r/il/1d9433/5026398181/il_794xN.5026398181_5rm3.jpg',
        'img_3':'https://i.etsystatic.com/22023724/r/il/30dfe6/5026390845/il_794xN.5026390845_rtgi.jpg'
        },
        {
        'title':'Big dollhouse, House shaped shelf, white Montessori shelves, toddler baby furniture, kids toys storage, kid bookshelf, house shape',
        'price':389,
        'description':'One big perfect place to store puzzles, books, and other great things for learning and playing! As it looks like a house, a kid can use it in different ways – even make it as a big doll house. The open type design stimulates the child to take the action by himself, encouraging independence and confidence.',
        'shop_id':1,
        'img_1':'https://i.etsystatic.com/22023724/r/il/42b3b7/3624360412/il_794xN.3624360412_6oae.jpg',
        'img_2':'https://i.etsystatic.com/22023724/r/il/7780e7/3671972969/il_794xN.3671972969_3bez.jpg',
        'img_3':'https://i.etsystatic.com/22023724/r/il/dc900a/4122850621/il_794xN.4122850621_s479.jpg'
        },
        {
        'title':'Montessori BIG Mirror with LONG Pull up Wooden bar, Gift For Kids',
        'price':52,
        'description':'Unbreakable BIG mirror with beech wood frame and the LONG pull up bar, which is ideal when infants first begin bearing their weight on their own until they are proficient at walking (usually around 6-10 months). For the mirror frame you can choose between our 10 colors. The bar is manufactured transparent lacquered=natural wood color, unless you are asking us specifically to color it.',
        'shop_id':1,
        'img_1':'https://i.etsystatic.com/21332534/r/il/a3acb8/4343925417/il_794xN.4343925417_a1mk.jpg',
        'img_2':'https://i.etsystatic.com/21332534/r/il/654563/4301741552/il_794xN.4301741552_smpv.jpg',
        'img_3':'https://i.etsystatic.com/21332534/r/il/087151/4301755264/il_794xN.4301755264_iz8a.jpg'
        },
        {
        'title':'Jellycat Personalized Sweater,jellycat clothes,teddy bear jumpers, baby toy clothes,knitted toy sweater',
        'price':29,
        'description':'The sweaters are knitted by hand. They are not ready-made or machine-made products.Personalized sweater for the jellycat bunny toy. The rabbit is not for sale. Only the personalized sweater is sold.The sweater can be knitted in the desired color and the desired name can be written.It is knitted according to the size of the jellycat rabbit toy.',
        'shop_id':1,
        'img_1':'https://i.etsystatic.com/26553019/r/il/fdf788/4039163994/il_794xN.4039163994_pzri.jpg',
        'img_2':'https://i.etsystatic.com/26553019/r/il/8e1ecc/3579615390/il_794xN.3579615390_j5k6.jpg',
        'img_3':'https://i.etsystatic.com/26553019/r/il/cc72d5/4644231153/il_794xN.4644231153_2znw.jpg'
        },
         {
        'title':'Montessori Floor standing Open Shelf for Kids, Bookshelf for Toy Storage, Toddler Wooden Organizer by Woodandhearts',
        'price':185,
        'description':'A floor-standing Open Shelf has 3 tiers for kids toys and books storage. At the sidewalls there are shapes cutouts, which help to handle and move easily the shelf unit. Based on the Montessori ideas, our furniture helps to teach little kiddos to organize their favorite toys and learning materials.',
        'shop_id':1,
        'img_1':'https://i.etsystatic.com/21222226/r/il/ad20a8/4791021619/il_794xN.4791021619_2rzc.jpg',
        'img_2':'https://i.etsystatic.com/21222226/r/il/b23dbb/4406913875/il_794xN.4406913875_tn39.jpg',
        'img_3':'https://i.etsystatic.com/21222226/r/il/0eeeab/4359528988/il_794xN.4359528988_b7fd.jpg'
        },
         {
        'title':'Toddler bed Indoor playground Wood bed Montessori Kids room decor Unique bed',
        'price':182,
        'description':'The top beams can hold up to 66 lbs in case the child wants to climb. The platform bed has no weight restrictions for the sleeping place. ✭ At this listing, you can buy a bed with a design like in photos. ✭ On your choice necessary color and size. ✭ The front rail is universal and can be fixed either on the left or on the right side of the bed frame.',
        'shop_id':1,
        'img_1':'https://i.etsystatic.com/23290600/r/il/22cb82/3171279241/il_794xN.3171279241_ca31.jpg',
        'img_2':'https://i.etsystatic.com/23290600/r/il/369bd9/3123551600/il_794xN.3123551600_9gmx.jpg',
        'img_3':'https://i.etsystatic.com/23290600/r/il/70f900/3123550410/il_794xN.3123550410_pn33.jpg'
        },
         {
        'title':'Camping Car pop-up tent PRETEND PLAY TENT',
        'price':45,
        'description':'kids playhouse in outdoor and indoor spaces - CREATIVE & REALISTIC DESIGN. Made with non-woven polyester fabric, this indoor and outdoor playset has added features that stimulate imagination and engagement. Its vibrant exterior attracts kids and encourages creative role plays on its rooftop opening, dual-side zippered doors, mesh fabric windows, and roll-up rear exit door. - INSTANT KID TENT FOR INDOORS & OUTDOORS. This indoor and outdoor playhouse is designed to have a quick setup and use structure to keep your little ones occupied for hours with our Camping Car pop up tents for kids. Expand imaginative play anywhere with this lightweight and portable kids pop up tent! - TALLER & MORE SPACIOUS INTERIOR. With a roomy interior that can fit MULTIPLE KIDS, this pop up toy for toddlers and up is a great addition to playrooms for story time, outdoor adventure, or kids tents for parties. Upgrade your ordinary small tents to our extraordinary Camping VEHICLE toy play tent for boys and girls!',
        'shop_id':1,
        'img_1':'https://i.etsystatic.com/23286272/r/il/36aa8b/4803475565/il_794xN.4803475565_6cxo.jpg',
        'img_2':'https://i.etsystatic.com/23286272/r/il/9e2c8d/4803475561/il_794xN.4803475561_g5bv.jpg',
        'img_3':'https://i.etsystatic.com/23286272/r/il/01853b/4755213606/il_794xN.4755213606_j1yt.jpg'
        },
         {
        'title':'Pine Wood Wall Lamp • Nursery Wooden Wall Hanging Lantern • Children\'s Room Light • Kids Night Lightings • Gift Ideas For Baby Boy & Girl',
        'price':56,
        'description':'Properly illuminating the child\'s bedroom is not easy, but if you also want the accessories to decorate you and help create a fun and educational space our wall light is perfect for you. Not only does it help you create a warmer and more welcoming environment, but it also brings that touch of fantasy that will turn the room into a space to let your imagination fly. This wall light is an LED wall lamp available in three designs, all of them made of MDF with a natural finish that we can exclusively customize and create our own version. Standard EU Plug',
        'shop_id':1,
        'img_1':'https://i.etsystatic.com/43073369/r/il/47b0cb/5117174944/il_794xN.5117174944_tokv.jpg',
        'img_2':'https://i.etsystatic.com/43073369/r/il/8a9219/5165408297/il_794xN.5165408297_jt72.jpg',
        'img_3':'https://i.etsystatic.com/43073369/r/il/95e983/5165407949/il_794xN.5165407949_91jo.jpg'
        },
         {
        'title':'Kids Transport Wall Decal | Cute Vehicle Wall Sticker | Nursery Boys Cars Wall Decal | Little Construction Wall Decals',
        'price':45,
        'description':'Kids Wallpaper | Hand Drawing Safari Animals Wall Mural | Cute Animals Wallpaper | Peel and Stick If your wall meets the criteria for peel and sticks technology, you don\'t need to be professional to install our products. Peel and stick technology is very easy to install. You can also reposition it without losing its adhesive properties.',
        'shop_id':1,
        'img_1':'https://i.etsystatic.com/25499622/r/il/bed6c3/4911342080/il_794xN.4911342080_4l8x.jpg',
        'img_2':'https://i.etsystatic.com/25499622/r/il/23ef74/4959605039/il_794xN.4959605039_2z27.jpg',
        'img_3':'https://i.etsystatic.com/25499622/r/il/c30988/4879372662/il_794xN.4879372662_7ace.jpg'
        },
         {
        'title':'Pastel Watercolor Dots / Removable Pastel Wall Polkadots / Dot Wall Stickers / Modern Nursery Decals / Neutral Nursery / Rainbow Wall Art',
        'price':7,
        'description':'**Buy 3 samples and get 1 free! Use code FREESAMPLE** (add 4 samples to cart for code to activate) This listing is for a pack of removable pastel polka dot wall decals. They feature a watercolor painted look and come in the colors: pink/red, orange, yellow, green, blue, purple. They are available in 3 sizes and quantities vary.',
        'shop_id':1,
        'img_1':'https://i.etsystatic.com/20797190/r/il/94f6de/3184570018/il_794xN.3184570018_tszf.jpg',
        'img_2':'https://i.etsystatic.com/20797190/r/il/b0df24/3190043928/il_794xN.3190043928_gfn8.jpg',
        'img_3':'https://i.etsystatic.com/20797190/r/il/527299/3232265151/il_794xN.3232265151_c1yk.jpg'
        },
         {
        'title':'Round Cotton Rug • Bedroom Carpet For Children • Kids Room Nursery Interior Decor • Playroom Toddler Rug • Gift Ideas For Baby Boy & Girl',
        'price':128,
        'description':'Rugs are the ideal decorative accessories to delimit areas and create warmer and more welcoming environments; for the children\'s room, a rug is a perfect complement as kids spend a lot of time playing on the floor. Perfect to isolate from the cold and noise. It has a modern children\'s design, made of soft cotton, ideal for the comfort of the little ones. Create new spaces without overloading the environment, a relaxed place with a perfectly harmonious composition.',
        'shop_id':1,
        'img_1':'https://i.etsystatic.com/43073369/r/il/f1b921/5171979809/il_794xN.5171979809_d24r.jpg',
        'img_2':'https://i.etsystatic.com/43073369/r/il/63d471/5123753998/il_794xN.5123753998_cuy5.jpg',
        'img_3':'https://i.etsystatic.com/43073369/r/il/a331bd/5171978401/il_794xN.5171978401_d9j2.jpg'
        },
         {
        'title':'Set Of 3 Rattan Hangers • Bamboo Nursery Decor • Toddler Dressing Room Organisation • Clothing Hangers For Kids • Gift For Baby Boy & Girl',
        'price':22,
        'description':'We offer a set of 3 kid\'s hangers with a natural and exotic design, handcrafted from rattan and bamboo, a material that gives it greater strength and durability, considering its craftsmanship, they may include small details or variations that make it a unique set. Its 3 original handmade patterns evoke the sun, moon, and rainbow, which undoubtedly give it an original personality and style. This is the perfect designer hanger for hanging the clothes of the little ones in the house and keeping the room tidy. Get it now!',
        'shop_id':1,
        'img_1':'https://i.etsystatic.com/43073369/r/il/16bd65/5104297973/il_794xN.5104297973_6qc1.jpg',
        'img_2':'https://i.etsystatic.com/43073369/r/il/d74757/5076528779/il_794xN.5076528779_6xh4.jpg',
        'img_3':'https://i.etsystatic.com/43073369/r/il/30f276/5104297925/il_794xN.5104297925_pzm0.jpg'
        },
         {
        'title':'Round Cotton Rug • Bedroom Carpet For Children • Kids Room Decor • Nursery Interior Design • Playroom Toddler Rug • Gift Idea For Boy & Girl',
        'price':136,
        'description':'Rugs are the ideal decorative accessories to delimit areas and create warmer and more welcoming environments; for the children\'s room, a rug is a perfect complement as kids spend a lot of time playing on the floor. Perfect to isolate from the cold and noise. Jungle Kids has a modern children\'s design, made of soft cotton, ideal for the comfort of the little ones. Accompany it with the Pouffe Jungle Kids, both from the same collection. Create new spaces without overloading the environment, a relaxed place with a perfectly harmonious composition.',
        'shop_id':1,
        'img_1':'https://i.etsystatic.com/43073369/r/il/e337a7/4997925398/il_794xN.4997925398_gwle.jpg',
        'img_2':'https://i.etsystatic.com/43073369/r/il/94b5fe/4997868380/il_794xN.4997868380_lu6f.jpg',
        'img_3':'https://i.etsystatic.com/43073369/r/il/4f8558/4997868424/il_794xN.4997868424_o6dn.jpg'
        },
         {
        'title':'Montessori Tell the Time Learning Clock - Wooden Clock with Shapes for Toddlers - Educational Puzzle Clock for Home Schooling',
        'price':34,
        'description':'This wooden clock is not only a toy but also a beautiful, timeless object that will survive generations. All toys are handmade in our workshop with love and special attention to the details and quality.',
        'shop_id':1,
        'img_1':'https://i.etsystatic.com/36724448/r/il/5f7029/4226286065/il_794xN.4226286065_tfja.jpg',
        'img_2':'https://i.etsystatic.com/36724448/r/il/03794b/4226286155/il_794xN.4226286155_e3us.jpg',
        'img_3':'https://i.etsystatic.com/36724448/r/il/422a7a/4226286073/il_794xN.4226286073_c3tn.jpg'
        },
         {
        'title':'Playroom Wall Art, Set of 3 Playroom Prints, Playroom Wall Decor, Playroom Art, Kids Wall Decor, Toddler Room Decor, Toddler Playroom',
        'price':14,
        'description':'Playroom Wall Art, Set of 3 Playroom Prints, Playroom Wall Decor, Playroom Art, Kids Wall Decor, Toddler Room Decor, Toddler Playroom, Digital Download. Download the files and print them yourself at home, print shop, or online printing service. I recommend at least 300 gr textured paper for high quality.',
        'shop_id':1,
        'img_1':'https://i.etsystatic.com/35780438/r/il/597cdc/4672796746/il_794xN.4672796746_csvf.jpg',
        'img_2':'https://i.etsystatic.com/35780438/r/il/c7a725/3982293088/il_794xN.3982293088_3yxn.jpg',
        'img_3':'https://i.etsystatic.com/35780438/r/il/098201/3982293272/il_794xN.3982293272_gsah.jpg'
        },
         {
        'title':'Toy hammock, soft toy storage, Nursery storage, Corner hammock, Macrame teddy hammock, teddy storage, Kids room decor, play room toy net',
        'price':39,
        'description':'Handmade macramé corner hammock. Perfect for soft toys! This item is made using only 100% cotton cord, and natural wooden rings.',
        'shop_id':1,
        'img_1':'https://i.etsystatic.com/22176816/r/il/d9ff77/3996991564/il_794xN.3996991564_ce2g.jpg',
        'img_2':'https://i.etsystatic.com/22176816/r/il/36951c/3996986522/il_794xN.3996986522_kbhr.jpg',
        'img_3':'https://i.etsystatic.com/22176816/r/il/f28196/4044634787/il_794xN.4044634787_ldrc.jpg'
        },
         {
        'title':'Lion Nursery rug Animal nursery rug round rug kid rug play rug plat mat kid room decor rug kids round rug for nursery',
        'price':53,
        'description':'Lion Nursery Rug, Animal Nursery Rug. Our Cartoon Round rug for Children, the perfect addition to any child\'s playroom or bedroom. This round play pad features a playful lion design that is sure to capture your child\'s imagination and make playtime more fun!',
        'shop_id':1,
        'img_1':'https://i.etsystatic.com/41838644/r/il/45f873/4988534576/il_794xN.4988534576_4gny.jpg',
        'img_2':'https://i.etsystatic.com/41838644/r/il/80ccca/4988534516/il_794xN.4988534516_9jar.jpg',
        'img_3':'https://i.etsystatic.com/41838644/r/il/3c5cd9/5036775535/il_794xN.5036775535_7j1w.jpg'
        },
         {
        'title':'Wood Play Kitchen',
        'price':479,
        'description':'Bespoke wooden play kitchen called ZOE is now available in a dusty green edition. Handcrafted kid\'s play kitchen includes oven, cupboard, hob, sink, water tap, and drawer.Inspire your little chef or baker with their own little kitchen. The surface has enough space for them to make a bake which can then be popped in the oven (with magnetic door) or set on the hob to cook. Utensils and equipment can then be packed away in the handy cupboard or placed on the rack above the sink.',
        'shop_id':1,
        'img_1':'https://i.etsystatic.com/13997563/r/il/75d58e/2419352600/il_794xN.2419352600_6ou4.jpg',
        'img_2':'https://i.etsystatic.com/13997563/r/il/ecc24f/2464626187/il_794xN.2464626187_rlw6.jpg',
        'img_3':'https://i.etsystatic.com/13997563/r/il/20df27/2464626791/il_794xN.2464626791_4aot.jpg'
        },
         {
        'title':'Plywood Play Fridge Dusty Pink - FREE SHIPPING',
        'price':319,
        'description':'This is a perfect play fridge for your little chef. A perfect place where to store your play food and play dishes. Young chefs will be able to store in the fridge all of their pretend play food, kitchen appliances, and other play items.',
        'shop_id':1,
        'img_1':'https://i.etsystatic.com/13997563/r/il/365a65/2417012664/il_794xN.2417012664_6bxt.jpg',
        'img_2':'https://i.etsystatic.com/13997563/r/il/cb3e82/2417013688/il_794xN.2417013688_bce2.jpg',
        'img_3':'https://i.etsystatic.com/13997563/r/il/9e9b5c/2464638179/il_794xN.2464638179_7yay.jpg'
        },
         {
        'title':'Wooden Play Washing Machine - with a turning mechanism',
        'price':303,
        'description':'The wooden washing machine is our first product from our new kitchen cabinet series product and will be handcrafted and exclusively available for the first 10 customers*(read down below for suspicious artificial numbers) We will also accept a small batch of orders within the total quantity.',
        'shop_id':1,
        'img_1':'https://i.etsystatic.com/13997563/r/il/db358e/3955780587/il_794xN.3955780587_nmra.jpg',
        'img_2':'https://i.etsystatic.com/13997563/r/il/3f4107/3908281440/il_794xN.3908281440_r374.jpg',
        'img_3':'https://i.etsystatic.com/13997563/r/il/4a9056/3908281400/il_794xN.3908281400_izk1.jpg'
        },
         {
        'title':'Plywood Play Fridge - Mustard',
        'price':271,
        'description':'This is a perfect play fridge for your little chef. A perfect place where to store your play food and play dishes. Young chefs will be able to store in the fridge all of their pretend play food, kitchen appliances, and other play items. This fridge is a realistic addition to any play kitchen.',
        'shop_id':1,
        'img_1':'https://i.etsystatic.com/13997563/r/il/058e2e/3444166185/il_794xN.3444166185_nxf1.jpg',
        'img_2':'https://i.etsystatic.com/13997563/r/il/078568/3444166187/il_794xN.3444166187_lb5e.jpg',
        'img_3':'https://i.etsystatic.com/13997563/r/il/d5819d/3396498024/il_794xN.3396498024_4bdf.jpg'
        },
         {
        'title':'Plywood Play Fridge Dusty Blue',
        'price':271,
        'description':'This is a perfect play fridge for your little chef. A perfect place where to store your play food and play dishes. Young chefs will be able to store in the fridge all of their pretend play food, kitchen appliances, and other play items. This fridge is a realistic addition to any play kitchen.',
        'shop_id':1,
        'img_1':'https://i.etsystatic.com/13997563/r/il/63db76/2345745856/il_794xN.2345745856_4jv3.jpg',
        'img_2':'https://i.etsystatic.com/13997563/r/il/b65fd7/2393335305/il_794xN.2393335305_p7mh.jpg',
        'img_3':'https://i.etsystatic.com/13997563/r/il/298f49/2345745494/il_794xN.2345745494_c9tb.jpg'
        },
         {
        'title':'Handcrafted Wooden Play Kitchen - Lilac',
        'price':479,
        'description':'Bespoke wooden play kitchen called ZOE is now available in a dusty green edition. Handcrafted kid\'s play kitchen includes oven, cupboard, hob, sink, water tap, and drawer.Inspire your little chef or baker with their own little kitchen. The surface has enough space for them to make a bake which can then be popped in the oven (with magnetic door) or set on the hob to cook. Utensils and equipment can then be packed away in the handy cupboard or placed on the rack above the sink.',
        'shop_id':1,
        'img_1':'https://i.etsystatic.com/13997563/r/il/b984c4/3108244002/il_794xN.3108244002_hfkz.jpg',
        'img_2':'https://i.etsystatic.com/13997563/r/il/b39bb9/3155951865/il_794xN.3155951865_6rhy.jpg',
        'img_3':'https://i.etsystatic.com/13997563/r/il/bfe441/3155953677/il_794xN.3155953677_21i8.jpg'
        },
         {
        'title':'Basket for Climbing Triangle set / Swedish Wall 2in1, Playroom Storage for Triangle/Climbing Wall 2in1, Toy Storage, Nursery Storage',
        'price':45,
        'description':'Our organizer is perfectly suited for our Climber (Swedish) wall as it is specially developed for it. The length is the perfect size and includes 4 compartments in total - three narrow sections and one wider section that’s wide enough to store a book or a coloring book. The narrow sections would be perfect for organizing pens, pencils, coloring materials, rulers, notepads, etc.',
        'shop_id':1,
        'img_1':'https://i.etsystatic.com/19880016/r/il/910a67/4052352774/il_794xN.4052352774_6exv.jpg',
        'img_2':'https://i.etsystatic.com/19880016/r/il/aca3e2/4076064723/il_794xN.4076064723_m61p.jpg',
        'img_3':'https://i.etsystatic.com/19880016/r/il/4b0a96/4028396114/il_794xN.4028396114_eqj1.jpg'
        },
         {
        'title':'Multi-functional Toy Box - Wooden Toy Organizer, Montessori furniture, Baby Nursery Storage Box, Toys storage furniture, Storage bench',
        'price':123,
        'description':'This wooden Toys Box will help you to organize children\'s space conveniently and compactly. It designed so that the child can fully use the furniture.',
        'shop_id':1,
        'img_1':'https://i.etsystatic.com/25672883/r/il/3dc744/3220954301/il_794xN.3220954301_lcyb.jpg',
        'img_2':'https://i.etsystatic.com/25672883/r/il/183273/3220954645/il_794xN.3220954645_oevu.jpg',
        'img_3':'https://i.etsystatic.com/25672883/r/il/b8b4e3/3173253094/il_794xN.3173253094_awoc.jpg'
        },
         {
        'title':'Wooden Toy Storage Labels Children\'s room Playroom Storage MULTI PACK',
        'price':5,
        'description':'Our Toy Storage Labels are a great way to organise your playroom. Each tag features a unique graphic for your child to easily identify where each toy needs to be stored. Your choice to have holes or no holes on your tags.',
        'shop_id':1,
        'img_1':'https://i.etsystatic.com/7867111/r/il/15ca75/3264247241/il_794xN.3264247241_4nhs.jpg',
        'img_2':'https://i.etsystatic.com/7867111/r/il/e5d20b/3048734383/il_794xN.3048734383_jf0v.jpg',
        'img_3':'https://i.etsystatic.com/7867111/r/il/8c5a8e/3048738963/il_794xN.3048738963_dge5.jpg'
        },
         {
        'title':'Handmade Rocking Chair • Kids Pine Wood Furniture • Bedroom For Toddler • Nursery Interior Design • Christmas Gift Ideas For Baby Boy & Girl',
        'price':295,
        'description':'Thanks to this rocking chair, in addition to complementing the decoration of the children\'s bedroom, you will create a warm and cozy environment where the little ones will have fun. The structure is made of pine wood, making it a sturdy and durable armchair. Its rocking legs, made of pine wood, have built-in non-slip felt plugs that protect and do not scratch the floor. Create a corner in the most Montessori style, where they will have everything at their fingertips.',
        'shop_id':1,
        'img_1':'https://i.etsystatic.com/43073369/r/il/1c7026/5028260448/il_794xN.5028260448_aw2z.jpg',
        'img_2':'https://i.etsystatic.com/43073369/r/il/51b50e/5028257350/il_794xN.5028257350_s6pc.jpg',
        'img_3':'https://i.etsystatic.com/43073369/r/il/7a508f/5028257078/il_794xN.5028257078_hq08.jpg'
        },
        {
        'title':'Boho Canopy fi 50 Fringe Vanilla| Hanging Canopy | Reading Nook Canopy | | cotton Bed Tent | Bed Canopy',
        'price':136,
        'description':'Boho canopy is such a magical element of reading nook. Level up your nursery room decor with hanging canopy. Playroom will be much more attractive with bed tent when your kids can play hide and seek. The canopy from the Boho collection is a very impressive decoration of a children\'s room. Made of cotton voile it looks great both above the bed and separately in the company of a play mat or junior .',
        'shop_id':1,
        'img_1':'https://i.etsystatic.com/35575503/r/il/6ffd6f/3927947301/il_794xN.3927947301_2uoz.jpg',
        'img_2':'https://i.etsystatic.com/35575503/r/il/51d4ae/3880460748/il_794xN.3880460748_od0x.jpg',
        'img_3':'https://i.etsystatic.com/35575503/r/il/f2ef61/3927946817/il_794xN.3927946817_n5t2.jpg'
        },
        {
        'title':'Set of 3 Beech Wood Wall Hooks • Cute Nursery Decoration • Toddler Room Coat Hangers • Moon Star Cloud Wall Decor • Gift Idea For Boy & Girl',
        'price':17,
        'description':'Complete your toddler\'s room decor with these wooden wall hooks. An accessory that will add cozy and functional character, which is needed in every kids\' room. Made of beech wood, the hook set consists of 3 hooks - 1 moon, 1 star, and 1 cloud. You can also purchase them separately. Bring simplicity, elegance, and a galaxy feel into the room. Exclusively for internal use. It comes with all the necessary components for assembly.',
        'shop_id':1,
        'img_1':'https://i.etsystatic.com/43073369/r/il/bae11c/5037096765/il_794xN.5037096765_8un3.jpg',
        'img_2':'https://i.etsystatic.com/43073369/r/il/542920/5037095333/il_794xN.5037095333_kca7.jpg',
        'img_3':'https://i.etsystatic.com/43073369/r/il/237fe2/5037095315/il_794xN.5037095315_qgc6.jpg'
        },
        {
        'title':'Copper Wire Wall LED Lightings • Moon & Star Wall Hanging Lantern • Children Room Decor • Kids Night Lightings • Gift Idea For Baby Boy Girl',
        'price':36,
        'description':'At Kids Connoisseur we want to help you decorate your home with our collection of decorative lighting accessories. You can choose the way that best suits your style and complete the decoration of any room or corner of your home with a warm and soft ambient light that will allow you to create a more pleasant and relaxing atmosphere. It is a set of geometric shapes made with copper wire and led that you can easily hang on the walls or doors of your home and give that personal touch that we love. You can also complete the decoration of one of the most endearing times of the year such as Christmas. A decorative accessory that is very easy to combine in any style. Requires 3 AA batteries not included.',
        'shop_id':1,
        'img_1':'https://i.etsystatic.com/43073369/r/il/059396/5170811327/il_794xN.5170811327_2535.jpg',
        'img_2':'https://i.etsystatic.com/43073369/r/il/517720/5170804181/il_794xN.5170804181_sx49.jpg',
        'img_3':'https://i.etsystatic.com/43073369/r/il/95e96a/5122575636/il_794xN.5122575636_g0v5.jpg'
        },
        {
        'title':'Hearts Kids Posters Wall Decor • Cute Nursery Interior • Children Bedroom Print • Toddler Room Art • Wall Hanging Gift For Baby Boy & Girl',
        'price':11,
        'description':'If you are looking for a poster to decorate the children\'s room in your home and at the same time create a colorful and sweet style, this decorative print has those qualities. It is made with a 180 g/m2 matte paper finish giving it a very special character. You can combine it both without a frame, simply with glass, or give it a more sophisticated look with a fine golden frame. Frame not included.',
        'shop_id':1,
        'img_1':'https://i.etsystatic.com/43073369/r/il/91d143/5062927032/il_794xN.5062927032_hthp.jpg',
        'img_2':'https://i.etsystatic.com/43073369/r/il/542ce0/5062953538/il_794xN.5062953538_jkts.jpg',
        'img_3':'https://i.etsystatic.com/43073369/r/il/b9ed71/5062952350/il_794xN.5062952350_ie6c.jpg'
        },
        {
        'title':'Toddler Room Cabinet Pulls • Handmade Ceramic Drawer Knobs • Nursery Porcelain Pullers • Ice Cream Cone Handles • Gift Idea For Boys & Girls',
        'price':11,
        'description':'Give a fun and original touch to the furniture or doors of the children\'s rooms. You can completely change the look of the bedrooms with some simple decorative accessories. Made of ceramic and representing beautiful ice cream cones, these ice cream ceramic pullers will turn boring furniture into completely renovated and modern design pieces. It does not matter if the furniture is new and what you are looking for is to customize it, or if, on the contrary, you are giving it a second chance, with this set you will bring a different and modern touch of color to the room.',
        'shop_id':1,
        'img_1':'https://i.etsystatic.com/43073369/r/il/1a588a/4999965740/il_794xN.4999965740_7vg1.jpg',
        'img_2':'https://i.etsystatic.com/43073369/r/il/0e9377/5048202927/il_794xN.5048202927_q3tl.jpg',
        'img_3':'https://i.etsystatic.com/43073369/r/il/a41629/4999965610/il_794xN.4999965610_nfxi.jpg'
        },
        {
        'title':'Personalized Baby Name Sign • Knitted Rope Wire Bedroom Decor • Handmade Nursery Wall Art • Custom Baby Shower Gift Ideas • Name Reveal Sign',
        'price':17,
        'description':'This dainty-knitted personalized name sign is made out of cotton yarn and copper wire. They can be hung on the wall, e.g. with small nails, double-sided tape, or transparent hooks, or put on a shelf, leaning against the wall/shelf/books. Trust me you\'re going to LOVE it!',
        'shop_id':1,
        'img_1':'https://i.etsystatic.com/43073369/r/il/3d90d8/5054822475/il_794xN.5054822475_91v3.jpg',
        'img_2':'https://i.etsystatic.com/43073369/r/il/cd95a2/5054822431/il_794xN.5054822431_b0n8.jpg',
        'img_3':'https://i.etsystatic.com/43073369/r/il/761857/5006591646/il_794xN.5006591646_e8jg.jpg'
        },
        {
        'title':'To the moon and back Kids Room Wooden Wall Quote',
        'price':29,
        'description':'Wall art measures approximately 9cm at the highest point, length will vary depending on how you choose to space your words.',
        'shop_id':1,
        'img_1':'https://i.etsystatic.com/29579680/r/il/8b6c10/4611512056/il_794xN.4611512056_e3mj.jpg',
        'img_2':'https://i.etsystatic.com/29579680/r/il/e0cc54/4659751433/il_794xN.4659751433_ardm.jpg',
        'img_3':'https://i.etsystatic.com/29579680/r/il/0c06c4/5229305131/il_794xN.5229305131_5vgw.jpg'
        },
        {
        'title':'Where the wild ones sleep wooden wall script art',
        'price':19,
        'description':'Our unique wall art pieces are perfect for your nursery or child\’s room. They turn any room into a magical fun space. Each item is made from 3mm thick natural plywood. They are very light weight and can be stuck to the wall with blu-tack or 3M strips. To be used for indoor use only.',
        'shop_id':1,
        'img_1':'https://i.etsystatic.com/7867111/r/il/d6cc18/2674366146/il_794xN.2674366146_nnye.jpg',
        'img_2':'https://i.etsystatic.com/7867111/r/il/b323f4/4417625472/il_794xN.4417625472_5vzs.jpg',
        'img_3':'https://i.etsystatic.com/7867111/r/il/8727d0/4417625508/il_794xN.4417625508_t9bv.jpg'
        },
        {
        'title':'Comfy Kids Bean Bag Chair Luxurious Back Support Bean Bag for Kids Pre- Filled Childrens Home Furniture',
        'price':127,
        'description':'We understand the importance of skin-friendly materials, which is why our sofa features a surface made of premium cotton and linen fabric. It\'s exceptionally soft and comfortable, providing a luxurious seating experience. Rest assured, this fabric is designed to resist pilling and deformation, maintaining its pristine appearance over time.',
        'shop_id':1,
        'img_1':'https://i.etsystatic.com/41838644/r/il/e32e91/5070250841/il_794xN.5070250841_lq97.jpg',
        'img_2':'https://i.etsystatic.com/41838644/r/il/98ad3e/5022021882/il_794xN.5022021882_ixi5.jpg',
        'img_3':'https://i.etsystatic.com/41838644/r/il/a7df82/5070251535/il_794xN.5070251535_3zs9.jpg'
        },
        {
        'title':'Wooden Stacking Pyramid - Circle Toy - Christmas Gifts For Toddlers',
        'price':20,
        'description':'The wooden pyramid and rainbow stacker will acquaint your baby with such concepts as shape and color, teach how to distribute objects according to certain criteria, help in the development of coordination and logical thinking. It also helps to develop motor skills. The toy is a good combination of entertainment and the Montessori educational method.',
        'shop_id':1,
        'img_1':'https://i.etsystatic.com/17305851/r/il/26c6ce/4985235977/il_794xN.4985235977_94ee.jpg',
        'img_2':'https://i.etsystatic.com/17305851/r/il/25bc73/4936974810/il_794xN.4936974810_a1vj.jpg',
        'img_3':'https://i.etsystatic.com/17305851/r/il/a52801/4936974216/il_794xN.4936974216_o11i.jpg'
        },
        {
        'title':'Wooden lacing toy with geometry shapes for Toddler, Christening gift, Kids educational toy, Montessori toys for 2 year old, Gifts for kids',
        'price':24,
        'description':'Get ready for a delightful adventure with this amazing lacing toy with geometry shapes! It\'s a timeless and classic playmate that will take your child on an exciting playtime journey while improving their fine motor skills and hand-eye coordination. But that\'s not all — its a perfect pastime for your baby to unleash their imagination and creativity too! Everything your little one needs is to weave the lace through the whimsical holes in the wooden elements and watch the magic happen!',
        'shop_id':1,
        'img_1':'https://i.etsystatic.com/19051317/r/il/f57648/5097874250/il_794xN.5097874250_lo6u.jpg',
        'img_2':'https://i.etsystatic.com/19051317/r/il/c0d3e5/5137844963/il_794xN.5137844963_c04q.jpg',
        'img_3':'https://i.etsystatic.com/19051317/r/il/102a09/5137165181/il_794xN.5137165181_6q0w.jpg'
        }
        ]

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
