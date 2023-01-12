import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AuthService from "../../../services/auth_services";
import NavBar from "../../Module/Navigation/NavBar";
import MarkSummary from "../../Module/Mark/MarkSummary";


let StudentMarkPage = () => {
	let username = localStorage.getItem("username");

	let { course_id, task } = useParams();

	let [marks, setMarks] = useState({});

	useEffect(() => {
		AuthService.get_mark(course_id, task).then(
			(result) => {
				setMarks(result.marks[username] || result.marks);
			},
			(error) => {
				console.log(error);
			})
	}, [course_id, task, username]);

	if (!username) {
		return (
			<div>
				<NavBar login={false} />

				<h1> You need to login again.</h1>
			</div>
		);
	} else {
		return (
			<div>
				<NavBar />

				<MarkSummary marks={marks} />

			</div>

		);
	}
};


export default StudentMarkPage;