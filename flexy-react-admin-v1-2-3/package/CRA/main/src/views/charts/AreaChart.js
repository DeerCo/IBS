import React from 'react';
import Chart from 'react-apexcharts';
import { Card, CardContent, Box, Typography } from '@mui/material';

import PageContainer from '../../components/container/PageContainer';
import Breadcrumb from '../../layouts/full-layout/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Area Chart',
  },
];

const AreaChart = () => {
  const optionsareachart = {
    chart: {
      id: 'area-chart',
      fontFamily: "'DM Sans', sans-serif",
      foreColor: '#adb0bb',
      zoom: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: '3',
      curve: 'smooth',
    },
    colors: ['#0b70fb', '#6ac3fd'],
    xaxis: {
      type: 'datetime',
      categories: [
        '2018-09-19T00:00:00',
        '2018-09-19T01:30:00',
        '2018-09-19T02:30:00',
        '2018-09-19T03:30:00',
        '2018-09-19T04:30:00',
        '2018-09-19T05:30:00',
        '2018-09-19T06:30:00',
      ],
    },
    yaxis: {
      opposite: false,
      labels: {
        show: true,
      },
    },
    legend: {
      show: true,
      position: 'bottom',
      width: '50px',
    },
    grid: {
      show: false,
    },
    tooltip: {
      theme: 'dark',
      fillSeriesColor: false,
    },
  };
  const seriesareachart = [
    {
      name: 'Sales Summery 1',
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: 'Sales Summery 2',
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ];

  return (
    <PageContainer title="Area Chart" description="this is innerpage">
      {/* breadcrumb */}
      <Breadcrumb title="Area Chart" items={BCrumb} />
      {/* end breadcrumb */}
      <Card>
        <Box p={2} display="flex" alignItems="center">
          <Box flexGrow={1}>
            <Typography variant="h4">Area Charts</Typography>
          </Box>
        </Box>
        <CardContent>
          <Chart options={optionsareachart} series={seriesareachart} type="area" height="300px" />
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default AreaChart;
