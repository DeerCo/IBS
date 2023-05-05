import React from 'react';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import FeatherIcon from 'feather-icons-react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';

const YearlySales = () => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  // chart
  const optionsyearlysales = {
    labels: ['2021', '2020', '2019', '2018'],

    chart: {
      height: 145,
      type: 'donut',
      foreColor: '#adb0bb',
      fontFamily: 'DM sans',
    },
    colors: [primary, '#1e4db7', '#fec90f', '#ecf0f2'],
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
          size: '65%',
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
  const seriesyearlysales = [25, 25, 25, 25];
  return (
    <Card>
      <CardContent>
        <Grid container spacing={0}>
          <Grid item xs={6} xl={7}>
            <Typography
              fontWeight="500"
              variant="h1"
              sx={{
                lineHeight: '35px',
              }}
            >
              43,246
            </Typography>
            <Typography color="textSecondary" variant="h6">
              Yearly sales
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              sx={{
                mt: 3,
              }}
            >
              <Box display="flex" alignItems="center">
                <Box
                  sx={{
                    backgroundColor: () => theme.palette.primary.main,
                    borderRadius: '50%',
                    height: 8,
                    width: 8,
                    mr: 1,
                  }}
                />
                <Typography color="textSecondary" variant="body2" fontWeight="400">
                  2021
                </Typography>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                sx={{
                  ml: 1,
                }}
              >
                <Box
                  sx={{
                    backgroundColor: () => theme.palette.secondary.main,
                    borderRadius: '50%',
                    height: 8,
                    width: 8,
                    mr: 1,
                  }}
                />
                <Typography color="textSecondary" variant="body2" fontWeight="400">
                  2020
                </Typography>
              </Box>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              sx={{
                mt: 1,
              }}
            >
              <Box display="flex" alignItems="center">
                <Box
                  sx={{
                    backgroundColor: () => theme.palette.warning.main,
                    borderRadius: '50%',
                    height: 8,
                    width: 8,
                    mr: 1,
                  }}
                />
                <Typography color="textSecondary" variant="body2" fontWeight="400">
                  2019
                </Typography>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                sx={{
                  ml: 1,
                }}
              >
                <Box
                  sx={{
                    backgroundColor: () => theme.palette.grey.A200,
                    borderRadius: '50%',
                    height: 8,
                    width: 8,
                    mr: 1,
                  }}
                />
                <Typography color="textSecondary" variant="body2" fontWeight="400">
                  2018
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6} xl={5} display="flex" alignItems="center" justifyContent="flex-end">
            {/* chart */}
            <Box
              sx={{
                position: 'relative',
                mt: 1,
              }}
            >
              <Chart
                options={optionsyearlysales}
                series={seriesyearlysales}
                type="donut"
                height="145"
              />
              <Typography
                color="textSecondary"
                sx={{
                  position: 'absolute',
                  left: '42%',
                  top: '41%',
                }}
              >
                <FeatherIcon icon="shopping-cart" height="24" width="24" />
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default YearlySales;
