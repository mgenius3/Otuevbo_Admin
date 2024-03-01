import React, { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Grid,
  Typography,
} from '@mui/material';
import { toast } from 'react-toastify';
import FetchApiClient from 'fetch_api_clients/api';
import { useRouter } from 'next/router';

const AddLoanApplication = () => {
  const [values, setValues] = useState({
    status: 'pending',
  });
  const [loading, setLoading] = useState(false);
  const api = new FetchApiClient('/loan');
  const router = useRouter();

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      console.log(values);
      const { response, error } = await api.post(`/add/application/${values['userId']}`, values);
      if (error) {
        throw new Error(error);
      }
      toast.success('loan application submitted');
      setValues({}); // Reset form values
      router.back(); // Redirect to previous page
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const employmentStatusOptions = [
    'Full-Time Employment (FTE)',
    'Part-Time Employment',
    'Temporary or Seasonal Employment',
    'Contract Employment',
    'Freelance or Independent Contractor',
    'Internship',
    'Apprenticeship',
    'Self-Employed or Entrepreneur',
    'Casual Employment',
    'Zero-Hour Contract',
    'Consultant',
    'Commission-Based Employment',
    'Remote or Telecommuting',
  ];

  const bankOptions = [
    'AccessBank',
    'Zenith Bank',
    'First Bank of Nigeria',
    'Guaranty Trust Bank (GTB)',
    'United Bank for Africa (UBA)',
    'Union Bank',
    'Fidelity Bank',
    'Ecobank',
    'Sterling Bank',
    'Polaris Bank',
    'Wema Bank',
    'First City Monument Bank (FCMB)',
    'Stanbic IBTC Bank',
    'Keystone Bank',
    'Unity Bank',
    'Heritage Bank',
  ];

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <Card>
        <CardHeader subheader="Fill in all information below" title="Loan Application" />
        <CardContent>
          <Box sx={{ m: -1.5 }}>
            {/* Personal Information Section */}
            <Box mb={2}>
              <Typography variant="subtitle1" gutterBottom>
                Personal Information
              </Typography>
              <Divider />
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="User ID"
                    name="userId"
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Name" name="name" onChange={handleChange} required />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    select
                    label="Gender"
                    name="gender"
                    onChange={handleChange}
                    required
                    SelectProps={{ native: true }}
                  >
                    <option value=""></option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Age"
                    name="age"
                    type="number"
                    onChange={handleChange}
                    required
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    select
                    label="Marital Status"
                    name="maritalStatus"
                    onChange={handleChange}
                    required
                    SelectProps={{ native: true }}
                  >
                    <option value=""></option>
                    <option value="Male">Single</option>
                    <option value="Female">In a relationship</option>
                    <option value="Female">Married</option>
                  </TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Residential Address"
                    name="residentialAddress"
                    onChange={handleChange}
                    required
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="NIN" name="nin" onChange={handleChange} required />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="BVN" name="bvn" onChange={handleChange} required />
                </Grid>
              </Grid>
            </Box>

            {/* Business Information Section */}
            <Box mb={2}>
              <Typography variant="subtitle1" gutterBottom>
                Business Information
              </Typography>
              <Divider />
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Business Registration No"
                    name="businessRegNo"
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Business Name"
                    name="businessName"
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    select
                    label="Employment Status"
                    name="employmentStatus"
                    onChange={handleChange}
                    required
                    SelectProps={{ native: true }}
                  >
                    <option value=""></option>
                    {employmentStatusOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Job Position"
                    name="jobPosition"
                    onChange={handleChange}
                    required
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Business Address"
                    name="businessAddress"
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Business Email"
                    name="businessEmail"
                    type="email"
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Business Phone No"
                    name="businessPhoneNo"
                    onChange={handleChange}
                    required
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Financial Information Section */}
            <Box mb={2}>
              <Typography variant="subtitle1" gutterBottom>
                Financial Information
              </Typography>
              <Divider />
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Payment Plan"
                    name="paymentPlan"
                    onChange={handleChange}
                    required
                    select
                    SelectProps={{ native: true }}
                  >
                    <option value=""></option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Loan Amount"
                    name="loanAmount"
                    type="number"
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Repayment Amount"
                    name="repaymentAmount"
                    type="number"
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    select
                    label="Bank"
                    name="bank"
                    onChange={handleChange}
                    required
                    SelectProps={{ native: true }}
                  >
                    <option value=""></option>
                    {bankOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Account Number"
                    name="accountNumber"
                    type="number"
                    onChange={handleChange}
                    required
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default AddLoanApplication;
