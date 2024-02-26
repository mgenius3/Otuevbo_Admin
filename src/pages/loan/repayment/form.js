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
    value: 'cash',
    label: 'Cash',
  },
  {
    value: 'bank transfer',
    label: 'Bank Transfer',
  },
];

const LoanRepaymentFormDetails = ({ data }) => {
  const [values, setValues] = useState({});
  const [loadingRepayment, setLoadingRepayment] = useState(false); // State to manage loading indicator for Repayment button
  const api = new FetchApiClient('/loan');
  const router = useRouter();

  const handleChange = (event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleRepayment = async (e) => {
    e.preventDefault();
    try {
      setLoadingRepayment(true); // Set loading state to true for Repayment button
      const { response, error } = await api.post(`/repayment/${data.userId}`, values);
      if (response) {
        toast.info(response);
        setLoadingRepayment(false);
        router.reload();
      } else {
        throw new Error(error);
      }
    } catch (err) {
      setLoadingRepayment(false);
      toast.error('Failed to initiate repayment');
    }
  };

  return (
    <form autoComplete="off" onSubmit={handleRepayment}>
      <Card>
        <CardHeader subheader={`Loan application for ${data.name}`} title={`RepayLoan`} />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Method of Payment"
                  name="methodOfPayment"
                  onChange={handleChange}
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
                  helperText="Payable Amount"
                  name="amountPaid"
                  onChange={handleChange}
                  type="number"
                  required
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        {/* <CardActions sx={{ justifyContent: 'flex-start' }}></CardActions> */}
        <CardActions sx={{ justifyContent: 'space-between' }}>
          <Button disabled variant="contained">
            Loan Balance: &#8358; {data.repaymentAmount}{' '}
          </Button>
          <Button
            variant="contained"
            type="submit"
            disabled={loadingRepayment} // Disable the button when loading
          >
            {loadingRepayment ? 'Submitting...' : 'Update'}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default LoanRepaymentFormDetails;
