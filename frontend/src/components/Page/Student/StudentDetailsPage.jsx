import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import InviteMember from "../../Module/Group/InviteMember";
import NavBar from "../../Module/Navigation/NavBar";
import StudentApi from "../../../api/student_api";
import "../../../styles/style.css";

let StudentDetailsPage = () => {
	let navigate = useNavigate();

	let { course_id, task } = useParams();

	let [version, setVersion] = useState(0);

	// Group data
	let [status, setStatus] = useState("not_joined");
	let [group_id, setGroupId] = useState("");
	let [members, setMembers] = useState([]);
	let [git, setGit] = useState(null);

	// Submission data
	let [due, setDue] = useState("");
	let [dueEx, setDueEx] = useState("");
	let [dueExTo, setDueExTo] = useState("");
	let [tokenLen, setTokenLen] = useState("");
	let [commit, setCommit] = useState("");
	let [commitMsg, setCommitMsg] = useState("");
	let [tokenUsed, setTokenUsed] = useState("");
	let [commitTime, setCommitTime] = useState("");
	let [maxToken, setMaxToken] = useState("");
	let [collectCommit, setCollectCommit] = useState(null);
	let [collectTokenUsed, setCollectTokenUsed] = useState(null);

	useEffect(() => {
		StudentApi.check_group(course_id, task).then(
			(group_response) => {
				if (!group_response || !("status" in group_response)) {
					toast.error("Unknown error", { theme: "colored" });
					navigate("/login");
					return;
				} else if (group_response["status"] === 200) {

				} else if (group_response["status"] === 401 || group_response["status"] === 403) {
					toast.warn("You need to login again", { theme: "colored" });
					navigate("/login");
					return;
				} else {
					toast.error("Unknown error", { theme: "colored" });
					navigate("/login");
					return;
				}

				if (group_response["data"]["message"] === "You have joined a group.") {
					setStatus("joined");
					setGroupId(group_response["data"]["group_id"]);
					setMembers(group_response["data"]["members"]);
					setGit(group_response["data"]["gitlab_url"]);

					StudentApi.check_submission(course_id, task).then((submission_response) => {
						if (!submission_response || !("status" in submission_response)) {
							toast.error("Unknown error", { theme: "colored" });
							navigate("/login");
						} else if (submission_response["status"] === 200) {
							let submission_data = submission_response["data"];

							let before_due_date = submission_data["before_due_date"];
							setDue(before_due_date["due_date"]);
							setDueEx(before_due_date["due_date_with_extension"]);
							setDueExTo(before_due_date["due_date_with_extension_and_token"]);
							setMaxToken(before_due_date["max_token"]);
							setTokenLen(before_due_date["token_length"]);
							setCommit(before_due_date["commit_id"]);
							setCommitTime(before_due_date["commit_time"]);
							setCommitMsg(before_due_date["commit_message"]);
							setTokenUsed(before_due_date["token_used"]);

							if ("collected" in submission_data) {
								let collected = submission_data["before_due_date"];
								setCollectCommit(collected["commit_id"]);
								setCollectTokenUsed(collected["token_used"]);
							}
						} else if (submission_response["status"] === 401 || submission_response["status"] === 403) {
							toast.warn("You need to login again", { theme: "colored" });
							navigate("/login");
						} else {
							toast.error("Unknown error", { theme: "colored" });
							navigate("/login");
						}
					});
				} else if (group_response["data"]["message"] === "You are not in a group.") {
					setStatus("not_joined");
					setGroupId("");
					setMembers("");
					setGit(null);
				} else if (group_response["data"]["message"] === "You have been invited to join a group.") {
					setStatus("invited");
					setGroupId(group_response["data"]["group_id"]);
					setMembers(group_response["data"]["members"]);
					setGit(null);
				}
			});
	}, [course_id, task, status, group_id, version, navigate]);

	let create_group = (course_id, task) => {
		document.getElementById("create_group_button").disabled = true;
		toast.info("Creating a new group...", { theme: "colored" });

		StudentApi.create_group(course_id, task).then((response) => {
			document.getElementById("create_group_button").disabled = false;

			if (!response || !("status" in response)) {
				toast.error("Unknown error", { theme: "colored" });
				navigate("/login");
			} else if (response["status"] === 200) {
				setVersion(version + 1);
				toast.success("You have created a group", { theme: "colored" });
			} else if (response["status"] === 400 || response["status"] === 409) {
				toast.error(response["data"]["message"], { theme: "colored" });
			} else if (response["status"] === 401 || response["status"] === 403) {
				toast.warn("You need to login again", { theme: "colored" });
				navigate("/login");
			} else {
				toast.error("Unknown error", { theme: "colored" });
				navigate("/login");
			}
		})
	};

	let accept_invitation = (course_id, task) => {
		StudentApi.accept_invitation(course_id, task).then((response) => {
			if (!response || !("status" in response)) {
				toast.error("Unknown error", { theme: "colored" });
				navigate("/login");
			} else if (response["status"] === 200) {
				setVersion(version + 1);
				toast.success("You have accepted the invitation", { theme: "colored" });
			} else if (response["status"] === 400 || response["status"] === 409) {
				toast.error(response["data"]["message"], { theme: "colored" });
			} else if (response["status"] === 401 || response["status"] === 403) {
				toast.warn("You need to login again", { theme: "colored" });
				navigate("/login");
			} else {
				toast.error("Unknown error", { theme: "colored" });
				navigate("/login");
			}
		})
	};

	let reject_invitation = (course_id, task) => {
		StudentApi.reject_invitation(course_id, task).then((response) => {
			if (!response || !("status" in response)) {
				toast.error("Unknown error", { theme: "colored" });
				navigate("/login");
			} else if (response["status"] === 200) {
				setVersion(version + 1);
				toast.success("You have rejected the invitation", { theme: "colored" });
			} else if (response["status"] === 400 || response["status"] === 409) {
				toast.error(response["data"]["message"], { theme: "colored" });
			} else if (response["status"] === 401 || response["status"] === 403) {
				toast.warn("You need to login again", { theme: "colored" });
				navigate("/login");
			} else {
				toast.error("Unknown error", { theme: "colored" });
				navigate("/login");
			}
		})
	};

	let uninvite_member = (course_id, task, username) => {
		StudentApi.uninvite_member(course_id, task, username).then((response) => {
			if (!response || !("status" in response)) {
				toast.error("Unknown error", { theme: "colored" });
				navigate("/login");
			} else if (response["status"] === 200) {
				setVersion(version + 1);
				toast.success("The invitation has been cancelled", { theme: "colored" });
			} else if (response["status"] === 400 || response["status"] === 409) {
				toast.error(response["data"]["message"], { theme: "colored" });
			} else if (response["status"] === 401 || response["status"] === 403) {
				toast.warn("You need to login again", { theme: "colored" });
				navigate("/login");
			} else {
				toast.error("Unknown error", { theme: "colored" });
				navigate("/login");
			}
		})
	};

	return (
		<div>
			<NavBar page="Details" />

			<div id="details_page">
				<h2>{task} Details</h2>

				<hr />

				<div className="card-box-special row">
					<div className="col-7 my-2">
						<div className="bg-body rounded shadow-sm">
							{status === "joined" && (
								<div>
									<h4> Due Date </h4>
									<p> Original Due Date: <b>{due}</b></p>
									<p> Due Date after Extension: <b>{dueEx}</b></p>
									<p> Due Date after Extension and Token: <b>{dueExTo}</b></p>

									<hr />

									<h4> Gitlab URL </h4>
									<p><a href={git}>{git}</a></p>

									<hr />

									<h4> Token </h4>
									<p> At most <b>{maxToken}</b> token(s) can be used for this task</p>
									<p> Each token can extend the due date by <b>{tokenLen}</b> minutes</p>

									<hr />

									<h4> Last Commit Before Due Date </h4>
									{commit && (
										<div>
											<p>The commit id is: <b>{commit}</b></p>
											<p>The commit time is <b>{commitTime} </b></p>
											<p>The commit message is: <b>{commitMsg}</b></p>
											<p>This commit uses {tokenUsed} token(s)</p>
										</div>
									)}

									{!commit && (
										<p>No commit before due date is found</p>
									)}

									<hr />

									<h4> Collected Commit </h4>
									{!collectCommit && "No submission has been collected yet"}
									{collectCommit && (
										<div>
											<p>The commit id is: <b>{collectCommit}</b></p>
											<p>This commit uses {collectTokenUsed} token(s)</p>
										</div>
									)}
								</div>
							)}

							{status !== "joined" && (
								<h4>Please join a group to view the task details</h4>
							)}
						</div>
					</div>

					<div className="col-5 my-2">
						<div className="p-3 bg-body rounded shadow-sm">
							{status === "joined" &&
								<div>
									<h4>You have joined group {group_id}</h4>

									<hr />

									<ul>
										{members.map((member) => (
											<li key={member.username + member.status} className="align-left">
												<strong>{member.username}</strong> ({member.status})
												{member.status === "pending" &&
													<button onClick={() => { uninvite_member(course_id, task, member.username) }} className="btn" title="Cancel the invitation">
														❌
													</button>
												}
											</li>
										))}
									</ul>

									<hr />

									<InviteMember course_id={course_id} task={task} version={version} setVersion={setVersion} />
								</div>
							}

							{status === "not_joined" &&
								<div>
									<h4>You are not in a group</h4>

									<hr />

									<button onClick={() => { create_group(course_id, task) }} className="btn btn-primary btn-lg m-2" id="create_group_button">
										Create a New Group
									</button>
								</div>
							}

							{status === "invited" &&
								<div>
									<h4>You have been invited to join group {group_id}</h4>

									<hr />

									<ul>
										{members.map((member) => (
											<li key={member.username + member.status} className="align-left">
												<strong>{member.username}</strong> ({member.status})
											</li>
										))}
									</ul>

									<hr />

									<button onClick={() => { accept_invitation(course_id, task) }} className="btn btn-primary btn-lg m-2">
										Accept the invitation
									</button>

									<button onClick={() => { reject_invitation(course_id, task) }} className="btn btn-primary btn-lg m-2">
										Reject the invitation
									</button>
								</div>
							}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StudentDetailsPage;
