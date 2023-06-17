import PropTypes from 'prop-types';
import React from 'react';
import FlexyTabs from '../FlexyTabs/FlexyTabs';

const AdminCourseCRUD = (props) => {
    // TODO: Taking pieces from AdminCoursePage, complete the below components
    // Form handling should be done within each components below
    const AddRoleComponent = () => {
        return <></>;
    };

    const UpdateRoleComponent = () => {
        return <></>;
    };

    const UploadRolesComponent = () => {
        return <></>;
    };

    const DeleteRoleComponent = () => {
        return <></>;
    };

    const tabs = [
        {
            tabName: 'Add Role',
            tabId: 0,
            tabSubheading: 'Add Roles for Course',
            tabElement: <AddRoleComponent />
        },
        {
            tabName: 'Update/Change Role',
            tabId: 1,
            tabSubheading: 'Update/Modify Roles from Course',
            tabElement: <UpdateRoleComponent />
        },
        {
            tabName: 'Upload Roles',
            tabId: 2,
            tabSubheading: 'Upload Roles from File',
            tabElement: <UploadRolesComponent />
        },
        {
            tabName: 'Delete Role',
            tabId: 3,
            tabSubheading: 'Remove Roles from Course',
            tabElement: <DeleteRoleComponent />
        }
    ];
    return (
        <>
            <FlexyTabs tabs={tabs} width={1500} height={800} />
        </>
    );
};

AdminCourseCRUD.propTypes = {};

export default AdminCourseCRUD;
