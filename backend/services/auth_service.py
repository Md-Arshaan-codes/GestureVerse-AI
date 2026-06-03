import os
from datetime import datetime

from pymongo import MongoClient
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token
from dotenv import load_dotenv


load_dotenv()

bcrypt = Bcrypt()


class AuthService:
    def __init__(self):
        mongo_uri = os.getenv("MONGO_URI")

        self.client = MongoClient(mongo_uri)

        self.db = self.client["smartgesture_db"]
        self.users = self.db["users"]

    def register_user(self, name, email, password):
        existing_user = self.users.find_one({
            "email": email
        })

        if existing_user:
            return {
                "success": False,
                "message": "Email already registered"
            }

        hashed_password = bcrypt.generate_password_hash(
            password
        ).decode("utf-8")

        self.users.insert_one({
            "name": name,
            "email": email,
            "password": hashed_password,
            "created_at": datetime.utcnow()
        })

        return {
            "success": True,
            "message": "Account created successfully"
        }

    def login_user(self, email, password):
        user = self.users.find_one({
            "email": email
        })

        if not user:
            return {
                "success": False,
                "message": "Invalid email or password"
            }

        if not bcrypt.check_password_hash(
            user["password"],
            password
        ):
            return {
                "success": False,
                "message": "Invalid email or password"
            }

        token = create_access_token(
            identity=str(user["_id"])
        )

        return {
            "success": True,
            "token": token,
            "name": user["name"],
            "email": user["email"]
        }


auth_service = AuthService()