import React from 'react';
import { Card, CardContent, Typography, Box, Fab } from '@mui/material';

import FeatherIcon from 'feather-icons-react';

const TotalEarnings = () => (
  <Card>
    <CardContent>
      <Box display="flex" alignItems="flex-start">
        <Typography
          variant="h4"
          sx={{
            marginBottom: '0',
          }}
          gutterBottom
        >
          Total Earnings
        </Typography>
        <Box
          sx={{
            marginLeft: 'auto',
          }}
        >
          <Fab
            size="medium"
            color="secondary"
            aria-label="add"
            elevation="0"
            sx={{
              boxShadow: 'none',
            }}
          >
            <FeatherIcon icon="dollar-sign" />
          </Fab>
        </Box>
      </Box>
      <Typography
        variant="h1"
        fontWeight="500"
        sx={{
          marginBottom: '0',
          marginTop: '20px',
        }}
        gutterBottom
      >
        $93,438.78
      </Typography>
      <Typography
        variant="h6"
        fontWeight="400"
        color="textSecondary"
        sx={{
          marginBottom: '0',
          opacity: '0.6',
        }}
        gutterBottom
      >
        Monthly Revenue
      </Typography>
    </CardContent>
  </Card>
);

export default TotalEarnings;
