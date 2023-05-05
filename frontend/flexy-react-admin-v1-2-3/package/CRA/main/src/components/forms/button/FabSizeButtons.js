import React from 'react';
import { Box, Typography, Fab, Tooltip, Stack } from '@mui/material';
import FeatherIcon from 'feather-icons-react';
import BaseCard from '../../base-card/BaseCard';

const FabSizeButtons = () => (
  <BaseCard title="Sizes FAB">
    <Box display="flex" justifyContent="center">
      <Stack spacing={1} direction={{ xs: 'column', sm: 'row' }}>
        <Tooltip title="Bell">
          <Fab size="small" color="primary" aria-label="small-bell">
            <FeatherIcon fontSize="small" icon="bell" width="16" height="16" />
          </Fab>
        </Tooltip>
        <Tooltip title="Bell">
          <Fab size="medium" color="secondary" aria-label="medium-bell">
            <FeatherIcon fontSize="small" icon="bell" width="18" height="18" />
          </Fab>
        </Tooltip>
        <Tooltip title="Bell">
          <Fab size="large" color="default" aria-label="large-bell">
            <FeatherIcon fontSize="small" icon="bell" width="20" />
          </Fab>
        </Tooltip>
      </Stack>
    </Box>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: 2,
      }}
    >
      <Stack spacing={1} direction={{ xs: 'column', sm: 'row' }}>
        <Fab size="small" variant="extended" color="primary" aria-label="small-bell">
          <FeatherIcon fontSize="small" icon="bell" width="16" height="16" />
          <Typography
            sx={{
              ml: 1,
              textTransform: 'capitalize',
              fontSize: '14px',
            }}
          >
            Primary
          </Typography>
        </Fab>
        <Fab size="medium" variant="extended" color="secondary" aria-label="medium-bell">
          <FeatherIcon fontSize="small" icon="bell" width="18" height="18" />
          <Typography
            sx={{
              ml: 1,
              textTransform: 'capitalize',
            }}
          >
            Secondary
          </Typography>
        </Fab>
        <Fab size="large" variant="extended" color="default" aria-label="large-home">
          <FeatherIcon fontSize="small" icon="home" width="18" height="18" />
          <Typography
            fontWeight="500"
            sx={{
              ml: 1,
              textTransform: 'capitalize',
            }}
          >
            Default
          </Typography>
        </Fab>
      </Stack>
    </Box>
  </BaseCard>
);

export default FabSizeButtons;
