import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Events from './EventData';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';

import PageContainer from '../../FlexyMainComponents/container/PageContainer';
import { Card, CardContent } from '@mui/material';
import PropTypes from 'prop-types';

moment.locale('en-GB');
const localizer = momentLocalizer(moment);

/**
 * Calendar component for interview booking
 * @param props see below PropTypes
 * @returns {JSX.Element}
 * @constructor
 */
const InterviewCalendar = (props) => {
    const eventColors = (event) => {
        if (event.color) {
            return { className: `event-${event.color}` };
        }
        return { className: `event-default` };
    };

    return (
        <Card sx={{ width: props.width }}>
            <CardContent>
                <Calendar
                    selectable
                    events={props.events}
                    defaultView="month"
                    scrollToTime={new Date(1970, 1, 1, 6)}
                    defaultDate={new Date()}
                    localizer={localizer}
                    style={{ height: 'calc(100vh - 350px)', width: props.width - 60 }}
                    onSelectEvent={props.eventClickHandler}
                    onSelectSlot={props.selectSlotHandler}
                    eventPropGetter={(event) => eventColors(event)}
                    {...props}
                />
            </CardContent>
        </Card>
    );
};

InterviewCalendar.propTypes = {
    // Default events to prefill calendar with
    events: PropTypes.array,
    // Event handler for clicking on events
    eventClickHandler: PropTypes.func,
    // Event handler for clicking on days (be it eventful or not)
    selectSlotHandler: PropTypes.func,
    // Width of calendar
    width: PropTypes.number
};

export default InterviewCalendar;
