import React from 'react';
import { Box, IconButton, Tooltip, Stack } from '@mui/material';
import FeatherIcon from 'feather-icons-react';
import BaseCard from '../../base-card/BaseCard';

const IconColorButtons = () => (
  <BaseCard title="Icon Color Buttons">
    <Box display="flex" justifyContent="center">
      <Stack spacing={1} direction={{ xs: 'column', sm: 'row' }}>
        <Tooltip title="Bell">
          <IconButton variant="contained" color="primary" sx={{}} aria-label="primary-bell">
            <FeatherIcon icon="bell" width="18" height="18" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Bell">
          <IconButton variant="contained" color="secondary" sx={{}} aria-label="secondary-bell">
            <FeatherIcon icon="bell" width="18" height="18" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Bell">
          <IconButton
            variant="contained"
            sx={{
              color: (theme) => theme.palette.error.main,
            }}
            aria-label="error-bell"
          >
            <FeatherIcon icon="bell" width="18" height="18" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Bell">
          <IconButton
            variant="contained"
            sx={{
              color: (theme) => theme.palette.warning.main,
            }}
            aria-label="warning-bell"
          >
            <FeatherIcon icon="bell" width="18" height="18" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Bell">
          <IconButton
            variant="contained"
            color="success"
            sx={{
              color: (theme) => theme.palette.success.main,
            }}
            aria-label="success-bell"
          >
            <FeatherIcon icon="bell" width="18" height="18" />
          </IconButton>
        </Tooltip>
      </Stack>
    </Box>
  </BaseCard>
);

export default IconColorButtons;
