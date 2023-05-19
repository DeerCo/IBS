import React from 'react';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

const CustomFormLabel = styled((props) => (
  <Typography variant="h6" {...props} component="label" htmlFor={props.htmlFor} />
))(() => ({
  marginBottom: '5px',
  marginTop: '15px',
  display: 'block',
}));

export default CustomFormLabel;
