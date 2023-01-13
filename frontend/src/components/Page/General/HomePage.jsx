import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import NavBar from "../../Module/Navigation/NavBar";


let Home = () => {
	let navigate = useNavigate();

	let [roles, setRoles] = useState([]);

	useEffect(() => {
		let storage_roles = JSON.parse(localStorage.getItem("roles"));

		if (!storage_roles) {
			toast.warn("You need to login again", { theme: "colored" });
			navigate("/login");
		} else{
			setRoles(storage_roles);
		}
	}, [navigate]);

	return (
		<div>
			<div>
				<NavBar page="Home"/>

				<div className="album py-5 bg-white">
					<div className="container mt-5">
						<div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
							{roles.map(data => (
								<div className="col" key={data.course_id}>
									<div className="card shadow-sm m-3">
										<img src={require("../../../images/general.png")} alt="course" />

										<div className="card-body">
											<p className="card-text">{data.course_code}</p>
											<Link className="stretched-link button" to={"/course/" + data.course_id + "/task"}> </Link>
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