import React from 'react';
import PropTypes from 'prop-types';
import { Button, Fab, Typography } from '@mui/material';
import FeatherIcon from 'feather-icons-react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router';

const PreviousPageFAB = ({ text, iconName, color, ...props }) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Fab
            {...props}
            size="small"
            variant="extended"
            color={color}
            aria-label="previous-page-button"
            onClick={() => {
                if (location.pathname !== '/admin' && location.pathname !== '/home') {
                    navigate(-1);
                }
            }}
        >
            <FeatherIcon fontSize="small" icon={iconName} width="16" height="16" />
            <Typography
                sx={{
                    ml: 1,
                    mr: 0.5,
                    textTransform: 'capitalize',
                    fontSize: '14px'
                }}
            >
                {text}
            </Typography>
        </Fab>
    );
};

PreviousPageFAB.propTypes = {
    text: PropTypes.string.isRequired,
    iconName: PropTypes.string.isRequired,
    color: PropTypes.oneOf([
        'default',
        'error',
        'info',
        'inherit',
        'primary',
        'secondary',
        'success',
        'warning'
    ]).isRequired
};

export default PreviousPageFAB;
