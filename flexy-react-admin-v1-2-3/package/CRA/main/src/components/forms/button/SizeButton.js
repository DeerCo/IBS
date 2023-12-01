import React from 'react';
import { Box, Button, Stack } from '@mui/material';
import BaseCard from '../../base-card/BaseCard';

const SizeButton = () => (
  <BaseCard title="Contained Button Sizes">
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Stack spacing={1} direction={{ xs: 'column', sm: 'row' }} alignItems="center">
        <Button variant="contained" size="small">
          Small
        </Button>
        <Button variant="contained" size="medium">
          Medium
        </Button>
        <Button variant="contained" size="large">
          Large
        </Button>
      </Stack>
    </Box>
  </BaseCard>
);

export default SizeButton;
