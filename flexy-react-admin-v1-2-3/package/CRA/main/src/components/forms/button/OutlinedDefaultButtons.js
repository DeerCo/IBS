import React from 'react';
import { Box, Button, Stack } from '@mui/material';
import BaseCard from '../../base-card/BaseCard';

const OutlinedDefaultButtons = () => (
  <BaseCard title="Default Outlined Buttons">
    <Box display="flex" justifyContent="center">
      <Stack spacing={1} direction={{ xs: 'column', sm: 'row' }}>
        <Button variant="outlined" color="primary">
          Primary
        </Button>
        <Button variant="outlined" color="secondary">
          Secondary
        </Button>
        <Button disabled>Disabled</Button>
        <Button href="#text-buttons" variant="outlined" color="primary">
          Link
        </Button>
      </Stack>
    </Box>
  </BaseCard>
);

export default OutlinedDefaultButtons;
