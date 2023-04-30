import React from 'react';
import { Grid, Box, Radio, FormControlLabel, RadioGroup } from '@mui/material';
import Breadcrumb from '../../layouts/full-layout/breadcrumb/Breadcrumb';
import BaseCard from '../../components/base-card/BaseCard';
import PageContainer from '../../components/container/PageContainer';
import CustomRadio from '../../components/forms/custom-elements/CustomRadio';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Radio',
  },
];

const ExRadio = () => {
  // 2
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const [selectedValue, setSelectedValue] = React.useState('a');
  const handleChange2 = (event) => {
    setSelectedValue(event.target.value);
  };

  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange2,
    value: item,
    name: 'size-radio-button-demo',
    inputProps: { 'aria-label': item },
  });
  return (
    <PageContainer title="Radio" description="this is Radio page">
      {/* breadcrumb */}
      <Breadcrumb title="Radio" items={BCrumb} />
      {/* end breadcrumb */}
      <Grid container spacing={0}>
        {/* ------------------------- custom row 1 ------------------------- */}
        <Grid item xs={12} lg={6} sm={6} display="flex" alignItems="stretch">
          <BaseCard title="Custom Radio">
            <Box
              sx={{
                textAlign: 'center',
              }}
            >
              <CustomRadio
                checked={checked}
                onChange={handleChange}
                inputprops={{ 'aria-label': 'primary checkbox' }}
              />

              <CustomRadio disabled inputprops={{ 'aria-label': 'disabled checked checkbox' }} />
              <CustomRadio
                color="default"
                inputprops={{ 'aria-label': 'checkbox with default color' }}
              />
            </Box>
          </BaseCard>
        </Grid>
        {/* custom row 2 */}
        <Grid item xs={12} lg={6} sm={6} display="flex" alignItems="stretch">
          <BaseCard title="Custom Color with Label">
            <Box
              sx={{
                textAlign: 'center',
              }}
            >
              <FormControlLabel
                value="end"
                control={<CustomRadio bgcolor="#0bb2fb" checked />}
                label="Primary"
                labelPlacement="end"
              />
              <FormControlLabel
                value="end"
                control={<CustomRadio bgcolor="#1e4db7" checked />}
                label="Secondary"
                labelPlacement="end"
              />
              <FormControlLabel
                value="end"
                control={<CustomRadio bgcolor="#39cb7f" checked />}
                label="Success"
                labelPlacement="end"
              />

              <FormControlLabel
                value="end"
                control={<CustomRadio bgcolor="#fc4b6c" checked />}
                label="Danger"
                labelPlacement="end"
              />

              <FormControlLabel
                value="end"
                control={<CustomRadio bgcolor="#fec90f" checked />}
                label="Warning"
                labelPlacement="end"
              />
            </Box>
          </BaseCard>
        </Grid>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={4} sm={6} display="flex" alignItems="stretch">
          <BaseCard title="Default Radio">
            <Box
              sx={{
                textAlign: 'center',
              }}
            >
              <Radio
                checked={checked}
                onChange={handleChange}
                inputprops={{ 'aria-label': 'primary checkbox' }}
              />

              <Radio disabled inputprops={{ 'aria-label': 'disabled checked checkbox' }} />
              <Radio color="default" inputprops={{ 'aria-label': 'checkbox with default color' }} />
            </Box>
          </BaseCard>
        </Grid>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={4} sm={6} display="flex" alignItems="stretch">
          <BaseCard title="Default Colors">
            <Box
              sx={{
                textAlign: 'center',
              }}
            >
              <Radio
                checked={checked}
                onChange={handleChange}
                color="primary"
                inputprops={{ 'aria-label': 'primary checkbox' }}
              />

              <Radio
                checked={checked}
                onChange={handleChange}
                color="secondary"
                inputprops={{ 'aria-label': 'primary checkbox' }}
              />

              <Radio
                checked={checked}
                onChange={handleChange}
                inputprops={{ 'aria-label': 'primary checkbox' }}
                sx={{
                  color: (theme) => theme.palette.success.main,
                  '&.Mui-checked': {
                    color: (theme) => theme.palette.success.main,
                  },
                }}
              />

              <Radio
                checked={checked}
                onChange={handleChange}
                inputprops={{ 'aria-label': 'primary checkbox' }}
                sx={{
                  color: (theme) => theme.palette.error.main,
                  '&.Mui-checked': {
                    color: (theme) => theme.palette.error.main,
                  },
                }}
              />

              <Radio
                checked={checked}
                onChange={handleChange}
                inputprops={{ 'aria-label': 'primary checkbox' }}
                sx={{
                  color: (theme) => theme.palette.warning.main,
                  '&.Mui-checked': {
                    color: (theme) => theme.palette.warning.main,
                  },
                }}
              />

              <Radio
                checked={checked}
                onChange={handleChange2}
                inputprops={{ 'aria-label': 'primary checkbox' }}
                sx={{
                  color: (theme) => theme.palette.primary.main,
                  '&.Mui-checked': {
                    color: (theme) => theme.palette.primary.main,
                  },
                }}
              />
            </Box>
          </BaseCard>
        </Grid>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={4} sm={6} display="flex" alignItems="stretch">
          <BaseCard title="Default Sizes">
            <Box
              sx={{
                textAlign: 'center',
              }}
            >
              <Radio {...controlProps('a')} size="small" />
              <Radio {...controlProps('b')} />
              <Radio
                {...controlProps('c')}
                sx={{
                  '& .MuiSvgIcon-root': {
                    fontSize: 28,
                  },
                }}
              />
            </Box>
          </BaseCard>
        </Grid>

        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={6} sm={6} display="flex" alignItems="stretch">
          <BaseCard title="Default Placement">
            <RadioGroup row aria-label="position" name="position" defaultValue="top">
              <FormControlLabel value="top" control={<Radio />} label="Top" labelPlacement="top" />
              <FormControlLabel
                value="start"
                control={<Radio />}
                label="Start"
                labelPlacement="start"
              />
              <FormControlLabel
                value="bottom"
                control={<Radio />}
                label="Bottom"
                labelPlacement="bottom"
              />
              <FormControlLabel value="end" control={<Radio />} label="End" />
            </RadioGroup>
          </BaseCard>
        </Grid>

        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={6} sm={6} display="flex" alignItems="stretch">
          <BaseCard title="Default Color with Label">
            <Box
              sx={{
                textAlign: 'center',
              }}
            >
              <FormControlLabel
                value="end"
                control={<Radio color="primary" checked />}
                label="Primary"
                labelPlacement="end"
              />
              <FormControlLabel
                value="end"
                control={<Radio color="secondary" checked />}
                label="Secondary"
                labelPlacement="end"
              />
              <FormControlLabel
                value="end"
                control={
                  <Radio
                    checked
                    sx={{
                      color: (theme) => theme.palette.success.main,
                      '&.Mui-checked': {
                        color: (theme) => theme.palette.success.main,
                      },
                    }}
                  />
                }
                label="Success"
                labelPlacement="end"
              />

              <FormControlLabel
                value="end"
                control={
                  <Radio
                    checked
                    sx={{
                      color: (theme) => theme.palette.error.main,
                      '&.Mui-checked': {
                        color: (theme) => theme.palette.error.main,
                      },
                    }}
                  />
                }
                label="Danger"
                labelPlacement="end"
              />

              <FormControlLabel
                value="end"
                control={
                  <Radio
                    checked
                    sx={{
                      color: (theme) => theme.palette.warning.main,
                      '&.Mui-checked': {
                        color: (theme) => theme.palette.warning.main,
                      },
                    }}
                  />
                }
                label="Warning"
                labelPlacement="end"
              />
            </Box>
          </BaseCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ExRadio;
