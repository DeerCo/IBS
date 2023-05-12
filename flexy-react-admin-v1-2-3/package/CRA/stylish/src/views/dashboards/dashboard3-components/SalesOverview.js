import React from 'react';
import { Typography, Box, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Chart from 'react-apexcharts';
import FeatherIcon from 'feather-icons-react';
import DashboardCard from '../../../components/base-card/DashboardCard';

const SalesOverview = () => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  const optionssalesoverview = {
    grid: {
      show: true,
      borderColor: 'transparent',
      strokeDashArray: 2,
      padding: {
        left: 0,
        right: 0,
        bottom: -13,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '42%',
        endingShape: 'rounded',
        borderRadius: 5,
      },
    },

    colors: [primary, secondary],
    fill: {
      type: 'solid',
      opacity: 1,
    },
    chart: {
      toolbar: {
        show: false,
      },
      foreColor: '#adb0bb',
      fontFamily: "'DM Sans',sans-serif",
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    legend: {
      show: false,
    },
    xaxis: {
      type: 'category',
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      labels: {
        style: {
          cssClass: 'grey--text lighten-2--text fill-color',
        },
      },
    },
    yaxis: {
      show: true,
      min: 100,
      max: 400,
      tickAmount: 3,
    },
    stroke: {
      show: true,
      width: 5,
      lineCap: 'butt',
      colors: ['transparent'],
    },
    tooltip: {
      theme: 'dark',
    },
  };
  const seriessalesoverview = [
    {
      name: 'Ample Admin',
      data: [355, 390, 300, 350, 390, 180],
    },
    {
      name: 'Pixel Admin',
      data: [280, 250, 325, 215, 250, 310],
    },
  ];
  return (
    <DashboardCard
      title="Sales Overview"
      subtitle="Ample Admin Vs Pixel Admin"
      customdisplay="block"
      action={
        <Stack direction="row" spacing={2}>
          <Typography
            variant="h6"
            display="flex"
            alignItems="center"
            sx={{
              color: () => theme.palette.primary.main,
            }}
          >
            <Typography
              sx={{
                color: 'primary.main',
                '& svg': {
                  fill: () => theme.palette.primary.main,
                },
                mr: '5px',
              }}
            >
              <FeatherIcon icon="circle" width="10" height="10" />
            </Typography>
            Ample
          </Typography>
          <Typography
            variant="h6"
            display="flex"
            alignItems="center"
            sx={{
              color: () => theme.palette.secondary.main,
            }}
          >
            <Typography
              sx={{
                color: 'secondary.main',
                '& svg': {
                  fill: () => theme.palette.secondary.main,
                },
                mr: '5px',
              }}
            >
              <FeatherIcon icon="circle" width="10" height="10" />
            </Typography>
            Pixel Admin
          </Typography>
        </Stack>
      }
    >
      <Box>
        <Chart
          options={optionssalesoverview}
          series={seriessalesoverview}
          type="bar"
          height="280px"
        />
      </Box>
    </DashboardCard>
  );
};

export default SalesOverview;
