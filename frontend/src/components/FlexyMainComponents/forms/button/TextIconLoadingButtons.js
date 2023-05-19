import React from 'react';
import { Box, Button, Stack } from '@mui/material';
import FeatherIcon from 'feather-icons-react';
import BaseCard from '../../base-card/BaseCard';

const TextIconLoadingButtons = () => (
  <BaseCard title="Text Button With Icons & Loading">
    <Box display="flex" justifyContent="center">
      <Stack spacing={1} direction={{ xs: 'column', sm: 'row' }}>
        <Button color="error" startIcon={<FeatherIcon icon="trash" width="18" height="18" />}>
          Left Icon
        </Button>
        <Button color="secondary" endIcon={<FeatherIcon icon="send" width="18" height="18" />}>
          Right Icon
        </Button>
      </Stack>
    </Box>
  </BaseCard>
);

export default TextIconLoadingButtons;
