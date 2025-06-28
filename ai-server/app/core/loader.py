from app.utils.io import load_and_clean_export_data, load_hscode_data
from app.core.vector_db import setup_vector_database
from app.utils.io import preprocess_dataframe
import pandas as pd

def load_all_data():
    df_export = load_and_clean_export_data('export_data_2025_clean.json')
    df_hscode = load_hscode_data('hscode_data_2025.json')
    collection = setup_vector_database(df_hscode, force_reset=False)
    return df_export, collection


def load_data(export_path: str, hscode_path: str) -> tuple[pd.DataFrame, pd.DataFrame]:
    export_df = pd.read_json(export_path)
    hscode_df = pd.read_json(hscode_path)
    export_df = preprocess_dataframe(export_df)
    hscode_df['품목번호'] = hscode_df['품목번호'].astype(str)
    return export_df, hscode_df
