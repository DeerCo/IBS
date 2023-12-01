import React from 'react';
import { Box, Typography, Card, CardContent, Avatar, Chip, Divider } from '@mui/material';

import img1 from '../../assets/images/users/1.jpg';
import img2 from '../../assets/images/users/2.jpg';
import img3 from '../../assets/images/users/3.jpg';
import img4 from '../../assets/images/users/4.jpg';

import WidgetCard from '../base-card/WidgetCard';

const comments = [
  {
    id: '1',
    imgsrc: img1,
    title: 'James Anderson',
    subtext: 'Lorem Ipsum is simply dummy text of the printing and type etting industry',
    status: 'Pending',
    time: 'April 14, 2021',
  },
  {
    id: '2',
    imgsrc: img2,
    title: 'Michael Jorden',
    subtext: 'Lorem Ipsum is simply dummy text of the printing and type etting industry',
    status: 'Approved',
    time: 'April 12, 2021',
  },
  {
    id: '3',
    imgsrc: img3,
    title: 'Johnathan Doeting',
    subtext: 'Lorem Ipsum is simply dummy text of the printing and type etting industry',
    status: 'Rejected',
    time: 'April 21, 2021',
  },
  {
    id: '4',
    imgsrc: img4,
    title: 'James Anderson',
    subtext: 'Lorem Ipsum is simply dummy text of the printing and type etting industry',
    status: 'Pending',
    time: 'May 14, 2021',
  },
];

const RecentComments = () => (
  <Card
    sx={{
      p: 0,
      mb: 4,
    }}
  >
    <CardContent
      sx={{
        p: 3,
        pb: 0,
      }}
    >
      <WidgetCard title="Recent Comments" />
    </CardContent>
    <Box sx={{ mt: -2 }}>
      {comments.map((comment) => (
        <Box key={comment.id}>
          <Box
            display="flex"
            alignItems="flex-start"
            sx={{
              p: 3,
            }}
          >
            <Avatar
              src={comment.imgsrc}
              alt={comment.imgsrc}
              sx={{
                width: '45px',
                height: '45px',
              }}
            />
            <Box
              sx={{
                ml: 2,
              }}
            >
              <Typography variant="h5">{comment.title}</Typography>
              <Typography color="textSecondary" variant="h6" fontWeight="400">
                {comment.subtext}
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                sx={{
                  mt: 1,
                }}
              >
                <Chip
                  sx={{
                    backgroundColor:
                      comment.status === 'Pending'
                        ? (theme) => theme.palette.primary.light
                        : comment.status === 'Approved'
                        ? (theme) => theme.palette.success.light
                        : comment.status === 'Rejected'
                        ? (theme) => theme.palette.error.light
                        : (theme) => theme.palette.secondary.light,
                    color:
                      comment.status === 'Pending'
                        ? (theme) => theme.palette.primary.main
                        : comment.status === 'Approved'
                        ? (theme) => theme.palette.success.main
                        : comment.status === 'Rejected'
                        ? (theme) => theme.palette.error.main
                        : (theme) => theme.palette.secondary.main,
                    borderRadius: '15px',
                    pl: '3px',
                    pr: '3px',
                  }}
                  size="small"
                  label={comment.status}
                />
                <Typography
                  color="textSecondary"
                  fontWeight="400"
                  variant="caption"
                  sx={{
                    textAlign: 'right',
                    ml: 'auto',
                  }}
                >
                  {comment.time}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Divider />
        </Box>
      ))}
    </Box>
  </Card>
);

export default RecentComments;
