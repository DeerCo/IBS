import React from 'react';
import PropTypes from 'prop-types';
import FeatherIcon from 'feather-icons-react';
import { Grid, Box, Slider, Typography, SliderThumb } from '@mui/material';
import Breadcrumb from '../../layouts/full-layout/breadcrumb/Breadcrumb';
import BaseCard from '../../components/base-card/BaseCard';
import PageContainer from '../../components/container/PageContainer';
import CustomRangeSlider from '../../components/forms/custom-elements/CustomRangeSlider';
import CustomSlider from '../../components/forms/custom-elements/CustomSlider';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Slider',
  },
];

const valuetext = (value) => `${value}°C`;

function valuetext2(value) {
  return `${value}°C`;
}

const AirbnbThumbComponent = (props) => {
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

AirbnbThumbComponent.propTypes = {
  children: PropTypes.node,
};

const ExSlider = () => {
  // 2
  const [value, setValue] = React.useState(30);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [value2, setValue2] = React.useState([20, 37]);

  const handleChange2 = (event2, newValue2) => {
    setValue2(newValue2);
  };

  return (
    <PageContainer title="Slider" description="this is Slider page">
      {/* breadcrumb */}
      <Breadcrumb title="Slider" items={BCrumb} />
      {/* end breadcrumb */}
      <Grid container spacing={0}>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={4} sm={6} display="flex" alignItems="stretch">
          <BaseCard title="Custom Slider">
            <CustomSlider defaultValue={30} aria-label="slider" />
          </BaseCard>
        </Grid>

        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={4} sm={6} display="flex" alignItems="stretch">
          <BaseCard title="Custom Volumn Slider">
            <CustomSlider defaultValue={30} aria-label="slider" />
            <Box display="flex" alignItems="center">
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
          </BaseCard>
        </Grid>

        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={4} sm={6} display="flex" alignItems="stretch">
          <BaseCard title="Custom Range Slider">
            <CustomRangeSlider
              components={{ Thumb: AirbnbThumbComponent }}
              getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
              defaultValue={[20, 40]}
            />
          </BaseCard>
        </Grid>

        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={4} sm={6} display="flex" alignItems="stretch">
          <BaseCard title="Default Slider">
            <Slider defaultValue={30} aria-label="slider" />
          </BaseCard>
        </Grid>

        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={4} sm={6} display="flex" alignItems="stretch">
          <BaseCard title="Default Disabled Slider">
            <Slider disabled defaultValue={30} aria-label="slider" />
          </BaseCard>
        </Grid>

        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={4} sm={6} display="flex" alignItems="stretch">
          <BaseCard title="Default Volumn Slider">
            <Box display="flex" alignItems="center">
              <FeatherIcon icon="volume-1" width="20" />
              <Box
                sx={{
                  ml: 1,
                  mr: 1,
                  width: '100%',
                }}
              >
                <Slider
                  aria-label="Volume"
                  value={value}
                  onChange={handleChange}
                  sx={{
                    mt: 1,
                  }}
                />
              </Box>
              <FeatherIcon icon="volume-2" width="20" />
            </Box>
          </BaseCard>
        </Grid>

        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={4} sm={6} display="flex" alignItems="stretch">
          <BaseCard title="Default Discrete Slider">
            <Slider
              aria-label="Temperature"
              defaultValue={30}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              step={10}
              marks
              min={10}
              max={110}
            />
          </BaseCard>
        </Grid>

        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={4} sm={6} display="flex" alignItems="stretch">
          <BaseCard title="Default Range  Slider">
            <Slider
              getAriaLabel={() => 'Temperature range'}
              value={value2}
              onChange={handleChange2}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext2}
            />
          </BaseCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ExSlider;
