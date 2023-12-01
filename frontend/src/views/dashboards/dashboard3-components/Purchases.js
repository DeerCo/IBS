import React from 'react';
import { Card, CardContent, Typography, Box, Fab } from '@mui/material';

import FeatherIcon from 'feather-icons-react';

const Purchases = () => (
  <Card>
    <CardContent>
      <Box display="flex" alignItems="flex-start">
        <Typography
          variant="h4"
          fontWeight="700"
          sx={{
            marginBottom: '0',
          }}
          gutterBottom
        >
          Purchases
        </Typography>
        <Box
          sx={{
            marginLeft: 'auto',
          }}
        >
          <Fab
            size="medium"
            color="primary"
            aria-label="add"
            elevation="0"
            sx={{
              boxShadow: 'none',
            }}
          >
            <FeatherIcon icon="shopping-bag" />
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
        2,367
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
        Monthly Sales
      </Typography>
    </CardContent>
  </Card>
);

export default Purchases;
