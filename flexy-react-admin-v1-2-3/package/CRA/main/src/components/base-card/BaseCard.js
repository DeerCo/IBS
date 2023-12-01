import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardContent, Divider } from '@mui/material';

const BaseCard = ({ title, children }) => (
  <Card
    sx={{
      width: '100%',
      p: 0,
    }}
  >
    <CardHeader title={title} />

    <Divider />
    <CardContent>{children}</CardContent>
  </Card>
);

BaseCard.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default BaseCard;
