import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import InstructorApi from '../../../api/instructor_api';
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { getCourses } from '../../../Util/courses';


const AssignmentGroupListPage = () => {

    const [courseId, setCourseId] = useState(null);
    const [task, setTask] = useState(null);

    return (
        <Grid container
            direction="column"
            height="100%"
            wrap="nowrap">
            <NavBar item page="Home" />

            <div>
                <div>
                    <Autocomplete
                        disablePortal
                        id="course-selection-dropdown"
                        options={courseOptions}
                        fullWidth
                        renderInput={(params) => (
                            <TextField {...params} size="small" placeholder="Select course" aria-label="Select course" />
                        )}
                        onChange={value => setCourseId(value)}

                    />
                </div>
                <div>
                    <Autocomplete
                        disablePortal
                        id="task-selection-dropdown"
                        options={taskOptions}
                        fullWidth
                        renderInput={(params) => (
                            <TextField {...params} size="small" placeholder="Select task" aria-label="Select course" />
                        )}
                        onChange={value => setTask(value)}

                    />
                </div>

            </div>

            <Grid item container
                spacing={2}
                direction="row"
                justifyContent="center"
                alignContent="center"
                justify="center"
                flex="1 1 auto">
                {roles.map((data, index) => (
                    <Grid item key={index}>
                        <Homecard data={data} />
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
}

export default AssignmentGroupListPage;