import PropTypes from 'prop-types';
import Grid from '@mui/material/Unstable_Grid2';
import NavBar from '../../Module/Navigation/NavBar';
import { Box, Button, Card, CardContent, Container } from '@mui/material';
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

    useEffect(() => {
        // Call backend API
        StaffApi.getAllTaskGroups(courseId).then((res) => {
            // Handle response
            let idCounter = 0;
            console.log(res);
            const taskGroups = res.data.task_group;
            for (const taskGroup of taskGroups) {
                // Set TaskGroupRows
                setTgRows((prevState) => {
                    let newRow = {
                        id: idCounter,
                        taskGroupId: taskGroup.task_group_id,
                        maxTokens: taskGroup.max_token
                    };
                    for (const prevRow of prevState) {
                        if (prevRow.taskGroupId === newRow.taskGroupId) {
                            prevRow.maxTokens = newRow.maxTokens;
                            return [...prevState];
                        }
                    }
                    idCounter++;
                    return [...prevState, newRow];
                });
            }
        });
    }, [courseId, navigate]);

    // Event handler for adding new task group
    const handleAddTg = () => {};

    return (
        <Grid container spacing={2}>
            <Grid xs={12}>
                <NavBar role={role} page="Task Groups" />
            </Grid>
            <Grid xs={12}>
                <Container>
                    <Card sx={{ width: '100%' }}>
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
