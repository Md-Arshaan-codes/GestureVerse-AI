from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from services.auth_service import auth_service


auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({
            "success": False,
            "message": "All fields are required"
        }), 400

    result = auth_service.register_user(
        name,
        email,
        password
    )

    status_code = 200 if result["success"] else 400

    return jsonify(result), status_code


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({
            "success": False,
            "message": "Email and password required"
        }), 400

    result = auth_service.login_user(
        email,
        password
    )

    status_code = 200 if result["success"] else 401

    return jsonify(result), status_code


@auth_bp.route("/me", methods=["GET"])
@jwt_required()
def me():
    user_id = get_jwt_identity()

    return jsonify({
        "success": True,
        "user_id": user_id
    })