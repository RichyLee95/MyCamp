from .db import db, environment, SCHEMA, add_prefix_for_prod




class Like(db.Model):
    __tablename__='likes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer,nullable=False, primary_key=True)
    user_id  = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    review_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("reviews.id")), nullable=False)

#Relationship

    users = db.relationship("User", back_populates="likes")
    reviews = db.relationship("Review", back_populates="likes")

    def to_dict(self):
        return {
            "id":self.id,
            "user_id":self.user_id,
            "review_id":self.review_id,
            "username": self.users.username
        }
