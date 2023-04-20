import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import TaApi from "../../../api/ta_api";
import '../../../styles/style.css';
import Taskcard from "../../Module/Course/Taskcard";
import NavBar from "../../Module/Navigation/NavBar";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'center',
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

let TaTaskPage = () => {
  const classes = useStyles();
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

	let mainTasks = tasks.filter(task => task.interview_group === null).map(task => ({ ...task, subtasks: tasks.filter(subtask => subtask.interview_group === task.task) }));

	return (
		<div>
      <NavBar page="Task" ta={true}/>
      <div className={classes.container}>
        {mainTasks.map(data => (
          <Taskcard data={data} course_id={course_id} ta={true}/>
        ))}
      </div>
    </div>
	);
};


export default TaTaskPage;