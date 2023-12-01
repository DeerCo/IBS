import React from 'react';
import { Box, Button, Stack } from '@mui/material';
import BaseCard from '../../base-card/BaseCard';

const TextColorButtons = () => (
  <BaseCard title="Text Color Buttons">
    <Box display="flex" justifyContent="center">
      <Stack spacing={1} direction={{ xs: 'column', sm: 'row' }}>
        <Button color="primary">Primary</Button>
        <Button color="secondary">Secondary</Button>
        <Button color="error">Error</Button>
        <Button color="warning">Warning</Button>
        <Button color="success">Success</Button>
      </Stack>
    </Box>
  </BaseCard>
);

export default TextColorButtons;
