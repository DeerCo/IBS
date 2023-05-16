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
import moment from 'moment/moment';

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
            buttonLabel = 'Book Interview';
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
                        {typeof desc === 'string' && desc.startsWith('http') ? (
                            <a href={desc}>Link ✈</a>
                        ) : (
                            desc
                        )}
                    </Typography>
                </Box>
            </Box>
        );
    };

    const customWidth = props.width === -1 ? 'auto' : props.width;

    return (
        <Card sx={{ pb: 0, mb: 4, width: customWidth }}>
            <CardContent sx={{ pb: 0 }}>
                <Box>
                    <Typography variant="h4" sx={{ mb: 2 }}>
                        {title}
                    </Typography>
                </Box>
                <Box sx={{ mt: -1 }}>
                    {props.startTime !== undefined && (
                        <CardItem
                            title="Start time"
                            desc={moment(props.startTime).format('MM/DD/YYYY, h:mm:ss a')}
                        />
                    )}
                    {props.endTime !== undefined && (
                        <CardItem
                            title="End time"
                            desc={moment(props.endTime).format('MM/DD/YYYY, h:mm:ss a')}
                        />
                    )}
                    {props.location !== undefined && (
                        <CardItem title="Location" desc={props.location} />
                    )}
                    {props.bookedNote !== null ||
                        (props.bookedNote !== '' && (
                            <CardItem title="Additional Notes" desc={props.bookedNote} />
                        ))}
                </Box>
                {(props.eventHandler !== null || props.testing) && (
                    <Box display="flex" alignItems="center">
                        <Button
                            variant="contained"
                            color={buttonColor}
                            onClick={() => {
                                if (buttonLabel === 'Cancel') props.eventHandler(props.task);
                                else
                                    props.eventHandler(props.task, props.startTime, props.location);
                            }}
                            size="large"
                            style={{ minWidth: 150, marginTop: 3 }}
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
    startTime: PropTypes.instanceOf(Date),
    // Interview end time (assumed in correct format)
    endTime: PropTypes.instanceOf(Date),
    // Interview location
    location: PropTypes.string,
    // Event handler for button's onClick functionality
    eventHandler: PropTypes.func,
    // Task (query parameter) from StudentInterviewPage
    task: PropTypes.string,
    // bookedNote when first booking (set to empty string otherwise)
    bookedNote: PropTypes.string,
    // Adjust card width (-1 means auto-scale)
    width: PropTypes.number,
    // For testing purposes,
    testing: PropTypes.bool
};

export default InterviewBookingCard;
