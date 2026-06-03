

import serial
import threading
import time


class SerialManager:
    def __init__(self, port="COM6", baudrate=9600):
        self.port = port
        self.baudrate = baudrate
        self.serial_conn = None
        self.running = False
        self.thread = None

        self.latest_data = {
            "f1": 0,
            "f2": 0,
            "f3": 0,
            "x": 0.0,
            "y": 0.0,
            "z": 0.0,
        }

        self.arduino_connected = False
        self.esp_connected = False

    def connect(self):
        try:
            self.serial_conn = serial.Serial(
                self.port,
                self.baudrate,
                timeout=1
            )

            # Arduino reset delay
            time.sleep(3)

            # clear garbage startup bytes
            self.serial_conn.reset_input_buffer()

            self.arduino_connected = True
            self.esp_connected = True

            print(f"[SERIAL] Connected to {self.port}")

            return True

        except Exception as e:
            print("[SERIAL ERROR]", e)
            self.arduino_connected = False
            self.esp_connected = False
            return False

    def start(self):
        if self.running:
            return

        if not self.serial_conn:
            connected = self.connect()
            if not connected:
                return

        self.running = True

        self.thread = threading.Thread(
            target=self.read_loop,
            daemon=True
        )

        self.thread.start()

    def stop(self):
        self.running = False

        if self.serial_conn:
            self.serial_conn.close()
            self.serial_conn = None

    def read_loop(self):
        while self.running:
            try:
                if self.serial_conn and self.serial_conn.in_waiting > 0:
                    line = self.serial_conn.readline()

                    decoded = line.decode(
                        "utf-8",
                        errors="ignore"
                    ).strip()

                    if not decoded:
                        continue

                    #print("RAW:", decoded)

                    parts = decoded.split(",")

                    if len(parts) == 6:
                        self.latest_data = {
                            "f1": int(float(parts[0])),
                            "f2": int(float(parts[1])),
                            "f3": int(float(parts[2])),
                            "x": float(parts[3]),
                            "y": float(parts[4]),
                            "z": float(parts[5]),
                        }

            except Exception as e:
                print("[SERIAL READ ERROR]", e)

            time.sleep(0.02)

    def get_latest_data(self):
        return self.latest_data

    def get_connection_status(self):
        return {
            "arduino_connected": self.arduino_connected,
            "esp_connected": self.esp_connected,
        }


serial_manager = SerialManager(port="COM6")