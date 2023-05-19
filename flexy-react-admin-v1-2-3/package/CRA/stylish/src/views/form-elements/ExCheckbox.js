import React from 'react';
import { Grid, Box, Checkbox, FormGroup, FormControlLabel, FormControl } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import PageContainer from '../../components/container/PageContainer';
import BaseCard from '../../components/base-card/BaseCard';
import Breadcrumb from '../../layouts/full-layout/breadcrumb/Breadcrumb';

import CustomCheckbox from '../../components/forms/custom-elements/CustomCheckbox';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Checkbox',
  },
];

const ExCheckbox = () => {
  // 2
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <PageContainer title="Checkbox" description="this is Checkbox page">
      {/* breadcrumb */}
      <Breadcrumb title="Checkbox" items={BCrumb} />
      {/* end breadcrumb */}
      <Grid container spacing={0}>
        {/* ------------------------- custom row 1 ------------------------- */}
        <Grid item xs={12} lg={6} sm={6} display="flex" alignItems="stretch">
          <BaseCard title="Custom Checkbox">
            <Box
              sx={{
                textAlign: 'center',
              }}
            >
              <CustomCheckbox
                checked={checked}
                onChange={handleChange}
                inputprops={{ 'aria-label': 'primary checkbox' }}
              />

              <CustomCheckbox
                disabled
                checked
                inputprops={{ 'aria-label': 'disabled checked checkbox' }}
              />
              <CustomCheckbox
                defaultChecked
                indeterminate
                inputprops={{ 'aria-label': 'indeterminate checkbox' }}
              />
              <CustomCheckbox
                defaultChecked
                color="default"
                inputprops={{ 'aria-label': 'checkbox with default color' }}
              />
            </Box>
          </BaseCard>
        </Grid>
        <Grid item xs={12} lg={6} sm={6} display="flex" alignItems="stretch">
          <BaseCard title="Custom Checkbox with Color">
            <Box
              sx={{
                textAlign: 'center',
              }}
            >
              <FormControlLabel control={<CustomCheckbox defaultChecked />} label="Primary" />
              <FormControlLabel
                control={
                  <CustomCheckbox
                    defaultChecked
                    bgcolor="#1e4db7"
                    inputprops={{ 'aria-label': 'checkbox with default color' }}
                  />
                }
                label="Secondary"
              />
              <FormControlLabel
                control={
                  <CustomCheckbox
                    defaultChecked
                    bgcolor="#39cb7f"
                    inputprops={{ 'aria-label': 'checkbox with default color' }}
                  />
                }
                label="Success"
              />
              <FormControlLabel
                control={
                  <CustomCheckbox
                    defaultChecked
                    bgcolor="#fec90f"
                    inputprops={{ 'aria-label': 'checkbox with default color' }}
                  />
                }
                label="Warning"
              />
              <FormControlLabel
                control={
                  <CustomCheckbox
                    defaultChecked
                    bgcolor="#fc4b6c"
                    inputprops={{ 'aria-label': 'checkbox with default color' }}
                  />
                }
                label="Error"
              />
            </Box>
          </BaseCard>
        </Grid>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={4} sm={6} display="flex" alignItems="stretch">
          <BaseCard title="Default Checkbox">
            <Box
              sx={{
                textAlign: 'center',
              }}
            >
              <Checkbox
                checked={checked}
                onChange={handleChange}
                inputprops={{ 'aria-label': 'primary checkbox' }}
              />

              <Checkbox
                disabled
                checked
                inputprops={{ 'aria-label': 'disabled checked checkbox' }}
              />
              <Checkbox
                defaultChecked
                indeterminate
                inputprops={{ 'aria-label': 'indeterminate checkbox' }}
              />
              <Checkbox
                defaultChecked
                color="default"
                inputprops={{ 'aria-label': 'checkbox with default color' }}
              />
            </Box>
          </BaseCard>
        </Grid>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={4} sm={6} display="flex" alignItems="stretch">
          <BaseCard title="Default with Colors">
            <Box
              sx={{
                textAlign: 'center',
              }}
            >
              <Checkbox
                defaultChecked
                color="primary"
                inputprops={{ 'aria-label': 'checkbox with default color' }}
              />
              <Checkbox
                defaultChecked
                color="secondary"
                inputprops={{ 'aria-label': 'checkbox with default color' }}
              />
              <Checkbox
                defaultChecked
                sx={{
                  color: (theme) => theme.palette.success.main,
                  '&.Mui-checked': {
                    color: (theme) => theme.palette.success.main,
                  },
                }}
              />
              <Checkbox
                defaultChecked
                sx={{
                  color: (theme) => theme.palette.error.main,
                  '&.Mui-checked': {
                    color: (theme) => theme.palette.error.main,
                  },
                }}
              />
              <Checkbox
                defaultChecked
                sx={{
                  color: (theme) => theme.palette.warning.main,
                  '&.Mui-checked': {
                    color: (theme) => theme.palette.warning.main,
                  },
                }}
              />
            </Box>
          </BaseCard>
        </Grid>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={4} sm={6} display="flex" alignItems="stretch">
          <BaseCard title="Sizes & Custom icon">
            <Box>
              <FormGroup
                row
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      icon={<CheckBoxOutlineBlankIcon />}
                      checkedIcon={<CheckBoxIcon />}
                      name="checkednormal"
                    />
                  }
                  label="Normal Size"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                      checkedIcon={<CheckBoxIcon fontSize="small" />}
                      name="checkedsmall"
                    />
                  }
                  label="Small size"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      icon={<FavoriteBorder />}
                      checkedIcon={<Favorite />}
                      name="checkedH"
                    />
                  }
                  label="Heart"
                />
              </FormGroup>
            </Box>
          </BaseCard>
        </Grid>

        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={6} sm={6} display="flex" alignItems="stretch">
          <BaseCard title="Placement">
            <FormControl
              component="fieldset"
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <FormGroup
                aria-label="position"
                row
                sx={{
                  justifyContent: 'center',
                }}
              >
                <FormControlLabel
                  value="top"
                  control={<Checkbox color="primary" />}
                  label="Top"
                  labelPlacement="top"
                />
                <FormControlLabel
                  value="start"
                  control={<Checkbox color="primary" />}
                  label="Start"
                  labelPlacement="start"
                />
                <FormControlLabel
                  value="bottom"
                  control={<Checkbox color="primary" />}
                  label="Bottom"
                  labelPlacement="bottom"
                />
                <FormControlLabel
                  value="end"
                  control={<Checkbox color="primary" />}
                  label="End"
                  labelPlacement="end"
                />
              </FormGroup>
            </FormControl>
          </BaseCard>
        </Grid>

        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={6} sm={6} display="flex" alignItems="stretch">
          <BaseCard title="Color with Label">
            <Box
              sx={{
                textAlign: 'center',
              }}
            >
              <FormControlLabel
                value="end"
                control={<Checkbox color="primary" checked />}
                label="Primary"
                labelPlacement="end"
              />
              <FormControlLabel
                value="end"
                control={<Checkbox color="secondary" checked />}
                label="Secondary"
                labelPlacement="end"
              />
              <FormControlLabel
                value="end"
                control={
                  <Checkbox
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
                  <Checkbox
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
                  <Checkbox
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

export default ExCheckbox;
