import React from 'react';
import { Card, CardContent, Divider, Box, Typography, Button } from '@mui/material';
import CustomTextField from '../custom-elements/CustomTextField';
import CustomFormLabel from '../custom-elements/CustomFormLabel';

const FbDisabledForm = () => (
  <div>
    {/* ------------------------------------------------------------------------------------------------ */}
    {/* Basic Checkbox */}
    {/* ------------------------------------------------------------------------------------------------ */}
    <Card
      sx={{
        p: 0,
      }}
    >
      <Box
        sx={{
          padding: '15px 30px',
        }}
        display="flex"
        alignItems="center"
      >
        <Box flexGrow={1}>
          <Typography fontWeight="500" variant="h4">
            Disabled Form
          </Typography>
        </Box>
      </Box>
      <Divider />
      <CardContent
        sx={{
          padding: '30px',
        }}
      >
        <form>
          <CustomFormLabel
            sx={{
              mt: 0,
            }}
            htmlFor="df-name"
          >
            Name
          </CustomFormLabel>
          <CustomTextField
            id="df-name"
            variant="outlined"
            size="small"
            fullWidth
            disabled
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: (theme) =>
                  `${
                    theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.12) !important'
                      : '#dee3e9 !important'
                  }`,
              },
            }}
          />
          <CustomFormLabel htmlFor="df-email-address">Email</CustomFormLabel>
          <CustomTextField
            id="df-email-address"
            helperText="We'll never share your email with anyone else."
            variant="outlined"
            size="small"
            fullWidth
            disabled
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: (theme) =>
                  `${
                    theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.12) !important'
                      : '#dee3e9 !important'
                  }`,
              },
            }}
          />
          <CustomFormLabel htmlFor="df-outlined-password-input">Password</CustomFormLabel>
          <CustomTextField
            id="df-outlined-password-input"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            size="small"
            fullWidth
            disabled
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: (theme) =>
                  `${
                    theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.12) !important'
                      : '#dee3e9 !important'
                  }`,
              },
            }}
          />
          <div>
            <Button color="primary" variant="contained" disabled>
              Submit
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
);

export default FbDisabledForm;
