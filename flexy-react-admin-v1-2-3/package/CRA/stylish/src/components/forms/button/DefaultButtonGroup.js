import React from 'react';
import { Box, Button, ButtonGroup, Stack } from '@mui/material';
import BaseCard from '../../base-card/BaseCard';

const DefaultButtonGroup = () => (
  <BaseCard title="Default Button Group">
    <Box display="flex" justifyContent="center">
      <Stack spacing={1} direction="column">
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
        <ButtonGroup variant="text" aria-label="text button group">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
      </Stack>
    </Box>
  </BaseCard>
);

export default DefaultButtonGroup;
