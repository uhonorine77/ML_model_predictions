import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Typography
} from '@mui/material';

const DonationHistory = ({ history }) => {
  if (!history || history.length === 0) {
    return (
      <Typography variant="body1" color="textSecondary" align="center" sx={{ mt: 2 }}>
        No prediction history yet.
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Typography variant="h6" sx={{ p: 2 }}>Prediction History</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Income</TableCell>
            <TableCell>Frequency</TableCell>
            <TableCell>Predicted Amount</TableCell>
            <TableCell>Confidence</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {history.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.timestamp}</TableCell>
              <TableCell>{item.age}</TableCell>
              <TableCell>${item.income.toLocaleString()}</TableCell>
              <TableCell>{item.donationFrequency}</TableCell>
              <TableCell>${item.predicted_donation.toFixed(2)}</TableCell>
              <TableCell>{(item.confidence * 100).toFixed(0)}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DonationHistory;