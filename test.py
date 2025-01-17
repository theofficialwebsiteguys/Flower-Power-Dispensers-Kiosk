import requests
import time
import uuid
import json
import random
import threading
from datetime import datetime
from tkinter import Tk, Label, Entry, Button, Text, Scrollbar, END, StringVar, OptionMenu
from requests.exceptions import ProxyError, ConnectTimeout, RequestException

# Constants for Instagram endpoints
BASE_URL = 'https://i.instagram.com/api/v1/'

HEADERS = {
    'User-Agent': 'Instagram 254.0.0.19.109 Android (29/10; 420dpi; 1080x1920; Samsung; SM-G960F; starlte; exynos9810; en_US)',
    'Accept': '*/*',
    'Accept-Encoding': 'gzip, deflate',
    'Connection': 'keep-alive',
    'X-IG-App-ID': '936619743392459',
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/x-www-form-urlencoded'
}

class InstagramBotApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Instagram Close Friends Adder")
        self.root.geometry("600x500")

        # UI Elements
        Label(root, text="Instagram Username:").pack()
        self.username_entry = Entry(root, width=50)
        self.username_entry.pack()

        Label(root, text="Session ID:").pack()
        self.session_id_entry = Entry(root, width=50, show='*')
        self.session_id_entry.pack()

        Label(root, text="Processing Speed:").pack()
        self.speed_var = StringVar(root)
        self.speed_var.set("Medium")
        self.speed_menu = OptionMenu(root, self.speed_var, "Fast", "Medium", "Random")
        self.speed_menu.pack()

        Label(root, text="Proxy Option:").pack()
        self.proxy_var = StringVar(root)
        self.proxy_var.set("No Proxy")
        self.proxy_menu = OptionMenu(root, self.proxy_var, "No Proxy", "Use Proxy")
        self.proxy_menu.pack()

        self.proxy_entry = Entry(root, width=50)
        self.proxy_entry.pack()
        self.proxy_entry.insert(0, "Enter proxy (e.g., http://user:pass@ip:port)")

        self.start_button = Button(root, text="Start", command=self.start_process)
        self.start_button.pack(pady=10)

        self.timer_label = Label(root, text="Elapsed Time: 0s")
        self.timer_label.pack()

        self.log_text = Text(root, height=15, width=70)
        self.log_text.pack()

        self.scrollbar = Scrollbar(root, command=self.log_text.yview)
        self.scrollbar.pack(side='right', fill='y')
        self.log_text.config(yscrollcommand=self.scrollbar.set)

        self.running = False
        self.start_time = None
        self.last_break_time = None

    def log(self, message):
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        self.log_text.insert(END, f"[{timestamp}] {message}\n")
        self.log_text.see(END)

    def update_timer(self):
        while self.running:
            elapsed = int(time.time() - self.start_time)
            self.timer_label.config(text=f"Elapsed Time: {elapsed}s")
            time.sleep(1)

    def take_random_break(self):
        break_duration = random.randint(300, 600)
        self.log(f"Taking a break for {break_duration // 60} minutes.")
        time.sleep(break_duration)
        self.last_break_time = time.time()

    def authenticate(self, session_id, proxy_option, proxy_address):
        try:
            session = requests.Session()
            session.headers.update(HEADERS)
            device_id = str(uuid.uuid4())
            session.headers.update({'X-IG-Device-ID': device_id})
            session.cookies.set('sessionid', session_id)

            if proxy_option == "Use Proxy" and proxy_address:
                session.proxies.update({'http': proxy_address, 'https': proxy_address})
                self.log(f"Using custom proxy: {proxy_address}")
            else:
                self.log("No proxy is being used.")

            self.log("Authenticating...")
            return session
        except Exception as e:
            self.log(f"Error during authentication: {e}")
            return None

    def get_user_id(self, session, username):
        url = BASE_URL + f'users/web_profile_info/?username={username}'
        try:
            response = session.get(url, timeout=10)
            response.raise_for_status()
            user_id = response.json()['data']['user']['id']
            self.log(f"Fetched user ID for {username}: {user_id}")
            return user_id
        except RequestException as e:
            self.log(f"Error fetching user ID: {e}")
            return None

    def get_followers(self, session, user_id):
        followers = []
        max_id = ''
        speed_mode = self.speed_var.get()
        self.log("Fetching followers...")
        self.last_break_time = time.time()
        try:
            while True:
                if time.time() - self.last_break_time >= random.randint(1800, 2100):
                    self.take_random_break()
                    self.last_break_time = time.time()

                url = BASE_URL + f'friendships/{user_id}/followers/?max_id={max_id}'
                response = session.get(url, timeout=10)
                response.raise_for_status()
                data = response.json()
                new_followers = data.get('users', [])
                followers.extend(new_followers)
                self.log(f"Retrieved {len(new_followers)} followers, total: {len(followers)}")
                max_id = data.get('next_max_id')
                if not max_id:
                    break
                time.sleep(0.1 if speed_mode == "Fast" else random.uniform(1, 5))
        except RequestException as e:
            self.log(f"Error fetching followers: {e}")
        return [user['pk'] for user in followers]

    def add_to_close_friends(self, session, user_ids):
        speed_mode = self.speed_var.get()
        url = BASE_URL + 'friendships/set_besties/'
        for user_id in user_ids:
            if time.time() - self.last_break_time >= random.randint(1800, 2100): 
                self.take_random_break()
                self.last_break_time = time.time()  # Reset the break timer after the break
            try:
                payload = {'module': 'activity_feed', 'add': json.dumps([user_id]), 'remove': json.dumps([])}
                session.post(url, data=payload).raise_for_status()
                self.log(f"Added user {user_id} to Close Friends.")
                time.sleep(0.1 if speed_mode == "Fast" else random.uniform(2, 8))
            except RequestException as e:
                self.log(f"Error adding user {user_id} to Close Friends: {e}")


    def start_process(self):
        self.running = True
        self.start_time = time.time()
        threading.Thread(target=self.update_timer, daemon=True).start()
        threading.Thread(target=self.process, daemon=True).start()

    def process(self):
        try:
            username = self.username_entry.get()
            session_id = self.session_id_entry.get()
            proxy_option = self.proxy_var.get()
            proxy_address = self.proxy_entry.get()
            session = self.authenticate(session_id, proxy_option, proxy_address)
            user_id = self.get_user_id(session, username)
            if user_id:
                followers = self.get_followers(session, user_id)
                self.log("Process completed.")
            else:
                self.log("Failed to retrieve user ID.")
        except Exception as e:
            self.log(f"Unexpected error: {e}")
        self.running = False

if __name__ == "__main__":
    root = Tk()
    app = InstagramBotApp(root)
    root.mainloop()
