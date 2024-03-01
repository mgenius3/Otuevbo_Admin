import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { useState } from 'react';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Button,
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import LoanApplicationDetailsPage from '../../pages/loan/application/customer';
import { cutString } from 'src/utils/format-string';

export const CustomersTable = (props) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [contentview, setContentView] = useState();

  const router = useRouter();
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>user ID</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Date Applied</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((customer) => {
                const isSelected = selected.includes(customer.id);
                // const dateApplied = format(customer.dateApplied, 'MM/dd/yyyy');
                return (
                  <>
                    <Dialog open={open} onClose={handleClose}>
                      <DialogTitle>Loan Applications Details</DialogTitle>
                      <DialogContent>
                        <LoanApplicationDetailsPage loanApplication={contentview} />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>Close</Button>
                      </DialogActions>
                    </Dialog>

                    <TableRow
                      hover
                      key={customer.userId}
                      selected={isSelected}
                      // onClick={() => router.push('customer', customer, { shallow: false })}
                      onClick={(e) => {
                        handleClickOpen(e);
                        setContentView(customer);
                      }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isSelected}
                          onChange={(event) => {
                            if (event.target.checked) {
                              onSelectOne?.(customer.id);
                            } else {
                              onDeselectOne?.(customer.id);
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Stack alignItems="center" direction="row" spacing={2}>
                          <Avatar src={customer.avatar}>{getInitials(customer.name)}</Avatar>
                          <Typography variant="subtitle2">{customer.name}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>{cutString(customer.userId, 12)}</TableCell>
                      <TableCell>{cutString(customer.email, 10)}</TableCell>
                      <TableCell>{customer.phone}</TableCell>
                      <TableCell>{customer.dateApplied}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          style={{ padding: 5 }}
                          color={
                            customer.status == 'pending'
                              ? 'warning'
                              : customer.status == 'declined'
                              ? 'error'
                              : 'info'
                          }
                        >
                          {customer.status}
                        </Button>
                      </TableCell>
                    </TableRow>
                  </>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CustomersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};
