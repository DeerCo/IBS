import React, { Children } from "react"
import BaseCard from "../../FlexyMainComponents/base-card/BaseCard"
import { getAllGroups } from "../../../../utilities/groups"
import InstructorApi from "../../../api/instructor_api"
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router";


const AssignmentGroupList = ({ courseId, task }) => {

    const res = await InstructorApi.allGroups(courseId, task);
    let groups = [];
    res.groups.forEach(group => {
        groups.push({"id": group.id, "members": group.users});
    })

    return (
        <Grid item container
            spacing={2}
            direction="row"
            justifyContent="center"
            alignContent="center"
            justify="center"
            flex="1 1 auto">
            {groups.map(group => (
                <BaseCard
                    title={group.id}
                    children={group.members}
                />
            ))}
        </Grid >
    )
};

export default AssignmentGroupCard;
// all groups
{
    "count": 1,
    "groups": [
        {
            "group_id": 1,
            "task": "A1",
            "extension": null,
            "gitlab_group_id": null,
            "gitlab_project_id": null,
            "gitlab_url": null,
            "users": [
                "shab"
            ]
        }
    ]
}