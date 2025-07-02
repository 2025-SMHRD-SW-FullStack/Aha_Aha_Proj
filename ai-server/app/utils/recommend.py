# app/utils/recommend.py

import os
from app.utils.io import load_and_clean_export_data
from app.utils.scoring import calculate_recommendation_score

def get_top_countries_for_item(item: str, top_n: int = 3) -> list[str]:
    project_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    export_data_path = os.path.join(project_root, "export_data_2025_clean.json")

    df = load_and_clean_export_data(export_data_path)
    item_df = df[df['품목명'].str.contains(item, case=False, na=False)]

    if item_df.empty:
        return []

    ranked_df = calculate_recommendation_score(item_df)
    ranked_df = ranked_df.sort_values(by="종합점수", ascending=False).head(top_n)

    return ranked_df["국가"].tolist()
