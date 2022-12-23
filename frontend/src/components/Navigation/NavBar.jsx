import React from "react";
import { useNavigate, Link } from 'react-router-dom';

let NavBar = () => {
	let username = localStorage.getItem("username");
	
	return (
		<div>
			<nav id="navbar">
				<div id="inner">

					<a href="#">
						<Link className="logo2" to="/frontPage">IBS</Link>
					</a>

					<div className="d-flex justify-content-end">
						<Link className="button mx-5" to="/frontPage"> {username} </Link>
						<Link className="button" to="/Login"> Logout </Link>
					</div>

				</div>
			</nav>

			<div className="divider"> </div>
		</div>
	);
};


export default NavBar;