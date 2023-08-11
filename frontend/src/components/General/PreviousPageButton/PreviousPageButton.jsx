import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import FeatherIcon from 'feather-icons-react';
import PropTypes from 'prop-types';

const PreviousPageButton = ({ rightAlignOffset, ...props }) => {
    const navigate = useNavigate();

    const BackButton = () => (
        <Button
            variant="contained"
            color="secondary"
            startIcon={<FeatherIcon icon="chevron-left" width="18" />}
            onClick={() => navigate(-1)}
            {...props}
        >
            Back to Previous Page
        </Button>
    );

    if (rightAlignOffset)
        return (
            <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end"
                sx={{ mr: rightAlignOffset }}
            >
                <BackButton />
            </Box>
        );

    return <BackButton />;
};

PreviousPageButton.propTypes = {
    // Optional: Pushes button to far-right, then pushes left (a bit) by the offset
    rightAlignOffset: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default PreviousPageButton;
