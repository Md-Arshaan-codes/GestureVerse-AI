# from flask import Flask
# from flask_cors import CORS

# from routes.mode1 import mode1_bp
# from routes.mode2 import mode2_bp
# from routes.mode3 import mode3_bp

# from services.serial_manager import serial_manager

# app = Flask(__name__)
# CORS(app)

# serial_manager.start()

# app.register_blueprint(mode1_bp, url_prefix="/api/mode1")
# app.register_blueprint(mode2_bp, url_prefix="/api/mode2")
# app.register_blueprint(mode3_bp, url_prefix="/api/mode3")


# @app.route("/")
# def home():
#     return {
#         "message": "GestureVerse AI Backend Running"
#     }


# @app.route("/api/system/status")
# def system_status():
#     return serial_manager.get_connection_status()

# if __name__ == "__main__":
#     app.run(
#         debug=False,
#         port=5000
#     )
import os

from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv

from routes.mode1 import mode1_bp
from routes.mode2 import mode2_bp
from routes.mode3 import mode3_bp
from routes.auth import auth_bp

from services.serial_manager import serial_manager
from routes.contact import contact_bp

load_dotenv()

app = Flask(__name__)
CORS(app)

app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET")

jwt = JWTManager(app)

serial_manager.start()

app.register_blueprint(mode1_bp, url_prefix="/api/mode1")
app.register_blueprint(mode2_bp, url_prefix="/api/mode2")
app.register_blueprint(mode3_bp, url_prefix="/api/mode3")
app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(contact_bp, url_prefix="/api/contact")

@app.route("/")
def home():
    return {
        "message": "GestureVerse AI Backend Running"
    }


@app.route("/api/system/status")
def system_status():
    return serial_manager.get_connection_status()


if __name__ == "__main__":
    app.run(
        debug=False,
        port=5000
    )