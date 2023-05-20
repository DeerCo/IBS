import React, {useState} from 'react';
import { Grid, Box, Typography, FormGroup, FormControlLabel, Button } from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';

import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

import CustomCheckbox from '../../components/FlexyMainComponents/forms/custom-elements/CustomCheckbox';
import CustomTextField from '../../components/FlexyMainComponents/forms/custom-elements/CustomTextField';
import CustomFormLabel from '../../components/FlexyMainComponents/forms/custom-elements/CustomFormLabel';
import PageContainer from '../../components/FlexyMainComponents/container/PageContainer';

import img1 from '../../assets/images/backgrounds/login-bg.svg';
import LogoIcon from '../../layouts/full-layout/logo/LogoIcon';
import {toast} from "react-toastify";
import GeneralApi from "../../api/general_api";

const Login = () => {
  let navigate = useNavigate();

	let [username, setUsername] = useState("");
	let [password, setPassword] = useState("");

	window.sessionStorage.clear();

  	let onChangeUsername = (e) => {
		let username = e.target.value;
		setUsername(username);
	};

	let onChangePassword = (e) => {
		let password = e.target.value;
		setPassword(password);
	};

	let handleLogin = (e) => {
		e.preventDefault();

		if (username === "") {
			toast.error("The username cannot be empty", { theme: "colored" });
		} else if (password === "") {
			toast.error("The password cannot be empty", { theme: "colored" });
		} else {
			GeneralApi.login(username.toLowerCase(), password).then(
				(response) => {
					if (!response || !("status" in response)) {
						toast.error("Unknown error", { theme: "colored" });
					} else if (response["status"] === 200) {
						sessionStorage.setItem('username', username.toLowerCase());
						sessionStorage.setItem('token', response["data"]["token"]);
						sessionStorage.setItem('roles', JSON.stringify(response["data"]["roles"]));
						navigate("/home");
					} else if (response["status"] === 401) {
						toast.error("Your username or password is incorrect", { theme: "colored" });
					} else {
						toast.error("Unknown error", { theme: "colored" });
					}
				}
			);
		}
	};

  return (
    <PageContainer title="Login" description="this is Login page">
      <Grid container spacing={0} sx={{height: '100vh', justifyContent: 'center'}}>
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
                height: {xs: 'auto', lg: '100vh'},
                right: {xs: 'auto', lg: '-50px'},
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
              sx={{
                p: 4,
                position: 'absolute',
                top: '0',
              }}
            >
              <LogoIcon/>
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
                component={'form'}
                onSubmit={handleLogin}
              >
                <Typography fontWeight="700" variant="h2">
                  Welcome to IBS
                </Typography>
                <Box display="flex" alignItems="center">
                  <Typography
                    color="textSecondary"
                    variant="h6"
                    fontWeight="500"
                    sx={{
                      mr: 1,
                    }}
                  >
                    New to IBS?
                  </Typography>
                  <Typography
                    component={Link}
                    to="/reset"
                    fontWeight="500"
                    sx={{
                      display: 'block',
                      textDecoration: 'none',
                      color: 'primary.main',
                    }}
                  >
                    First Time Login
                  </Typography>
                </Box>
                <Box
                  sx={{
                    mt: 4,
                  }}
                >
                  <CustomFormLabel htmlFor="login">Username</CustomFormLabel>
                  <CustomTextField value={username} onChange={onChangeUsername} id="login" variant="outlined" fullWidth/>
                  <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
                  <CustomTextField
                    id="password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    sx={{
                      mb: 3,
                    }}
                    value={password}
							      onChange={onChangePassword}
                  />
                  <Box
                    sx={{
                      display: {
                        xs: 'block',
                        sm: 'flex',
                        lg: 'flex',
                      },
                      alignItems: 'center',
                    }}
                  >
                    <FormGroup>
                      <FormControlLabel
                        control={<CustomCheckbox defaultChecked/>}
                        label="Remeber this Device"
                        sx={{
                          mb: 2,
                        }}
                      />
                    </FormGroup>
                    <Box
                      sx={{
                        ml: 'auto',
                      }}
                    >
                      <Typography
                        component={Link}
                        to="/reset"
                        fontWeight="500"
                        sx={{
                          display: 'block',
                          textDecoration: 'none',
                          mb: '16px',
                          color: 'primary.main',
                        }}
                      >
                        Forgot Password ?
                      </Typography>
                    </Box>
                  </Box>

                  <Button
                    color="secondary"
                    variant="contained"
                    size="large"
                    fullWidth
                    type="submit"
                    sx={{
                      pt: '10px',
                      pb: '10px',
                    }}
                  >
                    Sign In
                  </Button>
                  <Box
                    sx={{
                      position: 'relative',
                      textAlign: 'center',
                      mt: '20px',
                      mb: '20px',
                      '&::before': {
                        content: '""',
                        background: (theme) =>
                          `${theme.palette.mode === 'dark' ? '#42464d' : '#ecf0f2'}`,
                        height: '1px',
                        width: '100%',
                        position: 'absolute',
                        left: '0',
                        top: '13px',
                      },
                    }}
                  >
                    <Typography
                      component="span"
                      color="textSecondary"
                      variant="h6"
                      fontWeight="400"
                      sx={{
                        position: 'relative',
                        padding: '0 12px',
                        background: (theme) =>
                          `${theme.palette.mode === 'dark' ? '#282c34' : '#fff'}`,
                      }}
                    >
                      or sign in with
                    </Typography>
                  </Box>

                  <Box>
                    <Button
                      variant="outlined"
                      size="large"
                      display="flex"
                      alignitems="center"
                      justifycontent="center"
                      sx={{
                        width: '100%',
                        borderColor: (theme) =>
                          `${theme.palette.mode === 'dark' ? '#42464d' : '#dde3e8'}`,
                        borderWidth: '2px',
                        textAlign: 'center',
                        mt: 2,
                        pt: '10px',
                        pb: '10px',
                        '&:hover': {
                          borderColor: (theme) =>
                            `${theme.palette.mode === 'dark' ? '#42464d' : '#dde3e8'}`,
                          borderWidth: '2px',
                        },
                      }}
                    >
                      <Box display="flex" alignItems="center">
                        <GoogleIcon
                          sx={{
                            color: (theme) => theme.palette.error.main,
                          }}
                        />
                        <Typography
                          variant="h6"
                          sx={{
                            ml: 1,
                            color: (theme) =>
                              `${
                                theme.palette.mode === 'dark' ? theme.palette.grey.A200 : '#13152a'
                              }`,
                          }}
                        >
                          Shibboleth
                        </Typography>
                      </Box>
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
}

export default Login;
