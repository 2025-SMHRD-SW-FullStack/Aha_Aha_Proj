import pandas as pd

def calculate_recommendation_score(df):
    agg = df.groupby('국가').agg({'수출 금액': 'sum', '무역수지': 'sum'}).reset_index()
    agg['무역수지'] = agg['무역수지'].clip(lower=0)
    def scale(x):
        return (x - x.min()) / (x.max() - x.min()) if x.max() != x.min() else 0.5
    agg['시장규모'] = scale(agg['수출 금액'])
    agg['경쟁력'] = scale(agg['무역수지'])
    agg['종합점수'] = (agg['시장규모'] * 0.6 + agg['경쟁력'] * 0.4) * 100
    return agg