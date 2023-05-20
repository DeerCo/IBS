import React from 'react';
import { Box, Button, Stack } from '@mui/material';
import BaseCard from '../../base-card/BaseCard';

const TextDefaultButtons = () => (
  <BaseCard title="Text Default Buttons">
    <Box display="flex" justifyContent="center">
      <Stack spacing={1} direction={{ xs: 'column', sm: 'row' }}>
        <Button color="primary">Primary</Button>
        <Button color="secondary">Secondary</Button>
        <Button disabled>Disabled</Button>
        <Button href="#text-buttons" color="primary">
          Link
        </Button>
      </Stack>
    </Box>
  </BaseCard>
);

export default TextDefaultButtons;
