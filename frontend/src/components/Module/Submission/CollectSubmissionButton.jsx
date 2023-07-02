import { Button } from '@mui/material';
import React from 'react';
import StaffApi from '../../../api/staff_api';
import { toast } from 'react-toastify';

/**
 * @param course_id the course to which the task belongs
 * @param task the id/name of the task to collect submissions for
 * @param group_id optional, if present will collect submission for the group with the given id
 * @returns {JSX.Element}
 * @constructor
 */
const CollectSubmissionButton = ({ course_id, task, group_id }) => {
    const handleCollectSubmissions = () => {
        if (typeof group_id !== 'undefined') {
            return StaffApi.collectOneSubmission(course_id, group_id, true)
                .then(() => {
                    toast.success(
                        `Submissions of group '${group_id}' for ${task} successfully collected. Click Submissions > Download to download them.`,
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
        }

        StaffApi.collectAllSubmissionsForTask(course_id, task, true)
            .then((res) => {
                toast.success(
                    `${res.data.result.collected_count} submissions for ${task} collected. Click Submissions > Download to download them.`,
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
