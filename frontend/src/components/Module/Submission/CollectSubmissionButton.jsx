import { Button } from '@mui/material';
import React from 'react';
import StaffApi from '../../../api/staff_api';
import { toast } from 'react-toastify';

const CollectSubmissionButton = ({ course_id, task }) => {
    const handleCollectSubmissions = () => {
        StaffApi.collectAllSubmissionsForTask(course_id, task, true)
            .then(() => {
                toast.success(
                    `Submissions for ${task} successfully collected. Click Submissions > Download to download them.`,
                    {
                        theme: 'colored'
                    }
                );
            })
            .catch((err) => {
                toast.error('Something went wrong. Try again', {
                    theme: 'colored'
                });
            });
    };

    return (
        <>
            <Button variant="contained" size="small" onClick={handleCollectSubmissions}>
                Collect
            </Button>
        </>
    );
};

export default CollectSubmissionButton;
