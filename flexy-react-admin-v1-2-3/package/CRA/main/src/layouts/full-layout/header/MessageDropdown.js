import React from 'react';
import { Badge, Box, MenuItem, Typography, Avatar, Divider } from '@mui/material';
import * as data from './data';

const MessageDropdown = () => (
  <Box>
    {data.messages.map((message) => (
      <Box key={message.title}>
        <MenuItem
          sx={{
            pt: 2,
            pb: 2,
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
              <Typography
                variant="h5"
                noWrap
                sx={{
                  width: '240px',
                }}
              >
                {message.title}
              </Typography>
              <Typography
                color="textSecondary"
                variant="h6"
                fontWeight="400"
                sx={{
                  width: '240px',
                }}
                noWrap
              >
                {message.subtitle}
              </Typography>
              <Typography color="textSecondary" variant="body2">
                {message.time}
              </Typography>
            </Box>
          </Box>
        </MenuItem>
        <Divider
          style={{
            marginTop: 0,
            marginBottom: 0,
          }}
        />
      </Box>
    ))}
  </Box>
);

export default MessageDropdown;
