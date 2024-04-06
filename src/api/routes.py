"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=["POST"])
def create_user():
    name = request.json.get("name",None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if email == None or password == None or name == None:
        return jsonify({"msg": "Insufficient data to create user in database"}), 400
    
    new_user = User(name=name, email=email, password=password)

    if new_user == None:
        return jsonify({"msg": "An error occured while trying to create user in database"}), 400
    
    existing_email = User.query.filter_by(email=email).one_or_none()

    if existing_email:
        return jsonify({"msg": "The email address needs to be unique"}), 400

    db.session.add(new_user) # add new favorite object to the Favorite table
    db.session.commit()  # Similar to the Git commit, what this does is save all the changes you have made
    return jsonify({"new_user_created": new_user.serialize()}), 200

@api.route('/login', methods=["POST"])
def get_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if email == None or password == None:
        return jsonify({"msg": "Email or password not present"}), 400
    
    user = User.query.filter_by(email=email, password=password).one_or_none()

    if user == None:
        return jsonify({"msg": "User does not exist, email or password may be incorrect"}), 404

    access_token = create_access_token(identity=email)

    return jsonify({"access_token": access_token, "identity": user.email}), 200

@api.route('/protected', methods=["GET"])
@jwt_required()
def get_logged_user_data():
    current_user_email = get_jwt_identity()

    current_user = User.query.filter_by(email=current_user_email).one_or_none()

    if current_user == None:
        return jsonify({"msg": "User not found"}), 404
    
    return jsonify(current_user.serialize()), 200

 



