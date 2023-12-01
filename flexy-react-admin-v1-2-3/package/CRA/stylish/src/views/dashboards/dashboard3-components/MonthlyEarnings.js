import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import Chart from 'react-apexcharts';
import FeatherIcon from 'feather-icons-react';
import { useTheme } from '@mui/material/styles';

const MonthlyEarnings = () => {
  const theme = useTheme();

  const optionsmonthlychart = {
    grid: {
      show: true,
      borderColor: 'transparent',
      strokeDashArray: 2,
      padding: {
        left: 0,
        right: 0,
        bottom: 0,
      },
    },
    colors: ['rgba(255,255,255,0.6)'],
    chart: {
      toolbar: {
        show: false,
      },
      foreColor: '#adb0bb',
      fontFamily: "'DM Sans',sans-serif",
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        startingShape: 'flat',
        endingShape: 'flat',
        columnWidth: '30%',
        barHeight: '100%',
      },
    },
    dataLabels: {
      enabled: false,
    },

    legend: {
      show: false,
    },
    stroke: {
      show: true,
      width: 2,
      curve: 'smooth',
      colors: ['transparent'],
    },
    tooltip: {
      theme: 'dark',
    },
  };
  const seriesmonthlychart = [
    {
      name: 'Monthly Earnings',
      data: [6, 10, 9, 11, 9, 10, 12, 10, 9, 11, 9, 10, 12],
    },
  ];
  return (
    <Card
      sx={{
        backgroundColor: () => theme.palette.primary.main,
        color: 'white',
      }}
    >
      <CardContent>
        <Typography
          variant="h4"
          sx={{
            marginBottom: '0',
          }}
          gutterBottom
        >
          Monthly Earnings
        </Typography>
        <Box mt="20px">
          <Chart
            options={optionsmonthlychart}
            series={seriesmonthlychart}
            type="bar"
            height="45px"
          />
        </Box>
        <Box
          mt="20px"
          sx={{
            display: {
              sm: 'flex',
              xs: 'block',
            },
            alignItems: 'flex-end',
          }}
        >
          <Typography
            sx={{
              marginTop: '8px',
              marginBottom: '0px',
              position: 'relative',
              zIndex: 9,
            }}
            variant="h2"
            gutterBottom
          >
            $39,358
          </Typography>
          <Box ml="10px">
            <FeatherIcon
              icon="arrow-up-left"
              style={{
                height: '16px',
                width: '16px',
              }}
            />
          </Box>

          <Typography
            fontWeight="500"
            sx={{
              lineHeight: '30px',
              position: 'relative',
              zIndex: 9,
              marginTop: '12px',
              marginBottom: '0px',
            }}
            variant="h6"
            gutterBottom
          >
            +9 this week
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MonthlyEarnings;
