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
import { UpdatedFieldsContext } from '../../../../contexts/RescheduleContexts/UpdatedFieldsContext';
import { FilterFieldsContext } from '../../../../contexts/RescheduleContexts/FilterFieldsContext';

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

const RescheduleUpdatedFields = (props) => {
    // for backend query to changeInterview API
    const { updatedFields, setUpdatedFields } = React.useContext(UpdatedFieldsContext);
    const { filterFields } = React.useContext(FilterFieldsContext);

    // for change interview's new location select
    const [isNewLocOnline, setIsNewLocOnline] = React.useState(true);
    const [newLocSelectVal, setNewLocSelectVal] = React.useState('');

    return (
        <Container>
            <Card sx={{ pb: 0, mb: 4, width: 'auto' }}>
                <CardContent sx={{ pb: 0 }}>
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
                                            },
                                            actionBar: { actions: ['today'] }
                                        }}
                                        value={
                                            updatedFields.set_time == null
                                                ? new Date()
                                                : parseISO(updatedFields.set_time)
                                        }
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
                                    value={
                                        updatedFields.set_length == null
                                            ? ''
                                            : updatedFields.set_length
                                    }
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
                                        value={
                                            updatedFields.set_cancelled == null
                                                ? false
                                                : updatedFields.set_cancelled
                                        }
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
                                                            event.target.value ||
                                                        event.target.value !== ''
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
                                        displayEmpty
                                        size="small"
                                    >
                                        <MenuItem value="" disabled>
                                            <em>Leave default or choose option</em>
                                        </MenuItem>
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
                                                    updatedFields.set_location == null ||
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
                        <EditCardItem
                            title="Set new group ID"
                            oldDesc={undefined}
                            newInput={
                                <CustomTextField
                                    id="group-id-update-field"
                                    margin="normal"
                                    value={
                                        updatedFields.group_id == null ? '' : updatedFields.group_id
                                    }
                                    onChange={(event) => {
                                        setUpdatedFields((prevState) => ({
                                            ...prevState,
                                            group_id: event.target.value
                                        }));
                                    }}
                                    size="small"
                                    variant="outlined"
                                    sx={{ mt: 0 }}
                                />
                            }
                        />
                        <EditCardItem
                            title="New Note"
                            oldDesc={undefined}
                            newInput={
                                <CustomTextField
                                    id="note-update-field"
                                    placeholder="Write New Note"
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    value={
                                        updatedFields.set_note == null ? '' : updatedFields.set_note
                                    }
                                    onChange={(event) => {
                                        console.log(event.target.value);
                                        console.log(updatedFields.note == null);
                                        setUpdatedFields((prevState) => {
                                            if (prevState.set_note !== event.target.value) {
                                                return {
                                                    ...prevState,
                                                    set_note: event.target.value
                                                };
                                            }
                                            return prevState;
                                        });
                                    }}
                                    sx={{ width: 500 }}
                                />
                            }
                        />
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
};

RescheduleUpdatedFields.propTypes = {
    // Current Course ID
    courseId: PropTypes.string.isRequired,
    // Current Task ID
    taskId: PropTypes.string.isRequired
};

export default RescheduleUpdatedFields;
