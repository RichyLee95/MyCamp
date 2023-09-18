from flask import Blueprint, jsonify
from app.models import Like, db
from .auth_routes import authenticate
from flask_login import login_required,current_user
like_routes = Blueprint('likes', __name__)


@like_routes.route('/<int:review_id>',methods=['GET'])
def get_review_likes(review_id):
    '''
    get review's likes
    '''
    review_likes = Like.query.filter_by(review_id=review_id).all()
    response_review_likes=[like.to_dict() for like in review_likes]
    return {"likes":response_review_likes}

@like_routes.route('/users/<int:user_id>',methods=['GET'])
def get_specific_user_likes(user_id):
    '''
    get specific user likes
    '''
    user_likes = Like.query.filter_by(user_id=user_id).all()
    response_user_likes=[like.to_dict() for like in user_likes]
    return {"likes":response_user_likes}

@like_routes.route('/users/current',methods=['GET'])
@login_required
def get_user_likes():
    '''
    get users likes
    '''
    user_likes = Like.query.filter_by(user_id=current_user.id).all()
    response_user_likes=[like.to_dict() for like in user_likes]
    return {"likes":response_user_likes}

@like_routes.route('/<int:review_id>/likes',methods=['POST'])
@login_required
def add_like(review_id):
    '''
    add likes
    '''
    auth = authenticate()
    if 'errors' in auth:
        return auth

    already_liked = Like.query.filter_by(review_id=review_id, user_id=auth['id']).first()
    if already_liked:
        return {'error':'You already liked this review'}

    new_like = Like(user_id=auth['id'], review_id=review_id)
    db.session.add(new_like)
    db.session.commit()
    return new_like.to_dict()

@like_routes.route('/<int:likeid>',methods=['DELETE'])
@login_required
def remove_like(likeid):
    '''
    unlike
    '''
    like_delete = Like.query.get(likeid)


    if like_delete.users.id != current_user.id:
        return jsonify({'error': 'You are not authorized to unlike'}), 401

    db.session.delete(like_delete)
    db.session.commit()
    return {"message": "Like Successfully deleted"}


