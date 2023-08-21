from app.models import db, Campsite, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime, time

def seed_campsites():
    campsite1 = Campsite(
        user_id=1,
        title="Yosemite Pines Campground",
        address="20450 Old Highway 120, Groveland, CA 95321",
        hours_open=time.fromisoformat("08:00"),
        hours_close=time.fromisoformat("22:00"),
        phone_number="209-962-7690",
        image ="https://img.sunset02.com/sites/default/files/image/2016/09/main/yosemite-camping.jpg",
        prev_image ="https://www.travellers-autobarnrv.com/wp-content/uploads/2020/07/Yosemite-National-Park-El-Capitan.jpg"
    )

    campsite2 = Campsite(
        user_id=1,
        title="Rocky Mountain Campground",
        address="1001 County Road 67, Estes Park, CO 80517",
        hours_open=time.fromisoformat("07:00"),
        hours_close=time.fromisoformat("21:00"),
        phone_number="970-586-3341",
        image ="https://www.rockymountainnationalpark.com/images/xl/20220614-16-05-51-lg.jpg",
        prev_image ="https://www.nps.gov/romo/planyourvisit/images/Timber-Creek-Campground-credit-NPS-photo-by-Debbie-Biddle.jpg"
    )

    campsite3 = Campsite(
        user_id=1,
        title="Acadia Woods Campground",
        address="34 Bar Harbor Rd, Trenton, ME 04605",
        hours_open=time.fromisoformat("09:00"),
        hours_close=time.fromisoformat("20:00"),
        phone_number="207-288-3520",
        image ="https://hipcamp-res.cloudinary.com/image/upload/c_limit,f_auto,h_1200,q_60,w_1920/v1433544951/rsasqyslrsfbv8kiybfj.jpg",
        prev_image ="https://www.technomadia.com/wp-content/uploads/2016/09/IMG_4666.jpg"
    )

    campsite4 = Campsite(
        user_id=2,
        title="Grand Canyon Oasis Campground",
        address="1234 Desert View Dr, Grand Canyon, AZ 86023",
        hours_open=time.fromisoformat("08:30"),
        hours_close=time.fromisoformat("21:30"),
        phone_number="928-638-2611",
        image ="https://roadtrippers.com/wp-content/uploads/2021/11/shutterstock_113393179-scaled.jpg",
        prev_image ="https://www.roverpass.com/system/pictures/images/000/077/634/full/grand-canyon-oasis-rv-resort-&-glamping-flagstaff-az-0.jpg?1659973343"
    )

    campsite5 = Campsite(
        user_id=2,
        title="Smoky Mountain Meadows Campground",
        address="755 East Alarka Rd, Bryson City, NC 28713",
        hours_open=time.fromisoformat("08:00"),
        hours_close=time.fromisoformat("22:00"),
        phone_number="828-488-3672",
        image ="https://images.squarespace-cdn.com/content/v1/5f109744efcb382e260487dd/1630588460348-ODW51I5TRGUGXJBMJPXE/noc.jpg",
        prev_image ="https://www.roverpass.com/system/pictures/images/000/061/878/full/smoky-mountain-meadows-campground-bryson-city-nc-6.jpeg?1597794085"
    )

    campsite6 = Campsite(
        user_id=2,
        title="Zion Riverside Campground",
        address="137 Spry Canyon Rd, Springdale, UT 84767",
        hours_open=time.fromisoformat("07:30"),
        hours_close=time.fromisoformat("21:00"),
        phone_number="435-772-3237",
        image ="https://hipcamp-res.cloudinary.com/image/upload/c_limit,f_auto,h_1200,q_60,w_1920/v1503428256/campground-photos/rfhsvvgxyxgad0hwztpo.jpg",
        prev_image ="https://photos.thedyrt.com/photo/23909/photo/zion-river-resort_1d6e1b2c1a337222f6fcc708543aaa29.JPG"
    )

    campsite7 = Campsite(
        user_id=2,
        title="Everglades Glades Campground",
        address="123 Everglades Way, Homestead, FL 33034",
        hours_open=time.fromisoformat("09:00"),
        hours_close=time.fromisoformat("20:00"),
        phone_number="305-242-7700",
        image ="https://cdn.outsideonline.com/wp-content/uploads/2019/04/15/everglades-national-park_h.jpg?width=1200",
        prev_image ="https://images.squarespace-cdn.com/content/603439257f4b9a6cf2cf0ec7/1615930706754-PVNJKTQMOUTJY8P3QKOF/everglades-camping-guide.jpg?content-type=image%2Fjpeg"
    )

    campsite8 = Campsite(
        user_id=3,
        title="Olympic Peninsula Campground",
        address="456 Rainforest Rd, Forks, WA 98331",
        hours_open=time.fromisoformat("08:30"),
        hours_close=time.fromisoformat("22:00"),
        phone_number="360-374-6522",
        image ="https://www.rei.com/adventures/assets/adventures/images/trip/core/northamerica/oly_hero",
        prev_image ="https://www.outdoorproject.com/sites/default/files/styles/hero_image_desktop/public/features/camping-0619.jpg?itok=c7v-hZFA"
    )

    campsite9 = Campsite(
        user_id=3,
        title="Yellowstone Riverfront Campground",
        address="789 Canyon Rd, Gardiner, MT 59030",
        hours_open=time.fromisoformat("07:00"),
        hours_close=time.fromisoformat("21:30"),
        phone_number="406-848-7414",
        image ="https://enjoyyourparks.com/wp-content/uploads/2022/02/MADISON-IMAGE-1.jpg",
        prev_image ="https://gdrv4life.granddesignrv.com/sites/default/files/Reflection-KarlaMorris2.jpeg"
    )

    campsite10 = Campsite(
        user_id=3,
        title="Cape Cod Coastal Campground",
        address="567 Shoreline Dr, North Truro, MA 02652",
        hours_open=time.fromisoformat("08:00"),
        hours_close=time.fromisoformat("22:00"),
        phone_number="508-487-1847",
        image ="https://hipcamp-res.cloudinary.com/images/c_fill,f_auto,g_auto,h_630,q_60,w_1200/v1654007022/campground-photos/uypnuhmdwy8yup603inv/cape-cod-horse-farm-1-cape-cod-horse-farm-campsites-cape-cod.jpg",
        prev_image ="https://www.ourglobetrotters.com/wp-content/uploads/2022/08/Destinations-USA-Beach-Camping-East-Coast.jpg"
    )

    campsites = [campsite1, campsite2, campsite3, campsite4, campsite5, campsite6, campsite7, campsite8, campsite9, campsite10]
    add_campsites = [db.session.add(campsite) for campsite in campsites]


    db.session.commit()
    return campsites


def undo_campsites():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.campsites RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM campsites"))

    db.session.commit()
