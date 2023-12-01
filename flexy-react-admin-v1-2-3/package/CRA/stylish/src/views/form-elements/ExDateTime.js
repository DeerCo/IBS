import React from 'react';
import { Grid } from '@mui/material';
import {
  MobileDateTimePicker,
  LocalizationProvider,
  DateTimePicker,
  TimePicker,
} from '@mui/lab';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Breadcrumb from '../../layouts/full-layout/breadcrumb/Breadcrumb';
import BaseCard from '../../components/base-card/BaseCard';
import PageContainer from '../../components/container/PageContainer';
import CustomTextField from '../../components/forms/custom-elements/CustomTextField';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Date Time',
  },
];

const ExDateTime = () => {
  const [value, setValue] = React.useState(new Date());
  const [value2, setValue2] = React.useState(null);

  return (
    <PageContainer title="Date Time" description="this is Date Time page">
      {/* breadcrumb */}
      <Breadcrumb title="Date Picker" items={BCrumb} />
      {/* end breadcrumb */}
      <Grid container spacing={0}>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={6} sm={6} display="flex" alignItems="stretch">
          <BaseCard title="Basic Date picker">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDateTimePicker
                placeholder="Start date"
                onChange={() => {}}
                renderInput={(inputProps) => (
                  <CustomTextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    inputProps={{ 'aria-label': 'basic date picker' }}
                    {...inputProps}
                  />
                )}
                value={new Date()}
              />
            </LocalizationProvider>
          </BaseCard>
        </Grid>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={6} sm={6} display="flex" alignItems="stretch">
          <BaseCard title="Different Design for Date picker">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                renderInput={(props) => <CustomTextField {...props} fullWidth size="small" />}
                placeholder="DateTimePicker"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
              />
            </LocalizationProvider>
          </BaseCard>
        </Grid>

        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={6} sm={6} display="flex" alignItems="stretch">
          <BaseCard title="Time picker">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                value={value2}
                onChange={(newValue) => {
                  setValue2(newValue);
                }}
                renderInput={(params) => (
                  <CustomTextField
                    size="small"
                    {...params}
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
          </BaseCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ExDateTime;
