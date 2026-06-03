import os
import smtplib

from email.message import EmailMessage
from dotenv import load_dotenv


load_dotenv()


class ContactService:
    def __init__(self):
        self.gmail_email = os.getenv("GMAIL_EMAIL")
        self.gmail_password = os.getenv(
            "GMAIL_APP_PASSWORD"
        )

    def send_contact_email(
        self,
        name,
        email,
        subject,
        message,
        attachment=None
    ):
        try:
            msg = EmailMessage()

            msg["Subject"] = f"GestureVerse AI Contact: {subject}"
            msg["From"] = self.gmail_email
            msg["To"] = self.gmail_email

            body = f"""
New Contact Form Submission

Name: {name}
Email: {email}
Subject: {subject}

Message:
{message}
"""

            msg.set_content(body)

            if attachment:
                file_data = attachment.read()
                file_name = attachment.filename
                file_type = attachment.content_type

                main_type, sub_type = file_type.split("/")

                msg.add_attachment(
                    file_data,
                    maintype=main_type,
                    subtype=sub_type,
                    filename=file_name
                )

            with smtplib.SMTP(
                "smtp.gmail.com",
                587
            ) as smtp:
                smtp.starttls()

                smtp.login(
                    self.gmail_email,
                    self.gmail_password
                )

                smtp.send_message(msg)

            return {
                "success": True,
                "message": "Email sent successfully"
            }

        except Exception as e:
            print("[CONTACT EMAIL ERROR]", e)

            return {
                "success": False,
                "message": "Failed to send email"
            }


contact_service = ContactService()