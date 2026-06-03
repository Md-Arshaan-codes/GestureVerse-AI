import threading
import time
import joblib
import os
from collections import Counter

from gtts import gTTS
from googletrans import Translator

from services.serial_manager import serial_manager
from pydub import AudioSegment

class Mode1Service:
    def __init__(self):
        self.running = False
        self.thread = None

        self.model = joblib.load(
            "models/gesture_modelf7.pkl"
            
        )

        self.translator = Translator()

        self.prediction_buffer = []
        self.BUFFER_SIZE = 5

        self.current_prediction = ""
        self.last_prediction = ""

        self.prev_x = 0
        self.prev_y = 0
        self.prev_z = 0

        self.STABILITY_THRESHOLD = 3

        self.audio_file = "static/output.mp3"
        self.speech_enabled = False

    def start(self):
        if self.running:
            return

        self.running = True

        self.thread = threading.Thread(
            target=self.predict_loop,
            daemon=True
        )

        self.thread.start()

        print("[MODE 1] Started")

    def stop(self):
        self.running = False
        self.current_prediction = ""
        self.last_prediction = ""
        self.prediction_buffer.clear()
        self.speech_enabled = False

        print("[MODE 1] Stopped")

    def clear(self):
        self.current_prediction = ""
        self.last_prediction = ""
        self.prediction_buffer.clear()
        self.speech_enabled = False

    def predict_loop(self):
        while self.running:
            try:
                data = serial_manager.get_latest_data()

                f1 = data["f1"]
                f2 = data["f2"]
                f3 = data["f3"]
                x = data["x"]
                y = data["y"]
                z = data["z"]

                movement = (
                    abs(x - self.prev_x) +
                    abs(y - self.prev_y) +
                    abs(z - self.prev_z)
                )

                self.prev_x = x
                self.prev_y = y
                self.prev_z = z

                if movement < self.STABILITY_THRESHOLD:

                    sample = [[
                        f1,
                        f2,
                        f3,
                        x,
                        y,
                        z
                    ]]

                    prediction = self.model.predict(
                        sample
                    )[0]

                    if prediction == "sit" and f2 > 180:
                        continue

                    if (
                        prediction == "move that way" and
                        f2 < 300
                    ):
                        continue

                    if (
                        prediction == "go away" and
                        z > -5
                    ):
                        continue

                    if (
                        prediction == "water" and
                        f2 > 200
                    ):
                        continue
                    if (
                        prediction == "down" and
                        y > -7
                    ):
                        continue

                    self.prediction_buffer.append(
                        prediction
                    )

                    if (
                        len(self.prediction_buffer)
                        > self.BUFFER_SIZE
                    ):
                        self.prediction_buffer.pop(0)

                    final_prediction = Counter(
                        self.prediction_buffer
                    ).most_common(1)[0][0]

                    if (
                        final_prediction !=
                        self.last_prediction
                    ):
                        self.current_prediction = (
                            final_prediction
                        )

                        self.last_prediction = (
                            final_prediction
                        )

                        print(
                            "PREDICTION:",
                            final_prediction
                        )

                else:
                    self.prediction_buffer.clear()

                time.sleep(0.01)

            except Exception as e:
                print("[MODE 1 ERROR]", e)
                
import threading
import time
import joblib
import os
from collections import Counter

from gtts import gTTS
from googletrans import Translator

from services.serial_manager import serial_manager


class Mode1Service:
    def __init__(self):
        self.running = False
        self.thread = None

        self.model = joblib.load(
            "models/gesture_modelf7.pkl"
        )

        self.translator = Translator()

        self.prediction_buffer = []
        self.BUFFER_SIZE = 5

        self.current_prediction = ""
        self.last_prediction = ""

        self.prev_x = 0
        self.prev_y = 0
        self.prev_z = 0

        self.STABILITY_THRESHOLD = 3

        self.audio_file = "static/output.mp3"
        self.speech_enabled = False

    def start(self):
        if self.running:
            return

        self.running = True

        self.thread = threading.Thread(
            target=self.predict_loop,
            daemon=True
        )

        self.thread.start()

        print("[MODE 1] Started")

    def stop(self):
        self.running = False
        self.current_prediction = ""
        self.last_prediction = ""
        self.prediction_buffer.clear()
        self.speech_enabled = False

        print("[MODE 1] Stopped")

    def clear(self):
        self.current_prediction = ""
        self.last_prediction = ""
        self.prediction_buffer.clear()
        self.speech_enabled = False

    def predict_loop(self):
        while self.running:
            try:
                data = serial_manager.get_latest_data()

                f1 = data["f1"]
                f2 = data["f2"]
                f3 = data["f3"]
                x = data["x"]
                y = data["y"]
                z = data["z"]

                movement = (
                    abs(x - self.prev_x) +
                    abs(y - self.prev_y) +
                    abs(z - self.prev_z)
                )

                self.prev_x = x
                self.prev_y = y
                self.prev_z = z

                if movement < self.STABILITY_THRESHOLD:
                    sample = [[f1, f2, f3, x, y, z]]

                    prediction = self.model.predict(sample)[0]

                    # validation rules
                    if prediction == "sit" and f2 > 180:
                        continue

                    if prediction == "move that way" and f2 < 300:
                        continue

                    if prediction == "go away" and z > -5:
                        continue

                    if prediction == "audible" and z < 0:
                        continue

                    if prediction == "audible" and f2 > 250:
                        continue

                    if prediction == "down" and y > -7:
                        continue

                    self.prediction_buffer.append(
                        prediction
                    )

                    if len(self.prediction_buffer) > self.BUFFER_SIZE:
                        self.prediction_buffer.pop(0)

                    final_prediction = Counter(
                        self.prediction_buffer
                    ).most_common(1)[0][0]

                    if final_prediction != self.last_prediction:
                        self.current_prediction = final_prediction
                        self.last_prediction = final_prediction

                        print(
                            "PREDICTION:",
                            final_prediction
                        )

                else:
                    self.prediction_buffer.clear()

                time.sleep(0.01)

            except Exception as e:
                print("[MODE 1 ERROR]", e)

    def generate_speech(self, language="en"):
        try:
            if not self.current_prediction:
                return False

            text = self.current_prediction

            if language != "en":
                translated = self.translator.translate(
                    text,
                    dest=language
                )
                text = translated.text

            os.makedirs("static", exist_ok=True)

            # tts = gTTS(
            #     text=text,
            #     lang=language
            # )

            # tts.save(self.audio_file)

            # self.speech_enabled = True

            # return True
            
            temp_file = "static/temp_output.mp3"

            tts = gTTS(
                text=text,
                lang=language
            )

            tts.save(temp_file)

            audio = AudioSegment.from_mp3(temp_file)

            boosted_audio = audio + 15

            boosted_audio.export(
                self.audio_file,
                format="mp3"
            )

            os.remove(temp_file)

            self.speech_enabled = True

            return True

        except Exception as e:
            print("[SPEECH ERROR]", e)
            return False

    def stop_speech(self):
        self.speech_enabled = False

    def get_status(self):
        connections = serial_manager.get_connection_status()
        data = serial_manager.get_latest_data()

        return {
            "prediction": self.current_prediction,
            "sensor_data": {
                "f1": data["f1"],
                "f2": data["f2"],
                "f3": data["f3"],
                "x": data["x"],
                "y": data["y"],
                "z": data["z"]
            },
            "arduino_connected": connections["arduino_connected"],
            "esp_connected": connections["esp_connected"],
            "running": self.running,
            "speech_enabled": self.speech_enabled
        }


mode1_service = Mode1Service()