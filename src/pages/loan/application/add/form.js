import { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import { toast } from 'react-toastify';
import FetchApiClient from 'fetch_api_clients/api';
import { useRouter } from 'next/router';

const plan = [
  {
    value: 'daily',
    label: 'Daily',
    days: 1,
  },
  {
    value: 'weekly',
    label: 'Weekly',
    days: 7,
  },
  {
    value: 'bi-weekly',
    label: 'Bi-weekly',
    days: 14,
  },
  {
    value: 'monthly',
    label: 'Monthly',
    months: 1,
  },
  {
    value: 'bi-monthly',
    label: 'Bi-Monthly',
    months: 2,
  },
  {
    value: '3 month',
    label: '3 Month',
    months: 3,
  },
  {
    value: '4 month',
    label: '4 Month',
    months: 4,
  },
  {
    value: '6 month',
    label: '6 Month',
    months: 6,
  },
  {
    value: 'annual',
    label: 'Annual',
    months: 12,
  },
];

export const AddPackageFormDetails = () => {
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [maturityDate, setMaturityDate] = useState(null); // State to store maturity date
  const api = new FetchApiClient('/loan');
  const router = useRouter();

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
      maturityDate,
    }));

    // Calculate maturity date when payment plan changes
    if (name === 'paymentPlan') {
      calculateMaturityDate(value);
    }
  }, []);

  const calculateMaturityDate = (paymentPlan) => {
    // Calculate maturity date based on payment plan
    let calculatedMaturityDate = null;
    const currentDate = new Date();
    const selectedPlan = plan.find((item) => item.value === paymentPlan);

    if (selectedPlan) {
      if (selectedPlan.days) {
        calculatedMaturityDate = addDays(currentDate, selectedPlan.days);
      } else if (selectedPlan.months) {
        calculatedMaturityDate = addMonths(currentDate, selectedPlan.months);
      }
    }

    setMaturityDate(calculatedMaturityDate);
  };

  const addDays = (date, days) => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + days);
    return newDate;
  };

  const addMonths = (date, months) => {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() + months);
    return newDate;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    // Here you can perform the submission, like calling an API to save the details
    try {
      // Simulating an API call with setTimeout
      const { response, error } = await api.post(`/add/packages/`, values);
      if (error) {
        throw new Error(error);
      }
      toast.success(response);
      // After submission is successful, you can reset the form values
      setValues({});
      router.back();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <Card>
        <CardHeader subheader="Fill in all information below" title="Loan Packages" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Payment Plan"
                  name="paymentPlan"
                  onChange={(event) => {
                    handleChange(event);
                    calculateMaturityDate(event.target.value);
                  }}
                  required
                  select
                  SelectProps={{ native: true }}
                >
                  <option selected> </option>
                  {plan.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Loan Amount"
                  name="loanAmount"
                  type="number"
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Repayment Amount"
                  name="repaymentAmount"
                  onChange={handleChange}
                  required
                  type="number"
                />
              </Grid>

              {/* <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Total Repayment Amount"
                  name="totalRepaymentAmount"
                  onChange={handleChange}
                  type="number"
                />
              </Grid> */}

              {/* Display Maturity Date */}
              <Grid item xs={6}>
                {maturityDate && (
                  <TextField
                    fullWidth
                    helperText="Maturity Date"
                    name="maturityDate"
                    value={maturityDate.toLocaleDateString()}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                )}
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            type="submit"
            disabled={loading} // Disable the button when loading
          >
            {loading ? 'Submitting...' : 'Save details'}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
