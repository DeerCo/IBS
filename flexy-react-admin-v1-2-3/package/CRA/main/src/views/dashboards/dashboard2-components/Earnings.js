import React from 'react';
import { Card, CardContent, Typography, Fab, Box } from '@mui/material';

import FeatherIcon from 'feather-icons-react';

const Earnings = () => (
  <Card
    sx={{
      backgroundColor: (theme) => theme.palette.secondary.main,
    }}
  >
    <CardContent>
      <Box display="flex" alignItems="flex-start">
        <Box>
          <Typography
            variant="h3"
            sx={{
              color: '#fff',
            }}
          >
            Earnings
          </Typography>
        </Box>
        <Box
          sx={{
            ml: 'auto',
          }}
        >
          <Fab
            elevation="0"
            color="primary"
            aria-label="dollar"
            sx={{
              width: '48px',
              height: '48px',
              boxShadow: 'none',
            }}
          >
            <FeatherIcon icon="dollar-sign" width="24" height="24" />
          </Fab>
        </Box>
      </Box>
      <Typography
        fontWeight="500"
        variant="h1"
        sx={{
          color: '#fff',
          mt: 3,
        }}
      >
        $93,438
      </Typography>
      <Typography
        variant="subtitle1"
        fontWeight="400"
        sx={{
          color: '#fff',
          opacity: '0.5',
        }}
      >
        Monthly revenue
      </Typography>
    </CardContent>
  </Card>
);

export default Earnings;
