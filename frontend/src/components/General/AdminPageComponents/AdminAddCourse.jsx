import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * Component for adding new courses via admin panel
 * @param props useForm object with register, handleSubmit, control, formState props,
 *              as well as apiCall function to request backend with data
 * @returns {JSX.Element}
 * @constructor
 */
const AdminAddCourse = (props) => {
    const { useFormObject, apiCall } = props;

    return (
        <Grid container columns={12}>
            <Grid xs={6}>
                <Box
                    sx={{
                        margin: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                    maxWidth={300}
                >
                    <Box
                        component="form"
                        onSubmit={useFormObject.handleSubmit(apiCall)}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        {/* TODO: Add controllers like in AdminCourseCRUD component */}
                    </Box>
                </Box>
            </Grid>
            <Grid xs={6} sx={{ maxWidth: 500 }}>
                <Typography variant="body1" fontWeight={600} sx={{ mb: 1 }}>
                    Notes:
                </Typography>
            </Grid>
        </Grid>
    );
};

AdminAddCourse.propTypes = {
    useFormObject: PropTypes.shape({
        // https://react-hook-form.com/docs/useform/register
        register: PropTypes.func,
        // https://react-hook-form.com/docs/useform/handlesubmit
        handleSubmit: PropTypes.func,
        // https://react-hook-form.com/docs/useform/control
        control: PropTypes.object,
        // https://react-hook-form.com/docs/useform/formstate
        formState: PropTypes.object
    }).isRequired,
    apiCall: PropTypes.func.isRequired
};

export default AdminAddCourse;
