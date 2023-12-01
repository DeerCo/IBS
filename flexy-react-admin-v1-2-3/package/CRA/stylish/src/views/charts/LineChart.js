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
    title: 'Line Chart',
  },
];

const LineChart = () => {
  const optionslinechart = {
    chart: {
      height: 350,
      type: 'line',
      fontFamily: "'DM Sans', sans-serif",
      foreColor: '#adb0bb',
      zoom: {
        type: 'x',
        enabled: true,
      },
      toolbar: {
        show: false,
      },
      shadow: {
        enabled: true,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 1,
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      title: {
        text: 'Month',
      },
    },
    grid: {
      show: false,
    },
    colors: ['#0b70fb', '#6ac3fd'],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: 'straight',
      width: '2',
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      floating: true,
      offsetY: -25,
      offsetX: -5,
    },
    tooltip: {
      theme: 'dark',
    },
  };
  const serieslinechart = [
    {
      name: 'High - 2013',
      data: [28, 29, 33, 36, 32, 32, 33],
    },
    {
      name: 'Low - 2013',
      data: [12, 11, 14, 18, 17, 13, 13],
    },
  ];

  return (
    <PageContainer title="Line Chart" description="this is innerpage">
      {/* breadcrumb */}
      <Breadcrumb title="Line Chart" items={BCrumb} />
      {/* end breadcrumb */}
      <Card>
        <Box p={2} display="flex" alignItems="center">
          <Box flexGrow={1}>
            <Typography variant="h4">Line Charts</Typography>
          </Box>
        </Box>
        <CardContent>
          <Chart options={optionslinechart} series={serieslinechart} type="line" height="308px" />
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default LineChart;
