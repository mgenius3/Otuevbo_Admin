import PropTypes from 'prop-types';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ClockIcon from '@heroicons/react/24/solid/ClockIcon';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  SvgIcon,
  Typography,
  Button,
} from '@mui/material';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import Link from 'next/link';
import EyeIcon from '@heroicons/react/24/solid/EyeIcon';

export const LoanCard = (props) => {
  const { loan } = props;

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pb: 3,
          }}
        >
          {/* <Avatar src={loan.logo} variant="square" /> */}
        </Box>
        <Typography align="center" gutterBottom variant="h5">
          {loan.title}
        </Typography>
        <Typography align="center" variant="body1">
          {loan.description}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 2 }}
      >
        <Stack alignItems="center" direction="row" spacing={1}>
          {/* <SvgIcon color="action" fontSize="small">
            <ClockIcon />
          </SvgIcon> */}
          <Typography color="text.secondary" display="inline" variant="body2">
            <Link href={loan.rightButtonpath}>
              <Button
                startIcon={
                  <SvgIcon fontSize="small">
                    {loan.rightButton == 'add' ? <PlusIcon /> : <EyeIcon />}
                  </SvgIcon>
                }
                variant="contained"
              >
                {loan.rightButton}
              </Button>
            </Link>
          </Typography>
        </Stack>
        <Stack alignItems="center" direction="row" spacing={1}>
          {/* <SvgIcon color="action" fontSize="small">
            <ArrowDownOnSquareIcon />
          </SvgIcon> */}
          <Typography color="text.secondary" display="inline" variant="body2">
            <Link href={loan.leftButtonpath}>
              <Button
                startIcon={
                  <SvgIcon fontSize="small">
                    {loan.leftButton == 'add' ? <PlusIcon /> : <EyeIcon />}
                  </SvgIcon>
                }
                variant="contained"
              >
                {loan.leftButton}
              </Button>
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

LoanCard.propTypes = {
  loan: PropTypes.object.isRequired,
};
