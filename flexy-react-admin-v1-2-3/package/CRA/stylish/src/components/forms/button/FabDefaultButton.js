import React from 'react';
import { Box, Typography, Fab, Tooltip, Stack } from '@mui/material';
import FeatherIcon from 'feather-icons-react';
import BaseCard from '../../base-card/BaseCard';

const FabDefaultButton = () => (
  <BaseCard title="Default FAB">
    <Box>
      <Box display="flex" justifyContent="center">
        <Stack spacing={1} direction={{ xs: 'column', sm: 'row' }}>
          <Tooltip title="Send">
            <Fab color="primary" aria-label="send">
              <FeatherIcon icon="send" width="20" />
            </Fab>
          </Tooltip>
          <Tooltip title="Add">
            <Fab color="secondary" aria-label="plus">
              <FeatherIcon icon="plus" width="20" />
            </Fab>
          </Tooltip>
          <Fab disabled aria-label="clipboard">
            <FeatherIcon icon="clipboard" width="20" />
          </Fab>
        </Stack>
      </Box>
      <Box
        sx={{
          mt: 2,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Stack spacing={1} direction={{ xs: 'column', sm: 'row' }}>
          <Fab color="primary" variant="extended" aria-label="check-primary">
            <FeatherIcon icon="check-circle" width="20" />
            <Typography
              sx={{
                ml: 1,
                textTransform: 'capitalize',
              }}
            >
              Primary
            </Typography>
          </Fab>
          <Fab color="secondary" variant="extended" aria-label="check-secondary">
            <FeatherIcon icon="check-circle" width="20" />
            <Typography
              sx={{
                ml: 1,
                textTransform: 'capitalize',
              }}
            >
              Secondary
            </Typography>
          </Fab>
          <Fab disabled variant="extended" aria-label="check-disabled">
            <FeatherIcon icon="check-circle" width="20" />
            <Typography
              sx={{
                ml: 1,
                textTransform: 'capitalize',
              }}
            >
              Disabled
            </Typography>
          </Fab>
        </Stack>
      </Box>
    </Box>
  </BaseCard>
);

export default FabDefaultButton;
