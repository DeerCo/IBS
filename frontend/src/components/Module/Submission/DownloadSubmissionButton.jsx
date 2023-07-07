import { Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import StaffApi from '../../../api/staff_api';
import { toast } from 'react-toastify';

const DownloadSubmissionButton = ({ course_id, task }) => {
    const handleDownloadSubmission = () => {
        StaffApi.downloadSubmissions(course_id, task)
            .then((res) => {
                if (res.status < 400) {
                    toast.success(`Submissions for ${task} successfully downloaded`, {
                        theme: 'colored'
                    });
                    console.log(res);
                    downloadResponseAsJsonFile(JSON.stringify(res.data, null, 4));
                } else {
                    toast.error('Something went wrong. Try again', {
                        theme: 'colored'
                    });
                }
            })
            .catch((err) => {
                toast.error('Something went wrong. Try again', {
                    theme: 'colored'
                });
            });
    };

    const downloadResponseAsJsonFile = (response) => {
        const blob = new Blob([response], { type: 'application/json' });
        const fileUrl = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.download = `response.json`;
        a.href = fileUrl;
        a.style.display = 'none';

        document.body.append(a);

        a.click();
        a.remove();
        URL.revokeObjectURL(fileUrl);
    };

    return (
        <Button
            variant="contained"
            size="small"
            startIcon={<DownloadIcon />}
            onClick={handleDownloadSubmission}
        >
            Download
        </Button>
    );
};

export default DownloadSubmissionButton;
