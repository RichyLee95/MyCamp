from .db import db, environment, SCHEMA, add_prefix_for_prod

class Attraction(db.Model):
    __tablename__ = "attractions"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    campsite_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("campsites.id")), nullable=False)
    title = db.Column(db.String, nullable=False)
    image = db.Column(db.String(255), nullable=False)

    #Relationships
    campsites = db.relationship("Campsite", back_populates="attractions")


    #dict
    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "image":self.image,
            "campsite_id": self.campsite_id,
    }