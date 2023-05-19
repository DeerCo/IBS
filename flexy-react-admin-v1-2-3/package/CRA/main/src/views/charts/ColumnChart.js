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
    title: 'Column Chart',
  },
];

const ColumnChart = () => {
  const optionscolumnchart = {
    chart: {
      id: 'column-chart',
      fontFamily: "'DM Sans', sans-serif",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
    },
    colors: ['#6ac3fd', '#0b70fb', '#f64e60'],
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: 'rounded',
        columnWidth: '20%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    },
    yaxis: {
      title: {
        text: '$ (thousands)',
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter(val) {
          return `$ ${val} thousands`;
        },
      },
      theme: 'dark',
    },
    grid: {
      show: false,
    },
    legend: {
      show: true,
      position: 'bottom',
      width: '50px',
    },
  };
  const seriescolumnchart = [
    {
      name: 'Desktop',
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
    },
    {
      name: 'Mobile',
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
    },
    {
      name: 'Other',
      data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
    },
  ];

  return (
    <PageContainer title="Column Chart" description="this is innerpage">
      {/* breadcrumb */}
      <Breadcrumb title="Column Chart" items={BCrumb} />
      {/* end breadcrumb */}
      <Card>
        <Box p={2} display="flex" alignItems="center">
          <Box flexGrow={1}>
            <Typography variant="h4">Column Charts</Typography>
          </Box>
        </Box>
        <CardContent>
          <Chart
            options={optionscolumnchart}
            series={seriescolumnchart}
            type="bar"
            height="300px"
          />
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default ColumnChart;
