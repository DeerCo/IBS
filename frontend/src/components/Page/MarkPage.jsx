import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import Prism from "prismjs";

import NavBar from "../Module/Navigation/NavBar";
import MarkSummary from "../Module/Mark/MarkSummary";
import MarkGraph from "../Module/Mark/MarkGraph";
import AuthService from "../../services/auth_services";


let MarkPage = () => {
	let navigate = useNavigate();

	let username = localStorage.getItem("username");
	let course_id = localStorage.getItem("courseid"); // TODO: Get this from URL
	let task = localStorage.getItem("task"); // TODO: Get this from URL

	let [marks, setMarks] = useState({});

	useEffect(() => {
		AuthService.grades(course_id, task).then(
			(result) => {
				setMarks(result.marks[username])
			},
			(error) => {

			})

		Prism.highlightAll();
	}, []);

	return (
		<div>
			<NavBar />

			<MarkSummary marks={marks} />

			<MarkGraph marks={marks} />
		</div>

	);
};


export default MarkPage;