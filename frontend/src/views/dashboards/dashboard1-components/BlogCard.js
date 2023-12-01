import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  Divider,
} from '@mui/material';

import FeatherIcon from 'feather-icons-react';
import background2x from '../../../assets/images/backgrounds/blog-bg2-2x.jpg';

import img1 from '../../../assets/images/users/1.jpg';
import img2 from '../../../assets/images/users/2.jpg';
import img3 from '../../../assets/images/users/3.jpg';

const BlogCard = () => (
  <Card
    sx={{
      p: 0,
    }}
  >
    <img srcSet={`${background2x} 1x, ${background2x} 2x`} alt="img" height="205" width="100%" />
    <CardContent
      sx={{
        paddingLeft: '30px',
        paddingRight: '30px',
      }}
    >
      <Box display="flex" alignItems="center">
        <Typography color="textSecondary" display="flex" alignItems="center">
          <FeatherIcon icon="clock" width="20" height="20" />
        </Typography>

        <Typography
          color="textSecondary"
          variant="subtitle2"
          sx={{
            ml: 1,
          }}
        >
          22 March, 2021
        </Typography>
      </Box>
      <Typography
        variant="h4"
        sx={{
          mt: 3,
          pt: 1,
        }}
      >
        Super awesome, React 18 is coming soon!
      </Typography>
      <Box
        display="flex"
        alignItems="center"
        sx={{
          mt: 2,
          pb: 3,
        }}
      >
        <Chip
          label="Medium"
          size="small"
          sx={{
            backgroundColor: (theme) => theme.palette.secondary.main,
            color: '#fff',
            pl: '3px',
            pr: '3px',
            borderRadius: '6px',
          }}
        />
        <Chip
          label="Low"
          size="small"
          sx={{
            backgroundColor: (theme) => theme.palette.error.main,
            color: '#fff',
            pl: '3px',
            pr: '3px',
            borderRadius: '6px',
            ml: 2,
          }}
        />
      </Box>
      <Divider />
      <Box
        display="flex"
        alignItems="center"
        sx={{
          mt: 3,
        }}
      >
        <Tooltip title="John Deo" placement="top">
          <Avatar src={img1} width="35" />
        </Tooltip>
        <Tooltip title="Micheal Doe" placement="top">
          <Avatar
            src={img2}
            width="35"
            sx={{
              ml: 1,
              mr: 1,
            }}
          />
        </Tooltip>
        <Tooltip title="John Peter" placement="top">
          <Avatar src={img3} width="35" />
        </Tooltip>
        <Box
          sx={{
            ml: 'auto',
          }}
        >
          <Tooltip title="Add Comment" placement="top">
            <IconButton>
              <FeatherIcon icon="message-circle" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

export default BlogCard;
