from flask import Flask
from main_webcam import process_image

app = Flask(__name__)

@app.route("/")
def hello_world():
    return process_image()