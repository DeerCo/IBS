import React from 'react';
import { Box, Button, Stack } from '@mui/material';
import FeatherIcon from 'feather-icons-react';
import BaseCard from '../../base-card/BaseCard';

const IconLoadingButtons = () => (
  <BaseCard title="Button With Icons">
    <Box display="flex" justifyContent="center">
      <Stack spacing={1} direction={{ xs: 'column', sm: 'row' }}>
        <Button
          variant="contained"
          color="error"
          startIcon={<FeatherIcon icon="trash" width="18" />}
        >
          Left Icon
        </Button>
        <Button
          variant="contained"
          color="secondary"
          endIcon={<FeatherIcon icon="send" width="18" />}
        >
          Right Icon
        </Button>
      </Stack>
    </Box>
  </BaseCard>
);

export default IconLoadingButtons;
