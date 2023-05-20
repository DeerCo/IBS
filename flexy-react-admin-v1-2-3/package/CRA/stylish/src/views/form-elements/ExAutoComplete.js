import React from 'react';
import { Grid } from '@mui/material';

import ComboBoxAutocomplete from '../../components/forms/autoComplete/ComboBoxAutocomplete';
import CountrySelectAutocomplete from '../../components/forms/autoComplete/CountrySelectAutocomplete';
import ControlledStateAutocomplete from '../../components/forms/autoComplete/ControlledStateAutocomplete';
import FreeSoloAutocomplete from '../../components/forms/autoComplete/FreeSoloAutocomplete';
import MultipleValuesAutocomplete from '../../components/forms/autoComplete/MultipleValuesAutocomplete';
import CheckboxesAutocomplete from '../../components/forms/autoComplete/CheckboxesAutocomplete';
import SizesAutocomplete from '../../components/forms/autoComplete/SizesAutocomplete';

import Breadcrumb from '../../layouts/full-layout/breadcrumb/Breadcrumb';
import PageContainer from '../../components/container/PageContainer';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'AutoComplete',
  },
];

const ExAutoComplete = () => (
  // 2

  <PageContainer title="Autocomplete" description="this is Autocomplete page">
    {/* breadcrumb */}
    <Breadcrumb title="AutoComplete" items={BCrumb} />
    {/* end breadcrumb */}
    <Grid container spacing={0}>
      {/* ------------------------- row 1 ------------------------- */}
      <Grid item xs={12} lg={4} sm={6} display="flex" alignItems="stretch">
        <ComboBoxAutocomplete />
      </Grid>
      {/* ------------------------- row 2 ------------------------- */}
      <Grid item xs={12} lg={4} sm={6} display="flex" alignItems="stretch">
        <CountrySelectAutocomplete />
      </Grid>
      {/* ------------------------- row 3 ------------------------- */}
      <Grid item xs={12} lg={4} sm={6} display="flex" alignItems="stretch">
        <ControlledStateAutocomplete />
      </Grid>
      {/* ------------------------- row 4 ------------------------- */}
      <Grid item xs={12} lg={4} sm={6} display="flex" alignItems="stretch">
        <FreeSoloAutocomplete />
      </Grid>
      {/* ------------------------- row 5 ------------------------- */}
      <Grid item xs={12} lg={4} sm={6} display="flex" alignItems="stretch">
        <MultipleValuesAutocomplete />
      </Grid>
      {/* ------------------------- row 6 ------------------------- */}
      <Grid item xs={12} lg={4} sm={6} display="flex" alignItems="stretch">
        <CheckboxesAutocomplete />
      </Grid>
      {/* ------------------------- row 7 ------------------------- */}
      <Grid item xs={12} lg={4} sm={6} display="flex" alignItems="stretch">
        <SizesAutocomplete />
      </Grid>
    </Grid>
  </PageContainer>
);
export default ExAutoComplete;
