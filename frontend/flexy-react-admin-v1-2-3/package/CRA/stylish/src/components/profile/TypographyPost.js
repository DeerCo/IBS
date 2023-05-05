import React from 'react';
import { Box, CardContent, Typography, Button, Link, Tooltip } from '@mui/material';
import FeatherIcon from 'feather-icons-react';
import BasePost from './BasePost';
import img1 from '../../assets/images/users/user2.jpg';

const TypographyPost = () => (
  <BasePost img={img1} username="Julia Roberts" time="38 minutes ago">
    <CardContent
      sx={{
        p: '30px',
        pt: 0,
      }}
    >
      <Typography
        color="textSecondary"
        variant="h5"
        fontWeight="400"
        sx={{
          mt: 2,
        }}
      >
        How you can become kickass web developer in 2021? Donec tincidunt, tellus id vehicula
        tristique, quam purus dapibus mauris, in vehicula diam ligula sit amet dui. Ut tristique leo
        ac ultricies sagittis
        <Link href="/" underline="none">
          #web development trends
        </Link>
        #web development trends #web trends
        <Link
          href="/"
          underline="none"
          sx={{
            ml: 1,
          }}
        >
          #web trends
        </Link>{' '}
        check out best related articles as well.
      </Typography>
      <Typography
        color="textSecondary"
        variant="h5"
        fontWeight="400"
        sx={{
          mt: 2,
        }}
      >
        Cras nec justo vitae ligula posuere consectetur.
      </Typography>
    </CardContent>

    <Box
      display="flex"
      alignItems="center"
      sx={{
        pl: '35px',
        pr: '35px',
        pt: '20px',
      }}
    >
      <Box>
        <Tooltip title="Like" placement="top">
          <Button
            variant="contained"
            color="secondary"
            sx={{
              minWidth: '35px',
              height: '35px',
              borderRadius: '50%',
              p: 0,
            }}
          >
            <FeatherIcon icon="thumbs-up" width="15" />
          </Button>
        </Tooltip>
      </Box>
      <Typography
        variant="h6"
        fontWeight="600"
        sx={{
          ml: 1,
        }}
      >
        315
      </Typography>
      <Box
        display="flex"
        alignItems="center"
        sx={{
          ml: 'auto',
        }}
      >
        <Link href="/" color="inherit" underline="none">
          <Typography variant="h6" fontWeight="600">
            6 Comments
          </Typography>
        </Link>
        <Link
          href="/"
          color="inherit"
          underline="none"
          sx={{
            ml: 2,
          }}
        >
          <Typography variant="h6" fontWeight="600">
            2 Shares
          </Typography>
        </Link>
      </Box>
    </Box>
  </BasePost>
);

export default TypographyPost;
