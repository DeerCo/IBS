import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import StudentApi from "../../../api/student_api";
import NavBar from "../../Module/Navigation/NavBar";
import { makeStyles } from "@mui/styles";
import { Typography, Button } from '@mui/material';
import Countdown from 'react-countdown';

const useStyles = makeStyles({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		margin: '16px',
		padding: '16px',
	},
	card: {
		display: 'flex',
		boxShadow: '0px 2px 10px 1px #e6e9ed',
		flexDirection: 'column',
		margin: '32px',
		borderRadius: '15px 15px 15px 15px',
		padding: '12px 8px 12px 8px'
	},
	cardHeader: {
		borderBottom: 'solid ghostwhite',
		paddingBottom: '8px',
	},
	cardSubtitle: {
		margin: '12px',
		color: 'green',
	},
	buttonGroup: {
		display: 'flex',
		flexDirection: 'column',
	},
	button: {
		color: '#202126',
		borderRadius: '8px 8px 8px 8px',
		padding: '4px 8px 4px 8px',
		border: 'solid 1px #adcadd99',
		boxShadow: 'inset 5px 5px 10px 0px #adcadd17',
		fontSize: 'small',
		width: '100px'
	},
	meeting: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: '8px 0 0 8px',
		marginTop: '8px',
		borderTop: 'solid ghostwhite',
	}
});


let StudentTaskPage = () => {
	const classes = useStyles();
	let navigate = useNavigate();
	let { course_id } = useParams();
	let [tasks, setTasks] = useState([]);

	useEffect(() => {
		StudentApi.all_tasks(course_id).then(
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

	let mainTasks = tasks.filter(task => task.interview_group === null).map(
		task => ({ ...task, subtasks: tasks.filter(subtask => subtask.interview_group === task.task) })
	);

	return (
		<div>
			<NavBar page="Task" />
			<div className={classes.container}>
				{mainTasks.map(data => (
					<div className={classes.card} key={data.task}>
						<div>
							<div className={classes.cardHeader}>
								<Typography variant="h5">
									{data.long_name}
								</Typography>
							</div>
							{data.interview_group === null &&
								<div className={classes.cardSubtitle}>
									<Countdown date={data.due_date} renderer={({ days, hours, minutes, seconds, completed }) => {
										if (completed) {
											return <Typography color='#a71111fc '>
												Due Date Has Passed
											</Typography>;
										}
										else {
											let text = `${days} Day`;
											if (days > 1){
												text += "s";
											}
											text += `, ${hours} Hour`;
											if (hours > 1){
												text += "s";
											}
											text += `, ${minutes} Minute`;
											if (minutes > 1){
												text += "s";
											}
											text += ` and ${seconds} Second`;
											if (seconds > 1){
												text += "s";
											}
											text += " Left";
											return text;
										}
									}} />
								</div>
							}
							<div className={classes.buttonGroup}>
								<div>
									{data.interview_group === null &&
										<Button href={"/course/" + course_id + "/task/" + data.task + "/details"}>
											<div className={classes.button}>
												Details
											</div>
										</Button>
									}
									{data.interview_group === null &&
										<Button href={"/course/" + course_id + "/task/" + data.task + "/mark"}>
											<div className={classes.button}>
												Mark
											</div>
										</Button>
									}
									{data.interview_group === null &&
										<Button href={"/course/" + course_id + "/task/" + data.task + "/file"}>
											<div className={classes.button}>
												Feedback
											</div>
										</Button>
									}
								</div>
								<div>
									{data.subtasks.map(subtask => (
										<div className={classes.meeting}>
											<Typography variant="subtitle1"> {subtask.long_name} </Typography>
											<Button href={"/course/" + course_id + "/task/" + subtask.task + "/interview"}>
												<div className={classes.button}>
													Book
												</div>
											</Button>
										</div>
									))}
									{data.hide_interview === false &&
										<div className={classes.meeting}>
											<Typography variant="subtitle1"> {data.long_name} Interview </Typography>
											<Button href={"/course/" + course_id + "/task/" + data.task + "/interview"}>
												<div className={classes.button}>
													Book
												</div>
											</Button>
										</div>
									}
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};


export default StudentTaskPage;