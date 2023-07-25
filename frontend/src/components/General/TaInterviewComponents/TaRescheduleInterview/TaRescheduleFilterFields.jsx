import React from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    Card,
    CardContent,
    Checkbox,
    Container,
    FormControlLabel,
    FormGroup,
    Stack,
    Typography
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import CustomFormLabel from '../../../FlexyMainComponents/forms/custom-elements/CustomFormLabel';
import CustomTextField from '../../../FlexyMainComponents/forms/custom-elements/CustomTextField';
import { FilterFieldsContext } from './RescheduleContexts/FilterFieldsContext';

const TaRescheduleFilterFields = (props) => {
    const { filterFields, setFilterFields } = React.useContext(FilterFieldsContext);

    const [showFilterInputs, setShowFilterInputs] = React.useState({
        interviewId: false,
        booked: false,
        time: false,
        date: false,
        groupId: false,
        length: false,
        location: false,
        note: false,
        cancelled: false
    });

    React.useEffect(() => {}, [showFilterInputs]);

    return (
        <Container>
            <Card sx={{ pb: 0, mb: 4, width: 'auto' }}>
                <CardContent sx={{ pb: 0 }}>
                    <Box>
                        <Grid container spacing={0}>
                            <Grid xs={6}>
                                <Typography variant="h4" sx={{ mt: 0.9 }}>
                                    Filter Fields
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ mt: 0 }}>
                        <FormGroup>
                            <Stack direction="row">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            disableRipple
                                            onChange={(event, checked) => {
                                                setShowFilterInputs((prevState) => ({
                                                    ...prevState,
                                                    interviewId: checked
                                                }));
                                            }}
                                        />
                                    }
                                    label="Interview ID"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            disableRipple
                                            onChange={(event, checked) => {
                                                setShowFilterInputs((prevState) => ({
                                                    ...prevState,
                                                    booked: checked
                                                }));
                                            }}
                                        />
                                    }
                                    label="Booked (Yes/No)"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            disableRipple
                                            onChange={(event, checked) => {
                                                setShowFilterInputs((prevState) => ({
                                                    ...prevState,
                                                    time: checked
                                                }));
                                            }}
                                        />
                                    }
                                    label="Time"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            disableRipple
                                            onChange={(event, checked) => {
                                                setShowFilterInputs((prevState) => ({
                                                    ...prevState,
                                                    date: checked
                                                }));
                                            }}
                                        />
                                    }
                                    label="Date"
                                />
                            </Stack>
                            <Stack direction="row">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            disableRipple
                                            onChange={(event, checked) => {
                                                setShowFilterInputs((prevState) => ({
                                                    ...prevState,
                                                    groupId: checked
                                                }));
                                            }}
                                        />
                                    }
                                    label="Group ID"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            disableRipple
                                            onChange={(event, checked) => {
                                                setShowFilterInputs((prevState) => ({
                                                    ...prevState,
                                                    length: checked
                                                }));
                                            }}
                                        />
                                    }
                                    label="Length"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            disableRipple
                                            onChange={(event, checked) => {
                                                setShowFilterInputs((prevState) => ({
                                                    ...prevState,
                                                    location: checked
                                                }));
                                            }}
                                        />
                                    }
                                    label="Location"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            disableRipple
                                            onChange={(event, checked) => {
                                                setShowFilterInputs((prevState) => ({
                                                    ...prevState,
                                                    note: checked
                                                }));
                                            }}
                                        />
                                    }
                                    label="Note"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            disableRipple
                                            onChange={(event, checked) => {
                                                setShowFilterInputs((prevState) => ({
                                                    ...prevState,
                                                    cancelled: checked
                                                }));
                                            }}
                                        />
                                    }
                                    label="Cancelled (Yes/No)"
                                />
                            </Stack>
                        </FormGroup>
                    </Box>
                    <Box sx={{ mt: 0 }}>
                        {showFilterInputs.interviewId && (
                            <>
                                <CustomFormLabel htmlFor="interview-id-input" sx={{ mb: 0 }}>
                                    Interview ID
                                </CustomFormLabel>
                                <CustomTextField
                                    margin="normal"
                                    fullWidth
                                    value={filterFields.interviewId}
                                    onChange={(event) => {
                                        setFilterFields((prevState) => ({
                                            ...prevState,
                                            interviewId: event.target.value
                                        }));
                                    }}
                                    size="small"
                                    variant="outlined"
                                />
                            </>
                        )}
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
};

TaRescheduleFilterFields.propTypes = {
    // Current Course ID
    courseId: PropTypes.string.isRequired,
    // Current Task ID
    taskId: PropTypes.string.isRequired
};

export default TaRescheduleFilterFields;
