from fbprophet import Prophet

class ZModels:
    def __init__(self):
        pass

    def forecast(self, df):
        dfp = df[['Date', 'Value']]
        dfp.columns = ['ds', 'y']
        m = Prophet(interval_width=0.95)
        model = m.fit(dfp)
        future = m.make_future_dataframe(periods=5, freq='Y')
        forecast = m.predict(future)

        return forecast[['ds', 'yhat_lower', 'yhat_upper', 'yhat']]
