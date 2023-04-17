import React from "react";
import { useNavigate, useParams } from 'react-router-dom';
import {Breadcrumbs, Typography, Toolbar, AppBar, Container, Box, IconButton, Button} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import {Link} from "react-router-dom";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

let NavBar = (props) => {
	let navigate = useNavigate();

	let username = sessionStorage.getItem("username");
	let roles = JSON.parse(sessionStorage.getItem("roles"));

	let { course_id, task } = useParams();
	let ta = props?.ta ?? false;

	let course_code = null;
	if (roles) {
		for (let role of roles){
			if (role["course_id"].toString() === course_id){
				course_code = role["course_code"];
			}
		}
	}

	let logout = () => {
		window.sessionStorage.clear();
		navigate("/login");
		navigate(0);
	};

	// return (
	// 	<Toolbar>
	// 		<Breadcrumbs aria-label="breadcrumb" separator=' > '>
	// 			<Link underline="hover" href="/home">IBS</Link>
	// 			{course_code && <Link underline="hover" href={(ta ? "/ta" : "") + "/course/" + course_id + "/task"}> {course_code}</Link>}
	// 			{task && <Link underline="hover" href={(ta ? "/ta" : "") + "/course/" + course_id + "/task"}>{task}</Link>}
	// 			{task && props.page && <Link underline="hover" href={(ta ? "/ta" : "") + "/course/" + course_id + "/task/" + task + "/" + props.page.toLowerCase()}>{props.page}</Link>}
	// 		</Breadcrumbs>
  //     <div>
	// 			<Typography margin='8px' color="text.primary"> {username} </Typography>
	// 			<Link margin='8px' underline="hover" onClick={logout}> Logout </Link>
  //     </div>
	// 	</Toolbar>
	// );

	return (
    <Box>
      <AppBar position="">
        <Toolbar variant="dense">
					<Box component={Link}
							 sx={{color: "inherit", textDecoration: "inherit", display: "contents"}}
							 to="/home">
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="home"
							sx={{ mr: 2 }}
						>
							<HomeIcon/>
						</IconButton>
						<Breadcrumbs
							separator={<NavigateNextIcon fontSize="small" />}
							aria-label="breadcrumb"
							sx={{ flexGrow: 1, color:"inherit"}}
						>
							<Typography variant="h6" component="div">
								IBS
							</Typography>
							{course_code &&
								<Typography variant="h6" component={Link}
														sx={{color: "inherit", textDecoration: "inherit", display: "contents"}}
														to={(ta ? "/ta" : "") + "/course/" + course_id + "/task"}>
									{course_code}
								</Typography>
							}
 							{task &&
								<Typography variant="h6" component={Link}
														sx={{color: "inherit", textDecoration: "inherit", display: "contents"}}
														to={(ta ? "/ta" : "") + "/course/" + course_id + "/task"}>
									{task}
								</Typography>
						  }
 							{task && props.page &&
								<Typography variant="h6" component={Link}
														sx={{color: "inherit", textDecoration: "inherit", display: "contents"}}
														to={(ta ? "/ta" : "") + "/course/" + course_id + "/task/" + task + "/" + props.page.toLowerCase()}>
									{props.page}
								</Typography>
						  }
						</Breadcrumbs>
					</Box>
					<Typography> {username} </Typography>
          <Button color="inherit" onClick={logout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
	)
};


export default NavBar;