import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import StudentApi from "../../../api/student_api";
import NavBar from "../../Module/Navigation/NavBar";
import "../../../styles/style.css";

let StudentTaskPage = () => {
  let navigate = useNavigate();

  let { course_id } = useParams();
  let [tasks, setTasks] = useState([]);

  useEffect(() => {
    StudentApi.all_tasks(course_id).then((response) => {
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
    });
  }, [course_id, navigate]);

  return (
    <div>
      <div>
        <NavBar page="Task" />
							{tasks.map(data => (
								<div className="col" key={data.task}>
									<div className="card shadow-sm m-3">
										<div className="card-body">
											<h3 className="card-text mb-3">{data.task}</h3>
											{ data.interview_group === null && <p className="card-text">Original Due Date: {data.due_date}</p>}
											{ data.interview_group === null && <p className="card-text">Group Size: {data.min_member} {data.min_member === data.max_member ? "": " -- " + data.max_member}</p>}
											{ data.interview_group !== null && <p className="card-text">Interview Only</p>}
											{ data.interview_group !== null && <p className="card-text">Using the Same Group as <i>{data.interview_group}</i></p>}
											<div className="btn-group">
												<Link className="btn btn-sm btn-outline-secondary" to={"/course/" + course_id + "/task/" + data.task + "/interview"}>Interview</Link>
												{data.interview_group === null && <Link className="btn btn-sm btn-outline-secondary" to={"/course/" + course_id + "/task/" + data.task + "/mark"}>Mark</Link>}
												{data.interview_group === null && <Link className="btn btn-sm btn-outline-secondary" to={"/course/" + course_id + "/task/" + data.task + "/file"}>Feedback File</Link>}
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

export default StudentTaskPage;
