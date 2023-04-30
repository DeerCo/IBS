import React from 'react';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

const CustomDisabledButton = styled((props) => <Button {...props} />)(({ theme }) => ({
  backgroundColor: `${theme.palette.mode === 'dark' ? 'rgba(73,82,88,0.12)' : '#ecf0f3'}`,
}));

export default CustomDisabledButton;
