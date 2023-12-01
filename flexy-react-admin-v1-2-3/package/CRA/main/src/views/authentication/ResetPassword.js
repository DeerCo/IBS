import React from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import img1 from '../../assets/images/backgrounds/login-bg.svg';

import LogoIcon from '../../layouts/full-layout/logo/LogoIcon';
import CustomTextField from '../../components/forms/custom-elements/CustomTextField';
import CustomFormLabel from '../../components/forms/custom-elements/CustomFormLabel';

import PageContainer from '../../components/container/PageContainer';

const ResetPassword = () => (
  <PageContainer title="Reset Password" description="this is Reset Password page">
    <Grid container spacing={0} sx={{ height: '100vh', justifyContent: 'center' }}>
      <Grid
        item
        xs={12}
        sm={12}
        lg={6}
        sx={{
          background: (theme) => `${theme.palette.mode === 'dark' ? '#1c1f25' : '#ffffff'}`,
        }}
      >
        <Box
          sx={{
            position: 'relative',
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              position: {
                xs: 'relative',
                lg: 'absolute',
              },
              height: { xs: 'auto', lg: '100vh' },
              right: { xs: 'auto', lg: '-50px' },
              margin: '0 auto',
            }}
          >
            <img
              src={img1}
              alt="bg"
              style={{
                width: '100%',
                maxWidth: '812px',
              }}
            />
          </Box>

          <Box
            display="flex"
            alignItems="center"
            sx={{
              p: 4,
              position: 'absolute',
              top: '0',
            }}
          >
            <LogoIcon />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={8} lg={6} display="flex" alignItems="center">
        <Grid container spacing={0} display="flex" justifyContent="center">
          <Grid item xs={12} lg={9} xl={6}>
            <Box
              sx={{
                p: 4,
              }}
            >
              <Typography variant="h2" fontWeight="700">
                Forgot your password?
              </Typography>

              <Typography
                color="textSecondary"
                variant="h5"
                fontWeight="400"
                sx={{
                  mt: 2,
                }}
              >
                Please enter the email address associated with your account and We will email you a
                link to reset your password.
              </Typography>

              <Box
                sx={{
                  mt: 4,
                }}
              >
                <CustomFormLabel htmlFor="reset-email">Email Adddress</CustomFormLabel>
                <CustomTextField id="reset-email" variant="outlined" fullWidth />

                <Button
                  color="secondary"
                  variant="contained"
                  size="large"
                  fullWidth
                  component={Link}
                  to="/"
                  sx={{
                    pt: '10px',
                    pb: '10px',
                    mt: 4,
                  }}
                >
                  Reset Password
                </Button>
                <Button
                  color="secondary"
                  size="large"
                  fullWidth
                  component={Link}
                  to="/auth/login"
                  sx={{
                    pt: '10px',
                    pb: '10px',
                    mt: 2,
                  }}
                >
                  Back to Login
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </PageContainer>
);

export default ResetPassword;
