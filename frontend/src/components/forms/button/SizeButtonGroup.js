import React from 'react';
import { Box, Button, ButtonGroup, Stack } from '@mui/material';
import BaseCard from '../../base-card/BaseCard';

const SizeButtonGroup = () => (
  <BaseCard title="Size Button Group">
    <Box
      sx={{
        textAlign: 'center',
      }}
    >
      <Stack spacing={1} direction={{ xs: 'column', sm: 'column' }}>
        <Box>
          <ButtonGroup size="small" variant="outlined" aria-label="outlined primary button group">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
        </Box>
        <Box>
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
        </Box>
        <Box>
          <ButtonGroup size="large" variant="outlined" aria-label="text button group">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
        </Box>
      </Stack>
    </Box>
  </BaseCard>
);

export default SizeButtonGroup;
