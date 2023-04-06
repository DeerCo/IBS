import React from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { Breadcrumbs, Typography, Link, Toolbar } from '@mui/material';
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  toolbar: {
    display: 'flex',
    background: 'white',
    boxShadow: '0 3px 5px 2px ghostwhite',
    alignItems: 'center',
    justifyContent: ' space-between'

  },
  user: {
    display: 'flex',
  },
});

let NavBar = (props) => {
  const classes = useStyles();
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

	return (
		<Toolbar className={classes.toolbar}>
			<Breadcrumbs aria-label="breadcrumb" separator=' > '>
				<Link underline="hover" href="/home">IBS</Link>
				{course_code && <Link underline="hover" href={(ta ? "/ta" : "") + "/course/" + course_id + "/task"}> {course_code}</Link>}
				{task && <Link underline="hover" href={(ta ? "/ta" : "") + "/course/" + course_id + "/task"}>{task}</Link>}
				{task && props.page && <Link underline="hover" href={(ta ? "/ta" : "") + "/course/" + course_id + "/task/" + task + "/" + props.page.toLowerCase()}>{props.page}</Link>}
			</Breadcrumbs>
      <div className={classes.user}>
				<Typography margin='8px' color="text.primary"> {username} </Typography>
				<Link margin='8px' underline="hover" onClick={logout}> Logout </Link>
      </div>
		</Toolbar>
	);
};


export default NavBar;