import cv2
import mediapipe as mp
import pyautogui
import threading
import time
import os
import webbrowser
import pygetwindow as gw

from services.serial_manager import serial_manager


class Mode3Service:
    def __init__(self):
        self.running = False
        self.camera = None
        self.thread = None
        self.frame = None
        self.pointer_active = False

        pyautogui.FAILSAFE = False

        self.screen_width, self.screen_height = pyautogui.size()

        self.mp_hands = mp.solutions.hands
        self.hands = self.mp_hands.Hands(
            max_num_hands=1,
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5
        )

        self.mp_draw = mp.solutions.drawing_utils

        # gesture tracking
        self.gesture_active = False
        self.gesture_start_time = 0
        self.last_bend_time = 0
        self.bend_count = 0
        self.app_gesture_active = False

        # app states
        self.chrome_open = False
        self.whatsapp_open = False
        self.keyboard_open = False

        self.current_gesture = ""

        self.video_enabled = False
        self.video_trigger_active = False

    def start(self):
        if self.running:
            return

        self.camera = cv2.VideoCapture(0)

        if not self.camera.isOpened():
            print("[MODE 3 ERROR] Camera not opened")
            return

        self.running = True

        self.thread = threading.Thread(
            target=self.process_loop,
            daemon=True
        )

        self.thread.start()

        print("[MODE 3] Started")

    def stop(self):
        self.running = False
        self.pointer_active = False

        if self.camera:
            self.camera.release()
            self.camera = None

        cv2.destroyAllWindows()

        self.gesture_active = False
        self.gesture_start_time = 0
        self.last_bend_time = 0
        self.bend_count = 0
        self.app_gesture_active = False

        self.chrome_open = False
        self.whatsapp_open = False
        self.keyboard_open = False
        self.current_gesture = ""

        self.video_enabled = False
        self.video_trigger_active = False
        print("[MODE 3] Stopped")
        
    def start_video(self):
            self.video_enabled = True
            self.pointer_active = False
            print("[MODE 3] Video started")


    def stop_video(self):
        self.video_enabled = False
        self.pointer_active = False
        self.current_gesture = ""
        print("[MODE 3] Video stopped")
        
    
    def process_loop(self):
        while self.running:
            try:
                data = serial_manager.get_latest_data()

                f1 = data["f1"]
                f2 = data["f2"]
                f3 = data["f3"]
                x = data["x"]
                y = data["y"]
                z = data["z"]

                current_time = time.time()

                # reset when hand open
                if (
                    f1 > 300 and
                    f2 > 300 and
                    f3 > 300
                ):
                    self.app_gesture_active = False
                    self.video_trigger_active = False
                    self.current_gesture = ""

                    if not self.video_enabled:
                        self.pointer_active = False

                hand_bent = (
                    f1 < 250 and
                    f2 < 200 and
                    f3 < 200
                )

                # CLICK LOGIC
                if hand_bent:

                    if not self.gesture_active:
                        self.gesture_active = True
                        self.gesture_start_time = current_time

                        if (
                            current_time -
                            self.last_bend_time
                            < 1
                        ):
                            self.bend_count += 1
                        else:
                            self.bend_count = 1

                        self.last_bend_time = current_time

                else:
                    if self.gesture_active:

                        hold_time = (
                            current_time -
                            self.gesture_start_time
                        )

                        # DOUBLE CLICK
                        if self.bend_count >= 2:
                            pyautogui.doubleClick()
                            print("DOUBLE CLICK")
                            self.current_gesture = "DOUBLE_CLICK"
                            self.bend_count = 0

                        # RIGHT CLICK
                        elif hold_time >= 2:
                            pyautogui.rightClick()
                            print("RIGHT CLICK")
                            self.current_gesture = "RIGHT_CLICK"

                        # LEFT CLICK
                        elif hold_time >= 1:
                            pyautogui.click()
                            print("LEFT CLICK")
                            self.current_gesture = "LEFT_CLICK"

                        self.gesture_active = False
                        self.gesture_start_time = 0

                        time.sleep(1)
                        
                        # START VIDEO STREAM
                    elif (
                        f1 < 300 and
                        f2 < 145 and
                        f3 > 300 and
                        not self.video_trigger_active
                    ):
                        print("START VIDEO STREAM")

                        self.video_enabled = True
                        self.video_trigger_active = True
                        self.current_gesture = "VIDEO"

                        time.sleep(1)
                        
                        
                      # OPEN WHATSAPP
                    elif (
                        f1 > 300 and
                        f2 < 145 and
                        f3 > 300 and
                        not self.app_gesture_active
                    ):
                        print("OPENING WHATSAPP")

                        try:
                            os.startfile("whatsapp:")
                        except:
                            webbrowser.open("https://web.whatsapp.com")

                        self.whatsapp_open = True
                        self.app_gesture_active = True
                        self.current_gesture = "WHATSAPP"

                        time.sleep(2)

                    # OPEN CHROME
                    elif (
                        f1 > 550 and
                        f2 < 150 and
                        f3 < 200 and
                        not self.app_gesture_active
                    ):
                        print("OPENING CHROME")

                        webbrowser.open(
                            "https://www.google.com"
                        )

                        self.chrome_open = True
                        self.app_gesture_active = True
                        self.current_gesture = "CHROME"

                        time.sleep(2)

                    # OPEN KEYBOARD
                    elif (
                        (
                            self.chrome_open or
                            self.whatsapp_open
                        ) and
                        f1 < 200 and
                        f2 > 350 and
                        f3 > 350 and
                        not self.keyboard_open
                    ):
                        print("OPENING KEYBOARD")

                        os.startfile("osk")

                        self.keyboard_open = True
                        self.current_gesture = "KEYBOARD"

                        time.sleep(1)

                        try:
                            keyboard_window = gw.getWindowsWithTitle(
                                "On-Screen Keyboard"
                            )[0]

                            keyboard_window.resizeTo(
                                600,
                                220
                            )

                            keyboard_window.moveTo(
                                self.screen_width - 620,
                                self.screen_height - 300
                            )

                        except:
                            pass

                        time.sleep(2)

                    # MINIMIZE WINDOW
                    elif (
                        f1 < 300 and
                        f2 > 380 and
                        f3 > 400 and
                        z > 6 and
                        x < -2 and
                        y > 0.06
                    ):
                        print("MINIMIZE WINDOW")

                        pyautogui.hotkey(
                            "win",
                            "down"
                        )

                        time.sleep(1)

                        if self.keyboard_open:
                            try:
                                keyboard_windows = gw.getWindowsWithTitle(
                                    "On-Screen Keyboard"
                                )

                                if len(keyboard_windows) > 0:
                                    keyboard_windows[0].close()

                            except:
                                try:
                                    os.system(
                                        "taskkill /f /im osk.exe >nul 2>&1"
                                    )
                                except:
                                    pass

                            self.keyboard_open = False

                        self.chrome_open = False
                        self.whatsapp_open = False
                        self.app_gesture_active = False
                        self.current_gesture = "MINIMIZE"

                        time.sleep(2)

                    # GO BACK
                    elif (
                        f1 > 550 and
                        f2 > 470 and
                        f3 < 200 and
                        x < -9 and
                        y > 2 and
                        z < -1
                    ):
                        print("GO BACK")

                        pyautogui.hotkey(
                            "alt",
                            "left"
                        )

                        self.current_gesture = "BACK"

                        time.sleep(2)

                # CAMERA PROCESSING
                success, frame = self.camera.read()

                if success:
                    frame = cv2.flip(frame, 1)

                    rgb_frame = cv2.cvtColor(
                        frame,
                        cv2.COLOR_BGR2RGB
                    )

                    results = self.hands.process(
                        rgb_frame
                    )

                    if results.multi_hand_landmarks:
                        for hand_landmarks in results.multi_hand_landmarks:
                            self.mp_draw.draw_landmarks(
                                frame,
                                hand_landmarks,
                                self.mp_hands.HAND_CONNECTIONS
                            )

                            index_finger = (
                                hand_landmarks.landmark[8]
                            )

                            screen_x = int(
                                index_finger.x *
                                self.screen_width
                            )

                            screen_y = int(
                                index_finger.y *
                                self.screen_height
                            )

                            if self.video_enabled and not hand_bent:
                                    self.pointer_active = True

                                    pyautogui.moveTo(
                                        screen_x,
                                        screen_y
                                    )

                    self.frame = frame

                time.sleep(0.01)

            except Exception as e:
                print("[MODE 3 ERROR]", e)

    def get_status(self):
        return {
            "running": self.running,
            "current_gesture": self.current_gesture,
            "chrome_open": self.chrome_open,
            "whatsapp_open": self.whatsapp_open,
            "keyboard_open": self.keyboard_open,
            "video_enabled": self.video_enabled,
            "pointer_active": self.pointer_active
        }

    def generate_frames(self):
        while True:
            if not self.video_enabled:
                time.sleep(0.1)
                continue

            if self.frame is None:
                continue

            ret, buffer = cv2.imencode(
                ".jpg",
                self.frame
            )

            if not ret:
                continue

            frame_bytes = buffer.tobytes()

            yield (
                b'--frame\r\n'
                b'Content-Type: image/jpeg\r\n\r\n' +
                frame_bytes +
                b'\r\n'
            )

mode3_service = Mode3Service()