import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
import joblib
from pathlib import Path

class DonationPredictor:
    def __init__(self):
        self.model = None
        self.model_path = Path('donation_model.joblib')
        
    def generate_sample_data(self, num_samples=10000):
        """Generate synthetic donation data"""
        np.random.seed(42)
        data = {
            'age': np.random.randint(18, 80, size=num_samples),
            'income': np.random.randint(20000, 200000, size=num_samples),
            'previous_donations': np.random.randint(0, 50, size=num_samples),
            'last_donation_amount': np.random.randint(0, 1000, size=num_samples),
            'donation_frequency': np.random.choice(
                ['weekly', 'monthly', 'yearly', 'sporadic'], 
                size=num_samples,
                p=[0.1, 0.4, 0.3, 0.2]
            ),
            'engagement_score': np.clip(np.random.normal(0.5, 0.2, size=num_samples), 0, 1),
            'predicted_donation': np.abs(np.random.normal(500, 300, size=num_samples))
        }
        return pd.DataFrame(data)
    
    def preprocess_data(self, df):
        """Prepare data for model training"""
        df = pd.get_dummies(df, columns=['donation_frequency'])
        X = df.drop('predicted_donation', axis=1)
        y = df['predicted_donation']
        return X, y
    
    def train_model(self):
        """Train and save the donation prediction model"""
        df = self.generate_sample_data()
        X, y = self.preprocess_data(df)
        
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )
        
        self.model = RandomForestRegressor(
            n_estimators=200,
            max_depth=10,
            min_samples_split=5,
            random_state=42
        )
        
        self.model.fit(X_train, y_train)
        joblib.dump(self.model, self.model_path)
        return self.model
    
    def load_model(self):
        """Load the trained model"""
        if not self.model_path.exists():
            self.train_model()
        self.model = joblib.load(self.model_path)
        return self.model