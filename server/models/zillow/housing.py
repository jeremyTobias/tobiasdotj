from server.app import db
from sqlalchemy.dialects.postgresql import JSON


class Housing(db.Model):
    __tablename__ = 'top_pop_housing'

    zip = db.Column('ZipCode', db.Text, primary_key=True)
    state = db.Column('State', db.Text, nullable=False)
    city = db.Column('City', db.Text, nullable=False)
    metro = db.Column('Metro', db.Text, nullable=False)
    county = db.Column('CountyName', db.Text, nullable=False)
    populationGrowth = db.Column('PopulationGrowthRate', db.Float, nullable=False)
    priceGrowth = db.Column('PriceGrowthRate', db.Float, nullable=False)
    ranges = db.Column(db.Float, nullable=False)
    forecasts = db.Column(db.Float, nullable=False)

    def __init__(self, zip, state, city, metro, county, populationGrowth, priceGrowth, ranges, forecasts):
        self.zip = zip
        self.state = state
        self.city = city
        self.metro = metro
        self.county = county
        self.populationGrowth = populationGrowth
        self.priceGrowth = priceGrowth
        self.ranges = ranges
        self.forecasts = forecasts

    @property
    def serialized(self):
        return {
            'zip': self.zip,
            'state': self.state,
            'city': self.city,
            'metro': self.metro,
            'county': self.county,
            'populationGrowth': self.populationGrowth,
            'priceGrowth': self.priceGrowth,
            'ranges': self.ranges,
            'forecasts': self.forecasts,
        }
