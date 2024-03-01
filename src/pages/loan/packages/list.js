import * as React from 'react';
import Head from 'next/head';
import {
  Grid,
  Typography,
  Button,
  Card,
  ListItem,
  ListItemText,
  Stack,
  SvgIcon,
} from '@mui/material';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { useEffect, useState } from 'react';
import FetchApiClient from 'fetch_api_clients/api';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { Link } from 'next/link';
import Skeleton from '@mui/material/Skeleton';

const PackagesList = () => {
  const [packages, setPackages] = useState([]);
  const api = new FetchApiClient('/loan');

  const fetchLoanPackages = async () => {
    const { response, error } = await api.get('/packages');
    if (response) setPackages(response);
  };

  useEffect(() => {
    fetchLoanPackages();
  }, []);

  const handleDeletePackage = async (packageId) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this package?');
      if (!confirmDelete) return;
      // Assuming there's a delete API endpoint
      const { response, error } = await api.delete(`/packages/${packageId}`);
      if (response) {
        // Filter out the deleted package
        const updatedPackages = packages.filter((pack) => pack.id !== packageId);
        setPackages(updatedPackages);
      } else {
        // Handle error
        console.error(error);
      }
    } catch (error) {
      console.error('Error occurred while deleting package:', error);
    }
  };

  return (
    <>
      <Head>
        <title>Otuevbo Pay</title>
      </Head>
      <div style={{ padding: '20px' }}>
        <Typography variant="h4">Loan Packages</Typography>
        <Stack spacing={1} direction="row" justifyContent="space-between">
          <br />
          <Button
            color="primary"
            href="/loan/packages/add"
            startIcon={
              <SvgIcon fontSize="small">
                <PlusIcon />
              </SvgIcon>
            }
          >
            Add Package
          </Button>
        </Stack>
        <Grid container spacing={2}>
          {packages.length != 0 ? (
            packages.map((pack) => (
              <Grid item key={pack.id} xs={12} sm={6} md={4}>
                <Card style={{ padding: '10px', marginBottom: '10px' }}>
                  <ListItem disableGutters>
                    <ListItemText
                      primary={(pack.paymentPlan + ' plan').toUpperCase()}
                      secondary={
                        <>
                          <Typography component="div" variant="body2" color="text.primary">
                            Repayment Amount: ${pack.repaymentAmount}
                          </Typography>
                          <Typography component="div" variant="body2" color="text.secondary">
                            {`Total Repayment: $${pack.repaymentAmount}`}
                          </Typography>
                        </>
                      }
                    />
                    <Button onClick={() => handleDeletePackage(pack.id)} style={{ color: 'red' }}>
                      Delete
                    </Button>
                  </ListItem>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid container spacing={2}>
              <Grid xs={12} sm={6} md={4}>
                <Skeleton
                  style={{ padding: '10px', marginBottom: '10px' }}
                  sx={{ width: '100%', height: 200, padding: '10px' }}
                />
              </Grid>
              <Grid xs={12} sm={6} md={4}>
                <Skeleton
                  style={{ padding: '10px', marginBottom: '10px' }}
                  sx={{ width: '100%', height: 200, padding: '10px' }}
                />
              </Grid>
              <Grid xs={12} sm={6} md={4}>
                <Skeleton
                  style={{ padding: '10px', marginBottom: '10px' }}
                  sx={{ width: '100%', height: 200, padding: '10px' }}
                />
              </Grid>
            </Grid>
          )}
        </Grid>
      </div>
    </>
  );
};

PackagesList.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default PackagesList;
