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
 * @param events Default events to prefill calendar with
 * @param eventClickHandler Event handler for clicking on events
 * @param selectSlotHandler Event handler for clicking on days (be it eventful or not)
 * @param width Width of calendar
 * @param props see below PropTypes
 * @returns {JSX.Element}
 * @constructor
 */
const InterviewCalendar = ({ events, eventClickHandler, selectSlotHandler, width, ...props }) => {
    const eventColors = (event) => {
        if (event.color) {
            return { className: `event-${event.color}` };
        }
        return { className: `event-default` };
    };

    return (
        <Card sx={{ width: width }}>
            <CardContent>
                <Calendar
                    selectable
                    events={events}
                    defaultView="month"
                    scrollToTime={new Date(1970, 1, 1, 6)}
                    defaultDate={new Date()}
                    localizer={localizer}
                    style={{
                        height: 'calc(100vh - 350px)',
                        width: typeof width === 'number' ? width - 60 : `calc(${width}-60px)`
                    }}
                    onSelectEvent={eventClickHandler}
                    onSelectSlot={selectSlotHandler}
                    eventPropGetter={(event) => eventColors(event)}
                    {...props}
                />
            </CardContent>
        </Card>
    );
};

InterviewCalendar.propTypes = {
    events: PropTypes.array.isRequired,
    eventClickHandler: PropTypes.func.isRequired,
    selectSlotHandler: PropTypes.func.isRequired,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
};

export default InterviewCalendar;
