import React from 'react';
import { Box, Typography, LinearProgress, Paper } from '@mui/material';
import { styled } from '@mui/system';

const ResultPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: theme.palette.background.paper,
}));

const DonationResults = ({ prediction }) => {
  if (!prediction) {
    return (
      <ResultPaper elevation={3}>
        <Typography variant="h6" color="textSecondary" align="center">
          Submit donor information to see prediction results
        </Typography>
      </ResultPaper>
    );
  }

  const confidencePercentage = Math.round(prediction.confidence * 100);
  const donationAmount = prediction.predicted_donation.toFixed(2);

  return (
    <ResultPaper elevation={3}>
      <Typography variant="h5" gutterBottom>
        Prediction Results
      </Typography>
      
      <Box sx={{ mt: 2 }}>
        <Typography variant="h3" color="primary" sx={{ fontWeight: 'bold' }}>
          ${donationAmount}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Predicted Donation Amount
        </Typography>
      </Box>
      
      <Box sx={{ mt: 4 }}>
        <Typography variant="body1" gutterBottom>
          Confidence: {confidencePercentage}%
        </Typography>
        <LinearProgress 
          variant="determinate" 
          value={confidencePercentage}
          sx={{ 
            height: 10,
            borderRadius: 5,
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            '& .MuiLinearProgress-bar': {
              borderRadius: 5,
            }
          }}
        />
      </Box>
    </ResultPaper>
  );
};

export default DonationResults;