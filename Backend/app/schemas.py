from pydantic import BaseModel, Field, validator
from typing import Literal
from enum import Enum

class DonationFrequency(str, Enum):
    weekly = "weekly"
    monthly = "monthly"
    yearly = "yearly"
    sporadic = "sporadic"

class DonationPredictionRequest(BaseModel):
    age: int = Field(..., gt=17, lt=120, example=45)
    income: int = Field(..., gt=0, example=75000)
    previous_donations: int = Field(..., ge=0, example=5)
    last_donation_amount: int = Field(..., ge=0, example=100)
    donation_frequency: DonationFrequency = Field(..., example="monthly")
    engagement_score: float = Field(..., ge=0, le=1, example=0.75)
    
    @validator('engagement_score')
    def round_engagement(cls, v):
        return round(v, 2)

class DonationPredictionResponse(BaseModel):
    predicted_donation: float = Field(..., example=350.50)
    confidence: float = Field(..., ge=0, le=1, example=0.85)
    status: str = Field(..., example="success")