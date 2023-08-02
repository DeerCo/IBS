import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../contexts/UserContext';

/**
 * Redirect user to login page on un-authorized entry to specific url.
 * @param allowedRoles array of allowed roles in route
 * @param props other props
 * @returns {JSX.Element}
 * @constructor
 */
const ProtectedRoute = ({ allowedRoles, ...props }) => {
    const { role } = React.useContext(UserContext);

    const navigate = useNavigate();

    React.useEffect(() => {
        if (!allowedRoles.includes(role)) navigate('/login');
    }, [role, navigate, allowedRoles]);

    return <>{props.children}</>;
};

export default ProtectedRoute;
