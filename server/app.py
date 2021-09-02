import os

import pandas as pd
from dotenv import load_dotenv
from flask import Flask, jsonify, send_from_directory, request
from flask_sqlalchemy import SQLAlchemy

load_dotenv()

app = Flask(__name__, static_folder='../client/build', static_url_path='/')
app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

db = SQLAlchemy(app)

from .models.zillow.housing import Housing
from .models.zillow.ztimeseries import ZForecast
from .models.zillow.zmodels import ZModels
from .models.salary.fballcoaches import Fball


@app.route('/zillow', methods=['GET'])
def zillow():
    allData = Housing.query.all()

    return jsonify({
        'data': [res.serialized for res in allData]
    })


@app.route('/zillow/forecast/<zipcode>', methods=['GET'])
def zforecast(zipcode):
    fdata = pd.read_sql_query(ZForecast.query.filter_by(zip=zipcode).statement, db.engine)

    zcast = ZModels()

    fcast = zcast.forecast(fdata)

    return jsonify({
        'data': fcast.to_json(orient='table')
    })


@app.route('/salary', methods=['GET', 'POST'])
def salary():
    r = request.get_json()

    coachData = r['coachData']

    if coachData == 'None':
        coachData = None

    coaches = Fball()

    data = coaches.predictSalary(coachData)

    return jsonify({'data': data})


'''
@app.route('/rideshare', methods=['GET'])
def rideshare():
    return jsonify({'data': [{
        'fake': 'Rideshare Data'}]
    })
'''


@app.route('/')
@app.route('/projects')
@app.route('/about')
@app.route('/contact')
@app.route('/blog')
def serve():
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0')
