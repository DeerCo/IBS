import { PropTypes } from 'prop-types';
import {
    Box,
    Button,
    Card,
    CardContent,
    CssBaseline,
    ThemeProvider,
    Typography
} from '@mui/material';
import RTL from '../../../layouts/full-layout/customizer/RTL';
import { BuildTheme } from '../../../assets/global/Theme-variable';
import { LIGHT_THEME } from '../../../redux/constants';

/**
 * Subcomponent for StudentInterviewPage. Used for displaying booking information based on props
 * given.
 * @param props See InterviewBookingCard.propTypes for the component's props
 * @constructor
 */
const InterviewBookingCard = (props) => {
    let title = '';
    let buttonLabel = '';
    let buttonColor = '';
    if (props.booked) {
        title = 'Your Booked Interview';
        buttonLabel = 'Cancel';
        buttonColor = 'error';
    }
    if (props.openedPopup) {
        title = 'Selected Interview';
        if (props.booked) {
            buttonLabel = 'Cancel Existing Interview & Book';
            buttonColor = 'secondary';
        } else {
            buttonLabel = 'Book';
            buttonColor = 'primary';
        }
    }

    const CardItem = ({ title, desc, ...props }) => {
        return (
            <Box key={desc} display="flex" alignItems="center" sx={{ pb: 2, pt: 2 }}>
                <Box sx={{ ml: 2 }}>
                    <Typography color="textSecondary" variant="h5">
                        {title}:
                    </Typography>
                </Box>
                <Box sx={{ ml: 'auto' }}>
                    <Typography color="textSecondary" variant="h5" fontWeight="400">
                        {desc}
                    </Typography>
                </Box>
            </Box>
        );
    };

    // const ApplyFlexy = (flexyProps) => {
    //     const theme = BuildTheme({
    //         theme: LIGHT_THEME,
    //         direction: 'ltr'
    //     });
    //     if (props.testing === false) return <div>{flexyProps.children}</div>;
    //     else
    //         return (
    //             <ThemeProvider theme={theme}>
    //                 <RTL direction="ltr">
    //                     <CssBaseline />
    //                     {flexyProps.children}
    //                 </RTL>
    //             </ThemeProvider>
    //         );
    // };

    return (
        <Card sx={{ pb: 0, mb: 4, width: props.width }}>
            <CardContent sx={{ pb: 0 }}>
                <Box>
                    <Typography variant="h4" sx={{ mb: 2 }}>
                        {title}
                    </Typography>
                </Box>
                <Box sx={{ mt: -1 }}>
                    {props.startTime === undefined ? (
                        <div></div>
                    ) : (
                        <CardItem title="Start time" desc={props.startTime} />
                    )}
                    {props.endTime === undefined ? (
                        <div></div>
                    ) : (
                        <CardItem title="End time" desc={props.endTime} />
                    )}
                    {props.location === undefined ? (
                        <div></div>
                    ) : (
                        <CardItem title="Location" desc={props.location} />
                    )}
                </Box>
                {props.eventHandler === null && !props.testing ? (
                    <div></div>
                ) : (
                    <Box>
                        <Button
                            variant="contained"
                            color={buttonColor}
                            onClick={() => {
                                if (buttonLabel === 'Cancel') props.eventHandler(props.task);
                                else
                                    props.eventHandler(props.task, props.startTime, props.location);
                            }}
                        >
                            {buttonLabel}
                        </Button>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

InterviewBookingCard.propTypes = {
    // State value: if the interview has been previously booked
    booked: PropTypes.bool,
    // State value: if interview slot is clicked upon
    openedPopup: PropTypes.bool,
    // Interview start time (assumed in correct format)
    startTime: PropTypes.string,
    // Interview end time (assumed in correct format)
    endTime: PropTypes.string,
    // Interview location
    location: PropTypes.string,
    // Event handler for button's onClick functionality
    eventHandler: PropTypes.func,
    // Task (query parameter) from StudentInterviewPage
    task: PropTypes.string,
    // Adjust card width
    width: PropTypes.number,
    // For testing purposes,
    testing: PropTypes.bool
};

export default InterviewBookingCard;
