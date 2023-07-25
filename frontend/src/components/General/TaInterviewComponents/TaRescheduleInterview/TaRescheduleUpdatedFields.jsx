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
import moment from 'moment';
import { parseISO } from 'date-fns';
import CustomTextField from '../../../FlexyMainComponents/forms/custom-elements/CustomTextField';
import CustomSelect from '../../../FlexyMainComponents/forms/custom-elements/CustomSelect';
import CustomFormLabel from '../../../FlexyMainComponents/forms/custom-elements/CustomFormLabel';
import { UpdatedFieldsContext } from './RescheduleContexts/UpdatedFieldsContext';

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

const TaRescheduleUpdatedFields = (props) => {
    // for backend query to changeInterview API
    const { updatedFields, setUpdatedFields } = React.useContext(UpdatedFieldsContext);

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

    return (
        <Container>
            <Card sx={{ pb: 0, mb: 4, width: 'auto' }}>
                <CardContent sx={{ pb: 0 }}>
                    {/* TODO: Change existing info to make them editable via input fields */}
                    {/* TODO: On change for input fields, update updatedInfo state */}
                    <Box>
                        <Grid container spacing={0}>
                            <Grid xs={6}>
                                <Typography variant="h4" sx={{ mt: 0.9 }}>
                                    Updated Information
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
                                            setUpdatedFields((prevState) => {
                                                if (prevState.set_time !== dateToString) {
                                                    return { ...prevState, set_time: dateToString };
                                                }
                                                return prevState;
                                            });
                                        }}
                                        slotProps={{
                                            textField: {
                                                variant: 'outlined',
                                                size: 'small'
                                            }
                                        }}
                                        value={parseISO(updatedFields.set_time)}
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
                                    value={updatedFields.set_length || 0}
                                    onChange={(event) =>
                                        setUpdatedFields((prevState) => {
                                            if (prevState.set_length !== event.target.value) {
                                                return {
                                                    ...prevState,
                                                    set_length: event.target.value
                                                };
                                            }
                                            return prevState;
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
                                        value={updatedFields.set_cancelled || false}
                                        onChange={(event) =>
                                            setUpdatedFields((prevState) => {
                                                if (
                                                    prevState.set_cancelled !== event.target.value
                                                ) {
                                                    return {
                                                        ...prevState,
                                                        set_cancelled: event.target.value
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
                                                setUpdatedFields((prevState) => {
                                                    if (
                                                        prevState.set_location !==
                                                        event.target.value
                                                    ) {
                                                        return {
                                                            ...prevState,
                                                            set_location: event.target.value
                                                        };
                                                    }
                                                    return prevState;
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
                                                    updatedFields.set_location === 'Online'
                                                        ? ''
                                                        : updatedFields.set_location
                                                }
                                                onChange={(event) => {
                                                    setUpdatedFields((prevState) => {
                                                        if (
                                                            prevState.set_location !==
                                                            event.target.value
                                                        ) {
                                                            return {
                                                                ...prevState,
                                                                set_location: event.target.value
                                                            };
                                                        }
                                                        return prevState;
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
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
};

TaRescheduleUpdatedFields.propTypes = {
    // Current Course ID
    courseId: PropTypes.string.isRequired,
    // Current Task ID
    taskId: PropTypes.string.isRequired
};

export default TaRescheduleUpdatedFields;
