from server.app import db
from sqlalchemy.dialects.postgresql import JSON


class ZForecast(db.Model):
    __tablename__ = 'ztimeseries'

    zip = db.Column('ZipCode', db.Text, primary_key=True)
    date = db.Column('Date', db.Date, nullable=False)
    val = db.Column('Value', db.Integer, nullable=False)

    def __init__(self, zip, date, val):
        self.zip = zip
        self.date = date
        self.val = val

    @property
    def serialized(self):
        return {
            'zip': self.zip,
            'date': self.date,
            'val': self.val,
        }
