import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Unstable_Grid2';
import TaRescheduleUpdatedFields from './TaRescheduleUpdatedFields';
import TaRescheduleFilterFields from './TaRescheduleFilterFields';
import {
    FilterFieldsProvider,
    FilterFieldsContext
} from '../../../../contexts/RescheduleContexts/FilterFieldsContext';
import {
    UpdatedFieldsProvider,
    UpdatedFieldsContext
} from '../../../../contexts/RescheduleContexts/UpdatedFieldsContext';
import { Button } from '@mui/material';

const TaRescheduleInterview = (props) => {
    const { filterInputFieldsObj, setFilterInputFieldsObj } = React.useContext(FilterFieldsContext);
    const { updatedInfo, setUpdatedInfo } = React.useContext(UpdatedFieldsContext);

    // change interview
    const rescheduleInterview = (task, toNewFieldsObj, filterInputFieldsObj) => {
        // TaApi.changeInterview(course_id, task).then((res) => {});
    };

    return (
        <FilterFieldsProvider>
            <UpdatedFieldsProvider>
                <Grid container columns={12}>
                    <Grid xs={6}>
                        <TaRescheduleFilterFields courseId={props.courseId} taskId={props.taskId} />
                    </Grid>
                    <Grid xs={6}>
                        <TaRescheduleUpdatedFields
                            courseId={props.courseId}
                            taskId={props.taskId}
                        />
                    </Grid>
                    <Button
                        onClick={() => {
                            rescheduleInterview(props.taskId, updatedInfo, filterInputFieldsObj);
                        }}
                        variant="contained"
                        size="large"
                        style={{ minWidth: 120, marginTop: 3 }}
                    >
                        Confirm Change
                    </Button>
                </Grid>
            </UpdatedFieldsProvider>
        </FilterFieldsProvider>
    );
};

TaRescheduleInterview.propTypes = {
    // Current Course ID
    courseId: PropTypes.string.isRequired,
    // Current Task ID
    taskId: PropTypes.string.isRequired
};

export default TaRescheduleInterview;
