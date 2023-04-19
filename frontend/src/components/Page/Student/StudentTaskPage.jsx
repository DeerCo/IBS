import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import StudentApi from "../../../api/student_api";
import NavBar from "../../Module/Navigation/NavBar";
import { makeStyles } from "@mui/styles";
import { Typography, Button, Grid } from '@mui/material';
import Countdown from 'react-countdown';
import Card from "../../General/Card";
import Accordion from "../../General/Accordion";

const useStyles = makeStyles({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
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

  let mainTasks = tasks.filter(task => task.interview_group === null).map(task => ({ ...task, subtasks: tasks.filter(subtask => subtask.interview_group === task.task) }));

  return (
    <div>
      <NavBar page="Task" />
      <Grid container className={classes.container}>
        {mainTasks.map(data => (
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <Card key={data.task} title={data.task} child={
              <div>
                {data.interview_group === null &&
                  <div className={classes.cardSubtitle}>
                    <Countdown date={data.due_date} renderer={({ days, hours, minutes, seconds, completed }) => {
                      if (completed) {
                        return <Typography color='darkred'>
                          Due Date Past
                        </Typography>;
                      }
                      else {
                        return `${days} Days, ${hours} Hours, ${minutes} Minutes & ${seconds} Seconds Left`;
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

                  <Accordion title='Mentor Sessions and Final Interview'
                    content={
                      <div>
                        {(data.hide_interview === true || data.hide_interview === false) &&
                          <div className={classes.meeting}>
                            <Typography variant="subtitle1"> Final Interview </Typography>
                            <Button href={"/course/" + course_id + "/task/" + data.task + "/interview"}>
                              <div className={classes.button}>
                                Book
                              </div>
                            </Button>
                          </div>
                        }
                        {data.subtasks.map(subtask => (
                          <div className={classes.meeting}>
                            <Typography variant="subtitle1"> Mentor Session </Typography>
                            <Button href={"/course/" + course_id + "/task/" + subtask.task + "/interview"}>
                              <div className={classes.button}>
                                Book
                              </div>
                            </Button>
                          </div>
                        ))}
                      </div>
                    }
                  />


                </div>
              </div>
            } />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};


export default StudentTaskPage;