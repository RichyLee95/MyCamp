from .db import db, environment, SCHEMA, add_prefix_for_prod

class Review(db.Model):
    __tablename__ = "reviews"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    campsite_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("campsites.id")), nullable=False)
    review_text = db.Column(db.Text, nullable=False)
    stars = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.String, nullable=False)

    #Relationships
    users = db.relationship("User", back_populates="reviews")
    campsites = db.relationship("Campsite", back_populates="reviews")


    #dict
    def to_dict(self):
        return {
            "id": self.id,
            "review_text": self.review_text,
            "stars": self.stars,
            "user_id": self.user_id,
            "campsite_id": self.campsite_id,
            "created_at": self.created_at,
            "username": self.users.username
    }