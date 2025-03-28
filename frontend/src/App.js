import React, { useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import DonationForm from './components/DonationForm';
import DonationResults from './components/DonationResults';
import DonationHistory from './components/DonationHistory';

function App() {
  const [prediction, setPrediction] = useState(null);
  const [history, setHistory] = useState([]);

  const handlePrediction = (newPrediction) => {
    setPrediction(newPrediction);
    setHistory(prev => [
      {
        ...newPrediction,
        timestamp: new Date().toLocaleString()
      },
      ...prev
    ]);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ 
        fontWeight: 'bold',
        mb: 4,
        color: 'primary.main'
      }}>
        Donation Prediction System
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <DonationForm onPrediction={handlePrediction} />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <DonationResults prediction={prediction} />
        </Grid>
        
        <Grid item xs={12}>
          <DonationHistory history={history} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;