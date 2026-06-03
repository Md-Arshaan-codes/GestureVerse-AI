from flask import Blueprint, jsonify, request, send_file
from services.mode1_service import mode1_service

mode1_bp = Blueprint("mode1", __name__)


@mode1_bp.route("/start", methods=["GET"])
def start_mode1():
    mode1_service.start()

    return jsonify({
        "message": "Mode 1 started"
    })


@mode1_bp.route("/stop", methods=["GET"])
def stop_mode1():
    mode1_service.stop()

    return jsonify({
        "message": "Mode 1 stopped"
    })


@mode1_bp.route("/status", methods=["GET"])
def mode1_status():
    return jsonify(
        mode1_service.get_status()
    )


@mode1_bp.route("/clear", methods=["GET"])
def clear_mode1():
    mode1_service.clear()

    return jsonify({
        "message": "Cleared"
    })


@mode1_bp.route("/speak", methods=["POST"])
def speak_mode1():
    data = request.get_json()

    language = data.get("language", "en")

    success = mode1_service.generate_speech(
        language
    )

    if success:
        return jsonify({
            "success": True
        })

    return jsonify({
        "success": False
    })


@mode1_bp.route("/stop-speech", methods=["GET"])
def stop_speech():
    mode1_service.stop_speech()

    return jsonify({
        "message": "Speech stopped"
    })


@mode1_bp.route("/audio", methods=["GET"])
def get_audio():
    return send_file(
        "static/output.mp3",
        mimetype="audio/mpeg"
    )