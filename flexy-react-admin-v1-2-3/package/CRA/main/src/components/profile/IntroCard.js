import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import FeatherIcon from 'feather-icons-react';

const IntroCard = () => (
  <Card>
    <CardContent>
      <Typography fontWeight="500" variant="h3">
        Introduction
      </Typography>
      <Typography
        color="textSecondary"
        variant="h5"
        fontWeight="400"
        sx={{
          mt: '17px',
        }}
      >
        Hello, I am Julia Roberts. I love making websites and graphics. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit.
      </Typography>
      <Box
        display="flex"
        alignItems="flex-start"
        sx={{
          mt: 3,
        }}
      >
        <Typography
          display="flex"
          alignItems="flex-start"
          sx={{
            color: (theme) => theme.palette.grey.A200,
          }}
        >
          <FeatherIcon icon="book-open" width="20" display="flex" alignitems="center" />
        </Typography>
        <Box
          sx={{
            ml: '20px',
          }}
        >
          <Typography variant="h5" fontWeight="600">
            <Typography
              component="span"
              color="textSecondary"
              variant="h5"
              fontWeight="400"
              sx={{
                mr: '2px',
              }}
            >
              Studied at
            </Typography>
            Sir, P P Institute Of Science
          </Typography>
        </Box>
      </Box>
      <Box
        display="flex"
        alignItems="flex-start"
        sx={{
          mt: 2,
        }}
      >
        <Typography
          display="flex"
          alignItems="flex-start"
          sx={{
            color: (theme) => theme.palette.grey.A200,
          }}
        >
          <FeatherIcon icon="globe" width="20" display="flex" alignitems="center" />
        </Typography>
        <Box
          sx={{
            ml: '20px',
          }}
        >
          <Typography variant="h5" fontWeight="600">
            www.wrappixel.com
          </Typography>
        </Box>
      </Box>
      <Box
        display="flex"
        alignItems="flex-start"
        sx={{
          mt: 2,
        }}
      >
        <Typography
          display="flex"
          alignItems="flex-start"
          sx={{
            color: (theme) => theme.palette.grey.A200,
          }}
        >
          <FeatherIcon icon="map-pin" width="20" display="flex" alignitems="center" />
        </Typography>
        <Box
          sx={{
            ml: '20px',
          }}
        >
          <Typography variant="h5" fontWeight="600">
            <Typography
              component="span"
              color="textSecondary"
              variant="h5"
              fontWeight="400"
              sx={{
                mr: 1,
              }}
            >
              From
            </Typography>
            Colombo
          </Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

export default IntroCard;
