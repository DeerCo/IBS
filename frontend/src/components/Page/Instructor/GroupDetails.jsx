import StaffApi from '../../../api/staff_api';
import { Button, Grid } from '@mui/material';
import Typography from '@mui/material';
import TextField from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';
/*
    Individual group page details
*/

const GroupDetails = (courseId, groupId) => {
    const viewersRole = findRoleInCourse(courseId);
    const [extension, setExtension] = useState('');

    <Grid container spacing={2}>
        <Grid xs={12}>
            <Container maxWidth="xl">
                <Grid xs={12}>
                    <Typography color="textPrimary" variant="h2" fontWeight="600" sx={{ ml: 3 }}>
                        Group {placeholder} Details:
                    </Typography>
                </Grid>
                <Grid xs={12}>
                    <Typography>Group Members:</Typography>
                </Grid>
                {viewersRole === 'instructor' && (
                    <Grid xs={4}>
                        <p> Extend Due Date for Group </p>
                        <TextField
                            id="standard-basic"
                            label="Extension (Days?)"
                            variant="standard"
                            onChange={(event) => {
                                setExtension(event.target.value);
                            }}
                        />
                        <Button
                            disabled={bool(extension)}
                            onChange={StaffApi.updateGroupExtension(courseId, groupId, extension)
                                .then((res) => {
                                    toast.success('Group due date successfully extended!', {
                                        theme: 'colored'
                                    });
                                })
                                .catch((err) => {
                                    toast.error(
                                        "There was an error in updating this group's due date.",
                                        { theme: 'colored' }
                                    );
                                })}
                        >
                            Update Group Extension
                        </Button>
                    </Grid>
                )}
            </Container>
        </Grid>
    </Grid>;
};

export default GroupDetails;
