import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { LoanRepaymentFormDetails } from './form';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import FetchApiClient from 'fetch_api_clients/api';

const Page = ({ data }) => {
  console.log(data);

  return (
    <>
      <Head>
        <title>Account | Otuevbo</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">Loan Repayment</Typography>
            </div>

            <div>
              <Grid container spacing={3}>
                {/* <Grid xs={12} md={6} lg={4}>
                <AccountProfile />
              </Grid> */}
                <Grid xs={12} md={6} lg={8}>
                  <LoanRepaymentFormDetails data={data} />
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export async function getServerSideProps(context) {
  // Fetch data from an API or any other source
  // const router = useRouter();
  const { uid } = context.query;
  const api = new FetchApiClient('/loan');

  const { response, error } = await api.get(`/application/${uid}`);
  // Pass fetched data as props to the component
  return {
    props: {
      data: response,
    },
  };
}

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
