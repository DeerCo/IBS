import React from "react";
import { useNavigate } from 'react-router-dom';
import AuthService from "../../../services/auth_services";
import NavBar from "../../Module/Navigation/NavBar";


let Home = () => {
	let navigate = useNavigate();

	// get all the json from localstorage
	let fetch = JSON.parse(localStorage.getItem("roles"));
	let roles = fetch.roles;

	// get username from localstorage
	let username = localStorage.getItem("username");

	let tasks = (courseid) => {
		// update courseid in localstorage
		localStorage.setItem('courseid', courseid);

		AuthService.tasks(courseid).then(
			(result) => {
				localStorage.setItem('tasks', JSON.stringify(result));
				navigate("/taskPage");

			},
			(error) => {
				let resMessage =
					(error.response &&
						error.response.data &&
						error.response.data.message) ||
					error.message ||
					error.toString();
			}
		);
	};

	return (
		<>
			<div>
				<NavBar />

				<div className="album py-5 bg-white">
					<div className="container mt-5">
						<div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
							{roles.map(data => (
								<div className="col" key={data.course_id}>
									<div className="card shadow-sm m-3">
										<img src={require("../../../images/general.png")} alt="course image" />

										<div className="card-body">
											<p className="card-text">{data.course_code}</p>
											<div className="d-flex justify-content-between align-items-center">
												<div className="btn-group">
													<button type="button" onClick={() => { tasks(data.course_id) }} className="btn btn-sm btn-outline-secondary">Assignments</button>
												</div>
												<small className="text-muted">Session: {data.course_session.replaceAll("_", " ")}</small>
											</div>
										</div>
									</div>
								</div>
							))}

						</div>
					</div>
				</div>
			</div>
		</>
	);
};


export default Home;