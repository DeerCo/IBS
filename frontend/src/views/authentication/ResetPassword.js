import React, {useState} from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
import img1 from '../../assets/images/backgrounds/login-bg.svg';

import LogoIcon from '../../layouts/full-layout/logo/LogoIcon';
import CustomTextField from '../../components/forms/custom-elements/CustomTextField';
import CustomFormLabel from '../../components/forms/custom-elements/CustomFormLabel';

import PageContainer from '../../components/container/PageContainer';
import {toast} from "react-toastify";
import GeneralApi from "../../api/general_api";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";

const ResetPassword = () => {
  let navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

    const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeCode = (e) => {
    const code = e.target.value;
    setCode(code);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "") {
      toast.error("The username cannot be empty", {theme: "colored"});
    } else if (code === "") {
      toast.error("The verification code cannot be empty", {theme: "colored"});
    } else if (password.length < 8) {
      toast.error("The password should contain at least 8 characters", {theme: "colored"});
    } else {
      GeneralApi.reset_password(username, password, code).then(
        (response) => {
          if (!response || !("status" in response)) {
            toast.error("Unknown error", {theme: "colored"});
          } else if (response["status"] === 200) {
            toast.success("Your password has been changed", {theme: "colored"});
            navigate("/login");
          } else if (response["status"] === 400) {
            toast.error("The username or verification code is not valid", {theme: "colored"});
          } else if (response["status"] === 429) {
            toast.error("You've sent too many requests. Please try again in one hour.", {theme: "colored"});
          } else {
            toast.error("Unknown error", {theme: "colored"});
          }
        }
      );
    }
  };

  const handleCode = (e) => {
    e.preventDefault();

    if (username === "") {
      toast.error("Username cannot be empty", {theme: "colored"});
    } else {
      GeneralApi.send_code(username).then(
        (response) => {
          if (!response || !("status" in response)) {
            toast.error("Unknown error", {theme: "colored"});
          } else if (response["status"] === 200) {
            toast.success("A verification code has been sent to your email if the username is valid", {theme: "colored"});
          } else {
            toast.error("Unknown error", {theme: "colored"});
          }
        }
      );
    }
  };

  return (
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
                  Forgot your password / First Time Login?
                </Typography>

                <Typography
                  color="textSecondary"
                  variant="h5"
                  fontWeight="400"
                  sx={{
                    mt: 2,
                  }}
                >
                  Please enter your utorid and We will email you a
                  link with a code to reset your password.
                </Typography>

                <Box
                  sx={{
                    mt: 4,
                  }}
                  component={'form'}
                  onSubmit={handleLogin}
                >
                  <CustomFormLabel htmlFor="username">Username</CustomFormLabel>
                  <CustomTextField value={username} onChange={onChangeUsername} id="username" variant="outlined" fullWidth />

                  <Grid container spacing={2} sx={{alignItems: "center"}}>
                  <Grid item xs={12} sm={6} lg={6}>
                  <CustomFormLabel htmlFor="code">Code</CustomFormLabel>
                  <CustomTextField value={code} onChange={onChangeCode} id="code" variant="outlined" fullWidth />

                  </Grid>
                  <Grid item xs={12} sm={6} lg={6}>
                  <Button
                    color="secondary"
                    variant="contained"
                    size="large"
                    fullWidth
                    type="submit"
                    sx={{
                      pt: '10px',
                      pb: '10px',
                      mt: 4,
                    }}
                    onClick={handleCode}
                  >
                    Send Code
                  </Button>
                  </Grid>
                </Grid>



                  <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
                  <CustomTextField value={password} onChange={onChangePassword} id="password" variant="outlined" fullWidth />

                  <Button
                    color="secondary"
                    variant="contained"
                    size="large"
                    fullWidth
                    type="submit"
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
                    to="/login"
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
}

export default ResetPassword;
