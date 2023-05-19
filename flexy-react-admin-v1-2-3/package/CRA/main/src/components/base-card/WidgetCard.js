import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

const WidgetCard = ({ title }) => (
  <Box>
    <Typography
      variant="h4"
      sx={{
        mb: 2,
      }}
    >
      {title}
    </Typography>
  </Box>
);

WidgetCard.propTypes = {
  title: PropTypes.string.isRequired,
};

export default WidgetCard;
