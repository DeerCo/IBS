import React from 'react';
import { Box, Card, CardContent, Button } from '@mui/material';
import CustomTextField from '../forms/custom-elements/CustomTextField';
import WidgetCard from '../base-card/WidgetCard';

const Subscribe = () => (
  <Card
    sx={{
      mb: 4,
    }}
  >
    <CardContent>
      <WidgetCard title="Subscribe" />

      <Box
        sx={{
          mt: 2,
        }}
      >
        <CustomTextField
          id="name"
          fullWidth
          placeholder="Enter Name"
          variant="outlined"
          size="small"
          inputProps={{ 'aria-label': 'Enter Name' }}
          sx={{
            mb: 1,
          }}
        />
        <CustomTextField
          id="email"
          fullWidth
          placeholder="Enter Email"
          inputProps={{ 'aria-label': 'Enter Email' }}
          variant="outlined"
          size="small"
          sx={{
            mb: 1,
          }}
        />
        <Button
          variant="contained"
          color="secondary"
          size="large"
          sx={{
            width: '100%',
            display: 'block',
          }}
        >
          Subscribe
        </Button>
      </Box>
    </CardContent>
  </Card>
);

export default Subscribe;
