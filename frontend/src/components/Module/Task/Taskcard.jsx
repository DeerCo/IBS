import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import { mutate } from 'swr';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Typography, Menu, MenuItem, IconButton } from '@mui/material';
import useSWR from 'swr';
import DashboardCard from '../../FlexyMainComponents/base-card/DashboardCard';
import SubmissionsMenu from '../Submission/SubmissionsMenu';
import Countdown from 'react-countdown';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import InstructorApi from '../../../api/instructor_api';
import ConfirmDialog from '../../General/DeleteConfirmationDialog/DeleteConfirmation';
import MarkPublicationDialog from '../Mark/SubmitMarks/MarkPublicationConfirmation';
import { INSTRUCTOR, STUDENT } from "../../../Constants/roles";


const useStyles = makeStyles({
  due: {
    minHeight: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'

  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-evenly',
    margin: '16px 0 8px 0',

  },
  button: {
    width: '40%'
  },
  menu: {
    padding: '16px',
    borderRadius: '20px'
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 16px'
  },
  meeting: {
    marginRight: '16px'
  },
  icons: {
    display: 'flex',
    direction: 'row'
  }
});

const Taskcard = ({ data, course_id, role }) => {

  const classes = useStyles();
  const navigate = useNavigate();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [releaseOpen, setReleaseOpen] = useState(false);
  const [markIsHidden, setMarkIsHidden] = useState(true);
  const [markIsSubmited, setMarkIsSubmited] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const taskFeedbackPageLink = `/student/course/${course_id}/task/${data.task}/file`;

  const submitMarksPageLink = `/instructor/course/${course_id}/submit-marks`;
  const editTaskPageLink = `/instructor/course/${course_id}/task/${data.task}/modify`;
  const editCriteriaPageLink = `/instructor/course/${course_id}/task/${data.task}/modify-criteria`;

  const taskMarkPageLink = (role ? '/' + role : '') + `/course/${course_id}/task/${data.task}/mark`;
  const detailsPageLink = (role ? '/' + role : '') + `/course/${course_id}/task/${data.task}/details`;
  const interviewPageLink = (role ? '/' + role : '') + `/course/${course_id}/task/${data.task}/interview`;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { data: mark, isLoading, error } = useSWR(role === INSTRUCTOR ? ('/mark/is_hidden' + data.task) : null, () =>
    InstructorApi.markIsHidden(course_id, data.task).then((res) => res.data)
  );

  useEffect(() => {
    if (isLoading) return;
    if (error) navigate("/login");
    console.log(mark)
    if (mark) {
      setMarkIsSubmited(true);
      setMarkIsHidden(mark.hidden);
    }
  }, [course_id, data.task, navigate, mark, isLoading, error]);

  const delete_task = () => {
    InstructorApi.delete_task(course_id, data.task).then((task_response) => {
      if (!task_response || !('status' in task_response)) {
        toast.error('Unknown error', { theme: 'colored' });
        return;
      } else if (task_response['status'] === 200) {
        mutate('/task/all');
      } else if (task_response['status'] === 401 || task_response['status'] === 403) {
        toast.warn('You need to login again', { theme: 'colored' });
        navigate('/login');
      } else {
        toast.error('Unknown error', { theme: 'colored' });
        return;
      }
    });
  };

  return (
    <DashboardCard
      key={data.long_name}
      title={data.long_name}
      customheaderpadding="12px 12px 0 12px"
      custompadding="8px"
      action={role === INSTRUCTOR &&
        <div className={classes.icons}>
          <IconButton
            aria-label="delete"
            color="error"
            onClick={() => setDeleteOpen(true)}>
            <DeleteOutlineIcon />
          </IconButton>
          <ConfirmDialog
            open={deleteOpen}
            setOpen={setDeleteOpen}
            onConfirm={delete_task}
          >
            Are you sure you want to delete this task?
          </ConfirmDialog>
          <IconButton
            component={Link}
            to={editTaskPageLink}
            color="primary">
            <EditIcon />
          </IconButton>
        </div>}
      children={
        <div>
          <div className={classes.due}>
            <Countdown
              date={data.due_date}
              renderer={({ days, hours, minutes, completed }) => {
                if (completed) {
                  return <Typography color="error">Due date has passed<br /> </Typography>;
                } else {
                  return (
                    <Typography color="#00c292">
                      {days > 0 ? `${days} Days `
                        : (hours > 0 ? `${hours} Hours and ${minutes} Minutes `
                          : `${minutes} Minutes `)}
                      Left
                    </Typography>
                  );
                }
              }}
            />
          </div>

          <div className={classes.buttonGroup}>
            <Button
              className={classes.button}
              component={Link}
              to={detailsPageLink}
              variant="outlined"
              size="small"
            >
              Details
            </Button>
            <Button
              className={classes.button}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              variant="outlined"
              size="small"
            >
              Interviews
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PopoverClasses={classes.menu}
              className={classes.menu}
              sx={{
                padding: '16px',
                borderRadius: '20px'
              }}
            >
              {data.hide_interview === false && (
                <MenuItem className={classes.mitem}>
                  <Typography variant="subtitle1" className={classes.meeting}>
                    {' '}
                    Final Interview{' '}
                  </Typography>
                  <Button
                    component={Link}
                    to={interviewPageLink}
                    variant="contained"
                    size="small"
                  >
                    {role === INSTRUCTOR ? 'Manage' : 'Book'}
                  </Button>
                </MenuItem>
              )}
              {data.subtasks.map((subtask, index) => (
                <MenuItem className={classes.mitem} key={index}>
                  <Typography variant="subtitle1" className={classes.meeting}>
                    {' '}
                    Mentor Session{' '}
                  </Typography>
                  <Button
                    component={Link}
                    to={(role ? '/' + role : '') + `/course/${data.course_id}/task/${subtask.task}/interview`}
                    variant="outlined"
                    size="small"
                  >
                    {role === INSTRUCTOR ? 'Manage' : 'Book'}
                  </Button>
                </MenuItem>
              ))}
            </Menu>
          </div>
          {role !== STUDENT && <div className={classes.buttonGroup}>
            {role === INSTRUCTOR &&
              <Button
                className={classes.button}
                component={Link}
                to={editCriteriaPageLink}
                variant="outlined"
                size="small"
              >
                Modify Criteria
              </Button>
            }
            <SubmissionsMenu course_id={course_id} task={data.task} />
          </div>
          }
          <div className={classes.buttonGroup}>
            {role === INSTRUCTOR && !markIsSubmited &&
              <Button
                className={classes.button}
                component={Link}
                to={submitMarksPageLink}
                variant="outlined"
                size="small"
              >
                Submit Grades
              </Button>
            }
            {role === INSTRUCTOR && markIsSubmited &&
              <Button
                className={classes.button}
                variant="outlined"
                size='small'
                onClick={() => setReleaseOpen(true)}>
                {markIsHidden ? 'Release Marks' : 'Hide Marks'}
              </Button>
            }
            <MarkPublicationDialog
              courseId={course_id}
              task={data.task}
              open={releaseOpen}
              setOpen={setReleaseOpen}
              release={markIsHidden}
            />
            {[STUDENT, INSTRUCTOR].includes(role) &&
              <Button
                className={classes.button}
                component={Link}
                to={taskMarkPageLink}
                variant="outlined"
                size="small"
              >
                {role === INSTRUCTOR ? "View Grades" : "Mark"}
              </Button>}
            {role === STUDENT && (
              <Button
                className={classes.button}
                href={taskFeedbackPageLink}
                variant="outlined"
                size="small"
              >
                Feedback
              </Button>
            )}

          </div>
        </div>
      }
    />
  );
};


export default Taskcard;