import React from 'react';
import { Typography, Fab, Box, Grid, Button, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Chart from 'react-apexcharts';
import FeatherIcon from 'feather-icons-react';
import DashboardCard from '../../../components/base-card/DashboardCard';

const ProductPerformance = () => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  const optionsproductperformance = {
    chart: {
      type: 'bar',
      height: 265,
      stacked: true,
      toolbar: {
        show: false,
      },
      foreColor: '#adb0bb',
      fontFamily: 'DM sans',
      sparkline: {
        enabled: false,
      },
    },
    grid: {
      show: false,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '45%',
        borderRadius: 9,
      },
    },
    colors: [primary, secondary],
    fill: {
      type: 'solid',
      opacity: 1,
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
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July'],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: true,
      min: 100,
      max: 400,
      tickAmount: 3,
    },

    tooltip: {
      theme: 'dark',
    },
  };
  const seriesproductperformance = [
    {
      name: 'Expence',
      data: [300, 300, 180, 320, 250, 300, 300],
    },
    {
      name: 'Budget',
      data: [60, 90, 80, 60, 70, 100, 80],
    },
  ];
  //   chart 2
  const seriesreport = [
    {
      name: 'Products Performance',
      data: [35, 60, 30, 55, 40],
    },
  ];

  const optionsreport = {
    colors: [primary],
    chart: {
      height: 30,
      toolbar: {
        show: false,
      },
      foreColor: '#adb0bb',
      fontFamily: "'DM Sans',sans-serif",
      sparkline: {
        enabled: true,
      },
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
    stroke: {
      show: true,
      width: 2,
      curve: 'smooth',
    },
    tooltip: {
      theme: 'dark',
    },
  };

  return (
    <DashboardCard
      title="Products Performance"
      subtitle="Latest new products"
      customdisplay="block"
      action={
        <Stack direction="row" spacing={2}>
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
            Expence
          </Typography>
          <Typography
            variant="h6"
            display="flex"
            alignItems="center"
            sx={{
              color: () => theme.palette.warning.main,
            }}
          >
            <Typography
              sx={{
                color: 'warning.main',
                '& svg': {
                  fill: () => theme.palette.warning.main,
                },
                mr: '5px',
              }}
            >
              <FeatherIcon icon="circle" width="10" height="10" />
            </Typography>
            Budget
          </Typography>
        </Stack>
      }
    >
      <Grid
        container
        spacing={0}
        sx={{
          mt: 3,
        }}
      >
        <Grid
          item
          xs={12}
          lg={5}
          sm={5}
          sx={{
            borderRight: {
              xs: '0',
              sm: '1px solid rgba(0,0,0,0.1)',
            },
            pr: 2,
          }}
        >
          <Box display="flex" alignItems="center">
            <Typography fontWeight="500" variant="h1">
              $93,438
            </Typography>
            <Fab
              color="success"
              sx={{
                backgroundColor: () => theme.palette.success.main,
                color: '#fff',
                fontSize: '10px',
                minHeight: '30px !important',
                height: '30px !important',
                width: '30px !important',
                ml: 1,
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: () => theme.palette.success.main,
                },
              }}
            >
              23%
            </Fab>
          </Box>
          <Typography color="textSecondary" variant="h5" fontWeight="400">
            Budget
          </Typography>
          <Box
            sx={{
              mt: 3,
            }}
          >
            <Typography fontWeight="500" variant="h1">
              $32,839
            </Typography>
            <Typography color="textSecondary" variant="h5" fontWeight="400">
              Expense
            </Typography>
          </Box>
          <Box
            sx={{
              mt: 2,
              mb: 2,
            }}
          >
            <Chart options={optionsreport} series={seriesreport} type="line" height="30" />
          </Box>
          <Button
            sx={{
              marginTop: '15px',
            }}
            variant="contained"
            color="primary"
          >
            Download Report
          </Button>
        </Grid>
        <Grid item xs={12} lg={7} sm={7}>
          <Box>
            <Chart
              options={optionsproductperformance}
              series={seriesproductperformance}
              type="bar"
              height="265"
            />
          </Box>
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default ProductPerformance;
