from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .models import DonationPredictor
from .schemas import DonationPredictionRequest, DonationPredictionResponse
from .utils import prepare_input_data
import numpy as np

app = FastAPI(
    title="Donation Prediction API",
    description="Predicts likely donation amounts based on donor characteristics",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

predictor = DonationPredictor()
model = predictor.load_model()

@app.post("/predict", response_model=DonationPredictionResponse)
async def predict_donation(data: DonationPredictionRequest):
    try:
        input_df = prepare_input_data(data.dict())
        prediction = model.predict(input_df)
        
        # Calculate confidence score (simplified example)
        confidence = np.clip(1 - (prediction[0] / 2000), 0.7, 0.95)
        
        return {
            "predicted_donation": round(float(prediction[0]), 2),
            "confidence": round(float(confidence), 2),
            "status": "success"
        }
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Prediction failed: {str(e)}"
        )

@app.get("/health")
async def health_check():
    return {"status": "healthy", "model_loaded": model is not None}