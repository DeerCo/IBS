import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Card,
  CardContent,
  Box,
  Typography,
  FormControl,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Button,
} from '@mui/material';
import { SliderThumb } from '@mui/material/Slider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import { LocalizationProvider, TimePicker, DatePicker } from '@mui/lab';

import FeatherIcon from 'feather-icons-react';
import CustomTextField from '../../components/forms/custom-elements/CustomTextField';
import CustomSelect from '../../components/forms/custom-elements/CustomSelect';
import CustomSlider from '../../components/forms/custom-elements/CustomSlider';
import CustomRangeSlider from '../../components/forms/custom-elements/CustomRangeSlider';
import CustomSwitch from '../../components/forms/custom-elements/CustomSwitch';
import CustomDisabledButton from '../../components/forms/custom-elements/CustomDisabledButton';
import CustomOutlinedButton from '../../components/forms/custom-elements/CustomOutlinedButton';
import CustomFormLabel from '../../components/forms/custom-elements/CustomFormLabel';
import CustomCheckbox from '../../components/forms/custom-elements/CustomCheckbox';
import CustomRadio from '../../components/forms/custom-elements/CustomRadio';
import Breadcrumb from '../../layouts/full-layout/breadcrumb/Breadcrumb';
import PageContainer from '../../components/container/PageContainer';

const CustomThumbComponent = (props) => {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <Box
        sx={{
          height: 9,
          width: '2px',
          backgroundColor: '#fff',
        }}
      />
      <Box
        sx={{
          height: '14px',
          width: '2px',
          backgroundColor: '#fff',
          ml: '2px',
        }}
      />
      <Box
        sx={{
          height: 9,
          width: '2px',
          backgroundColor: '#fff',
          ml: '2px',
        }}
      />
    </SliderThumb>
  );
};

CustomThumbComponent.propTypes = {
  children: PropTypes.node,
};

