import React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';

import { Select, MenuItem, InputBase } from '@mui/material';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  '&  .MuiInputBase-root': {
    borderRadius: '5px',
  },
  '& .MuiInputBase-input': {
    backgroundColor: theme.palette.mode === 'light' ? 'white' : theme.palette.grey.A400,
    borderRadius: 5,
    fontSize: 15,
    padding: '8px 33px 8px 16px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    border: '1px solid rgba(0,0,0,0.12)',
  },
}));

const ThemeSelect = () => {
  const [age, setAge] = React.useState('10');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={age}
      onChange={handleChange}
      input={<BootstrapInput />}
    >
      <MenuItem value={10}>March 2021</MenuItem>
      <MenuItem value={20}>April 2021</MenuItem>
      <MenuItem value={30}>May 2021</MenuItem>
    </Select>
  );
};

export default ThemeSelect;
