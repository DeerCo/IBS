import React from 'react';
import { Box, Button, Stack } from '@mui/material';
import BaseCard from '../../base-card/BaseCard';

const DefaultButtons = () => (
  <BaseCard title="Contained Default Buttons">
    <Box display="flex" justifyContent="center">
      <Stack spacing={1} direction={{ xs: 'column', sm: 'row' }}>
        <Button variant="contained" color="primary">
          Primary
        </Button>
        <Button variant="contained" color="secondary">
          Secondary
        </Button>
        <Button disabled>Disabled</Button>
        <Button href="#text-buttons" variant="contained" color="primary">
          Link
        </Button>
      </Stack>
    </Box>
  </BaseCard>
);

export default DefaultButtons;
