import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Chip,
  Paper,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import Breadcrumb from '../../layouts/full-layout/breadcrumb/Breadcrumb';
import PageContainer from '../../components/container/PageContainer';

import img1 from '../../assets/images/products/s1.jpg';
import img2 from '../../assets/images/products/s2.jpg';
import img3 from '../../assets/images/products/s3.jpg';
import img4 from '../../assets/images/products/s4.jpg';

const rows = [
  {
    imgsrc: img1,
    pname: 'Good butterscotch ice-cream',
    customer: 'Sunil Joshi',
    inventory: 'In Stock',
    price: '250.00',
    items: '2',
    history: [
      { date: '2021-02-05', customerId: '11091700', amount: 3 },
      { date: '2021-02-02', customerId: 'Anonymous', amount: 1 },
    ],
  },
  {
    imgsrc: img2,
    pname: 'Supreme fresh tomato available',
    customer: 'John Deo',
    inventory: 'Out of Stock',
    price: '450.00',
    items: '1',
    history: [
      { date: '2021-02-05', customerId: '15202410', amount: 3 },
      { date: '2021-02-02', customerId: 'Anonymous', amount: 1 },
    ],
  },
  {
    imgsrc: img3,
    pname: 'Red color candy from Gucci',
    customer: 'Andrew McDownland',
    inventory: 'Out of Stock',
    price: '150.00',
    items: '1',
    history: [
      { date: '2021-02-05', customerId: '15202410', amount: 3 },
      { date: '2021-02-02', customerId: 'Anonymous', amount: 1 },
    ],
  },
  {
    imgsrc: img4,
    pname: 'Stylish night lamp for night',
    customer: 'Christopher Jamil',
    inventory: 'In Stock',
    price: '550.00',
    items: '6',
    history: [
      { date: '2021-02-05', customerId: '15202410', amount: 3 },
      { date: '2021-02-02', customerId: 'Anonymous', amount: 1 },
    ],
  },
];

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow>
        <TableCell
          sx={{
            borderBottom: '0',
          }}
        >
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell
          sx={{
            borderBottom: '0',
          }}
        >
          <Box display="flex" alignItems="center">
            <Avatar
              src={row.imgsrc}
              alt={row.imgsrc}
              sx={{
                borderRadius: '10px',
                height: '70px',
                width: '90px',
              }}
            />
            <Box
              sx={{
                ml: 2,
              }}
            >
              <Typography variant="h5" fontWeight="600">
                {row.pname}
              </Typography>
            </Box>
          </Box>
        </TableCell>
        <TableCell
          sx={{
            borderBottom: '0',
          }}
        >
          <Typography color="textSecondary" variant="h5" fontWeight="600">
            {row.customer}
          </Typography>
        </TableCell>
        <TableCell
          sx={{
            borderBottom: '0',
          }}
        >
          <Chip
            sx={{
              backgroundColor:
                row.inventory === 'In Stock'
                  ? (theme) => theme.palette.success.light
                  : row.inventory === 'Out of Stock'
                  ? (theme) => theme.palette.error.light
                  : (theme) => theme.palette.secondary.light,
              color:
                row.inventory === 'In Stock'
                  ? (theme) => theme.palette.success.main
                  : row.inventory === 'Out of Stock'
                  ? (theme) => theme.palette.error.main
                  : (theme) => theme.palette.secondary.main,
              borderRadius: '6px',
              pl: '3px',
              pr: '3px',
            }}
            size="small"
            label={row.inventory}
          />
        </TableCell>
        <TableCell
          sx={{
            borderBottom: '0',
          }}
        >
          <Typography color="textSecondary" variant="h5" fontWeight="400">
            ${row.price}
          </Typography>
        </TableCell>
        <TableCell
          sx={{
            borderBottom: '0',
          }}
        >
          <Typography color="textSecondary" fontWeight="400">
            {row.items}
          </Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography
                gutterBottom
                variant="h5"
                sx={{
                  mt: 2,
                  backgroundColor: (theme) => theme.palette.grey.A700,
                  p: '5px 15px',
                  color: (theme) =>
                    `${
                      theme.palette.mode === 'dark'
                        ? theme.palette.grey.A200
                        : 'rgba(0, 0, 0, 0.87)'
                    }`,
                }}
              >
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6">Date</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">Customer</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">Amount</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">Total price ($)</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        <Typography color="textSecondary" fontWeight="400">
                          {historyRow.date}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textSecondary" fontWeight="400">
                          {historyRow.customerId}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textSecondary" fontWeight="400">
                          {historyRow.amount}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography fontWeight="600">
                          {Math.round(historyRow.amount * row.price * 100) / 100}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
Row.propTypes = {
  row: PropTypes.shape({
    price: PropTypes.string,
    items: PropTypes.string,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    inventory: PropTypes.string.isRequired,
    imgsrc: PropTypes.string.isRequired,
    customer: PropTypes.string.isRequired,
    pname: PropTypes.string,
  }),
};
const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Collapsible Table',
  },
];

const CollapsibleTable = () => (
  <PageContainer title="Collapsible Table" description="this is Collapsible Table page">
    {/* breadcrumb */}
    <Breadcrumb title="Collapsible Table" items={BCrumb} />
    {/* end breadcrumb */}
    <Card>
      <CardContent>
        <TableContainer component={Paper}>
          <Table
            aria-label="collapsible table"
            sx={{
              whiteSpace: {
                xs: 'nowrap',
                sm: 'unset',
              },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>
                  <Typography variant="h5">Product</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h5">Customer</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h5">Inventory</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h5">Price</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h5">Items</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row key={row.pname} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  </PageContainer>
);

export default CollapsibleTable;
