import os
from twilio.rest import Client

class WhatsAppService:
    def __init__(self):
        self.account_sid = os.getenv("TWILIO_ACCOUNT_SID")
        self.auth_token = os.getenv("TWILIO_AUTH_TOKEN")

        self.from_number = os.getenv("TWILIO_FROM")
        self.to_number = os.getenv("TWILIO_TO")

        self.client = Client(
            self.account_sid,
            self.auth_token
        )

    # def send_emergency_alert(self):
    #     try:
    #         self.client.messages.create(
    #             body=(
    #                 "🚨 EMERGENCY ALERT\n"
    #                 "Patient needs immediate assistance.\n"
    #                 "Please check immediately."
    #             ),
    #             from_=self.from_number,
    #             to=self.to_number
    #         )

    #         print("[WHATSAPP] Emergency alert sent")

    #     except Exception as e:
    #         print("[WHATSAPP ERROR]", e)
    
    def send_emergency_alert(self):
        try:
            message = self.client.messages.create(
                body=(
                    "🚨 EMERGENCY ALERT\n"
                    "Patient needs immediate assistance.\n"
                    "Please check immediately."
                ),
                from_=self.from_number,
                to=self.to_number
            )

            print("TWILIO SID:", message.sid)
            print("TWILIO STATUS:", message.status)

        except Exception as e:
            print("TWILIO ERROR:", str(e))


whatsapp_service = WhatsAppService()