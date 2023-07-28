import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Unstable_Grid2';
import RescheduleUpdatedFields from './RescheduleUpdatedFields';
import RescheduleFilterFields from './RescheduleFilterFields';
import {
    FilterFieldsProvider,
    FilterFieldsContext
} from '../../../../contexts/RescheduleContexts/FilterFieldsContext';
import {
    UpdatedFieldsProvider,
    UpdatedFieldsContext
} from '../../../../contexts/RescheduleContexts/UpdatedFieldsContext';
import { Box, Button, Container } from '@mui/material';
import { toast } from 'react-toastify';
import StaffApi from '../../../../api/staff_api';
import { useNavigate } from 'react-router-dom';
import {
    RefreshInterviewsContext,
    RefreshInterviewsProvider
} from '../../../../contexts/RescheduleContexts/RefreshInterviewsContext';

const RescheduleInterview = (props) => {
    return (
        <FilterFieldsProvider>
            <UpdatedFieldsProvider>
                <RefreshInterviewsProvider>
                    <RescheduleInterviewContent {...props} />
                </RefreshInterviewsProvider>
            </UpdatedFieldsProvider>
        </FilterFieldsProvider>
    );
};

const RescheduleInterviewContent = (props) => {
    const navigate = useNavigate();
    const { filterFields, setFilterFields } = React.useContext(FilterFieldsContext);
    const { updatedFields, setUpdatedFields } = React.useContext(UpdatedFieldsContext);
    const { refreshInterviews, setRefreshInterviews } = React.useContext(RefreshInterviewsContext);

    // change interview
    const rescheduleInterview = (task, toNewFieldsObj, filterInputFieldsObj) => {
        // remove keys with null or empty string values
        let cleanedFilterFields = Object.fromEntries(
            Object.entries(filterInputFieldsObj).filter(([key, value]) => value != null)
        );

        let cleanedUpdatedFields = Object.fromEntries(
            Object.entries(toNewFieldsObj).filter(([key, value]) => value != null)
        );
        // TODO: In addition to cleaning, compare with the values from GET all interviews
        if (Object.keys(cleanedUpdatedFields).length === 0) {
            toast.warn('Please fill in at least one of the updated information parameters', {
                theme: 'colored'
            });
            return;
        }
        // DEV message
        toast.success('Everything is ok', { theme: 'colored' });
        console.log('=======================');
        console.log(cleanedFilterFields);
        console.log(cleanedUpdatedFields);
        StaffApi.changeInterview(
            props.courseId,
            task,
            cleanedUpdatedFields,
            cleanedFilterFields
        ).then((res) => {
            if (!res || !('status' in res)) {
                toast.error('Unknown error', { theme: 'colored' });
                navigate('/login');
            } else if (res.status === 200) {
                toast.success(res.data.message, { theme: 'colored' });
            } else if (res.status === 400 || res.status === 409) {
                toast.warn(res.data.message, { theme: 'colored' });
            } else if (res.status === 401 || res.status === 403) {
                console.log(res);
                toast.warn('You need to login again', { theme: 'colored' });
                navigate('/login');
            } else {
                toast.error('Unknown error', { theme: 'colored' });
                navigate('/login');
            }
        });
    };

    return (
        <Grid container columns={12}>
            <Grid xs={6}>
                <RescheduleFilterFields courseId={props.courseId} taskId={props.taskId} />
            </Grid>
            <Grid xs={6}>
                <RescheduleUpdatedFields courseId={props.courseId} taskId={props.taskId} />
                <Box display="flex" justifyContent="flex-end" alignItems="flex-end" sx={{ mr: 4 }}>
                    <Button
                        onClick={() => {
                            rescheduleInterview(props.taskId, updatedFields, filterFields);
                            setRefreshInterviews(true);
                        }}
                        variant="contained"
                        size="large"
                        style={{ minWidth: 120, marginTop: 3 }}
                    >
                        Confirm Change
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
};

RescheduleInterview.propTypes = {
    // Current Course ID
    courseId: PropTypes.string.isRequired,
    // Current Task ID
    taskId: PropTypes.string.isRequired
};

export default RescheduleInterview;
