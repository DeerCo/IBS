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
    MenuItem,
    Radio,
    RadioGroup,
    Stack,
    Typography
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import CustomFormLabel from '../../../FlexyMainComponents/forms/custom-elements/CustomFormLabel';
import CustomTextField from '../../../FlexyMainComponents/forms/custom-elements/CustomTextField';
import { FilterFieldsContext } from '../../../../contexts/RescheduleContexts/FilterFieldsContext';
import CustomSelect from '../../../FlexyMainComponents/forms/custom-elements/CustomSelect';

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

    const [locationSelectVal, setLocationSelectVal] = React.useState('Online');
    const [isLocationOnline, setIsLocationOnline] = React.useState(true);

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
                                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                                    Specify which interviews you'd like to reschedule with updated
                                    information (on right card).
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
                                    id="interview-id-input"
                                    margin="normal"
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
                        {showFilterInputs.booked && (
                            <>
                                <CustomFormLabel htmlFor="booked-filter-field" sx={{ mb: 0 }}>
                                    Booked? (Yes/No)
                                </CustomFormLabel>
                                <RadioGroup
                                    id="booked-filter-field"
                                    row
                                    value={filterFields.booked || false}
                                    onChange={(event) =>
                                        setFilterFields((prevState) => {
                                            if (prevState.booked !== event.target.value) {
                                                return {
                                                    ...prevState,
                                                    booked: event.target.value
                                                };
                                            }
                                            return prevState;
                                        })
                                    }
                                >
                                    <FormControlLabel
                                        control={<Radio />}
                                        label="Yes"
                                        value={true}
                                    />
                                    <FormControlLabel
                                        control={<Radio />}
                                        label="No"
                                        value={false}
                                    />
                                </RadioGroup>
                            </>
                        )}
                        {/* TODO: Implement time and date inputs */}
                        {showFilterInputs.groupId && (
                            <>
                                <CustomFormLabel htmlFor="group-id-filter-field" sx={{ mb: 0 }}>
                                    Group ID
                                </CustomFormLabel>
                                <CustomTextField
                                    id="group-id-filter-field"
                                    margin="normal"
                                    value={filterFields.group_id}
                                    onChange={(event) => {
                                        setFilterFields((prevState) => ({
                                            ...prevState,
                                            group_id: event.target.value
                                        }));
                                    }}
                                    size="small"
                                    variant="outlined"
                                />
                            </>
                        )}
                        {showFilterInputs.length && (
                            <>
                                <CustomFormLabel htmlFor="length-filter-field" sx={{ mb: 0 }}>
                                    Length
                                </CustomFormLabel>
                                <CustomTextField
                                    id="length-filter-field"
                                    margin="normal"
                                    type="number"
                                    helperText="Length (in minutes)"
                                    value={filterFields.length}
                                    onChange={(event) => {
                                        setFilterFields((prevState) => ({
                                            ...prevState,
                                            length: event.target.value
                                        }));
                                    }}
                                    size="small"
                                    variant="outlined"
                                />
                            </>
                        )}
                        {showFilterInputs.location && (
                            <>
                                <CustomFormLabel htmlFor="new-location-select-label" sx={{ mb: 0 }}>
                                    Location
                                </CustomFormLabel>
                                <CustomSelect
                                    labelId="new-location-select-label"
                                    id="new-location-select"
                                    value={locationSelectVal}
                                    onChange={(event, newVal) => {
                                        setLocationSelectVal(event.target.value);
                                        if (event.target.value === 'Online') {
                                            setIsLocationOnline(true);
                                            setFilterFields((prevState) => {
                                                if (prevState.location !== event.target.value) {
                                                    return {
                                                        ...prevState,
                                                        location: event.target.value
                                                    };
                                                }
                                                return prevState;
                                            });
                                        } else {
                                            setIsLocationOnline(false);
                                        }
                                    }}
                                    size="small"
                                >
                                    <MenuItem value="In-Person">In-Person</MenuItem>
                                    <MenuItem value="Online">Online</MenuItem>
                                </CustomSelect>
                                {!isLocationOnline && (
                                    <div>
                                        <CustomFormLabel
                                            sx={{ mt: 1.5 }}
                                            htmlFor="inperson-location-filter"
                                        >
                                            Enter Room
                                        </CustomFormLabel>
                                        <CustomTextField
                                            id="inperson-location-filter"
                                            variant="outlined"
                                            size="small"
                                            value={
                                                filterFields.location === 'Online'
                                                    ? ''
                                                    : filterFields.location
                                            }
                                            onChange={(event) => {
                                                setFilterFields((prevState) => {
                                                    if (prevState.location !== event.target.value) {
                                                        return {
                                                            ...prevState,
                                                            location: event.target.value
                                                        };
                                                    }
                                                    return prevState;
                                                });
                                            }}
                                        />
                                    </div>
                                )}
                            </>
                        )}
                        {showFilterInputs.note && (
                            <>
                                <CustomFormLabel htmlFor="note-filter-field" sx={{ mb: 0 }}>
                                    Note
                                </CustomFormLabel>
                                <CustomTextField
                                    id="note-filter-field"
                                    placeholder="Write Note"
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    value={filterFields.note}
                                    onChange={(event) =>
                                        setFilterFields((prevState) => {
                                            if (prevState.note !== event.target.value) {
                                                return {
                                                    ...prevState,
                                                    note: event.target.value
                                                };
                                            }
                                            return prevState;
                                        })
                                    }
                                    sx={{ width: 500 }}
                                />
                            </>
                        )}
                        {showFilterInputs.cancelled && (
                            <>
                                <CustomFormLabel htmlFor="cancelled-filter-field" sx={{ mb: 0 }}>
                                    Cancelled? (Yes/No)
                                </CustomFormLabel>
                                <RadioGroup
                                    id="cancelled-filter-field"
                                    row
                                    value={filterFields.cancelled || false}
                                    onChange={(event) =>
                                        setFilterFields((prevState) => {
                                            if (prevState.cancelled !== event.target.value) {
                                                return {
                                                    ...prevState,
                                                    cancelled: event.target.value
                                                };
                                            }
                                            return prevState;
                                        })
                                    }
                                >
                                    <FormControlLabel
                                        control={<Radio />}
                                        label="Yes"
                                        value={true}
                                    />
                                    <FormControlLabel
                                        control={<Radio />}
                                        label="No"
                                        value={false}
                                    />
                                </RadioGroup>
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
