// import { useCallback, useState } from 'react';
// import {
//   Box,
//   Button,
//   Card,
//   CardActions,
//   CardContent,
//   CardHeader,
//   Divider,
//   TextField,
//   Unstable_Grid2 as Grid,
// } from '@mui/material';
// import { toast } from 'react-toastify';
// import FetchApiClient from 'fetch_api_clients/api';
// import { useRouter } from 'next/router';

// const plan = [
//   {
//     value: 'daily',
//     label: 'Daily',
//     days: 1,
//   },
//   {
//     value: 'weekly',
//     label: 'Weekly',
//     days: 7,
//   },
//   {
//     value: 'bi-weekly',
//     label: 'Bi-weekly',
//     days: 14,
//   },
//   {
//     value: 'monthly',
//     label: 'Monthly',
//     months: 1,
//   },
//   {
//     value: 'bi-monthly',
//     label: 'Bi-Monthly',
//     months: 2,
//   },
//   {
//     value: '3 month',
//     label: '3 Month',
//     months: 3,
//   },
//   {
//     value: '4 month',
//     label: '4 Month',
//     months: 4,
//   },
//   {
//     value: '6 month',
//     label: '6 Month',
//     months: 6,
//   },
//   {
//     value: 'annual',
//     label: 'Annual',
//     months: 12,
//   },
// ];

// const AddPackageFormDetails = () => {
//   const [values, setValues] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [maturityDate, setMaturityDate] = useState(null); // State to store maturity date
//   const api = new FetchApiClient('/loan');
//   const router = useRouter();

//   const handleChange = useCallback((event) => {
//     console.log(maturityDate);
//     const { name, value } = event.target;
//     setValues((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   }, []);

//   const calculateMaturityDate = (paymentPlan) => {
//     // Calculate maturity date based on payment plan
//     let calculatedMaturityDate = null;
//     const currentDate = new Date();
//     const selectedPlan = plan.find((item) => item.value === paymentPlan);

//     if (selectedPlan) {
//       if (selectedPlan.days) {
//         calculatedMaturityDate = addDays(currentDate, selectedPlan.days);
//       } else if (selectedPlan.months) {
//         calculatedMaturityDate = addMonths(currentDate, selectedPlan.months);
//       }
//     }

//     setMaturityDate(calculatedMaturityDate);
//     setValues((prevState) => ({
//       ...prevState,
//       maturityDate: calculatedMaturityDate?.toLocaleDateString(),
//     }));
//   };

//   const addDays = (date, days) => {
//     const newDate = new Date(date);
//     newDate.setDate(date.getDate() + days);
//     return newDate;
//   };

//   const addMonths = (date, months) => {
//     const newDate = new Date(date);
//     newDate.setMonth(date.getMonth() + months);
//     return newDate;
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);
//     // Here you can perform the submission, like calling an API to save the details
//     console.log(values);
//     try {
//       // Simulating an API call with setTimeout
//       const { response, error } = await api.post(`/add/packages/`, values);
//       if (error) {
//         throw new Error(error);
//       }
//       toast.success(response);
//       // After submission is successful, you can reset the form values
//       setValues({});
//       router.back();
//     } catch (error) {
//       toast.error(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form autoComplete="off" onSubmit={handleSubmit}>
//       <Card>
//         <CardHeader subheader="Fill in all information below" title="Loan Packages" />
//         <CardContent sx={{ pt: 0 }}>
//           <Box sx={{ m: -1.5 }}>
//             <Grid container spacing={3}>
//               <Grid xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   helperText="Payment Plan"
//                   name="paymentPlan"
//                   onChange={(event) => {
//                     calculateMaturityDate(event.target.value);
//                     handleChange(event);
//                   }}
//                   required
//                   select
//                   SelectProps={{ native: true }}
//                 >
//                   <option selected> </option>
//                   {plan.map((option) => (
//                     <option key={option.value} value={option.value}>
//                       {option.label}
//                     </option>
//                   ))}
//                 </TextField>
//               </Grid>

//               <Grid xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   helperText="Loan Amount"
//                   name="loanAmount"
//                   type="number"
//                   onChange={handleChange}
//                   required
//                 />
//               </Grid>
//               <Grid xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   helperText="Repayment Amount"
//                   name="repaymentAmount"
//                   onChange={handleChange}
//                   required
//                   type="number"
//                 />
//               </Grid>

//               {/* <Grid xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   helperText="Total Repayment Amount"
//                   name="totalRepaymentAmount"
//                   onChange={handleChange}
//                   type="number"
//                 />
//               </Grid> */}

