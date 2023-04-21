import React from "react";
import {useNavigate, useParams} from 'react-router-dom';
import {Breadcrumbs, Typography, Toolbar, AppBar, Container, Box, IconButton, Button} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import {Link} from "react-router-dom";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

let NavBar = (props) => {
  let navigate = useNavigate();

  let username = sessionStorage.getItem("username");
  let roles = JSON.parse(sessionStorage.getItem("roles"));

  let {course_id, task} = useParams();
  const role = ((props.role === undefined || props.role === "student") ? "" : props.role);

  let course_code = null;
  if (roles) {
    for (let role of roles) {
      if (role["course_id"].toString() === course_id) {
        course_code = role["course_code"];
      }
    }
  }

  let logout = () => {
    window.sessionStorage.clear();
    navigate("/login");
    navigate(0);
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar variant="dense">

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="home"
            sx={{mr: 2}}
          >
            <Box
              component={Link}
              sx={{color: "inherit", textDecoration: "inherit", display: "contents"}}
              to="/home">
              <HomeIcon/>
            </Box>
          </IconButton>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small"/>}
            aria-label="breadcrumb"
            sx={{flexGrow: 1, color: "inherit"}}
          >
            <Box
              component={Link}
              sx={{color: "inherit", textDecoration: "inherit", display: "contents"}}
              to="/home">
              <Typography variant="h6" component="div">
                IBS
              </Typography>
            </Box>

            {course_code &&
              <Typography variant="h6" component={Link}
                          sx={{color: "inherit", textDecoration: "inherit", display: "contents"}}
                          to={(role ? "/" + role : "") + "/course/" + course_id + "/task"}>
                {course_code}
              </Typography>
            }
            {task &&
              <Typography variant="h6" component={Link}
                          sx={{color: "inherit", textDecoration: "inherit", display: "contents"}}
                          to={(role ? "/" + role : "") + "/course/" + course_id + "/task"}>
                {task}
              </Typography>
            }
            {task && props.page &&
              <Typography variant="h6" component={Link}
                          sx={{color: "inherit", textDecoration: "inherit", display: "contents"}}
                          to={(role ? "/" + role : "") + "/course/" + course_id + "/task/" + task + "/" + props.page.toLowerCase()}>
                {props.page}
              </Typography>
            }
          </Breadcrumbs>
          <Typography> {username} </Typography>
          <Button color="inherit" onClick={logout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
};


export default NavBar;