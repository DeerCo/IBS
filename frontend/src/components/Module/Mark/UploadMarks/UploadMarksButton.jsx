import React, { useState } from 'react';
import { Button } from '@mui/material';
import Grid from '@mui/material';
import { Form } from 'react-router-dom';
import StaffApi from '../../../../api/staff_api';
import { toast } from 'react-toastify';

const UploadMarksButton = (courseId, taskId) => {
    const [file, setFile] = useState(null);

    const handleUpload = (event) => {
        setFile(event.target.files[0]);
        StaffApi.uploadMarksCSV(courseId, file, taskId).then((res) => {
            if (!res || !('status' in res)) {
                toast.error('There was an error uploading the file.', { theme: 'colored' });
            } else if (res['status'] === 200) {
                toast.success('Marks successfully uploaded.', { theme: 'colored' });
            } else {
                toast.error('Unknown Error', { theme: 'colored' });
            }
        });
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
