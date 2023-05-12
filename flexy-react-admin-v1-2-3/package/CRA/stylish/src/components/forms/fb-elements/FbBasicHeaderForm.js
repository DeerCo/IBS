import React from 'react';
import {
  Card,
  CardContent,
  Divider,
  Box,
  Typography,
  FormControlLabel,
  Button,
  Grid,
  MenuItem,
  FormControl,
} from '@mui/material';
import FeatherIcon from 'feather-icons-react';
import CustomTextField from '../custom-elements/CustomTextField';
import CustomSelect from '../custom-elements/CustomSelect';
import CustomRadio from '../custom-elements/CustomRadio';
import CustomFormLabel from '../custom-elements/CustomFormLabel';

const currencies = [
  {
    value: 'female',
    label: 'Female',
  },
  {
    value: 'male',
    label: 'Male',
  },
  {
    value: 'other',
    label: 'Other',
  },
];

const countries = [
  {
    value: 'india',
    label: 'India',
  },
  {
    value: 'uk',
    label: 'United Kingdom',
  },
  {
    value: 'srilanka',
    label: 'Srilanka',
  },
];

const FbBasicHeaderForm = () => {
  const [currency, setCurrency] = React.useState('');

  const handleChange2 = (event) => {
    setCurrency(event.target.value);
  };

  const [selectedValue, setSelectedValue] = React.useState('');

  const handleChange3 = (event) => {
    setSelectedValue(event.target.value);
  };

  const [country, setCountry] = React.useState('');

  const handleChange4 = (event) => {
    setCountry(event.target.value);
  };

  return (
    <div>
      {/* ------------------------------------------------------------------------------------------------ */}
      {/* Basic Checkbox */}
      {/* ------------------------------------------------------------------------------------------------ */}
      <Card
        sx={{
          p: 0,
        }}
      >
        <Box
          sx={{
            padding: '15px 30px',
          }}
          display="flex"
          alignItems="center"
        >
          <Box flexGrow={1}>
            <Typography fontWeight="500" variant="h4">
              Basic Header Form
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box
          display="flex"
          alignItems="center"
          p={2}
          sx={{
            backgroundColor: 'primary.light',
            color: 'primary.main',
          }}
        >
          <FeatherIcon icon="alert-circle" width="18" />
          <Box sx={{ ml: 1 }}>Person Info</Box>
        </Box>
        <CardContent
          sx={{
            padding: '30px',
          }}
        >
          <form>
            <Grid container spacing={3}>
              <Grid item lg={6} md={12} sm={12}>
                <CustomFormLabel htmlFor="fname-text">First Name</CustomFormLabel>
                <CustomTextField id="fname-text" variant="outlined" fullWidth size="small" />
                <CustomFormLabel htmlFor="standard-select-currency">Select Gender</CustomFormLabel>
                <CustomSelect
                  id="standard-select-currency"
                  value={currency}
                  onChange={handleChange2}
                  fullWidth
                  variant="outlined"
                  size="small"
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </CustomSelect>
                <CustomFormLabel>Membership</CustomFormLabel>

                <FormControl
                  sx={{
                    width: '100%',
                  }}
                >
                  <Box>
                    <FormControlLabel
                      checked={selectedValue === 'a'}
                      onChange={handleChange3}
                      value="a"
                      label="Free"
                      name="radio-button-demo"
                      control={<CustomRadio />}
                      inputprops={{ 'aria-label': 'A' }}
                    />
                    <FormControlLabel
                      checked={selectedValue === 'b'}
                      onChange={handleChange3}
                      value="b"
                      label="Paid"
                      control={<CustomRadio />}
                      name="radio-button-demo"
                      inputprops={{ 'aria-label': 'B' }}
                    />
                  </Box>
                </FormControl>
              </Grid>
              <Grid item lg={6} md={12} sm={12}>
                <CustomFormLabel htmlFor="lname-text">Last Name</CustomFormLabel>

                <CustomTextField id="lname-text" variant="outlined" fullWidth size="small" />
                <CustomFormLabel htmlFor="date">Date of Birth</CustomFormLabel>

                <CustomTextField
                  id="date"
                  type="date"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  size="small"
                />
              </Grid>
            </Grid>
          </form>
        </CardContent>
        <Box
          display="flex"
          alignItems="center"
          p={2}
          sx={{
            backgroundColor: 'primary.light',
            color: 'primary.main',
          }}
        >
          <FeatherIcon icon="alert-circle" width="18" />
          <Box sx={{ ml: 1 }}>Address</Box>
        </Box>
        <CardContent
          sx={{
            padding: '30px',
          }}
        >
          <Grid container spacing={3}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <CustomFormLabel
                sx={{
                  mt: 0,
                }}
                htmlFor="street-text"
              >
                Street
              </CustomFormLabel>

              <CustomTextField id="street-text" variant="outlined" fullWidth size="small" />
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <CustomFormLabel
                sx={{
                  mt: 0,
                }}
                htmlFor="city-text"
              >
                City
              </CustomFormLabel>
              <CustomTextField id="city-text" variant="outlined" fullWidth size="small" />
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <CustomFormLabel
                sx={{
                  mt: 0,
                }}
                htmlFor="state-text"
              >
                State
              </CustomFormLabel>
              <CustomTextField id="state-text" variant="outlined" fullWidth size="small" />
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <CustomFormLabel
                sx={{
                  mt: 0,
                }}
                htmlFor="post-text"
              >
                Post Code
              </CustomFormLabel>
              <CustomTextField id="post-text" variant="outlined" fullWidth size="small" />
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <CustomFormLabel
                sx={{
                  mt: 0,
                }}
                htmlFor="country-text"
              >
                Country
              </CustomFormLabel>
              <CustomSelect
                id="country-select"
                value={country}
                onChange={handleChange4}
                fullWidth
                variant="outlined"
                size="small"
              >
                {countries.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </CustomSelect>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box p={3}>
          <Button
            variant="contained"
            color="error"
            sx={{
              mr: 1,
            }}
          >
            Cancel
          </Button>
          <Button variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </Card>
    </div>
  );
};

export default FbBasicHeaderForm;
