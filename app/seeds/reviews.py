from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text


from datetime import datetime

formatted_date = datetime.now()
datetime_formatted = formatted_date.strftime("%Y-%m-%d %H:%M:%S")

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
    all_reviews = [review1, review2, review3]
    add_reviews = [db.session.add(review) for review in all_reviews]

    db.session.commit()
    return all_reviews


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()