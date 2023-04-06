import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import NavBar from "../../Module/Navigation/NavBar";
import Homecard from "../../Module/Course/Homecard";


let Home = () => {
	let navigate = useNavigate();

	let [roles, setRoles] = useState([]);

	useEffect(() => {
		let storage_roles = JSON.parse(sessionStorage.getItem("roles"));

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
						<div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3" style={{justifyContent: "center"}}>
							{roles.map(data => (
								<Homecard data={data}/>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};


export default Home;