import React from "react";
import { useNavigate } from 'react-router-dom';
import AuthService from "../../../services/auth_services";
import NavBar from "../../Module/Navigation/NavBar";


let Home = () => {
	let navigate = useNavigate();

	// get all the json from localstorage
	let fetch = JSON.parse(localStorage.getItem("roles"));
	let roles = fetch.roles;


	let choose_task = (courseid) => {
		navigate("/course/" + courseid + "/task");
	};

	return (
		<div>
			<div>
				<NavBar />

				<div className="album py-5 bg-white">
					<div className="container mt-5">
						<div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
							{roles.map(data => (
								<div className="col" key={data.course_id}>
									<div className="card shadow-sm m-3" onClick={() => { choose_task(data.course_id) }}>
										<img src={require("../../../images/general.png")} alt="course image" />

										<div className="card-body">
											<p className="card-text">{data.course_code}</p>
											<div className="d-flex justify-content-between align-items-center">
												<small className="text-muted">{data.course_session.replaceAll("_", " ")}</small>
												<small className="text-muted">{data.role.charAt(0).toUpperCase() + data.role.slice(1)}</small>
											</div>
										</div>
									</div>
								</div>
							))}

						</div>
					</div>
				</div>
			</div>
		</div>
	);
};


export default Home;