import GetAppIcon from '@mui/icons-material/GetApp';
import { Button } from '@mui/material';
import StaffApi from '../../../api/staff_api';
import { toast } from 'react-toastify';

const CopyGroupsButton = (courseId, fromTask, toTask) => {
    return (
        <Button
            onClick={() => {
                StaffApi.copyGroups(courseId, fromTask, toTask)
                    .then((res) => {
                        toast.success(`Groups successfully copied from ${fromTask} to ${toTask}.`);
                    })
                    .catch((err) => {
                        toast.error(
                            `Error: Copying groups from task ${fromTask} to ${toTask} failed.`
                        );
                    });
            }}
        >
            Copy Groups
        </Button>
    );
};

export default CopyGroupsButton;
