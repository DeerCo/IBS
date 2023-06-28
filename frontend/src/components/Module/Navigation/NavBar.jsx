import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Breadcrumbs,
    Typography,
    Toolbar,
    AppBar,
    Box,
    IconButton,
    Button,
    Menu,
    MenuItem
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import PropTypes from 'prop-types';

let NavBar = (props) => {
    let navigate = useNavigate();

    let username = sessionStorage.getItem('username');
    let roles = JSON.parse(sessionStorage.getItem('roles'));

    let origusername = sessionStorage.getItem('origusername');
    let origroles = JSON.parse(sessionStorage.getItem('origroles'));
    let origtoken = sessionStorage.getItem('origtoken');
    let impersonated = false;

    if (origusername !== null) {
        impersonated = true;
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    let { course_id, task } = useParams();
    const role = props.role === undefined || props.role === 'student' ? '' : props.role;
    console.log(role);
    //console.log(props.role, role);

    let course_code = null;
    if (roles) {
        for (let role of roles) {
            if (role['course_id'].toString() === course_id) {
                course_code = role['course_code'];
            }
        }
    }

    let logout = () => {
        window.sessionStorage.clear();
        navigate('/login');
        navigate(0);
    };

    return (
        <Box>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="home"
                        sx={{ mr: 2 }}
                    >
                        <Box
                            component={Link}
                            sx={{
                                color: 'inherit',
                                textDecoration: 'inherit',
                                display: 'contents'
                            }}
                            to="/home"
                        >
                            <HomeIcon />
                        </Box>
                    </IconButton>
                    <Breadcrumbs
                        separator={<NavigateNextIcon fontSize="small" />}
                        aria-label="breadcrumb"
                        sx={{ flexGrow: 1, color: 'inherit' }}
                    >
                        <Box
                            component={Link}
                            sx={{
                                color: 'inherit',
                                textDecoration: 'inherit',
                                display: 'contents'
                            }}
                            to="/home"
                        >
                            <Typography variant="h6" component="div">
                                IBS
                            </Typography>
                        </Box>

                        {course_code && (
                            <Typography
                                variant="h6"
                                component={Link}
                                sx={{
                                    color: 'inherit',
                                    textDecoration: 'inherit',
                                    display: 'contents'
                                }}
                                to={(role ? '/' + role : '') + '/course/' + course_id + '/task'}
                            >
                                {course_code}
                            </Typography>
                        )}
                        {task && (
                            <Typography
                                variant="h6"
                                component={Link}
                                sx={{
                                    color: 'inherit',
                                    textDecoration: 'inherit',
                                    display: 'contents'
                                }}
                                to={(role ? '/' + role : '') + '/course/' + course_id + '/task'}
                            >
                                {task}
                            </Typography>
                        )}
                        {task && props.page && (
                            <Typography
                                variant="h6"
                                component={Link}
                                sx={{
                                    color: 'inherit',
                                    textDecoration: 'inherit',
                                    display: 'contents'
                                }}
                                to={
                                    (role ? '/' + role : '') +
                                    '/course/' +
                                    course_id +
                                    '/task/' +
                                    task +
                                    '/' +
                                    props.page.toLowerCase()
                                }
                            >
                                {props.page}
                            </Typography>
                        )}
                    </Breadcrumbs>
                    {impersonated ? (
                        <>
                            <Typography> {origusername + ' impersonating ' + username} </Typography>
                            <Button
                                color="inherit"
                                onClick={() => {
                                    sessionStorage.setItem('username', origusername);
                                    sessionStorage.setItem('roles', JSON.stringify(origroles));
                                    sessionStorage.setItem('token', origtoken);

                                    sessionStorage.removeItem('origusername');
                                    sessionStorage.removeItem('origroles');
                                    sessionStorage.removeItem('origtoken');
                                    navigate('/home');
                                    navigate(0);
                                }}
                                variant={'outline'}
                            >
                                Stop Impersonating
                            </Button>
                        </>
                    ) : (
                        <div>
                            <Button
                                color="inherit"
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                {username}
                            </Button>
                            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                                {role === 'admin' && (
                                    <MenuItem
                                        component={Link}
                                        to={(role ? '/' + role : '') + '/impersonate/'}
                                    >
                                        Student View
                                    </MenuItem>
                                )}
                                {role === 'instructor' && (
                                    <MenuItem
                                        component={Link}
                                        to={
                                            (role ? '/' + role : '') +
                                            '/course/' +
                                            course_id +
                                            '/impersonate/'
                                        }
                                    >
                                        Impersonate
                                    </MenuItem>
                                )}
                                <MenuItem onClick={logout}>Logout</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

NavBar.propTypes = {
    role: PropTypes.string,
    page: PropTypes.string
};

export default NavBar;
