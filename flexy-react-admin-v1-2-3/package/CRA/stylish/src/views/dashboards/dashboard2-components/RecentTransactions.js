import React from 'react';
import { Typography, Box, Fab, Button } from '@mui/material';
import FeatherIcon from 'feather-icons-react';
import DashboardCard from '../../../components/base-card/DashboardCard';

const transactions = [
  {
    btnbg: 'primary.light',
    btntext: 'primary.main',
    icon: 'dollar-sign',
    title: 'PayPal Transfer',
    subtitle: 'Money Added',
    type: 'profit',
    profit: '+$350',
  },
  {
    btnbg: 'success.light',
    btntext: 'success.main',
    icon: 'shield',
    title: 'Wallet',
    subtitle: 'Bill payment',
    type: 'loss',
    profit: '-$560',
  },
  {
    btnbg: 'error.light',
    btntext: 'error.main',
    icon: 'credit-card',
    title: 'Credit Card',
    subtitle: 'Money reversed',
    type: 'profit',
    profit: '+$350',
  },
  {
    btnbg: 'warning.light',
    btntext: 'warning.main',
    icon: 'check',
    title: 'Bank Transfer',
    subtitle: 'Money Added',
    type: 'profit',
    profit: '+$350',
  },
  {
    btnbg: 'primary.light',
    btntext: 'primary.main',
    icon: 'dollar-sign',
    title: 'Refund',
    subtitle: 'Payment Sent',
    type: 'loss',
    profit: '-$50',
  },
];

const RecentTransactions = () => (
  <DashboardCard title="Recent Transactions" subtitle="List of payments">
    <Box
      sx={{
        mt: -3,
      }}
    >
      {transactions.map((transaction) => (
        <Box
          key={transaction.title}
          display="flex"
          alignItems="center"
          sx={{
            mt: 2,
            pt: 1,
          }}
        >
          <Fab
            sx={{
              backgroundColor: transaction.btnbg,
              color: transaction.btntext,
              boxShadow: 'none',
              height: '45px',
              width: '45px',
              borderRadius: '10px',
              "&:hover": {
                  backgroundColor: transaction.btnbg,
                }
            }}
            aria-label="transactions"
          >
            <FeatherIcon icon={transaction.icon} width="20" />
          </Fab>
          <Box
            sx={{
              ml: 2,
            }}
          >
            <Typography variant="h5">{transaction.title}</Typography>
            <Typography color="textSecondary" variant="h6" fontWeight="400">
              {transaction.subtitle}
            </Typography>
          </Box>
          <Box
            sx={{
              ml: 'auto',
            }}
          >
            <Typography
              color={transaction.type === 'profit' ? 'success.main' : 'error.main'}
              variant="h6"
            >
              {transaction.profit}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
    <Box
      display="flex"
      alignItems="center"
      sx={{
        borderTop: '1px solid rgba(0,0,0,0.1)',
        pt: 2,
        mt: 3,
      }}
    >
      <Button variant="contained" color="primary">
        Add
      </Button>
      <Box
        sx={{
          ml: 'auto',
        }}
      >
        <Typography color="textSecondary" variant="h6" fontWeight="400">
          36 Recent Transactions
        </Typography>
      </Box>
    </Box>
  </DashboardCard>
);

export default RecentTransactions;
