import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import StaffApi from '../../../api/staff_api';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

/**
 * Displays a list of students within the course with the given courseId
 * @constructor
 */
const StudentList = ({ courseId }) => {
    const [studentList, setStudentList] = useState([]);

    const columns = [
        { field: 'username', headerName: 'Username', resizable: true, minWidth: 200 },
        { field: 'email', headerName: 'Email', resizable: true, minWidth: 300 }
    ];

    useEffect(() => {
        // Call the instructor/admin/ta endpoint to get the list of students
        StaffApi.get_students_in_course(courseId)
            .then((response) => {
                const tempStudentList = response.data.role
                    .filter((role) => role.role === 'student')
                    .map((role) => {
                        return {
                            username: role.username,
                            email: role.email,
                            id: `${role.username}/${role.email}`
                        };
                    });
                setStudentList(tempStudentList);
            })
            .catch((err) => {
                toast.error('Unknown error', { theme: 'colored' });
            });
    }, [courseId]);

    return (
        <DataGrid
            rows={studentList}
            columns={columns}
            initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 10 }
                }
            }}
            pageSizeOptions={[5, 10, 20, 40]}
        />
    );
};

export default StudentList;
