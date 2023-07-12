import GetAppIcon from '@mui/icons-material/GetApp';
import { Button } from '@mui/material';
import StaffApi from '../../../api/staff_api';
import { toast } from 'react-toastify';

const copyGroupsButton = ({ courseId, fromTask, toTask }) => {
    return (
        <Button
            onClick={(courseId, fromTask, toTask) => {
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
        ></Button>
    );
};

export default copyGroupsButton;
