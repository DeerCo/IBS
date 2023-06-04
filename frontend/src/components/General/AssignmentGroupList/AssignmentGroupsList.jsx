import React, { Children } from "react"
import BaseCard from "../../FlexyMainComponents/base-card/BaseCard"
import { getAllGroups } from "../../../../utilities/groups"
import InstructorApi from "../../../api/instructor_api"
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router";


const AssignmentGroupsTable = ({ courseId, task }) => {

    const allGroups = InstructorApi.allGroups(courseId, task);

    return (
        <Grid item container
            spacing={2}
            direction="row"
            justifyContent="center"
            alignContent="center"
            justify="center"
            flex="1 1 auto">
            {allGroups.map(groupName => (
                <BaseCard
                    title={groupName}
                    children={allGroups[groupName]}
                />
            ))}
        </Grid >
    )
};
