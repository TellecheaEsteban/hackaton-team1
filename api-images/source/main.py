from flask import Flask, request, abort
from main_webcam import process_image
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/image")
def get_image():
    return process_image()

@app.route("/image/body", methods=["POST"])
def get_image_2():
    content = request.json;

    if 'img' not in content:
        abort(400)

    return process_image(content['img'])