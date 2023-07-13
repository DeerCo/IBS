import GroupsTable from '../../General/GroupsTable/GroupsTable';
import StaffApi from '../../../api/staff_api';
import { Grid } from '@mui/material';


const Groups = () => {
    return (
        <Grid container spacing={2}>
            <Grid>
                <GroupsTable>
                </GroupsTable>
            </Grid>
        </Grid>
    )    
}

export default Groups;
