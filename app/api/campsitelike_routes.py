from flask import Blueprint, jsonify
from app.models import CampsiteLike, db
from .auth_routes import authenticate
from flask_login import login_required,current_user
campsitelike_routes = Blueprint('campsitelikes', __name__)

@campsitelike_routes.route('/<int:campsite_id>',methods=['GET'])
def get_campsite_likes(campsite_id):
    '''
    get campsite's likes
    '''
    campsite_likes = CampsiteLike.query.filter_by(campsite_id=campsite_id).all()
    response_campsite_likes=[campsitelike.to_dict() for campsitelike in campsite_likes]
    return {"campsitelikes":response_campsite_likes}

@campsitelike_routes.route('/users/<int:user_id>',methods=['GET'])
def get_specific_user_likes(user_id):
    '''
    get specific user likes
    '''
    user_campsitelikes = CampsiteLike.query.filter_by(user_id=user_id).all()
    response_user_campsitelikes=[campsitelike.to_dict() for campsitelike in user_campsitelikes]
    return {"campsitelikes":response_user_campsitelikes}

@campsitelike_routes.route('/users/current',methods=['GET'])
@login_required
def get_user_campsitelikes():
    '''
    get users campsitelikes
    '''
    user_campsitelikes = CampsiteLike.query.filter_by(user_id=current_user.id).all()
    response_user_campsitelikes=[campsitelike.to_dict() for campsitelike in user_campsitelikes]
    return {"campsitelikes":response_user_campsitelikes}

@campsitelike_routes.route('/<int:campsite_id>/campsitelikes',methods=['POST'])
@login_required
def add_like(campsite_id):
    '''
    add likes
    '''
    auth = authenticate()
    if 'errors' in auth:
        return auth

    already_liked = CampsiteLike.query.filter_by(campsite_id=campsite_id, user_id=auth['id']).first()
    if already_liked:
        return {'error':'You already liked this campsite'}

    new_campsitelike = CampsiteLike(user_id=auth['id'], campsite_id=campsite_id)
    db.session.add(new_campsitelike)
    db.session.commit()
    return new_campsitelike.to_dict()

@campsitelike_routes.route('/is-liked/<int:campsite_id>', methods=['GET'])
@login_required
def is_liked(campsite_id):
    '''Check if the campsite is liked by the current user'''
    is_liked = CampsiteLike.query.filter_by(user_id=current_user.id, campsite_id=campsite_id).first()
    # is_liked_response = [campsitelike.to.dict() for campsitelike in is_liked]
    print('ERRORRR BIG DICKUS',is_liked)
    return jsonify({"is_liked": bool(is_liked)})
    
@campsitelike_routes.route('/<int:campsite_id>',methods=['DELETE'])
@login_required
def remove_campsitelike(campsite_id):
    '''
    unlike
    '''
    like = CampsiteLike.query.filter_by(user_id=current_user.id, campsite_id=campsite_id).first()

    if not like:
        likes = CampsiteLike.query.filter_by(user_id=current_user.id).all()
        liked_campsites = [like.campsites.to_dict() for like in likes]
        return jsonify(message="Like not found!"), 404
    db.session.delete(like)
    db.session.commit()
    likes = CampsiteLike.query.filter_by(user_id=current_user.id).all()
    liked_campsites = [like.campsites.to_dict() for like in likes]
    return jsonify(likes=liked_campsites, message="Removed like"), 200    
    # if campsitelike_delete.users.id != current_user.id:
    #     return jsonify({'error': 'You are not authorized to unlike'}), 401

    # db.session.delete(campsitelike_delete)
    # db.session.commit()
    # return {"message": "Like Successfully deleted"}