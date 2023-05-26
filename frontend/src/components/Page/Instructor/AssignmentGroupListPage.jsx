import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import InstructorApi from '../../../api/instructor_api';
import { Grid } from '@mui/material';


const AssignmentGroupListPage = () => {

    // How to get all courses an instructor takes??
    // Will this require an overhaul of the backend?
    const instructorCourses = [1];

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
          <NavBar item page="Home"/>
          <Grid item container
                spacing={2}
                direction="row"
                justifyContent="center"
                alignContent="center"
                justify="center"
                flex="1 1 auto">
            {roles.map((data, index) => (
              <Grid item key={index}>
                <Homecard data={data}/>
              </Grid>
            ))}
          </Grid>
        </Grid>
      );
}

export default AssignmentGroupListPage;