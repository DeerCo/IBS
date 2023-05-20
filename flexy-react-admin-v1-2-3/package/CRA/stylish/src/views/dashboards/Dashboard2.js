import React from 'react';
import { Grid } from '@mui/material';
import PageContainer from '../../components/container/PageContainer';

import {
  EarningsShop,
  TopCards,
  ProductPerformance,
  WeeklyStats,
  RecentTransactions,
  Earnings,
  YearlySales,
  ProductsTable,
  MedicalproBranding,
  BlogCard,
} from './dashboard2-components';

const Dashboard2 = () => (
  <PageContainer title="eCommerce Dashboard" description="this is eCommerce Dashboard">
    <Grid container spacing={0}>
      <Grid item xs={12} lg={4}>
        <EarningsShop />
      </Grid>
      <Grid item xs={12} lg={8}>
        <TopCards />
      </Grid>
      <Grid item xs={12} lg={8}>
        <ProductPerformance />
      </Grid>
      <Grid item xs={12} lg={4}>
        <Earnings />
        <YearlySales />
      </Grid>
      <Grid item xs={12} lg={4}>
        <RecentTransactions />
      </Grid>
      <Grid item xs={12} lg={8}>
        <ProductsTable />
      </Grid>
      <Grid item xs={12} lg={4}>
        <WeeklyStats />
      </Grid>
      <Grid item xs={12} lg={4}>
        <MedicalproBranding />
      </Grid>
      <Grid item xs={12} lg={4}>
        <BlogCard />
      </Grid>
    </Grid>
  </PageContainer>
);

export default Dashboard2;
