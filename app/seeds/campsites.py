from app.models import db, Campsite, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime, time

def seed_posts():
    campsite1 = Campsite(
        user_id=1,
        title="Yosemite Pines Campground",
        address="20450 Old Highway 120, Groveland, CA 95321",
        hours_open=time.fromisoformat("08:00"),
        hours_close=time.fromisoformat("22:00"),
        phone_number="2099627690",
        image ="https://media-cdn.tripadvisor.com/media/photo-s/02/1d/3e/5e/views-from-our-campsite.jpg",
        prev_image ="https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_630,q_60,w_1200/v1527810352/campground-photos/x6ap1zx4xdz8uaxbnc9p.jpg"
    )

    campsite2 = Campsite(
        user_id=1,
        title="Rocky Mountain Campground",
        address="1001 County Road 67, Estes Park, CO 80517",
        hours_open=time.fromisoformat("07:00"),
        hours_close=time.fromisoformat("21:00"),
        phone_number="9705863341",
        image ="https://www.nps.gov/romo/planyourvisit/images/Timber-Creek-Campground-credit-NPS-photo-by-Debbie-Biddle.jpg",
        prev_image ="https://www.rockymountainnationalpark.com/images/xl/20220614-16-05-51-lg.jpg"
    )

    campsite3 = Campsite(
        user_id=1,
        title="Acadia Woods Campground",
        address="34 Bar Harbor Rd, Trenton, ME 04605",
        hours_open=time.fromisoformat("09:00"),
        hours_close=time.fromisoformat("20:00"),
        phone_number="2072883520",
        image ="https://www.nps.gov/romo/planyourvisit/images/Timber-Creek-Campground-credit-NPS-photo-by-Debbie-Biddle.jpg",
        prev_image ="https://www.rockymountainnationalpark.com/images/xl/20220614-16-05-51-lg.jpg"
    )

    campsite4 = Campsite(
        user_id=2,
        title="Grand Canyon Oasis Campground",
        address="1234 Desert View Dr, Grand Canyon, AZ 86023",
        hours_open=time.fromisoformat("08:30"),
        hours_close=time.fromisoformat("21:30"),
        phone_number="9286382611",
        image ="https://www.nps.gov/romo/planyourvisit/images/Timber-Creek-Campground-credit-NPS-photo-by-Debbie-Biddle.jpg",
        prev_image ="https://www.rockymountainnationalpark.com/images/xl/20220614-16-05-51-lg.jpg"
    )

    campsite5 = Campsite(
        user_id=2,
        title="Smoky Mountain Meadows Campground",
        address="755 East Alarka Rd, Bryson City, NC 28713",
        hours_open=time.fromisoformat("08:00"),
        hours_close=time.fromisoformat("22:00"),
        phone_number="8284883672",
        image ="https://www.nps.gov/romo/planyourvisit/images/Timber-Creek-Campground-credit-NPS-photo-by-Debbie-Biddle.jpg",
        prev_image ="https://www.rockymountainnationalpark.com/images/xl/20220614-16-05-51-lg.jpg"
    )

    campsite6 = Campsite(
        user_id=2,
        title="Zion Riverside Campground",
        address="137 Spry Canyon Rd, Springdale, UT 84767",
        hours_open=time.fromisoformat("07:30"),
        hours_close=time.fromisoformat("21:00"),
        phone_number="4357723237",
        image ="https://www.nps.gov/romo/planyourvisit/images/Timber-Creek-Campground-credit-NPS-photo-by-Debbie-Biddle.jpg",
        prev_image ="https://www.rockymountainnationalpark.com/images/xl/20220614-16-05-51-lg.jpg"
    )

    campsite7 = Campsite(
        user_id=2,
        title="Everglades Glades Campground",
        address="123 Everglades Way, Homestead, FL 33034",
        hours_open=time.fromisoformat("09:00"),
        hours_close=time.fromisoformat("20:00"),
        phone_number="3052427700",
        image ="https://www.nps.gov/romo/planyourvisit/images/Timber-Creek-Campground-credit-NPS-photo-by-Debbie-Biddle.jpg",
        prev_image ="https://www.rockymountainnationalpark.com/images/xl/20220614-16-05-51-lg.jpg"
    )

    campsite8 = Campsite(
        user_id=3,
        title="Olympic Peninsula Campground",
        address="456 Rainforest Rd, Forks, WA 98331",
        hours_open=time.fromisoformat("08:30"),
        hours_close=time.fromisoformat("22:00"),
        phone_number="3603746522",
        image ="https://www.nps.gov/romo/planyourvisit/images/Timber-Creek-Campground-credit-NPS-photo-by-Debbie-Biddle.jpg",
        prev_image ="https://www.rockymountainnationalpark.com/images/xl/20220614-16-05-51-lg.jpg"
    )

    campsite9 = Campsite(
        user_id=3,
        title="Yellowstone Riverfront Campground",
        address="789 Canyon Rd, Gardiner, MT 59030",
        hours_open=time.fromisoformat("07:00"),
        hours_close=time.fromisoformat("21:30"),
        phone_number="4068487414",
        image ="https://www.nps.gov/romo/planyourvisit/images/Timber-Creek-Campground-credit-NPS-photo-by-Debbie-Biddle.jpg",
        prev_image ="https://www.rockymountainnationalpark.com/images/xl/20220614-16-05-51-lg.jpg"
    )

    campsite10 = Campsite(
        user_id=3,
        title="Cape Cod Coastal Campground",
        address="567 Shoreline Dr, North Truro, MA 02652",
        hours_open=time.fromisoformat("08:00"),
        hours_close=time.fromisoformat("22:00"),
        phone_number="5084871847",
        image ="https://www.nps.gov/romo/planyourvisit/images/Timber-Creek-Campground-credit-NPS-photo-by-Debbie-Biddle.jpg",
        prev_image ="https://www.rockymountainnationalpark.com/images/xl/20220614-16-05-51-lg.jpg"
    )

    campsites = [campsite1, campsite2, campsite3, campsite4, campsite5, campsite6, campsite7, campsite8, campsite9, campsite10]
    add_campsites = [db.session.add(campsite) for campsite in campsites]


    db.session.commit()
    return campsites


def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.campsites RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM campsites"))

    db.session.commit()
