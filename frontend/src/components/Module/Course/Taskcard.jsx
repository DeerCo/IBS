import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import { mutate } from 'swr';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Typography, Grid, Menu, MenuItem, IconButton } from '@mui/material';
import DashboardCard from '../../FlexyMainComponents/base-card/DashboardCard';
import SubmissionsMenu from '../Submission/SubmissionsMenu';
import Countdown from 'react-countdown';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InstructorApi from '../../../api/instructor_api';
import ConfirmDialog from '../../General/DeleteConfirmation';


const useStyles = makeStyles({
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-evenly',
    margin: '16px 0 16px 0'
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
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
    <Grid item sx="10" sm="9" md="6" lg="3">
      <DashboardCard
        key={data.task}
        title={data.task}
        action={role === 'instructor' &&
          <div className={classes.icons}>
            <IconButton
              aria-label="delete"
              color="error"
              onClick={() => setConfirmOpen(true)}>
              <DeleteIcon />
            </IconButton>
            <ConfirmDialog
              open={confirmOpen}
              setOpen={setConfirmOpen}
              onConfirm={delete_task}
            >
              Are you sure you want to delete this task?
            </ConfirmDialog>
            <IconButton
              component={Link}
              to={(role ? "/" + role : "") + "/course/" + course_id + "/task/" + data.task + "/modify"}
              color="primary">
              <EditIcon />
            </IconButton>
          </div>}
        customheaderpadding="12px 12px 0 12px"
        custompadding="16px"
        children={
          <div>
            <div>
              <Countdown
                date={data.due_date}
                renderer={({ days, hours, minutes, completed }) => {
                  if (completed) {
                    return <Typography color="error">Due Date Past</Typography>;
                  } else {
                    return (
                      <Typography color="#00c292">
                        {days} Days and {hours} Hours and {minutes} Minutes
                        Left
                      </Typography>
                    );
                  }
                }}
              />
            </div>

            <div className={classes.buttonGroup}>
              <Button
                href={
                  (role ? '/' + role : '') +
                  '/course/' +
                  course_id +
                  '/task/' +
                  data.task +
                  '/details'
                }
                variant="outlined"
                size="small"
              >
                Details
              </Button>
              <Button
                href={
                  (role ? '/' + role : '') +
                  '/course/' +
                  course_id +
                  '/task/' +
                  data.task +
                  '/mark'
                }
                variant="outlined"
                size="small"
              >
                Mark
              </Button>
              <Button
                href={
                  (role ? '/' + role : '') +
                  '/course/' +
                  course_id +
                  '/task/' +
                  data.task +
                  '/file'
                }
                variant="outlined"
                size="small"
              >
                Feedback
              </Button>
              {role !== 'student' && (
                <SubmissionsMenu course_id={course_id} task={data.task} />
              )}
              <Button
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
                      to={
                        (role ? '/' + role : '') +
                        '/course/' +
                        course_id +
                        '/task/' +
                        data.task +
                        '/interview'
                      }
                      variant="contained"
                      size="small"
                    >
                      {role === 'instructor' ? 'Manage' : 'Book'}
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
                      to={
                        (role ? '/' + role : '') +
                        '/course/' +
                        course_id +
                        '/task/' +
                        subtask.task +
                        '/interview'
                      }
                      variant="outlined"
                      size="small"
                    >
                      {role === 'instructor' ? 'Manage' : 'Book'}
                    </Button>
                  </MenuItem>
                ))}
              </Menu>
            </div>
          </div>

        }
      />
    </Grid>
  );
};


export default Taskcard;