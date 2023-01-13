import React from "react";
import { useNavigate, useParams, Link } from 'react-router-dom';

let NavBar = (props) => {
	let navigate = useNavigate();

	let username = localStorage.getItem("username");
	let roles = JSON.parse(localStorage.getItem("roles"));

	let { course_id, task } = useParams();
	
	let course_code = null;
	if (roles){
		for (let role of roles){
			if (role["course_id"].toString() === course_id){
				course_code = role["course_code"];
			}
		}
	} 

	let logout = () => {
		window.localStorage.clear();
		navigate("/login");
		navigate(0);
	};
	
	return (
		<div>
			<nav id="navbar">
				<div id="inner">
					<div className="d-flex">
						<Link className="button mx-3" to="/home">IBS</Link>
						{course_code && <div className="button mx-3">{"->"}</div>}
						{course_code && <Link className="button mx-3" to={"/course/" + course_id + "/task"}> {course_code}</Link>}
						{task && <div className="button mx-3">{"->"}</div>}
						{task && <Link className="button mx-3" to={"/course/" + course_id + "/task"}>{task}</Link>}
						{task && props.page && <div className="button mx-3">{"->"}</div>}
						{task && props.page && <Link className="button mx-3" to={"/course/" + course_id + "/task/" + task + "/" + props.page.toLowerCase()}>{props.page}</Link>}
					</div>

					<div className="d-flex justify-content-end">
						<div className="button mx-3"> {username} </div>
						<Link className="button mx-3" onClick={logout}> Logout </Link>
					</div>
				</div>
			</nav>

			<div className="divider"> </div>
		</div>
	);
};


export default NavBar;