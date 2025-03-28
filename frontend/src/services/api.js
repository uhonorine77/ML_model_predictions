import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export const predictDonation = async (donorData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/predict`, donorData);
    return response.data;
  } catch (error) {
    console.error('Prediction error:', error.response?.data || error.message);
    throw error;
  }
};

export const checkHealth = async () => {
  return await axios.get(`${API_BASE_URL}/health`);
};