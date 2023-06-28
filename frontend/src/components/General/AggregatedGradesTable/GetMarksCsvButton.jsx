import GetAppIcon from '@mui/icons-material/GetApp';
import { Button } from '@mui/material';
import StaffApi from '../../../api/staff_api';
import { toast } from 'react-toastify';
import { log } from '@craco/craco/dist/lib/logger';

const getMarksCsvButton = ({ courseId }) => {
    /**
     * Source: https://youtu.be/JPxzeG4N5nQ?t=660
     * Takes in a csv string and downloads it on the browsers
     * @param text a string of characters in csv format
     */
    const downloadCSV = (text) => {
        const blob = new Blob([text], { type: 'application/csv' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.download = `course_${courseId}_marks.csv`;
        a.href = url;
        a.style.display = 'none';

        document.body.append(a);

        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    };

    const handleClick = () => {
        StaffApi.getAllMarks(courseId)
            .then((markRes) => {
                StaffApi.all_tasks(courseId)
                    .then((taskRes) => {
                        const taskNames = taskRes.data.task.map((taskObj) => taskObj.task);
                        let csvHeader = 'username';
                        for (const name of taskNames) {
                            csvHeader += `,${name}`;
                        }
                        const csvRows = Object.keys(markRes.data.marks).map((studentName) => {
                            //
                            let row = `${studentName}`;

                            for (const taskName of Object.keys(markRes.data.marks[studentName])) {
                                const taskMark = markRes.data.marks[studentName][taskName];
                                row += `,${taskMark.mark}/${taskMark.out_of}`;
                            }

                            return row;
                        });
                        let csvText = `${csvHeader}`;
                        for (const rowText of csvRows) {
                            csvText += `\n${rowText}`;
                        }

                        downloadCSV(csvText);
                    })
                    .catch((error) => toast.error('Unknown error', { theme: 'colored' }));
            })
            .catch((error) => toast.error('Unknown error', { theme: 'colored' }));
    };

    return (
        <Button sx={{ mt: 2, ml: 2 }} onClick={handleClick} startIcon={<GetAppIcon />}>
            Download as CSV
        </Button>
    );
};

export default getMarksCsvButton;
