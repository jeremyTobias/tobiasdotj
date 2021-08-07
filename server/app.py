from flask import Flask, jsonify, render_template, send_from_directory, request, make_response
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv

import os

load_dotenv()

app = Flask(__name__, static_folder='../client/build', static_url_path='/')
app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

cors = CORS(app)

db = SQLAlchemy(app)

from .models.zillow import Housing

@app.route('/zillow', methods=['GET'])
def zillow():
    allData = Housing.query.all()

    for res in allData:
        print(res.serialized)

    return jsonify({
        'data': [res.serialized for res in allData]
    })

@app.route('/salary', methods=['GET'])
def salary():
    return jsonify({'data': [{
        'fake': 'Salary Data'}]
    })

@app.route('/rideshare', methods=['GET'])
def rideshare():
    return jsonify({'data': [{
        'fake': 'Rideshare Data'}]
    })

@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0')