const FormCustom = () => {
  const [age, setAge] = React.useState('1');
  const [select1, setSelect] = React.useState('1');
  const [select2, setSelect2] = React.useState('1');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handleChange4 = (event2) => {
    setSelect(event2.target.value);
  };

  const handleChange5 = (event3) => {
    setSelect2(event3.target.value);
  };

  const [value, setValue] = React.useState(null);
  const [value2, setValue2] = React.useState(null);

  const [value3, setValue3] = React.useState(30);
  const handleChange6 = (event, newValue) => {
    setValue3(newValue);
  };
  return (
    <PageContainer title="Custom Form" description="this is Custom Form page">
      {/* breadcrumb */}
      <Breadcrumb title="Custom Form" subtitle="custom designed element" />
      {/* end breadcrumb */}

      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} lg={4}>
              <CustomFormLabel htmlFor="name">Name</CustomFormLabel>
              <CustomTextField
                id="name"
                placeholder="Enter text"
                variant="outlined"
                fullWidth
                size="small"
              />
              <CustomFormLabel htmlFor="demo-simple-select">Select Dropdown</CustomFormLabel>
              <CustomSelect
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                onChange={handleChange}
                fullWidth
                size="small"
              >
                <MenuItem value={1}>One</MenuItem>
                <MenuItem value={2}>Two</MenuItem>
                <MenuItem value={3}>Three</MenuItem>
              </CustomSelect>
            </Grid>
            {/* ----------------------------------- */}
            {/* column 2 */}
            {/* ----------------------------------- */}
            <Grid item xs={12} sm={12} lg={4}>
              <CustomFormLabel htmlFor="cname">Company Name</CustomFormLabel>
              <CustomTextField
                id="cname"
                placeholder="Enter text"
                variant="outlined"
                fullWidth
                size="small"
              />
              <CustomFormLabel htmlFor="time">Time</CustomFormLabel>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => (
                    <CustomTextField
                      size="small"
                      {...params}
                      id="time"
                      fullWidth
                      sx={{
                        '& .MuiSvgIcon-root': {
                          width: '18px',
                          height: '18px',
                        },
                        '& .MuiFormHelperText-root': {
                          display: 'none',
                        },
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            {/* ----------------------------------- */}
            {/* column 3 */}
            {/* ----------------------------------- */}
            <Grid item xs={12} sm={12} lg={4}>
              <CustomFormLabel htmlFor="disabled">Industry Type</CustomFormLabel>
              <CustomTextField
                id="disabled"
                placeholder="Disabled filled"
                variant="outlined"
                fullWidth
                disabled
                size="small"
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: (theme) =>
                      `${
                        theme.palette.mode === 'dark'
                          ? 'rgba(255, 255, 255, 0.12) !important'
                          : '#dee3e9 !important'
                      }`,
                  },
                }}
              />
              <CustomFormLabel htmlFor="date">Date</CustomFormLabel>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={value2}
                  onChange={(newValue2) => {
                    setValue2(newValue2);
                  }}
                  renderInput={(params) => (
                    <CustomTextField
                      size="small"
                      {...params}
                      fullWidth
                      id="date"
                      sx={{
                        '& .MuiSvgIcon-root': {
                          width: '18px',
                          height: '18px',
                        },
                        '& .MuiFormHelperText-root': {
                          display: 'none',
                        },
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            {/* ----------------------------------- */}
            {/* column 4 */}
            {/* ----------------------------------- */}
            <Grid item xs={12} sm={12} lg={12}>
              <CustomFormLabel>Lorem ipsum dolor sit amet</CustomFormLabel>
              <RadioGroup aria-label="gender" defaultValue="radio1" name="radio-buttons-group">
                <Grid container>
                  <Grid item xs={12} sm={4} lg={4}>
                    <FormControl component="fieldset">
                      <FormControlLabel value="radio1" control={<CustomRadio />} label="Male" />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4} lg={4}>
                    <FormControl component="fieldset">
                      <FormControlLabel value="radio2" control={<CustomRadio />} label="Female" />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4} lg={4}>
                    <FormControl component="fieldset">
                      <FormControlLabel
                        value="radio3"
                        control={<CustomRadio disabled />}
                        label="Disabled"
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </RadioGroup>
            </Grid>
            {/* ----------------------------------- */}
            {/* column 5 */}
            {/* ----------------------------------- */}
            <Grid item xs={12} sm={12} lg={12}>
              <CustomFormLabel>Industry Type</CustomFormLabel>
              <RadioGroup aria-label="gender" defaultValue="radio1" name="radio-buttons-group">
                <Grid container>
                  <Grid item xs={12} sm={4} lg={4}>
                    <FormControlLabel
                      control={<CustomCheckbox defaultChecked />}
                      label="Enter text"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} lg={4}>
                    <FormControlLabel control={<CustomCheckbox />} label="Enter text" />
                  </Grid>
                  <Grid item xs={12} sm={4} lg={4}>
                    <FormControlLabel
                      disabled
                      control={<CustomCheckbox disabled />}
                      label="Disabled"
                    />
                  </Grid>
                </Grid>
              </RadioGroup>
            </Grid>
            {/* ----------------------------------- */}
            {/* column 6 */}
            {/* ----------------------------------- */}
            <Grid item xs={12} sm={12} lg={4}>
              <CustomFormLabel>Slider</CustomFormLabel>
              <CustomRangeSlider
                components={{ Thumb: CustomThumbComponent }}
                getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
                defaultValue={[20, 40]}
              />
              <Grid
                container
                spacing={2}
                sx={{
                  mt: 1,
                }}
              >
                <Grid item xs={12} sm={6} lg={6}>
                  <CustomSelect
                    id="range1"
                    value={select1}
                    onChange={handleChange4}
                    fullWidth
                    size="small"
                  >
                    <MenuItem value={1}>750</MenuItem>
                    <MenuItem value={2}>850</MenuItem>
                    <MenuItem value={3}>950</MenuItem>
                  </CustomSelect>
                </Grid>
                <Grid item xs={12} sm={6} lg={6}>
                  <CustomSelect
                    id="rang2"
                    value={select2}
                    onChange={handleChange5}
                    fullWidth
                    size="small"
                  >
                    <MenuItem value={1}>950</MenuItem>
                    <MenuItem value={2}>1050</MenuItem>
                    <MenuItem value={3}>1150</MenuItem>
                  </CustomSelect>
                </Grid>
              </Grid>
              <CustomFormLabel sx={{ mt: 3 }}>Volume</CustomFormLabel>
              <CustomSlider aria-label="Volume" value={value3} onChange={handleChange6} />
              <Box display="flex" alignItems="stretch">
                <Typography
                  sx={{
                    color: (theme) => theme.palette.grey.A200,
                  }}
                >
                  <FeatherIcon icon="volume-1" width="20" />
                </Typography>
                <Box
                  sx={{
                    ml: 'auto',
                  }}
                >
                  <Typography
                    sx={{
                      color: (theme) => theme.palette.grey.A200,
                    }}
                  >
                    <FeatherIcon icon="volume-2" width="20" />
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* ----------------------------------- */}
            {/* column 7 */}
            {/* ----------------------------------- */}

            <Grid item xs={12} sm={12} lg={12}>
              <CustomFormLabel>Switch</CustomFormLabel>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={6} lg={3}>
                  <FormControlLabel control={<CustomSwitch />} label="Enter text" />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                  <FormControlLabel control={<CustomSwitch defaultChecked />} label="Enter text" />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                  <FormControlLabel
                    control={
                      <CustomSwitch
                        disabled
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-disabled+.MuiSwitch-track': {
                            opacity: 1,
                          },
                        }}
                      />
                    }
                    label="Disabled"
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                  <FormControlLabel
                    control={
                      <CustomSwitch
                        defaultChecked
                        disabled
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked.Mui-disabled': {
                            opacity: 0.5,
                          },
                        }}
                      />
                    }
                    label="Disabled"
                  />
                </Grid>
              </Grid>
              {/* button */}
              <Box
                sx={{
                  display: {
                    xs: 'block',
                    sm: 'flex',
                    lg: 'flex',
                  },
                  alignItems: 'center',
                  mt: 3,
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    mb: {
                      xs: 1,
                      sm: 0,
                      lg: 0,
                    },
                  }}
                >
                  Add New
                </Button>
                <CustomDisabledButton
                  variant="contained"
                  disabled
                  sx={{
                    mb: {
                      xs: 1,
                      sm: 0,
                      lg: 0,
                    },
                    ml: {
                      xs: 1,
                      sm: 1,
                      lg: 1,
                    },
                  }}
                >
                  Add New
                </CustomDisabledButton>
                <CustomOutlinedButton
                  variant="outlined"
                  sx={{
                    mb: {
                      xs: 1,
                      sm: 0,
                      lg: 0,
                    },
                    ml: {
                      xs: 0,
                      sm: 1,
                      lg: 1,
                    },
                  }}
                >
                  Add New
                </CustomOutlinedButton>
                <Box
                  sx={{
                    ml: 'auto',
                  }}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{
                      mb: {
                        xs: 1,
                        sm: 0,
                        lg: 0,
                      },
                      ml: {
                        xs: 0,
                        sm: 1,
                        lg: 1,
                      },
                    }}
                  >
                    Add New
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    sx={{
                      mb: {
                        xs: 1,
                        sm: 0,
                        lg: 0,
                      },
                      ml: 1,
                    }}
                  >
                    Add New
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default FormCustom;
