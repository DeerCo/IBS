import PropTypes from 'prop-types';
import Grid from '@mui/material/Unstable_Grid2';
import NavBar from '../../Module/Navigation/NavBar';
import { Container } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const TaskGroupPage = (props) => {
    const { role } = props;
    const { courseId } = useParams();
    const navigate = useNavigate();

    // Rows for TaskGroupTable
    const [tgRows, setTgRows] = useState([]);
    // Columns for TaskGroupTable
    const [tgCols, setTgCols] = useState([
        {
            id: 'taskGroupId',
            numeric: false,
            disablePadding: false,
            label: 'Task Group ID'
        }
    ]);

    useEffect(() => {
        // Call backend API
    }, [courseId, navigate]);

    return (
        <Grid container spacing={2}>
            <Grid xs={12}>
                <NavBar role={role} page="Task Groups" />
            </Grid>
            <Grid xs={12}>
                <Container></Container>
            </Grid>
        </Grid>
    );
};

TaskGroupPage.propTypes = {
    role: PropTypes.string.isRequired
};
export default TaskGroupPage;
