import React from 'react';
import Chart from 'react-apexcharts';
import { Card, CardContent, Box, Typography, Grid } from '@mui/material';
import PageContainer from '../../components/container/PageContainer';
import Breadcrumb from '../../layouts/full-layout/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Radialbar Chart',
  },
];

const RadialbarChart = () => {
  const optionsradialchart = {
    chart: {
      id: 'pie-chart',
      fontFamily: "'DM Sans', sans-serif",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
    },
    colors: ['#6ac3fd', '#0b70fb', '#f64e60', '#ffa800'],
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: '22px',
          },
          value: {
            fontSize: '16px',
          },
          total: {
            show: true,
            label: 'Total',
            formatter() {
              return 249;
            },
          },
        },
      },
    },
    tooltip: {
      theme: 'dark',
    },
  };
  const seriesradialchart = [44, 55, 67, 83];

  // 2
  const optionsradarchart = {
    chart: {
      id: 'pie-chart',
      fontFamily: "'DM Sans', sans-serif",
      toolbar: {
        show: false,
      },
    },
    colors: ['#0b70fb'],
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    tooltip: {
      theme: 'dark',
    },
  };
  const seriesradarchart = [
    {
      name: 'Sales',
      data: [80, 50, 30, 40, 100, 20],
    },
  ];

  return (
    <PageContainer title="Radialbar & Radar Chart" description="this is innerpage">
      {/* breadcrumb */}
      <Breadcrumb title="Radialbar Chart" items={BCrumb} />
      {/* end breadcrumb */}
      <Grid container spacing={3}>
        <Grid item lg={6} md={12} xs={12}>
          <Card>
            <Box p={2} display="flex" alignItems="center">
              <Box flexGrow={1}>
                <Typography variant="h4">Radial bar Charts</Typography>
              </Box>
            </Box>
            <CardContent>
              <Chart
                options={optionsradialchart}
                series={seriesradialchart}
                type="radialBar"
                height="300px"
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={6} md={12} xs={12}>
          <Card>
            <Box p={2} display="flex" alignItems="center">
              <Box flexGrow={1}>
                <Typography variant="h4">Radar Charts</Typography>
              </Box>
            </Box>
            <CardContent>
              <Chart
                options={optionsradarchart}
                series={seriesradarchart}
                type="radar"
                height="300px"
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default RadialbarChart;
