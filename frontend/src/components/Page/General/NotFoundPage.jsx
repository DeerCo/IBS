import React from "react";
import { Link } from 'react-router-dom';
import '../../../styles/style.css';

let NotFoundPage = () => {
	return (
		<div>
			<div>
				<h1> Looks like nothing is here! </h1>
				<h2> Page Not Found </h2>
				<Link className="button" to="/login"> Return to Login </Link>
			</div>
		</div>
	);
};


export default NotFoundPage;