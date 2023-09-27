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

  all_campsites = Campsite.query.all()
  response_campsites = [campsite.to_dict() for campsite in all_campsites]
  return {"campsites": response_campsites }

#gets all campsites of current user
@campsite_routes.route("/current")
@login_required
def current_campsites():

  all_campsites = Campsite.query.filter_by(user_id=current_user.id).all()
  response_campsites = [campsite.to_dict() for campsite in all_campsites]
  return {"campsites": response_campsites }

# get a specific campsite by id
@campsite_routes.route("/<int:id>")
def get_campsite_by_id(id):
  single_campsite = Campsite.query.get(id)
  return {"campsite": single_campsite.to_dict()}

@campsite_routes.route("/search")
def search_campsites():
  '''
  search all campsites
  '''
  # get the parameters from the routes
  keyword = request.args.get('keyword'); 
  print(keyword)
  if not keyword:    
        return "Please provide a keyword for search."

  search_campsites = Campsite.query.filter(
        (Campsite.title.ilike(f"%{keyword}%"))
    ).all()
  response_campsites = [campsite.to_dict() for campsite in search_campsites]
  print(response_campsites)
  return {"campsites": response_campsites }

# create a new campsite
@campsite_routes.route("/new", methods=["POST"])
@login_required
def add_campsite():
  form = CampsiteForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    image = form.data["image"]
    image.filename = get_unique_filename(image.filename)
    upload = upload_file_to_s3(image)

    prev_image = form.data["prev_image"]
    prev_image.filename = get_unique_filename(prev_image.filename)
    upload_prev = upload_file_to_s3(prev_image)

    if "url" not in upload:
      return {"error": "upload failed!"}
  

  
    new_campsite = Campsite(
      user_id = current_user.id,
      title = form.data["title"],
      address =form.data["address"],
      hours_open =form.data["hours_open"],
      hours_close =form.data["hours_close"],
      phone_number =form.data["phone_number"],
      image =upload["url"],
      prev_image =upload_prev["url"]
    )
    

    db.session.add(new_campsite)
    db.session.commit()
    return {"campsites": new_campsite.to_dict()}

  return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# update a new Campsite
@campsite_routes.route("/<int:id>/edit", methods=["PUT"])
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
    
    if form.data['image']:
      image=form.data["image"]
      image.filename=get_unique_filename(image.filename)
      upload = upload_file_to_s3(image)
      campsite_to_update.image=upload["url"]

    if form.data['prev_image']:
      prev_image=form.data["prev_image"]
      prev_image.filename=get_unique_filename(prev_image.filename)
      upload_prev = upload_file_to_s3(prev_image)
      campsite_to_update.prev_image=upload_prev["url"]

    campsite_to_update.user = current_user.id
    campsite_to_update.title = form.data["title"]
    campsite_to_update.hours_open = form.data["hours_open"]
    campsite_to_update.hours_close = form.data["hours_close"]
    campsite_to_update.phone_number = form.data["phone_number"]

    db.session.commit()
    return {"updatedCampsite": campsite_to_update.to_dict()}

  return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# delete a Campsite
@campsite_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_campsite(id):
  campsite_to_delete = Campsite.query.get(id)
  if campsite_to_delete.users.id != current_user.id:
    return jsonify({'error': 'You are not authorized to delete this campsite'}), 401

  remove_file_from_s3(campsite_to_delete.image)
  remove_file_from_s3(campsite_to_delete.prev_image)
  db.session.delete(campsite_to_delete)
  db.session.commit()
  return {"message": "Successfully deleted!"}
