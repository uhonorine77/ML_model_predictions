import pandas as pd
from typing import Dict

def prepare_input_data(input_data: Dict) -> pd.DataFrame:
    """Convert request data to properly formatted DataFrame"""
    df = pd.DataFrame([input_data])
    df = pd.get_dummies(df, columns=['donation_frequency'])
    
    # Ensure all expected columns are present
    expected_cols = [
        'age', 'income', 'previous_donations', 'last_donation_amount',
        'engagement_score', 'donation_frequency_weekly',
        'donation_frequency_monthly', 'donation_frequency_yearly',
        'donation_frequency_sporadic'
    ]
    
    for col in expected_cols:
        if col not in df.columns:
            df[col] = 0
            
    return df[expected_cols]