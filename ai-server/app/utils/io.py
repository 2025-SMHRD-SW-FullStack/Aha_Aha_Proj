import pandas as pd
import re

def clean_numeric_value(value):
    if isinstance(value, str):
        cleaned = re.sub(r'[^\d.-]', '', value)
        try: return float(cleaned)
        except: return 0.0
    elif isinstance(value, (int, float)):
        return float(value)
    return 0.0

def load_and_clean_export_data(path):
    df = pd.read_json(path)
    df = df.iloc[2:].reset_index(drop=True)
    df[['수출 금액', '수입 금액', '무역수지']] = df[['수출 금액', '수입 금액', '무역수지']].applymap(clean_numeric_value)
    df['HS코드'] = df['HS코드'].astype(str).str[:2].str.zfill(2)
    df.dropna(subset=['국가', 'HS코드'], inplace=True)
    return df

def load_hscode_data(path):
    df = pd.read_json(path)
    df['품목번호'] = df['품목번호'].astype(str)
    return df

def preprocess_dataframe(df: pd.DataFrame) -> pd.DataFrame:
    df = df.iloc[2:].reset_index(drop=True)
    df[['수출 금액', '수입 금액', '무역수지']] = df[['수출 금액', '수입 금액', '무역수지']].applymap(clean_numeric_value)
    df['HS코드'] = df['HS코드'].astype(str).str[:2].str.zfill(2)
    df.dropna(subset=['국가', 'HS코드'], inplace=True)
    return df