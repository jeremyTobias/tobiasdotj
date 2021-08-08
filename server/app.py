from flask import Flask, jsonify, render_template, send_from_directory, request, make_response
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
from fbprophet import Prophet

import pandas as pd
import os

load_dotenv()

app = Flask(__name__, static_folder='../client/build', static_url_path='/')
app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

db = SQLAlchemy(app)

from .models.zillow import housing, ztimeseries

@app.route('/zillow', methods=['GET'])
def zillow():
    allData = housing.Housing.query.all()

    return jsonify({
        'data': [res.serialized for res in allData]
    })

@app.route('/zillow/forecast/<zipcode>', methods=['GET'])
def zforecast(zipcode):
    print(f'Response: {zipcode}')
    fdata = pd.read_sql_query(ztimeseries.ZForecast.query.filter_by(zip=zipcode).statement, db.engine)

    fcast = forecast(fdata)

    return jsonify({
        'data': fcast.to_json(orient='table')
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

def forecast(df):
    dfp = df[['Date', 'Value']]
    dfp.columns = ['ds', 'y']
    m = Prophet(interval_width=0.95)
    model = m.fit(dfp)
    future = m.make_future_dataframe(periods=5, freq='Y')
    forecast = m.predict(future)

    return forecast[['ds', 'yhat_lower', 'yhat_upper', 'yhat']]


if __name__ == '__main__':
    app.run(host='0.0.0.0')
