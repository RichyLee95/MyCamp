from .db import db, environment, SCHEMA, add_prefix_for_prod
class Campsite(db.Model):
    __tablename__ = "campsites"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    hours_open = db.Column(db.Time(), nullable=False)
    hours_close = db.Column(db.Time(), nullable=False)
    phone_number = db.Column(db.String(11), nullable = False)
    image = db.Column(db.String(255), nullable=False)
    prev_image = db.Column(db.String(255), nullable=False)
#relationship attributes    
    users = db.relationship("User", back_populates="campsites")
    attractions= db.relationship("Attraction", back_populates="campsites")
    reviews = db.relationship("Review", back_populates="campsites")

    def to_dict(self):
        return {
            "id": self.id,
            "user": self.users.to_dict(),
            "title": self.title,
            "address": self.address,
            "hours_open": self.hours_open.strftime("%H:%M"),
            "hours_close": self.hours_close.strftime("%H:%M"),
            "phone_number": self.phone_number,
            "image": self.image,
            "prev_image":self.prev_image,
            "reviews":[review.to_dict() for review in self.reviews],
            "attractions":[attraction.to_dict() for attraction in self.attractions],
            "reviews_count": len(self.reviews),
        }
    
