import InterviewBookingCard from './InterviewBookingCard';
import { PropTypes } from 'prop-types';

export default {
    title: 'My Components/InterviewBookingCard',
    component: InterviewBookingCard,
    parameters: {
        layout: 'centered'
    }
};

export const BookedInterview = {
    args: {
        booked: true,
        openedPopup: false,
        startTime: 'Random Starting Time',
        endTime: 'Random Ending Time',
        location: 'Random Location',
        eventHandler: null,
        width: 800,
        testing: true
    }
};

export const InterviewToBook = {
    args: {
        booked: false,
        openedPopup: true,
        startTime: 'Random Starting Time',
        endTime: 'Random Ending Time',
        location: 'Random Location',
        eventHandler: null,
        width: 800,
        testing: true
    }
};

export const ChangeInterview = {
    args: {
        booked: true,
        openedPopup: true,
        startTime: 'Random Starting Time',
        endTime: 'Random Ending Time',
        location: 'Random Location',
        eventHandler: null,
        width: 800,
        testing: true
    }
};
