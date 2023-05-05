import React from 'react';
import { Box, Button, Stack } from '@mui/material';
import BaseCard from '../../base-card/BaseCard';

const OutlinedColorButtons = () => (
  <BaseCard
    title="Outlined Color Buttons"
    variant="outlined"
    sx={{
      p: 0,
      width: '100%',
    }}
  >
    <Box display="flex" justifyContent="center">
      <Stack spacing={1} direction={{ xs: 'column', sm: 'row' }}>
        <Button variant="outlined" color="primary">
          Primary
        </Button>
        <Button variant="outlined" color="secondary">
          Secondary
        </Button>
        <Button variant="outlined" color="error">
          Error
        </Button>
        <Button variant="outlined" color="warning">
          Warning
        </Button>
        <Button variant="outlined" color="success">
          Success
        </Button>
      </Stack>
    </Box>
  </BaseCard>
);

export default OutlinedColorButtons;
