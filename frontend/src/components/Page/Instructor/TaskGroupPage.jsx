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
import { toast } from 'react-toastify';
import PageContainer from '../../FlexyMainComponents/container/PageContainer';

const TaskGroupPage = (props) => {
    const { role } = props;
    const { courseId } = useParams();

    // For TextField when adding task group
    const [newMaxTokens, setNewMaxTokens] = useState(null);

    // For useEffect
    const [alert, setAlert] = useState(false);

    const [rowIdCounter, setRowIdCounter] = useState(0);
    const [rowIdMap, setRowIdMap] = useState({});

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

    /**
     * Call GET Get all task groups endpoint and update states appropriately.
     * @constructor
     */
    const FetchGetAllTaskGroups = () => {
        StaffApi.getAllTaskGroups(courseId).then((res) => {
            // Handle response
            const taskGroups = res.data.task_group;
            if (Array.isArray(taskGroups)) {
                // Initialize new rows array
                let newRows = [];
                let newIdCounter = rowIdCounter;
                let newIdMap = { ...rowIdMap };
                for (const taskGroup of taskGroups) {
                    // Get rowId from rowIdMap if exists else create new one
                    let rowId = newIdMap[taskGroup.task_group_id];
                    if (!rowId) {
                        newIdCounter++;
                        rowId = newIdCounter;
                        newIdMap[taskGroup.task_group_id] = rowId;
                    }
                    // Construct new row
                    let newRow = {
                        id: rowId,
                        taskGroupId: taskGroup.task_group_id,
                        maxTokens: taskGroup.max_token
                    };
                    newRows.push(newRow);
                }
                // Update states
                setTgRows(newRows);
                setRowIdCounter(newIdCounter);
                setRowIdMap(newIdMap);
            }
        });
    };

    // Event handler for adding new task group
    const handleAddTg = () => {
        // Use newMaxTokens state to request backend API
        if (newMaxTokens !== null) {
            StaffApi.addTaskGroup(courseId, newMaxTokens).then((res) => {
                toast.success('Added new task group', { theme: 'colored' });
                setAlert(true);
            });
        }
    };

    // For loading data initially
    useEffect(() => {
        let mounted = true;
        if (tgRows.length) {
            return;
        }
        // Call backend API
        FetchGetAllTaskGroups();

        return () => (mounted = false);
    }, [courseId]);

    // For refreshing data when new task group is added
    useEffect(() => {
        if (alert) {
            let mounted = true;
            FetchGetAllTaskGroups();
            setAlert(false);
            return () => (mounted = false);
        }
    }, [courseId, alert]);

    return (
        <PageContainer title="Task Groups" description="View task groups">
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
                                    <TaskGroupTable
                                        headCells={tgCols}
                                        rows={tgRows}
                                        courseId={courseId}
                                        alerts={{ alert, setAlert }}
                                    />
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
        </PageContainer>
    );
};

TaskGroupPage.propTypes = {
    role: PropTypes.string.isRequired
};
export default TaskGroupPage;
