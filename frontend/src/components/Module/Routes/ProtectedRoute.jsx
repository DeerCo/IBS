import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Redirect user to home page on un-authorized entry to specific url.
 * @param allowedRoles array of allowed roles in route
 * @param props other props
 * @returns {JSX.Element}
 * @constructor
 */
const ProtectedRoute = ({ allowedRoles, ...props }) => {
    const navigate = useNavigate();

    const role = sessionStorage.getItem('role');

    React.useEffect(() => {
        if (!allowedRoles.includes(role)) {
            if (role === 'admin') navigate('/admin');
            else navigate('/home');
        }
    }, [role, navigate, allowedRoles]);

    return <>{props.children}</>;
};
export default ProtectedRoute;
