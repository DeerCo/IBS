import React from 'react';
import { Box, Typography, Card, CardContent, LinearProgress } from '@mui/material';
import WidgetCard from '../base-card/WidgetCard';

const visits = [
  {
    id: '1',
    digit: '6,350',
    country: 'India',
    percent: 48,
    color: 'success',
  },
  {
    id: '2',
    digit: '3,250',
    country: 'UAE',
    percent: 98,
    color: 'primary',
  },
  {
    id: '3',
    digit: '1,250',
    country: 'Australia',
    percent: 75,
    color: 'error',
  },
  {
    id: '4',
    digit: '1,350',
    country: 'USA',
    percent: 48,
    color: 'warning',
  },
];

const Visits = () => (
  <Card
    sx={{
      pb: 0,
      mb: 4,
    }}
  >
    <CardContent
      sx={{
        pb: 0,
      }}
    >
      <WidgetCard title="Visit around the countries" />
      <Box sx={{ mt: -1 }}>
        {visits.map((visit) => (
          <Box
            key={visit.id}
            sx={{
              pb: 2,
              pt: 1,
            }}
          >
            <Typography
              variant="h2"
              sx={{
                lineHeight: '1.235',
              }}
            >
              {visit.digit}
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              sx={{
                pb: '3px',
              }}
            >
              <Typography color="textSecondary" variant="h6">
                From {visit.country}
              </Typography>
              <Box
                sx={{
                  ml: 'auto',
                }}
              >
                <Typography color="textSecondary" variant="h6" fontWeight="400">
                  {visit.percent}%
                </Typography>
              </Box>
            </Box>
            <LinearProgress
              value={visit.percent}
              variant="determinate"
              sx={{
                '& span': {
                  backgroundColor:
                    visit.color === 'secondary'
                      ? (theme) => theme.palette.secondary.main
                      : visit.color === 'error'
                      ? (theme) => theme.palette.error.main
                      : visit.color === 'warning'
                      ? (theme) => theme.palette.warning.main
                      : visit.color === 'success'
                      ? (theme) => theme.palette.success.main
                      : visit.color === 'primary'
                      ? (theme) => theme.palette.primary.main
                      : (theme) => theme.palette.primary.main,
                },
              }}
            />
          </Box>
        ))}
      </Box>
    </CardContent>
  </Card>
);

export default Visits;
