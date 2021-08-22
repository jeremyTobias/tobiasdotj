import json
import pickle
import numpy as np
import pandas as pd
import statsmodels.api as sm


class Fball:
    def __init__(self):
        pass

    def predictSalary(self, coach=None):
        if coach is None:
            coach = {
                'const': [1, 1],
                'Bonus': [406000, 295000],
                'BonusPaid': [102001.0698, 145000],
                'Buyout': [1150000, 2160417],
                'head_coaches - seasons_coached': [3, 8],
                'head_coaches - wl_pct': [0.414, 0.636],
                'head_coaches - tournament_wl_pct': [0, 1],
                'AvgAttendance': [13118, 21953],
                'StadiumCapacity': [25319, 30000],
                'PctCapacity': [51.81, 73.18],
                'MULTIYR_ELIG_RATE': [0.9138461538, 0.9553903346],
                'MULTIYR_RET_RATE': [0.9549689441, 0.9530075188],
                'gsr': [79, 77],
                'fgr': [53, 65],
                'Conference_Atlantic_Coast_Conference': [0, 0],
                'Conference_Big_12_Conference': [0, 0],
                'Conference_Big_Ten_Conference': [0, 0],
                'Conference_Conference_USA': [0, 0],
                'Conference_Independent': [0, 0],
                'Conference_Mid - American_Conference': [1, 0],
                'Conference_Mountain_West_Conference': [0, 0],
                'Conference_Pac - 12_Conference': [0, 0],
                'Conference_Southeastern_Conference': [0, 0],
                'Conference_Sun_Belt_Conference': [0, 1],
            }

        coach = pd.DataFrame(coach)

        model = pickle.load(open('models/assets/coaches_all.pkl', 'rb'))
        pred = model.predict(coach)

        preds = [round(x, 0) for x in pred]

        return preds
