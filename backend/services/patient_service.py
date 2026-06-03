# import threading
# import time
# from services.serial_manager import serial_manager


# class PatientService:
#     def __init__(self):
#         self.running = False
#         self.thread = None

#         self.current_request = ""
#         self.emergency = False
#         self.last_detected = ""

#         self.emergency_count = 0
#         self.last_emergency_time = 0

#     def start(self):
#         if self.running:
#             return

#         self.running = True

#         self.thread = threading.Thread(
#             target=self.monitor_loop,
#             daemon=True
#         )

#         self.thread.start()
#         print("[MODE 2] Monitoring started")

#     def stop(self):
#         self.running = False
#         self.current_request = ""
#         self.emergency = False
#         self.last_detected = ""
#         self.emergency_count = 0

#         print("[MODE 2] Monitoring stopped")

#     def monitor_loop(self):
#         while self.running:
#             try:
#                 data = serial_manager.get_latest_data()

#                 f1 = data["f1"]
#                 f2 = data["f2"]
#                 f3 = data["f3"]

#                 # HELP
#                 if f1 < 200 and f2 > 200 and f3 > 200:
#                     if self.last_detected != "HELP":
#                         self.current_request = "NEED HELP"
#                         self.emergency = False
#                         self.last_detected = "HELP"
#                         self.emergency_count = 0
#                         print("HELP DETECTED")

#                 # WATER
#                 elif f1 > 350 and f2 < 150 and f3 > 300:
#                     if self.last_detected != "WATER":
#                         self.current_request = "NEED WATER"
#                         self.emergency = False
#                         self.last_detected = "WATER"
#                         self.emergency_count = 0
#                         print("WATER DETECTED")

#                 # WASHROOM
#                 elif f1 < 200 and f2 < 150 and f3 > 300:
#                     if self.last_detected != "WASHROOM":
#                         self.current_request = "NEED WASHROOM"
#                         self.emergency = False
#                         self.last_detected = "WASHROOM"
#                         self.emergency_count = 0
#                         print("WASHROOM DETECTED")

#                 # EMERGENCY
#                 elif f1 < 200 and f2 < 150 and f3 < 200:
#                     current_time = time.time()

#                     if current_time - self.last_emergency_time < 2:
#                         self.emergency_count += 1
#                     else:
#                         self.emergency_count = 1

#                     self.last_emergency_time = current_time

#                     if self.emergency_count >= 3:
#                         self.current_request = "EMERGENCY ALERT"
#                         self.emergency = True
#                         self.last_detected = "EMERGENCY"
#                         print("EMERGENCY DETECTED")

#                 else:
#                     self.last_detected = ""

#                 time.sleep(0.05)

#             except Exception as e:
#                 print("[MODE 2 ERROR]", e)

#     def get_status(self):
#         connections = serial_manager.get_connection_status()

#         return {
#             "request": self.current_request,
#             "emergency": self.emergency,
#             "arduino_connected": connections["arduino_connected"],
#             "esp_connected": connections["esp_connected"],
#             "mode_running": self.running,
#         }


# patient_service = PatientService()

import threading
import time
from services.serial_manager import serial_manager
from services.whatsapp_service import whatsapp_service


class PatientService:
    def __init__(self):
        self.running = False
        self.thread = None

        self.current_request = ""
        self.emergency = False
        self.last_detected = ""

        self.emergency_count = 0
        self.last_emergency_time = 0

        self.emergency_sent = False

    def start(self):
        if self.running:
            return

        self.running = True

        self.current_request = ""
        self.emergency = False
        self.last_detected = ""
        self.emergency_count = 0
        self.emergency_sent = False

        self.thread = threading.Thread(
            target=self.monitor_loop,
            daemon=True
        )

        self.thread.start()
        print("[MODE 2] Monitoring started")

    def stop(self):
        self.running = False
        self.current_request = ""
        self.emergency = False
        self.last_detected = ""
        self.emergency_count = 0
        self.emergency_sent = False

        print("[MODE 2] Monitoring stopped")

    def monitor_loop(self):
        while self.running:
            try:
                data = serial_manager.get_latest_data()

                f1 = data["f1"]
                f2 = data["f2"]
                f3 = data["f3"]

                # HELP
                if f1 < 200 and f2 > 200 and f3 > 200:
                    if self.last_detected != "HELP":
                        self.current_request = "NEED HELP"
                        self.emergency = False
                        self.last_detected = "HELP"
                        self.emergency_count = 0
                        print("HELP DETECTED")

                # WATER
                elif f1 > 350 and f2 < 150 and f3 > 300:
                    if self.last_detected != "WATER":
                        self.current_request = "NEED WATER"
                        self.emergency = False
                        self.last_detected = "WATER"
                        self.emergency_count = 0
                        print("WATER DETECTED")

                # WASHROOM
                elif f1 < 200 and f2 < 150 and f3 > 300:
                    if self.last_detected != "WASHROOM":
                        self.current_request = "NEED WASHROOM"
                        self.emergency = False
                        self.last_detected = "WASHROOM"
                        self.emergency_count = 0
                        print("WASHROOM DETECTED")

                # EMERGENCY
                elif f1 < 200 and f2 < 150 and f3 < 200:
                    current_time = time.time()

                    if current_time - self.last_emergency_time < 2:
                        self.emergency_count += 1
                    else:
                        self.emergency_count = 1

                    self.last_emergency_time = current_time

                    if self.emergency_count >= 3:
                        self.current_request = "EMERGENCY ALERT"
                        self.emergency = True
                        self.last_detected = "EMERGENCY"

                        if not self.emergency_sent:
                            whatsapp_service.send_emergency_alert()
                            self.emergency_sent = True

                        print("EMERGENCY DETECTED")

                else:
                    self.last_detected = ""

                time.sleep(0.05)

            except Exception as e:
                print("[MODE 2 ERROR]", e)

    def reset_emergency(self):
        self.emergency = False
        self.current_request = ""
        self.last_detected = ""
        self.emergency_count = 0
        print("[MODE 2] Emergency reset from frontend")

    def get_status(self):
        connections = serial_manager.get_connection_status()

        return {
            "request": self.current_request,
            "emergency": self.emergency,
            "arduino_connected": connections["arduino_connected"],
            "esp_connected": connections["esp_connected"],
            "mode_running": self.running,
            "sensor_data": serial_manager.get_latest_data()
        }


patient_service = PatientService()