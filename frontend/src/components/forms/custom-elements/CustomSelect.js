import React from 'react';
import { styled } from '@mui/material/styles';
import { Select } from '@mui/material';

const CustomSelect = styled((props) => <Select {...props} />)(({ theme }) => ({
  '& .MuiSelect-select': {
    color: '#767e89',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: `${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : '#dee3e9'}`,
  },
  '& .MuiSelect-select::-webkit-input-placeholder': {
    color: '#767e89',
    opacity: '1',
  },
}));

export default CustomSelect;
