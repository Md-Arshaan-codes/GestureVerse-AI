import pyautogui
import webbrowser


def start_pointer_control():
    print("Pointer control started")


def open_chrome():
    webbrowser.open("https://www.google.com")


def open_whatsapp():
    webbrowser.open("https://web.whatsapp.com")


def perform_back():
    pyautogui.hotkey("alt", "left")


def perform_select():
    pyautogui.click()