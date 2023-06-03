import PropTypes from 'prop-types';
import Grid from '@mui/material/Unstable_Grid2';
import NavBar from '../../Module/Navigation/NavBar';
import { Box, Button, Card, CardContent, Container, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import StaffApi from '../../../api/staff_api';
import TaskGroupTable from '../../General/TaskGroupTable/TaskGroupTable';
import CustomTextField from '../../FlexyMainComponents/forms/custom-elements/CustomTextField';
import CustomFormLabel from '../../FlexyMainComponents/forms/custom-elements/CustomFormLabel';

const TaskGroupPage = (props) => {
    const { role } = props;
    const { courseId } = useParams();
    const navigate = useNavigate();

    // For TextField when adding task group
    const [newMaxTokens, setNewMaxTokens] = useState(null);

    const [rowIdCounter, setRowIdCounter] = useState(0);

    // Rows for TaskGroupTable
    const [tgRows, setTgRows] = useState([]);
    // Columns for TaskGroupTable
    const tgCols = [
        {
            id: 'taskGroupId',
            numeric: false,
            disablePadding: false,
            label: 'Task Group ID'
        },
        {
            id: 'maxTokens',
            numeric: false,
            disablePadding: false,
            label: 'Max. Tokens'
        }
    ];

    // Event handler for adding new task group
    const handleAddTg = () => {
        // Use newMaxTokens state to request backend API
        if (newMaxTokens !== null) {
            StaffApi.addTaskGroup(courseId, newMaxTokens).then((res) => {});
        }
    };

    useEffect(() => {
        // Call backend API
        StaffApi.getAllTaskGroups(courseId).then((res) => {
            // Handle response
            const taskGroups = res.data.task_group;
            for (const taskGroup of taskGroups) {
                // Set TaskGroupRows
                setTgRows((prevState) => {
                    let newRow = {
                        id: rowIdCounter,
                        taskGroupId: taskGroup.task_group_id,
                        maxTokens: taskGroup.max_token
                    };
                    for (const prevRow of prevState) {
                        if (prevRow.taskGroupId === newRow.taskGroupId) {
                            prevRow.maxTokens = newRow.maxTokens;
                            return [...prevState];
                        }
                    }
                    setRowIdCounter(rowIdCounter + 1);
                    return [...prevState, newRow];
                });
            }
        });
    }, [courseId, navigate, rowIdCounter, tgRows]);

    return (
        <Grid container spacing={2}>
            <Grid xs={12}>
                <NavBar role={role} page="Task Groups" />
            </Grid>
            <Grid xs={12}>
                <Container>
                    <Typography variant="h2" fontWeight={600} sx={{ mt: 10, ml: '10vw' }}>
                        Task Groups for Course: {courseId}
                    </Typography>
                    <Card sx={{ width: '70%', margin: 'auto', mt: 4 }}>
                        <CardContent>
                            <Box>
                                <TaskGroupTable headCells={tgCols} rows={tgRows} />
                            </Box>
                            <Box sx={{ mt: 8 }}>
                                <CustomFormLabel
                                    sx={{
                                        mt: 0
                                    }}
                                    htmlFor="max-tokens-field"
                                >
                                    Maximum Tokens Count
                                </CustomFormLabel>
                                <CustomTextField
                                    id="max-tokens-field"
                                    variant="outlined"
                                    size="small"
                                    type="number"
                                    sx={{ width: 160 }}
                                    value={newMaxTokens === null ? 0 : newMaxTokens}
                                    onChange={(event) => {
                                        setNewMaxTokens(event.target.value);
                                    }}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleAddTg}
                                    sx={{ ml: 2 }}
                                >
                                    Add Task Group
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Container>
            </Grid>
        </Grid>
    );
};

TaskGroupPage.propTypes = {
    role: PropTypes.string.isRequired
};
export default TaskGroupPage;
