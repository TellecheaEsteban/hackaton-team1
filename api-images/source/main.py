from flask import Flask
from main_webcam import process_image

app = Flask(__name__)

@app.route("/image")
def get_image():
    return process_image()