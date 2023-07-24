import React from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    FormControlLabel,
    Link,
    MenuItem,
    Radio,
    RadioGroup,
    Typography
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { DesktopDateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import moment from 'moment/moment';
import { parseISO } from 'date-fns';
import CustomTextField from '../../FlexyMainComponents/forms/custom-elements/CustomTextField';
import CustomSelect from '../../FlexyMainComponents/forms/custom-elements/CustomSelect';
import CustomFormLabel from '../../FlexyMainComponents/forms/custom-elements/CustomFormLabel';

const EditCardItem = ({ title, oldDesc, newInput }) => {
    return (
        <Box key={`${oldDesc}-edit`} sx={{ pb: 2, pt: 2, display: 'flex', alignItems: 'start' }}>
            <Box sx={{ ml: 2 }}>
                <Typography color="textSecondary" variant="h5">
                    {title}:
                </Typography>
            </Box>
            <Box sx={{ ml: 'auto' }}>
                <Typography color="textSecondary" variant="h5" fontWeight="400">
                    {typeof oldDesc === 'string' && oldDesc.startsWith('http') ? (
                        <Link href={oldDesc}>Link ✈</Link>
                    ) : (
                        <div>{oldDesc}</div>
                    )}
                </Typography>
                {newInput}
            </Box>
        </Box>
    );
};

const TaRescheduleInterview = (props) => {
    // for backend query to changeInterview API
    const [toNewFieldsObj, setToNewFieldsObj] = React.useState({
        set_time: null,
        set_group_id: null,
        set_length: null,
        set_location: null,
        set_note: null,
        set_cancelled: null
    });

    const [filterInputFieldsObj, setFilterInputFieldsObj] = React.useState({
        interview_id: null,
        booked: null,
        time: null,
        date: null,
        group_id: null,
        length: null,
        location: null,
        note: null,
        cancelled: null
    });

    // for change interview's new location select
    const [isNewLocOnline, setIsNewLocOnline] = React.useState(true);
    const [newLocSelectVal, setNewLocSelectVal] = React.useState('Online');

    // change interview
    const rescheduleInterview = (task, toNewFieldsObj, filterInputFieldsObj) => {
        // TaApi.changeInterview(course_id, task).then((res) => {});
    };

    return (
        <Container>
            <Card sx={{ pb: 0, mb: 4, width: 'auto' }}>
                <CardContent sx={{ pb: 0 }}>
                    {/* TODO: Change existing info to make them editable via input fields */}
                    {/* TODO: On change for input fields, update toNewFieldsObj state */}
                    <Box>
                        <Grid container spacing={0}>
                            <Grid xs={6}>
                                <Typography variant="h4" sx={{ mt: 0.9 }}>
                                    Selected Interview for Rescheduling
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ mt: 0 }}>
                        <EditCardItem
                            title="Set new starting time"
                            oldDesc={undefined}
                            newInput={
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DesktopDateTimePicker
                                        placeholder="Start date"
                                        onChange={(value) => {
                                            // value is Date object
                                            const dateToString =
                                                moment(value).format('YYYY-MM-DD HH:mm:ss');
                                            setToNewFieldsObj((prevState) => {
                                                const newState = prevState;
                                                if (prevState.set_time !== dateToString) {
                                                    newState.set_time = dateToString;
                                                }
                                                return newState;
                                            });
                                        }}
                                        slotProps={{
                                            textField: {
                                                variant: 'outlined',
                                                size: 'small'
                                            }
                                        }}
                                        value={parseISO(toNewFieldsObj.set_time)}
                                    />
                                </LocalizationProvider>
                            }
                        />
                        <EditCardItem
                            title="Set new length of interview"
                            oldDesc={undefined}
                            newInput={
                                <CustomTextField
                                    id="set-length-field"
                                    variant="outlined"
                                    size="small"
                                    type="number"
                                    helperText="Length (in minutes)"
                                    value={toNewFieldsObj.set_length}
                                    onChange={(event) =>
                                        setToNewFieldsObj((prevState) => {
                                            const newState = prevState;
                                            if (prevState.set_length !== event.target.value) {
                                                newState.set_length = event.target.value;
                                            }
                                            return newState;
                                        })
                                    }
                                />
                            }
                        />
                        <EditCardItem
                            title="Will interview be cancelled?"
                            oldDesc={undefined}
                            newInput={
                                <>
                                    <RadioGroup
                                        row
                                        value={toNewFieldsObj.set_cancelled}
                                        onChange={(event) =>
                                            setToNewFieldsObj((prevState) => {
                                                const newState = prevState;
                                                if (
                                                    prevState.set_cancelled !== event.target.value
                                                ) {
                                                    newState.set_cancelled = event.target.value;
                                                }
                                                return newState;
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
                            }
                        />
                        <EditCardItem
                            title="New Interview Location"
                            oldDesc={undefined}
                            newInput={
                                <>
                                    <CustomSelect
                                        labelId="new-location-select-label"
                                        id="new-location-select"
                                        value={newLocSelectVal}
                                        onChange={(event, newVal) => {
                                            setNewLocSelectVal(event.target.value);
                                            if (event.target.value === 'Online') {
                                                setIsNewLocOnline(true);
                                                setToNewFieldsObj((prevState) => {
                                                    const newState = prevState;
                                                    if (
                                                        prevState.set_location !==
                                                        event.target.value
                                                    ) {
                                                        newState.set_location = event.target.value;
                                                    }
                                                    return newState;
                                                });
                                            } else {
                                                setIsNewLocOnline(false);
                                            }
                                        }}
                                        fullWidth
                                        size="small"
                                    >
                                        <MenuItem value="In-Person">In-Person</MenuItem>
                                        <MenuItem value="Online">Online</MenuItem>
                                    </CustomSelect>
                                    {!isNewLocOnline && (
                                        <div>
                                            <CustomFormLabel
                                                sx={{ mt: 1.5 }}
                                                htmlFor="inperson-new-location"
                                            >
                                                Enter Room
                                            </CustomFormLabel>
                                            <CustomTextField
                                                id="inperson-new-location"
                                                variant="outlined"
                                                size="small"
                                                value={
                                                    toNewFieldsObj.set_location === 'Online'
                                                        ? ''
                                                        : toNewFieldsObj.set_location
                                                }
                                                onChange={(event) => {
                                                    setToNewFieldsObj((prevState) => {
                                                        const newState = prevState;
                                                        if (
                                                            prevState.set_location !==
                                                            event.target.value
                                                        ) {
                                                            newState.set_location =
                                                                event.target.value;
                                                        }
                                                        return newState;
                                                    });
                                                }}
                                            />
                                        </div>
                                    )}
                                </>
                            }
                        />
                        {/*TODO: Implement set_group_id input*/}
                        {/*TODO: Implement set_note input*/}
                        <Button
                            onClick={() => {
                                rescheduleInterview(
                                    props.taskId,
                                    toNewFieldsObj,
                                    filterInputFieldsObj
                                );
                            }}
                            variant="contained"
                            size="large"
                            style={{ minWidth: 120, marginTop: 3 }}
                        >
                            Confirm Change
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
};

TaRescheduleInterview.propTypes = {
    // Current Course ID
    courseId: PropTypes.string.isRequired,
    // Current Task ID
    taskId: PropTypes.string.isRequired
};

export default TaRescheduleInterview;
