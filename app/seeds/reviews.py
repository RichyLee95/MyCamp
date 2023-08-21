from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text


from datetime import datetime

formatted_date = datetime.now()
datetime_formatted = formatted_date.strftime("%Y-%m-%d")

def seed_reviews():

    review1 = Review(
        user_id=2,
        campsite_id=1,
        review_text="Beautiful campground with great amenities. The scenery is breathtaking.",
        stars=5,
        created_at=datetime_formatted
    )

    review2 = Review(
        user_id=3,
        campsite_id=1,
        review_text="Had a wonderful time here with my family. The staff was friendly and helpful.",
        stars=4,
        created_at=datetime_formatted
    )

    review3 = Review(
        user_id=1,
        campsite_id=1,
        review_text="The location is amazing, but the facilities could use some improvement.",
        stars=3,
        created_at=datetime_formatted
    )
    review4 = Review(
        user_id=4,
        campsite_id=2,
        review_text="The campground was a bit crowded during my stay, but the beauty of the surrounding nature made up for it.",
        stars=3,
        created_at=datetime_formatted
    )
    review5 = Review(
        user_id=5,
        campsite_id=2,
        review_text="The location is amazing, but the facilities could use some improvement.",
        stars=3,
        created_at=datetime_formatted
    )
    review6 = Review(
        user_id=6,
        campsite_id=3,
        review_text="Acadia Woods Campground is a tranquil oasis. I loved waking up to the sounds of birds in the morning.",
        stars=4,
        created_at=datetime_formatted
    )
    review7 = Review(
        user_id=7,
        campsite_id=3,
        review_text="The proximity to Acadia National Park makes this campground a prime choice. The fall colors were breathtaking.",
        stars=5,
        created_at=datetime_formatted
    )
    review8 = Review(
        user_id=8,
        campsite_id=5,
        review_text="Acadia Woods Campground provided the perfect escape from city life. Nature's beauty was all around.",
        stars=3,
        created_at=datetime_formatted
    )
    review9 = Review(
        user_id=9,
        campsite_id=6,
        review_text="The location is amazing, but the facilities could use some improvement.",
        stars=3,
        created_at=datetime_formatted
    )
    review10 = Review(
        user_id=4,
        campsite_id=5,
        review_text="Camping here was a dream come true. The peacefulness of the woods and the cozy campsite made my stay delightful.",
        stars=3,
        created_at=datetime_formatted
    )
    review11 = Review(
        user_id=7,
        campsite_id=7,
        review_text="I enjoyed every moment at this campground. The fresh air and stunning views made it a true paradise.",
        stars=4,
        created_at=datetime_formatted
    )
    all_reviews = [review1, review2, review3, review4, review5, review6, review7, review8, review9, review10, review11]
    add_reviews = [db.session.add(review) for review in all_reviews]

    db.session.commit()
    return all_reviews


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()