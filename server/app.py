from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv

import os

load_dotenv()

app = Flask(__name__, static_folder='../client/build', static_url_path='/')
app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

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

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

if __name__ == '__main__':
    app.run(host=os.getenv('APP_HOST'), port=(os.getenv('PORT') if os.getenv('PORT') else 8000))
