import React from 'react';

import { Grid } from '@mui/material';

import DefaultButtons from '../../components/forms/button/DefaultButtons';
import ColorButtons from '../../components/forms/button/ColorButtons';
import IconLoadingButtons from '../../components/forms/button/IconLoadingButtons';
import SizeButton from '../../components/forms/button/SizeButton';

import OutlinedDefaultButtons from '../../components/forms/button/OutlinedDefaultButtons';
import OutlinedColorButtons from '../../components/forms/button/OutlinedColorButtons';
import OutlinedIconLoadingButtons from '../../components/forms/button/OutlinedIconLoadingButtons';
import OutlinedSizeButton from '../../components/forms/button/OutlinedSizeButton';

import TextDefaultButtons from '../../components/forms/button/TextDefaultButtons';
import TextColorButtons from '../../components/forms/button/TextColorButtons';
import TextIconLoadingButtons from '../../components/forms/button/TextIconLoadingButtons';
import TextSizeButton from '../../components/forms/button/TextSizeButton';

import IconColorButtons from '../../components/forms/button/IconColorButtons';
import IconSizeButtons from '../../components/forms/button/IconSizeButtons';

import FabDefaultButton from '../../components/forms/button/FabDefaultButton';
import FabColorButtons from '../../components/forms/button/FabColorButtons';
import FabSizeButtons from '../../components/forms/button/FabSizeButtons';

import DefaultButtonGroup from '../../components/forms/button/DefaultButtonGroup';
import SizeButtonGroup from '../../components/forms/button/SizeButtonGroup';
import VerticalButtonGroup from '../../components/forms/button/VerticalButtonGroup';
import ColorButtonGroup from '../../components/forms/button/ColorButtonGroup';

import Breadcrumb from '../../layouts/full-layout/breadcrumb/Breadcrumb';
import PageContainer from '../../components/container/PageContainer';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Button',
  },
];

const ExButton = () => (
  // 2

  <PageContainer title="Buttons" description="this is Buttons page">
    {/* breadcrumb */}
    <Breadcrumb title="Button" items={BCrumb} />
    {/* end breadcrumb */}
    <Grid container spacing={0}>
      {/* ------------------------- row 1 ------------------------- */}
      <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
        <DefaultButtons />
      </Grid>
      {/* ------------------------- row 2 ------------------------- */}
      <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
        <ColorButtons />
      </Grid>
      {/* ------------------------- row 3 ------------------------- */}
      <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
        <IconLoadingButtons />
      </Grid>
      {/* ------------------------- row 4 ------------------------- */}
      <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
        <SizeButton />
      </Grid>
      {/* ------------------------- row 1 ------------------------- */}
      <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
        <OutlinedDefaultButtons />
      </Grid>
      {/* ------------------------- row 2 ------------------------- */}
      <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
        <OutlinedColorButtons />
      </Grid>
      {/* ------------------------- row 3 ------------------------- */}
      <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
        <OutlinedIconLoadingButtons />
      </Grid>
      {/* ------------------------- row 4 ------------------------- */}
      <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
        <OutlinedSizeButton />
      </Grid>
      {/* ------------------------- row 1 ------------------------- */}
      <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
        <TextDefaultButtons />
      </Grid>
      {/* ------------------------- row 2 ------------------------- */}
      <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
        <TextColorButtons />
      </Grid>
      {/* ------------------------- row 3 ------------------------- */}
      <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
        <TextIconLoadingButtons />
      </Grid>
      {/* ------------------------- row 4 ------------------------- */}
      <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
        <TextSizeButton />
      </Grid>
      {/* ------------------------- row 4 ------------------------- */}
      <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
        <IconColorButtons />
      </Grid>
      {/* ------------------------- row 4 ------------------------- */}
      <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
        <IconSizeButtons />
      </Grid>
      {/* ------------------------- row 4 ------------------------- */}
      <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
        <FabDefaultButton />
      </Grid>
      {/* ------------------------- row 4 ------------------------- */}
      <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
        <FabColorButtons />
      </Grid>
      {/* ------------------------- row 4 ------------------------- */}
      <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
        <FabSizeButtons />
      </Grid>
      {/* ------------------------- row 4 ------------------------- */}
      <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
        <DefaultButtonGroup />
      </Grid>
      {/* ------------------------- row 4 ------------------------- */}
      <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
        <SizeButtonGroup />
      </Grid>

      {/* ------------------------- row 4 ------------------------- */}
      <Grid item xs={12} lg={6} display="flex" alignItems="stretch">
        <VerticalButtonGroup />
      </Grid>

      {/* ------------------------- row 4 ------------------------- */}
      <Grid item xs={12} lg={12} display="flex" alignItems="stretch">
        <ColorButtonGroup />
      </Grid>
    </Grid>
  </PageContainer>
);
export default ExButton;
