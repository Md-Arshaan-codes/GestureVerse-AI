# from flask import Blueprint, jsonify
# from services.patient_service import patient_service
# from services.mode_manager import mode_manager

# mode2_bp = Blueprint("mode2", __name__)


# @mode2_bp.route("/start", methods=["GET", "POST"])
# def start_mode2():
#     mode_manager.set_mode("mode2")
#     patient_service.start()

#     return jsonify({
#         "status": "success",
#         "message": "Mode 2 started"
#     })


# @mode2_bp.route("/stop", methods=["GET""POST"])
# def stop_mode2():
#     patient_service.stop()
#     mode_manager.stop_mode()

#     return jsonify({
#         "status": "success",
#         "message": "Mode 2 stopped"
#     })


# @mode2_bp.route("/status", methods=["GET"])
# def mode2_status():
#     return jsonify(patient_service.get_status())

from flask import Blueprint, jsonify
from services.patient_service import patient_service

mode2_bp = Blueprint("mode2", __name__)


@mode2_bp.route("/start", methods=["GET"])
def start_mode2():
    patient_service.start()

    return jsonify({
        "message": "Mode 2 started"
    })


@mode2_bp.route("/stop", methods=["GET"])
def stop_mode2():
    patient_service.stop()

    return jsonify({
        "message": "Mode 2 stopped"
    })


@mode2_bp.route("/status", methods=["GET"])
def mode2_status():
    return jsonify(patient_service.get_status())

@mode2_bp.route("/reset-emergency", methods=["GET"])
def reset_emergency():
    patient_service.reset_emergency()

    return jsonify({
        "message": "Emergency reset"
    })