import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import TaApi from "../../../api/ta_api";
import TaNavBar from "../../Module/Navigation/TaNavBar";
import '../../../styles/style.css';


let TaTaskPage = () => {
	let navigate = useNavigate();

	let { course_id } = useParams();
	let [tasks, setTasks] = useState([]);

	useEffect(() => {
		TaApi.all_tasks(course_id).then(
			(response) => {
				if (!response || !("status" in response)) {
					toast.error("Unknown error", { theme: "colored" });
					navigate("/login");
				} else if (response["status"] === 200) {
					setTasks(response["data"]["task"]);
				} else if (response["status"] === 401 || response["status"] === 403) {
					toast.warn("You need to login again", { theme: "colored" });
					navigate("/login");
				} else {
					toast.error("Unknown error", { theme: "colored" });
					navigate("/login");
				}
			})
	}, [course_id, navigate]);

	return (
		<div>
			<div>
				<TaNavBar page="Task" />

				<div className="album py-5 bg-white">
					<div className="container mt-5">
						<div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
							{tasks.map(data => (
								<div className="col" key={data.task}>
									<div className="card shadow-sm m-3">
										<div className="card-body">
											<h3 className="card-text mb-3">{data.task}</h3>
											<p className="card-text">Due Date: {data.due_date}</p>
											<p className="card-text">Group Size: {data.min_member} {data.min_member === data.max_member ? "" : " -- " + data.max_member}</p>
											<p className="card-text">Hidden: {data.hidden.toString()}</p>
											<p className="card-text">Max Token: {data.max_token}</p>
											<p className="card-text">Change Group: {data.change_group.toString()}</p>
											<p className="card-text">Interview Group: {data.interview_group === null ? "null" : data.interview_group}</p>
											<p className="card-text">Task Group: {data.task_group_id === null ? "null" : data.task_group_id}</p>
											<p className="card-text">Starter Code Url: {data.starter_code_url === null ? "null" : <a href={data.starter_code_url}> {data.starter_code_url} </a>}</p>
											<div className="btn-group">
												<Link className="btn btn-sm btn-outline-secondary" to={"/ta/course/" + course_id + "/task/" + data.task + "/interview"}>Interview</Link>
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


export default TaTaskPage;