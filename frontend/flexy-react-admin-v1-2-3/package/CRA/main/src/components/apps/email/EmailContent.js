import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Avatar, Typography, Divider, Chip, Button } from '@mui/material';

const EmailContent = () => {
  const emailDetails = useSelector(
    (state) => state.emailReducer.Emails[state.emailReducer.emailContent - 1],
  );

  return emailDetails ? (
    <Box>
      <Box display="flex" alignItems="center" sx={{ pb: 2 }}>
        <Avatar alt={emailDetails.from} src={emailDetails.thumbnail} />
        <Box sx={{ ml: 2 }}>
          <Typography variant="h6" fontWeight="600">
            {emailDetails.from}
          </Typography>
          <Typography variant="body2">{emailDetails.To}</Typography>
        </Box>
        <Chip
          label={emailDetails.label}
          sx={{ ml: 'auto', height: '21px' }}
          size="small"
          color={
            emailDetails.label === 'Promotional'
              ? 'primary'
              : emailDetails.label === 'Social'
              ? 'error'
              : 'success'
          }
        />
      </Box>
      <Divider />
      <Box sx={{ py: 2 }}>
        <Typography variant="h4" fontWeight="600">
          {emailDetails.subject}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ py: 2 }}>
        <div dangerouslySetInnerHTML={{ __html: emailDetails.emailContent }} />
      </Box>
      <Button variant="outlined" size="small" color="primary">
        Reply
      </Button>
    </Box>
  ) : (
    <Box sx={{}}>
      <Typography variant="h4">Please Select a Mail</Typography>
    </Box>
  );
};

export default EmailContent;
