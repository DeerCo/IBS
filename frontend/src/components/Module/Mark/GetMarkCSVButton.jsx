import { Button } from '@mui/material';
import InstructorApi from '../../../api/instructor_api';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

/**
 * Triggers a download of a CSV file containing marks for a given task within
 * a given course
 * @param task the task for which marks to fetch
 * @param course_id the id of the course to which the task belongs to
 * @returns {JSX.Element}
 * @constructor
 */
const GetMarkCSVButton = ({ task, course_id }) => {
    const downloadCSV = (text) => {
        const blob = new Blob([text], { type: 'application/csv' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.download = `course_${course_id}_marks.csv`;
        a.href = url;
        a.style.display = 'none';

        document.body.append(a);

        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    };

    const handleExport = () => {
        InstructorApi.get_marks_csv(course_id, task)
            .then((res) => res.data)
            .then((data) => downloadCSV(data));
    };

    return (
        <Button
            startIcon={<FileDownloadIcon />}
            variant="contained"
            size="small"
            onClick={handleExport}
        >
            Export Marks
        </Button>
    );
};

export default GetMarkCSVButton;
