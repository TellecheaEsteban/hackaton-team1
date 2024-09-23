from flask import Flask
from main_webcam import process_image
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/image")
def get_image():
    return process_image()