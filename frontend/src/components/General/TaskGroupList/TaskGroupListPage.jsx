import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import InstructorApi from '../../../api/instructor_api';
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { getCourses } from '../../../../utilities/courses';
import NavBar from '../../Module/Navigation/NavBar';
import { makeStyles } from '@mui/styles';
import { AssignmentGroupList } from './TaskGroupList';
import { getTasks } from '../../../../utilities/tasks';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        margin: '16px',
        padding: '16px'
    },

    dropdown: {
        display: 'inline-block'
    }
});

const AssignmentGroupListPage = () => {
    const classes = useStyles();
    const courseOptions = getCourses();

    const [course, setCourse] = useState('');
    const [task, setTask] = useState('');
    const [taskOptions, setTaskOptions] = useState([]);

    useEffect(() => {
        if (course) {
            const tasks = getTasks();
            setTaskOptions(tasks);
        }
    }, [course]);

    return (
        <Grid container direction="column" height="100%" wrap="nowrap">
            <NavBar item page="Home" />

            <div className={classes.dropdown}>
                <div>
                    <Autocomplete
                        disablePortal
                        id="course-selection-dropdown"
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                size="small"
                                placeholder="Select Course"
                                aria-label="Select Course"
                            />
                        )}
                        options={courseOptions}
                        onChange={(value) => setCourse(value)}
                    />
                </div>
                {task && (
                    <div>
                        <Autocomplete
                            disablePortal
                            id="task-selection-dropdown"
                            options={taskOptions}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    size="small"
                                    placeholder="Select Task"
                                    aria-label="Select Task"
                                />
                            )}
                            onChange={(value) => setTask(value)}
                        />
                    </div>
                )}
            </div>
            <Grid
                item
                container
                spacing={2}
                direction="row"
                justifyContent="center"
                alignContent="center"
                justify="center"
                flex="1 1 auto"
            >
                <AssignmentGroupList courseId={courseId} task={task} />
            </Grid>
        </Grid>
    );
};

export default AssignmentGroupListPage;
