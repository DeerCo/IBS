import React from 'react';
import { Box, Button, Stack } from '@mui/material';
import BaseCard from '../../base-card/BaseCard';

const OutlinedSizeButton = () => (
  <BaseCard title="Outlined Button Sizes">
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Stack spacing={1} direction={{ xs: 'column', sm: 'row' }} sx={{ alignItems: 'center' }}>
        <Button variant="outlined" size="small">
          Small
        </Button>
        <Button variant="outlined" size="medium">
          Medium
        </Button>
        <Button variant="outlined" size="large">
          Large
        </Button>
      </Stack>
    </Box>
  </BaseCard>
);

export default OutlinedSizeButton;
