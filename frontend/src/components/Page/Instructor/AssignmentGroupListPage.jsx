import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import InstructorApi from '../../../api/instructor_api';
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import ComboBoxAutocomplete from '../../FlexyMainComponents/forms/autoComplete/ComboBoxAutocomplete';


const AssignmentGroupListPage = () => {

    const [courseId, setCourseId] = useState('');
    const instructorCourses = [1];

    const courseInfoPerRole = JSON.parse(sessionStorage.getItem("roles"));
    let courseOptions = []
    courseInfoPerRole.forEach(course => {
        courseOptions.push({ label: course.course_code, course_id: course.course_id })
    })

    // Get all groups per task per course
    // {"courseId1": [Group 1, Group 2, ...]}
    let groupsPerTaskPerCourse = {}
    instructorCourses.forEach(course => {
        let tasksPerCourse = InstructorApi.all_tasks(course);

        let courseId = course.toString()

        groupsPerTaskPerCourse[courseId] = [];
        let allGroupsPerTask = tasksPerCourse.map(task => {
            return InstructorApi.all_groups(course, task);
        })
        groupsPerTaskPerCourse[courseId].push(allGroupsPerTask);
    })

    return (
        <Grid container
            direction="column"
            height="100%"
            wrap="nowrap">
            <NavBar item page="Home" />

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