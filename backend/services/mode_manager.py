class ModeManager:
    def __init__(self):
        self.active_mode = None

    def set_mode(self, mode_name):
        self.active_mode = mode_name
        print(f"[MODE] Active mode: {mode_name}")

    def stop_mode(self):
        print(f"[MODE] Stopping mode: {self.active_mode}")
        self.active_mode = None

    def get_active_mode(self):
        return self.active_mode


mode_manager = ModeManager()