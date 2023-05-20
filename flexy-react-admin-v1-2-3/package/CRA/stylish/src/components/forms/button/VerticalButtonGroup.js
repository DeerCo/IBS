import React from 'react';
import { Box, Button, ButtonGroup, Stack } from '@mui/material';
import BaseCard from '../../base-card/BaseCard';

const VerticalButtonGroup = () => (
  <BaseCard title="Vertical Button group">
    <Box display="flex" justifyContent="center">
      <Stack spacing={1} direction={{ xs: 'column', sm: 'row' }}>
        <ButtonGroup
          orientation="vertical"
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>

        <ButtonGroup orientation="vertical" variant="outlined" aria-label="outlined button group">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>

        <ButtonGroup orientation="vertical" variant="text" aria-label="text button group">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
      </Stack>
    </Box>
  </BaseCard>
);

export default VerticalButtonGroup;
