import GroupsTable from '../../General/GroupsTable/GroupsTable';
import StaffApi from '../../../api/staff_api';
import Grid from '@mui/material/Unstable_Grid2';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useState } from 'react';
import useSWR from 'swr';
import instructor_api from '../../../api/instructor_api';
import { Box, Container, Select, Typography } from '@mui/material';
import NavBar from '../../Module/Navigation/NavBar';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import CopyGroupsButton from '../../General/GroupsTable/CopyGroupsButton';

const Groups = (props) => {
    const { navigate } = useNavigate();
    const { courseId, task } = useParams();

    const [toTask, setToTask] = useState('');
    const [taskOptions, setTaskOptions] = useState([]);
    const [rows, setRows] = React.useState([]);
    const headCells = [
        {
            id: 'groupId',
            numeric: false,
            disablePadding: false,
            label: 'Group ID'
        },
        {
            id: 'users',
            numeric: false,
            disablePadding: false,
            label: 'Users'
        }
    ];

    const fetcher = () => instructor_api.allGroups(courseId, task).then((res) => res.data);
    const { data, isLoading, error } = useSWR('/group/all', fetcher);

    React.useEffect(() => {
        if (isLoading || error || data.count <= 0) return;
        let rowIdCounter = 0;

        const groupsArr = data.groups;
        for (const groupObj of groupsArr) {
            setRows((prevState) => {
                let newRow = {
                    id: rowIdCounter,
                    groupId: groupObj['group_id'],
                    users: groupObj.users
                };
                rowIdCounter++;
                return [...prevState, newRow];
            });
        }

        StaffApi.all_tasks(courseId)
            .then((res) => {
                setTaskOptions(res.data);
            })
            .catch((err) => {
                toast.error('Error loading task data', { theme: 'colored' });
            });
    }, [courseId, navigate, data, isLoading, error, taskOptions]);

    if (isLoading) return <Typography variant="h1">Loading...</Typography>;

    if (error) return <Typography variant="h1">Error. Try Logging in again</Typography>;

    return (
        <Grid container spacing={2}>
            <Grid xs={12}>
                <NavBar role={props.role} page="Groups" />
            </Grid>
            <Grid xs={12}>
                <Container>
                    <Typography color="textPrimary" variant="h2" fontWeight="600" sx={{ ml: 3 }}>
                        {task} groups
                    </Typography>
                </Container>
            </Grid>
            <Grid xs={12}>
                <Container>
                    <Select
                        key="tasks"
                        label="Select Task to Move Groups"
                        value={toTask}
                        onChange={setToTask}
                    >
                        {taskOptions}
                    </Select>
                    <CopyGroupsButton
                        courseId={{ courseId }}
                        fromTask={{ task }}
                        toTask={{ toTask }}
                    />
                </Container>
            </Grid>
            {rows !== [] && (
                <Grid xs={12} sx={{ marginX: 20 }}>
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <GroupsTable
                            headCells={headCells}
                            rows={rows}
                            tableWidth="50%"
                            courseId={courseId}
                        />
                    </Box>
                </Grid>
            )}
        </Grid>
    );
};

Groups.propTypes = {
    role: PropTypes.string.isRequired
};

export default Groups;
