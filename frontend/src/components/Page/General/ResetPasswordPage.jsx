import React, {useState} from "react";
import {useNavigate, Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import GeneralApi from "../../../api/general_api";
import '../../../styles/style.css'
import {Box, Button, Card, Grid, TextField, Typography} from "@mui/material";

const ResetPasswordPage = () => {
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
    <Grid container
          direction="column"
          height="100%"
          wrap="nowrap">
      <Grid item container
            spacing={2}
            direction="row"
            justifyContent="center"
            alignContent="center"
            justify="center"
            flex="1 1 auto">
        <Card>
          <Box sx={{
            margin: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
               maxWidth={300}
          >
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form"
                 onSubmit={handleLogin}
                 noValidate
                 sx={{mt: 1}}>
              <TextField margin="normal"
                         required
                         fullWidth
                         id="username"
                         label="Username"
                         name="username"
                         autoComplete="username"
                         autoFocus
                         value={username}
                         onChange={onChangeUsername}
              />
              <Box>
                <TextField margin="normal"
                           required
                           fullWidth
                           id="code"
                           label="code"
                           name="code"
                           autoComplete="one-time-code"
                           autoFocus
                           value={code}
                           onChange={onChangeCode}
                />

                <Button type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        onClick={handleCode}
                >
                  Send Code
                </Button>
              </Box>
              <TextField margin="normal"
                         required
                         fullWidth
                         name="password"
                         label="Password"
                         type="password"
                         id="password"
                         autoComplete="new-password"
                         value={password}
                         onChange={onChangePassword}
              />
              <Button type="submit"
                      fullWidth
                      variant="contained"
                      sx={{mt: 3, mb: 2}}
              >
                Reset Password
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/login">
                    <Typography>
                      Login
                    </Typography>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Card>
      </Grid>
    </Grid>
  )
};


export default ResetPasswordPage;