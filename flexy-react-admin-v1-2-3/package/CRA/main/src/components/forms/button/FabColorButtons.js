import React from 'react';
import { Box, Fab, Typography, Tooltip, Stack } from '@mui/material';
import FeatherIcon from 'feather-icons-react';
import BaseCard from '../../base-card/BaseCard';

const FabColorButtons = () => (
  <BaseCard title="Color FAB">
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mb: 2,
      }}
    >
      <Stack spacing={1} direction={{ xs: 'column', sm: 'row' }}>
        <Tooltip title="Send">
          <Fab aria-label="send">
            <FeatherIcon icon="send" width="20" />
          </Fab>
        </Tooltip>
        <Tooltip title="Send">
          <Fab color="primary" aria-label="send">
            <FeatherIcon icon="send" width="20" />
          </Fab>
        </Tooltip>
        <Tooltip title="Send">
          <Fab color="secondary" aria-label="send">
            <FeatherIcon icon="send" width="20" />
          </Fab>
        </Tooltip>
      </Stack>
    </Box>
    <Box display="flex" justifyContent="center">
      {/* extended */}
      <Stack spacing={1} direction={{ xs: 'column', sm: 'row' }}>
        <Fab
          variant="extended"
          sx={{
            mr: 1,
            mb: 2,
          }}
          aria-label="default-send"
        >
          <FeatherIcon icon="send" width="20" />
          <Typography
            sx={{
              ml: 1,
              textTransform: 'capitalize',
            }}
          >
            Default
          </Typography>
        </Fab>
        <Fab
          variant="extended"
          color="primary"
          sx={{
            mr: 1,
            mb: 2,
          }}
          aria-label="primary-send"
        >
          <FeatherIcon icon="send" width="20" />
          <Typography
            sx={{
              ml: 1,
              textTransform: 'capitalize',
            }}
          >
            Primary
          </Typography>
        </Fab>
        <Fab
          variant="extended"
          color="secondary"
          sx={{
            mr: 1,
            mb: 2,
          }}
          aria-label="secondary-send"
        >
          <FeatherIcon icon="send" width="20" />
          <Typography
            sx={{
              ml: 1,
              textTransform: 'capitalize',
            }}
          >
            Secondary
          </Typography>
        </Fab>
      </Stack>
    </Box>
  </BaseCard>
);

export default FabColorButtons;
