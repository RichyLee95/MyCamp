from .db import db, environment, SCHEMA, add_prefix_for_prod




class CampsiteLike(db.Model):
    __tablename__='campsitelikes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer,nullable=False, primary_key=True)
    user_id  = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    campsite_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("campsites.id")), nullable=False)

#Relationship

    users = db.relationship("User", back_populates="campsitelikes")
    campsites = db.relationship("Campsite", back_populates="campsitelikes")

    def to_dict(self):
        return {
            "id":self.id,
            "user_id":self.user_id,
            "campsite_id":self.campsite_id,
            "username": self.users.username
        }