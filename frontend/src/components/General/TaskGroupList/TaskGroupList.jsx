import React, { Children } from 'react';
import BaseCard from '../../FlexyMainComponents/base-card/BaseCard';
import InstructorApi from '../../../api/instructor_api';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Grid } from '@mui/material';

const TaskGroupList = ({ courseId, task }) => {
    let groups = [];
    InstructorApi.allGroups(courseId, task)
        .then((res) => {
            res.groups.forEach((group) => {
                groups.push({ id: group.id, members: group.users });
            });
        })
        .catch((err) => {
            console.log(err);
        });

    return (
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
            {groups.map((group) => (
                <BaseCard title={group.id} children={group.members} />
            ))}
        </Grid>
    );
};

export default TaskGroupList;
