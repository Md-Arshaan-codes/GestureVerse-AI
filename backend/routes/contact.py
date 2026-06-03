from flask import Blueprint, request, jsonify
from services.contact_service import contact_service


contact_bp = Blueprint("contact", __name__)


@contact_bp.route("/send", methods=["POST"])
def send_contact():
    name = request.form.get("name")
    email = request.form.get("email")
    subject = request.form.get("subject")
    message = request.form.get("message")

    attachment = request.files.get("attachment")

    if not name or not email or not subject or not message:
        return jsonify({
            "success": False,
            "message": "All mandatory fields are required"
        }), 400

    result = contact_service.send_contact_email(
        name,
        email,
        subject,
        message,
        attachment
    )

    status_code = 200 if result["success"] else 500

    return jsonify(result), status_code