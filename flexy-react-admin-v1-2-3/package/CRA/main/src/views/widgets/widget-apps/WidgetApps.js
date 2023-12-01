import React from 'react';
import { Grid } from '@mui/material';

import RecentComments from '../../../components/widgets/RecentComments';
import Todo from '../../../components/widgets/Todo';
import Visits from '../../../components/widgets/Visits';
import TaskList from '../../../components/widgets/TaskList';
import RecentMessages from '../../../components/widgets/RecentMessages';
import BrowesStats from '../../../components/widgets/BrowesStats';
import Subscribe from '../../../components/widgets/Subscribe';

import Breadcrumb from '../../../layouts/full-layout/breadcrumb/Breadcrumb';
import PageContainer from '../../../components/container/PageContainer';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Widget Apps',
  },
];

const WidgetApps = () => {
  return (
    <PageContainer title="Widget Apps" description="this is Widget Apps page">
      {/* breadcrumb */}
      <Breadcrumb title="Widget Apps" items={BCrumb} />

      {/* end breadcrumb */}
      <Grid container spacing={0}>
        <Grid item lg={4} md={12} xs={12}>
          <RecentComments />
          <TaskList />
        </Grid>
        <Grid item lg={4} md={12} xs={12}>
          <Todo />
          <Visits />
          <Subscribe />
        </Grid>
        <Grid item lg={4} md={12} xs={12}>
          <RecentMessages />
          <BrowesStats />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default WidgetApps;
