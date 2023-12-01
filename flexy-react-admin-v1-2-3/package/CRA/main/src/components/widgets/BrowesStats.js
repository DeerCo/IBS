import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import WidgetCard from '../base-card/WidgetCard';
import b1 from '../../assets/images/browser/chrome-logo.svg';
import b2 from '../../assets/images/browser/firefox-logo.svg';
import b3 from '../../assets/images/browser/safari-logo.svg';
import b4 from '../../assets/images/browser/edge-logo.svg';
import b5 from '../../assets/images/browser/opera-logo.svg';
import b6 from '../../assets/images/browser/uc-logo.svg';

const stats = [
  {
    id: '1',
    img: b1,
    title: 'Google Chrome',
    percent: '23',
  },
  {
    id: '2',
    img: b2,
    title: 'Mozila Firefox',
    percent: '15',
  },
  {
    id: '3',
    img: b3,
    title: 'Apple Safari',
    percent: '07',
  },
  {
    id: '4',
    img: b4,
    title: 'Internet Explorer',
    percent: '09',
  },
  {
    id: '5',
    img: b5,
    title: 'Opera mini',
    percent: '23',
  },
  {
    id: '6',
    img: b6,
    title: 'UC Browser',
    percent: '04',
  },
];

const BrowesStats = () => (
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
      <WidgetCard title="Browser Stats" />
      <Box sx={{ mt: -1 }}>
        {stats.map((stat) => (
          <Box
            key={stat.id}
            display="flex"
            alignItems="center"
            sx={{
              pb: 2,
              pt: 2,
            }}
          >
            <img src={stat.img} alt={stat.img} width="40" />
            <Box
              sx={{
                ml: 2,
              }}
            >
              <Typography color="textSecondary" variant="h5">
                {stat.title}
              </Typography>
            </Box>
            <Box
              sx={{
                ml: 'auto',
              }}
            >
              <Typography color="textSecondary" variant="h5" fontWeight="400">
                {stat.percent}%
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </CardContent>
  </Card>
);

export default BrowesStats;
