from flask import Blueprint, request, jsonify
from ..forms.campsite_form import CampsiteForm
from ..models import Campsite, User, db
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages
from .AWS_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3, ALLOWED_EXTENSIONS




campsite_routes = Blueprint("campsites", __name__)
#get all campsites
@campsite_routes.route("/all")
def all_campsites():

  all_campsites = Campsite.all()
  response_campsites = [campsite.to_dict() for campsite in all_campsites]
  return {"campsites": response_campsites }

#gets all campsites of current user
@campsite_routes.route("/current")
def current_campsites():

  all_campsites = Campsite.query.filter_by(user_id=current_user.id).all()
  response_campsites = [campsite.to_dict() for campsite in all_campsites]
  return {"campsites": response_campsites }

# get a specific campsite by id
@campsite_routes.route("/<int:id>")
def get_campsite_by_id(id):
  single_campsite = Campsite.query.get(id)
  return {"campsite": single_campsite.to_dict()}

# create a new campsite
@campsite_routes.route("", methods=["POST"])
@login_required
def add_campsite():
  form = CampsiteForm()
  form['csrf_token'].data = request.cookies['csrf_token']


  if form.validate_on_submit():
    new_campsite = Campsite(
      content = form.data["content"],
      users = current_user,
    )

    db.session.add(new_campsite)
    db.session.commit()
    return {"campsites": new_campsite.to_dict()}

  return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# update a new Campsite
@campsite_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_campsite(id):
  form = CampsiteForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    campsite_to_update = Campsite.query.get(id)

    if campsite_to_update.users.id != current_user.id:
      return jsonify({'error': 'You are not authorized to delete this campsite'}), 401

    if not campsite_to_update:
      return {"errors": f"campsite with id {id} does not exist"}
    campsite_to_update.user = current_user
    campsite_to_update.content = form.data["content"]

    db.session.commit()
    return {"updatedCampsite": campsite_to_update.to_dict()}

  return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@campsite_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_campsite(id):
  '''
  delete a campsite
  '''
  campsite_to_delete = Campsite.query.get(id)
  if campsite_to_delete.users.id != current_user.id:
    return jsonify({'error': 'You are not authorized to delete this campsite'}), 401

  db.session.delete(campsite_to_delete)
  db.session.commit()
  return {"message": "Successfully deleted!"}
