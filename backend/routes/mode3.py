from flask import Blueprint, jsonify, Response
from services.mode3_service import mode3_service

mode3_bp = Blueprint("mode3", __name__)


@mode3_bp.route("/start", methods=["GET"])
def start_mode3():
    mode3_service.start()

    return jsonify({
        "message": "Mode 3 started"
    })


@mode3_bp.route("/stop", methods=["GET"])
def stop_mode3():
    mode3_service.stop()

    return jsonify({
        "message": "Mode 3 stopped"
    })
    
    
@mode3_bp.route("/start-video", methods=["GET"])
def start_video():
    mode3_service.start_video()

    return jsonify({
        "message": "Video started"
    })


@mode3_bp.route("/stop-video", methods=["GET"])
def stop_video():
    mode3_service.stop_video()

    return jsonify({
        "message": "Video stopped"
    })

@mode3_bp.route("/status", methods=["GET"])
def mode3_status():
    return jsonify(mode3_service.get_status())


@mode3_bp.route("/video_feed")
def video_feed():
    return Response(
        mode3_service.generate_frames(),
        mimetype='multipart/x-mixed-replace; boundary=frame'
    )