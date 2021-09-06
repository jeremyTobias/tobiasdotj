import json
import pickle
import numpy as np
import pandas as pd
import statsmodels.api as sm
import os


def winlossConvert(coach):
    return [(x / 100) if x > 1 else x for x in coach['head_coaches - wl_pct']]


class Fball:
    def __init__(self):
        pass

    def predictSalary(self, coach=None):
        if coach is None:
            coach = {
                'const': 1,
                'head_coaches - wl_pct': 0.414,
                'AvgAttendance': 13118,
                'Conference_Atlantic_Coast_Conference': 0,
                'Conference_Big_12_Conference': 0,
                'Conference_Big_Ten_Conference': 0,
                'Conference_Conference_USA': 0,
                'Conference_Independent': 0,
                'Conference_Mid - American_Conference': 1,
                'Conference_Mountain_West_Conference': 0,
                'Conference_Pac - 12_Conference': 0,
                'Conference_Southeastern_Conference': 0,
                'Conference_Sun_Belt_Conference': 0,
            }

        coach = pd.DataFrame(coach)

        model = pickle.load(open(f'{os.environ["MODEL_ASSET_PATH"]}/coaches_ols.pkl', 'rb'))
        pred = model.predict(coach)

        preds = [round(x, 0) for x in pred]

        return preds
