import React, { useState } from 'react';
import { Button } from '@mui/material';
import Grid from '@mui/material';
import { Form } from 'react-router-dom';
import StaffApi from '../../../../api/staff_api';

const UploadMarksButton = (courseId, taskId) => {
    const [file, setFile] = useState(null);

    const handleUpload = (event) => {
        setFile(event.target.files[0]);
        StaffApi.uploadMarksCSV(courseId, file, taskId);
    };

    return (
        <Grid>
            <Form>
                <Button>
                    Upload Marks
                    <input hidden accept="*.csv" type="file" onChange={handleUpload} />
                </Button>
            </Form>
        </Grid>
    );
};

export default UploadMarksButton;
