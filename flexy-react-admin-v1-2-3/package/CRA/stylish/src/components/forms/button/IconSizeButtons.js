import React from 'react';
import { Box, IconButton, Tooltip, Stack } from '@mui/material';
import FeatherIcon from 'feather-icons-react';
import BaseCard from '../../base-card/BaseCard';

const IconSizeButtons = () => (
  <BaseCard title="Icon Button Sizes">
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Stack spacing={1} direction={{ xs: 'column', sm: 'row' }}>
        <Tooltip title="Bell">
          <IconButton variant="contained" aria-label="small-bell">
            <FeatherIcon fontSize="small" icon="bell" width="16" height="16" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Bell">
          <IconButton variant="contained" size="medium" aria-label="medium-bell">
            <FeatherIcon icon="bell" width="19" height="19" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Bell">
          <IconButton variant="contained" aria-label="large-bell">
            <FeatherIcon fontSize="large" icon="bell" width="21" height="21" />
          </IconButton>
        </Tooltip>
      </Stack>
    </Box>
  </BaseCard>
);

export default IconSizeButtons;
