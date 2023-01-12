import React from "react";
import { useNavigate, Link } from 'react-router-dom';

let NavBar = (props) => {
	let logged_in = true;
	let username = localStorage.getItem("username");
	if (!username){
		logged_in = false;
	}

	let logout = (e) => {
		window.localStorage.clear();
	};
	
	if (props.login === false || !logged_in){
		return (
			<div>
				<nav id="navbar">
					<div id="inner">
						<div className="d-flex justify-content-end">
							<Link className="button" to="/home">IBS</Link>
						</div>

						<div className="d-flex justify-content-end">
							<Link className="button" to="/login"> Login </Link>
						</div>
					</div>
				</nav>

				<div className="divider"> </div>
			</div>
		);
	} else{
		return (
			<div>
				<nav id="navbar">
					<div id="inner">
						<div className="d-flex justify-content-end">
							<Link className="button" to="/home">IBS</Link>
						</div>

						<div className="d-flex justify-content-end">
							<Link className="button mx-5"> {username} </Link>
							<Link className="button" onClick={logout} to="/login"> Logout </Link>
						</div>
					</div>
				</nav>

				<div className="divider"> </div>
			</div>
		);
	}
};


export default NavBar;