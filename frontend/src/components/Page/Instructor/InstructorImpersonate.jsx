import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InstructorApi from "../../../api/instructor_api";
import NavBar from "../../Module/Navigation/NavBar";
import CustomFormLabel from '../../FlexyMainComponents/forms/custom-elements/CustomFormLabel';
import FeatherIcon from 'feather-icons-react';
import {
  Card,
  CardContent,
  Divider,
  Box,
  Typography,
  Button,
  FormControl,
  InputAdornment,
  OutlinedInput,
  Grid,
} from '@mui/material';



export default function InstructorImpersonate() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  let { course_id } = useParams();


  return (
    <Grid container
      direction="column"
      height="100%"
      wrap="nowrap">
      <NavBar item page="Impersonate" />
      <Grid item container
        spacing={2}
        direction="row"
        justifyContent="center"
        alignContent="center"
        justify="center"
        flex="1 1 auto">
        <Grid item>
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
                  Student View
                </Typography>
              </Box>
            </Box>
            <Divider />
            <CardContent
              sx={{
                padding: '30px',
              }}
            >
              <form onSubmit={(e) => {
                InstructorApi.impersonate(course_id, username).then(
                  (response) => {
                    console.log(response);
                    sessionStorage.setItem("origusername", sessionStorage.getItem("username"));
                    sessionStorage.setItem("origroles", sessionStorage.getItem("roles"));
                    sessionStorage.setItem("origtoken", sessionStorage.getItem("token"));
                    sessionStorage.setItem("username", username);
                    sessionStorage.setItem("roles", JSON.stringify(response.data.roles));
                    sessionStorage.setItem("token", response.data.token);
                    navigate("/home");
                    navigate(0)
                  }
                )
                e.preventDefault();
              }}>
                <FormControl>
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="username-text"
                  >
                    Username
                  </CustomFormLabel>
                  <OutlinedInput
                    startAdornment={
                      <InputAdornment position="start">
                        <FeatherIcon icon="user" width="20" />
                      </InputAdornment>
                    }
                    placeholder={"Enter username"}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    id="username-text"
                    size="small"
                  />
                </FormControl>

                <Box pt={3} alignContent='center'>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    sx={{
                      mr: 1,
                    }}
                  >
                    View
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  )
}