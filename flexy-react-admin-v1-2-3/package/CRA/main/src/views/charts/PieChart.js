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
    title: 'Pie Chart',
  },
];

const PieChart = () => {
  const optionspiechart = {
    chart: {
      id: 'pie-chart',
      fontFamily: "'DM Sans', sans-serif",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: true,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70px',
        },
      },
    },
    legend: {
      show: true,
      position: 'bottom',
      width: '50px',
    },
    colors: [
      'rgb(30, 136, 229)',
      'rgb(38, 198, 218)',
      'rgb(236, 239, 241)',
      'rgb(116, 90, 242)',
      '#ef5350',
    ],
    tooltip: {
      fillSeriesColor: false,
    },
  };
  const seriespiechart = [45, 15, 27, 18, 35];

  return (
    <PageContainer title="Pie Charts" description="this is innerpage">
      {/* breadcrumb */}
      <Breadcrumb title="Pie Chart" items={BCrumb} />
      {/* end breadcrumb */}
      <Card>
        <Box p={2} display="flex" alignItems="center">
          <Box flexGrow={1}>
            <Typography variant="h4">Pie Charts</Typography>
          </Box>
        </Box>
        <CardContent>
          <Chart options={optionspiechart} series={seriespiechart} type="pie" height="300px" />
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default PieChart;
