import React from 'react';
import { Typography, Box, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Chart from 'react-apexcharts';
import FeatherIcon from 'feather-icons-react';
import ThemeSelect from './ThemeSelect';
import DashboardCard from '../../../components/base-card/DashboardCard';

const TotalSales = () => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const warning = theme.palette.warning.main;
  const grey = theme.palette.grey.A100;
  const optionstotalsales = {
    labels: ['2021', '2020', '2019'],

    chart: {
      height: 280,
      type: 'donut',
      foreColor: '#adb0bb',
      fontFamily: 'DM sans',
    },
    colors: [primary, secondary, grey],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    stroke: {
      colors: ['transparent'],
    },
    plotOptions: {
      pie: {
        donut: {
          size: '78%',
          background: 'transparent',
          labels: {
            show: false,
            name: {
              show: true,
              fontSize: '18px',
              color: undefined,
              offsetY: -10,
            },
            value: {
              show: false,
              color: '#98aab4',
            },
            total: {
              show: false,
              label: 'Our Visitors',
              color: '#98aab4',
            },
          },
        },
      },
    },
    tooltip: {
      theme: 'dark',
      fillSeriesColor: false,
    },
  };
  const seriestotalsales = [25, 35, 35];
  return (
    <DashboardCard title="Total Sales" subtitle="Overview of Years" action={<ThemeSelect />}>
      <Divider style={{ marginTop: '0px' }} />
      <Box
        display="flex"
        alignItems="center"
        sx={{
          mt: 3,
        }}
      >
        <Typography
          color="textSecondary"
          variant="body1"
          sx={{
            fontSize: 'h5.fontSize',
          }}
        >
          Sales Yearly
        </Typography>
        <Box
          sx={{
            ml: 'auto',
          }}
        >
          <Typography
            variant="h2"
            fontWeight="700"
            sx={{
              marginBottom: '0',
            }}
            gutterBottom
          >
            8,364,398
          </Typography>
        </Box>
      </Box>
      {/* chart */}
      <Box
        sx={{
          mt: 5,
          position: 'relative',
        }}
      >
        <Chart options={optionstotalsales} series={seriestotalsales} type="donut" height="280" />
        <Typography
          color="textSecondary"
          sx={{
            position: 'absolute',
            left: '46%',
            top: '45%',
          }}
        >
          <FeatherIcon icon="shopping-cart" height="30" width="30" />
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{
          mt: 5,
        }}
      >
        <Box display="flex" alignItems="center">
          <Box
            sx={{
              backgroundColor: primary,
              borderRadius: '50%',
              height: 8,
              width: 8,
              mr: 1,
            }}
          />
          <Typography color="textSecondary" variant="h6">
            2021
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Box
            sx={{
              backgroundColor: secondary,
              borderRadius: '50%',
              height: 8,
              width: 8,
              mr: 1,
            }}
          />
          <Typography color="textSecondary" variant="h6">
            2020
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Box
            sx={{
              backgroundColor: warning,
              borderRadius: '50%',
              height: 8,
              width: 8,
              mr: 1,
            }}
          />
          <Typography color="textSecondary" variant="h6">
            2019
          </Typography>
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default TotalSales;