//               {/* Display Maturity Date */}
//               <Grid item xs={6}>
//                 {maturityDate && (
//                   <TextField
//                     fullWidth
//                     helperText="Maturity Date"
//                     name="maturityDate"
//                     value={maturityDate.toLocaleDateString()}
//                     InputProps={{
//                       readOnly: true,
//                     }}
//                   />
//                 )}
//               </Grid>
//             </Grid>
//           </Box>
//         </CardContent>
//         <Divider />
//         <CardActions sx={{ justifyContent: 'flex-end' }}>
//           <Button
//             variant="contained"
//             type="submit"
//             disabled={loading} // Disable the button when loading
//           >
//             {loading ? 'Submitting...' : 'Save details'}
//           </Button>
//         </CardActions>
//       </Card>
//     </form>
//   );
// };

// export default AddPackageFormDetails;

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
    display: 6,
  },
  {
    value: 'weekly',
    label: 'Weekly',
    days: 7,
    display: 4,
  },
  // {
  //   value: 'bi-weekly',
  //   label: 'Bi-weekly',
  //   days: 14,
  // },
  {
    value: 'monthly',
    label: 'Monthly',
    months: 1,
    days: 30,
    display: 12,
  },
  // {
  //   value: 'bi-monthly',
  //   label: 'Bi-Monthly',
  //   months: 2,
  //   days: 60,
  // },
  // {
  //   value: '3 month',
  //   label: '3 Month',
  //   months: 3,
  //   days: 90,
  // },
  // {
  //   value: '4 month',
  //   label: '4 Month',
  //   months: 4,
  //   days: 120,
  // },
  // {
  //   value: '6 month',
  //   label: '6 Month',
  //   months: 6,
  //   days: 180,
  // },
  {
    value: 'annual',
    label: 'Annual',
    months: 12,
    days: 365,
    display: 5,
  },
];

const AddPackageFormDetails = () => {
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [maturityDate, setMaturityDate] = useState(null); // State to store maturity date
  const [maturityTimeOptions, setMaturityTimeOptions] = useState([]);
  const api = new FetchApiClient('/loan');
  const router = useRouter();

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    if (name === 'paymentPlan') {
      calculateMaturityTimeOptions(value);
    }
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const calculateMaturityTimeOptions = (paymentPlan) => {
    const selectedPlan = plan.find((item) => item.value === paymentPlan);
    console.log(selectedPlan);
    let options = [];

    if (selectedPlan && selectedPlan.value == 'daily') {
      for (let i = 1; i <= selectedPlan.display; i++) {
        options.push({
          value: i * selectedPlan.days,
          label: `${i} day${i > 1 ? 's' : ''}`,
        });
      }
    } else if (selectedPlan && selectedPlan.value == 'weekly') {
      for (let i = 1; i <= selectedPlan.display; i++) {
        options.push({
          value: i * selectedPlan.days,
          label: `${i} ${i > 1 ? 'weeks' : 'week'}`,
        });
      }
    } else if (selectedPlan && selectedPlan.value == 'monthly') {
      for (let i = 1; i <= selectedPlan.display; i++) {
        options.push({
          value: i * selectedPlan.days,
          label: `${i} ${i > 1 ? 'months' : 'month'}`,
        });
      }
    } else if (selectedPlan && selectedPlan.value === 'annual') {
      for (let i = 1; i <= selectedPlan.display; i++) {
        options.push({
          value: i * selectedPlan.days,
          label: `${i} ${i > 1 ? 'years' : 'year'}`,
        });
      }
    }
    console.log(options);
    setMaturityTimeOptions(options);
  };

  const handleSubmit = async (event) => {
    console.log(values);
    event.preventDefault();
    setLoading(true);
    try {
      const { response, error } = await api.post(`/add/packages/`, values);
      if (error) {
        throw new Error(error);
      }
      toast.success(response);
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

              {/* Maturity Time Field */}
              {maturityTimeOptions.length > 0 && (
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    helperText="Maturity Time"
                    name="maturityTime"
                    select
                    SelectProps={{ native: true }}
                    onChange={handleChange}
                    required
                  >
                    <option selected> </option>
                    {maturityTimeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </Grid>
              )}

              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Repayment Installment"
                  name="noOfRepayment"
                  select
                  SelectProps={{ native: true }}
                  onChange={handleChange}
                  required
                >
                  <option selected> </option>

                  <option key={1} value={1}>
                    {'once'}
                  </option>
                  <option key={2} value={2}>
                    {'twice'}
                  </option>
                  <option key={3} value={3}>
                    {'thrice'}
                  </option>
                  <option key={4} value={4}>
                    {'four times'}
                  </option>
                  <option key={5} value={5}>
                    {'five times'}
                  </option>
                </TextField>
              </Grid>
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
          <Button variant="contained" type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Save details'}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default AddPackageFormDetails;
