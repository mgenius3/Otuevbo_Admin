import React, { useState } from 'react';
import {
  Button,
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Alert,
  CircularProgress,
} from '@mui/material';
import FetchApiClient from 'fetch_api_clients/api';
import { toast } from 'react-toastify';
import { error } from 'src/theme/colors';
import { useRouter } from 'next/router';

const LoanApplicationDetailsPage = ({ loanApplication }) => {
  const router = useRouter();
  const [loadingApprove, setLoadingApprove] = useState(false); // State to manage loading indicator for Approve button
  const [loadingDecline, setLoadingDecline] = useState(false); // State to manage loading indicator for Decline button
  const [loadingDelete, setLoadingDelete] = useState(false); // State to manage loading indicator for Delete button

  const api = new FetchApiClient('/loan');

  const handleUpdateStatus = async (status) => {
    try {
      // Set the loading state based on the status being updated
      if (status === 'approved') {
        setLoadingApprove(true); // Set loading state to true for Approve button
      } else if (status === 'declined') {
        setLoadingDecline(true); // Set loading state to true for Decline button
      }

      const { response, error } = await api.put(`/application/${loanApplication.userId}`, {
        key: 'status',
        value: status,
      });

      // Reset the loading state once request is completed
      setLoadingApprove(false);
      setLoadingDecline(false);
      toast.info('successfully updated loan status');
      router.reload();
    } catch (err) {
      // Reset the loading state in case of error
      setLoadingApprove(false);
      setLoadingDecline(false);
      toast.error('unable to update loan status:', error);
    }
  };

  const handleDeleteLoan = async () => {
    try {
      // Show confirmation dialog before proceeding with the deletion
      const confirmDelete = window.confirm(
        'Are you sure you want to delete this loan application?'
      );
      if (!confirmDelete) return; // If user cancels, do nothing

      setLoadingDelete(true); // Set loading state to true for Delete button

      // Call the API to delete the loan application
      const { response, error } = await api.delete(`/application/${loanApplication.userId}`);

      // Reset the loading state once request is completed
      setLoadingDelete(false);
      toast.info('successfully deleted loan application');
      router.push('/'); // Redirect to the home page or any other appropriate page
    } catch (err) {
      // Reset the loading state in case of error
      setLoadingDelete(false);
      toast.error('unable to delete loan application:', error);
    }
  };

  return (
    <Container style={{ margin: 'auto' }}>
      <Alert
        severity={
          loanApplication?.status == 'pending'
            ? 'warning'
            : loanApplication?.status == 'declined'
            ? 'error'
            : 'success'
        }
      >
        loan {loanApplication?.status}
      </Alert>
      <Box sx={{ mb: 2 }}>
        <Box>
          <Typography variant="h4">Personal Information</Typography>

          <List>
            <ListItem>
              <ListItemText primary="User ID" secondary={loanApplication?.userId} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Name:" secondary={loanApplication?.name} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Email:" secondary={loanApplication?.email} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Phone:" secondary={loanApplication?.phone} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Gender:" secondary={loanApplication?.gender} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Marital Status:" secondary={loanApplication?.maritalStatus} />
            </ListItem>
          </List>
          <Divider />
        </Box>
        <Box>
          <Typography variant="h4">Business Information</Typography>
          <List>
            <ListItem>
              <ListItemText primary="Business Name:" secondary={loanApplication?.businessName} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Business Phone:"
                secondary={loanApplication?.businessPhoneNo}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Business Reg No:" secondary={loanApplication?.businessRegNo} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Business Address:"
                secondary={loanApplication?.businessAddress}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Business Email:" secondary={loanApplication?.businessEmail} />
            </ListItem>
          </List>
          <Divider />
        </Box>
        <Box>
          <Typography variant="h4">Loan Details</Typography>
          <List>
            <ListItem>
              <ListItemText primary="Loan Amount:" secondary={loanApplication?.loanAmount} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Repayment Amount:"
                secondary={loanApplication?.repaymentAmount}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Payment Plan:" secondary={loanApplication?.paymentPlan} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Total Repayment Amount:"
                secondary={loanApplication?.totalRepaymentAmount}
              />
            </ListItem>
          </List>
          <Divider />
        </Box>
        <Box>
          <Typography variant="h4">Bank Details</Typography>
          <List>
            <ListItem>
              <ListItemText primary="Bank:" secondary={loanApplication?.bank} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Account Number:" secondary={loanApplication?.accountNumber} />
            </ListItem>
          </List>
          <Divider />
        </Box>
        <Box>
          <Typography variant="h4">Additional Information</Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Employment Status:"
                secondary={loanApplication?.employmentStatus}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Job Position:" secondary={loanApplication?.jobPosition} />
            </ListItem>
            <ListItem>
              <ListItemText primary="NIN:" secondary={loanApplication?.nin} />
            </ListItem>
            <ListItem>
              <ListItemText primary="BVN:" secondary={loanApplication?.bvn} />
            </ListItem>
          </List>
          <Divider />
        </Box>
      </Box>

      {loanApplication.status === 'pending' && (
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Button
            variant="contained"
            onClick={() => handleUpdateStatus('approved')}
            disabled={loadingApprove}
          >
            {loadingApprove ? <CircularProgress size={24} /> : 'Approve'}
          </Button>
          <Button
            variant="contained"
            onClick={() => handleUpdateStatus('declined')}
            color="error"
            disabled={loadingDecline}
          >
            {loadingDecline ? <CircularProgress size={24} /> : 'Decline'}
          </Button>
        </Box>
      )}

      {loanApplication.status === 'approved' && (
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Button
            variant="contained"
            onClick={() => router.push(`/loan/repayment/${loanApplication.userId}`)}
            color="primary"
          >
            {'Repay Loan'}
          </Button>
          <Button
            variant="contained"
            onClick={handleDeleteLoan}
            color="error"
            disabled={loadingDelete}
          >
            {loadingDelete ? <CircularProgress size={24} /> : 'Delete Loan'}
          </Button>
        </Box>
      )}

      {loanApplication.status === 'declined' && (
        <Box>
          <Button
            variant="contained"
            onClick={handleDeleteLoan}
            color="error"
            disabled={loadingDelete}
          >
            {loadingDelete ? <CircularProgress size={24} /> : 'Delete Loan'}
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default LoanApplicationDetailsPage;
