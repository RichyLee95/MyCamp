from flask import Blueprint, request, jsonify
from ..forms.review_form import ReviewForm
from ..models import Review, User, db
from flask_login import login_required, current_user
from .auth_routes import authenticate
from datetime import datetime
review_routes = Blueprint("reviews", __name__)

@review_routes.route("/all")
def all_campsites():

  all_reviews = Review.query.all()
  response_reviews = [review.to_dict() for review in all_reviews]
  return {"reviews": response_reviews }

@review_routes.route("/current")
@login_required
def current_reviews():
  all_reviews = Review.query.filter_by(user_id=current_user.id).all()
  response_reviews = [review.to_dict() for review in all_reviews]
  return {"reviews": response_reviews }

@review_routes.route("/<int:id>")
def get_review_by_id(id):
  single_review = Review.query.get(id)
  return {"review": single_review.to_dict()}

@review_routes.route('/<int:campsite_id>/new', methods=['POST'])
@login_required
def add_review(campsite_id):

    auth_response = authenticate()
    if 'errors' in auth_response:
        return auth_response

    data = request.get_json()

    if 'review_text' not in data:
        return {'error': 'Review text not provided'}


    existing_review = Review.query.filter_by(campsite_id=campsite_id, user_id=auth_response['id']).first()
    if existing_review:
        return {'error': 'You have already made a review on this campsite'}, 400

    formatted_date = datetime.now()
    datetime_formatted = formatted_date.strftime("%Y-%m-%d")

    review_text = data['review_text']
    stars = data['stars']
    review = Review(review_text=review_text,stars=stars, campsite_id=campsite_id, user_id=auth_response['id'], created_at = datetime_formatted)
    db.session.add(review)
    db.session.commit()

    return review.to_dict()

@review_routes.route('/<int:review_id>', methods=['PUT'])
@login_required
def update_review(review_id):
    review = Review.query.get_or_404(review_id)
    data = request.get_json()

    if 'review_text' not in data:
        return jsonify({'error': 'Review text not provided'}), 400

    auth_response = authenticate()
    if 'errors' in auth_response or auth_response['id'] != review.user_id:
        return jsonify({'error': 'You are not authorized to update this review'}), 401

    review_text = data['review_text']
    stars = data['stars']
    review.review_text = review_text
    review.stars = stars
    db.session.commit()

    return review.to_dict()

@review_routes.route('/<int:review_id>', methods=['DELETE'])
@login_required
def delete_review(review_id):
    review = Review.query.get_or_404(review_id)

    auth_response = authenticate()
    if 'errors' in auth_response or auth_response['id'] != review.user_id:
        return jsonify({'error': 'You are not authorized to delete this review'}), 401

    db.session.delete(review)
    db.session.commit()

    return {'message': 'Review successfully deleted'}, 200