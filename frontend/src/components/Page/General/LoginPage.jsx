import React, {useState} from "react";
import {toast} from 'react-toastify';
import {useNavigate, Link} from 'react-router-dom';
import GeneralApi from "../../../api/general_api";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  CssBaseline,
  Container,
  FormControlLabel, Checkbox
} from "@mui/material";
import NavBar from "../../Module/Navigation/NavBar";

let LoginPage = () => {
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
      toast.error("The username cannot be empty", {theme: "colored"});
    } else if (password === "") {
      toast.error("The password cannot be empty", {theme: "colored"});
    } else {
      GeneralApi.login(username.toLowerCase(), password).then(
        (response) => {
          if (!response || !("status" in response)) {
            toast.error("Unknown error", {theme: "colored"});
          } else if (response["status"] === 200) {
            sessionStorage.setItem('username', username.toLowerCase());
            sessionStorage.setItem('token', response["data"]["token"]);
            sessionStorage.setItem('roles', JSON.stringify(response["data"]["roles"]));
            navigate("/home");
          } else if (response["status"] === 401) {
            toast.error("Your username or password is incorrect", {theme: "colored"});
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
            <Box component="form" onSubmit={handleLogin} noValidate sx={{mt: 1}}>
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
              <TextField margin="normal"
                         required
                         fullWidth
                         name="password"
                         label="Password"
                         type="password"
                         id="password"
                         autoComplete="current-password"
                         value={password}
                         onChange={onChangePassword}
              />
              <Button type="submit"
                      fullWidth
                      variant="contained"
                      sx={{mt: 3, mb: 2}}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/reset">
                    <Typography>
                      First Time Login / Reset Password
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


export default LoginPage;