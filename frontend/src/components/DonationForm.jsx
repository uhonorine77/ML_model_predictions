import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { 
  TextField, Button, Box, Typography, FormControl, 
  InputLabel, Select, MenuItem, CircularProgress, Alert
} from '@mui/material';
import { predictDonation } from '../services/api';

const validationSchema = Yup.object({
  age: Yup.number().min(18, 'Must be at least 18').max(120, 'Must be at most 120').required('Required'),
  income: Yup.number().min(0, 'Must be positive').required('Required'),
  previousDonations: Yup.number().min(0, 'Must be positive').required('Required'),
  lastDonationAmount: Yup.number().min(0, 'Must be positive').required('Required'),
  donationFrequency: Yup.string().required('Required'),
  engagementScore: Yup.number().min(0, 'Must be at least 0').max(1, 'Must be at most 1').required('Required')
});

const DonationForm = ({ onPrediction }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      age: '',
      income: '',
      previousDonations: '',
      lastDonationAmount: '',
      donationFrequency: 'monthly',
      engagementScore: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError(null);
      
      try {
        const formattedValues = {
          ...values,
          previous_donations: values.previousDonations,
          last_donation_amount: values.lastDonationAmount,
          donation_frequency: values.donationFrequency,
          engagement_score: parseFloat(values.engagementScore)
        };
        
        const prediction = await predictDonation(formattedValues);
        onPrediction({ ...values, ...prediction });
      } catch (err) {
        setError(err.response?.data?.detail || 'Failed to get prediction');
      } finally {
        setLoading(false);
      }
    }
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      <TextField
        fullWidth
        margin="normal"
        label="Age"
        name="age"
        type="number"
        value={formik.values.age}
        onChange={formik.handleChange}
        error={formik.touched.age && Boolean(formik.errors.age)}
        helperText={formik.touched.age && formik.errors.age}
      />
      
      <TextField
        fullWidth
        margin="normal"
        label="Annual Income ($)"
        name="income"
        type="number"
        value={formik.values.income}
        onChange={formik.handleChange}
        error={formik.touched.income && Boolean(formik.errors.income)}
        helperText={formik.touched.income && formik.errors.income}
      />
      
      <TextField
        fullWidth
        margin="normal"
        label="Previous Donations Count"
        name="previousDonations"
        type="number"
        value={formik.values.previousDonations}
        onChange={formik.handleChange}
        error={formik.touched.previousDonations && Boolean(formik.errors.previousDonations)}
        helperText={formik.touched.previousDonations && formik.errors.previousDonations}
      />
      
      <TextField
        fullWidth
        margin="normal"
        label="Last Donation Amount ($)"
        name="lastDonationAmount"
        type="number"
        value={formik.values.lastDonationAmount}
        onChange={formik.handleChange}
        error={formik.touched.lastDonationAmount && Boolean(formik.errors.lastDonationAmount)}
        helperText={formik.touched.lastDonationAmount && formik.errors.lastDonationAmount}
      />
      
      <FormControl fullWidth margin="normal">
        <InputLabel>Donation Frequency</InputLabel>
        <Select
          name="donationFrequency"
          value={formik.values.donationFrequency}
          onChange={formik.handleChange}
          label="Donation Frequency"
          error={formik.touched.donationFrequency && Boolean(formik.errors.donationFrequency)}
        >
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
          <MenuItem value="yearly">Yearly</MenuItem>
          <MenuItem value="sporadic">Sporadic</MenuItem>
        </Select>
      </FormControl>
      
      <TextField
        fullWidth
        margin="normal"
        label="Engagement Score (0-1)"
        name="engagementScore"
        type="number"
        inputProps={{ min: 0, max: 1, step: 0.01 }}
        value={formik.values.engagementScore}
        onChange={formik.handleChange}
        error={formik.touched.engagementScore && Boolean(formik.errors.engagementScore)}
        helperText={formik.touched.engagementScore && formik.errors.engagementScore}
      />
      
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        sx={{ mt: 3 }}
        disabled={loading || !formik.isValid}
      >
        {loading ? <CircularProgress size={24} /> : 'Predict Donation'}
      </Button>
    </Box>
  );
};

export default DonationForm;