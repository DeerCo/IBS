import React from 'react';
import { Box, Typography, Card, CardContent, Avatar, Badge, Divider } from '@mui/material';
import WidgetCard from '../base-card/WidgetCard';

import img1 from '../../assets/images/users/1.jpg';
import img2 from '../../assets/images/users/2.jpg';
import img3 from '../../assets/images/users/3.jpg';
import img4 from '../../assets/images/users/4.jpg';

const messages = [
  {
    id: '1',
    avatar: img1,
    title: 'Roman Joined the Team!',
    subtitle: 'Congratulate him',
    time: '9:08 AM',
    status: 'success',
  },
  {
    id: '2',
    avatar: img2,
    title: 'New message received',
    subtitle: 'Salma sent you new message',
    time: '11:56 AM',
    status: 'warning',
  },
  {
    id: '3',
    avatar: img3,
    title: 'New Payment received',
    subtitle: 'Check your earnings',
    time: '4:39 AM',
    status: 'success',
  },
  {
    id: '4',
    avatar: img4,
    title: 'Jolly completed tasks',
    subtitle: 'Assign her new tasks',
    time: '1:12 AM',
    status: 'danger',
  },
];

const RecentMessages = () => (
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
      <WidgetCard title="Recent Messages" />
    </CardContent>
    <Box sx={{ mt: -2 }}>
      {messages.map((message) => (
        <Box key={message.id}>
          <Box
            sx={{
              p: 3,
              borderRadius: '0px',
            }}
          >
            <Box display="flex" alignItems="center">
              <Badge variant="dot" color={message.status}>
                <Avatar
                  src={message.avatar}
                  alt={message.avatar}
                  sx={{
                    width: '45px',
                    height: '45px',
                  }}
                />
              </Badge>

              <Box
                sx={{
                  ml: 2,
                }}
              >
                <Typography variant="h5">{message.title}</Typography>
                <Typography color="textSecondary" variant="h6" fontWeight="400">
                  {message.subtitle}
                </Typography>
                <Typography color="textSecondary" variant="caption" fontWeight="400">
                  {message.time}
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

export default RecentMessages;
