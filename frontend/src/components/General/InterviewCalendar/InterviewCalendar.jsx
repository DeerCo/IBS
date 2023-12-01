import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Events from './EventData';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';

import PageContainer from '../../FlexyMainComponents/container/PageContainer';
import { Card, CardContent } from '@mui/material';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Unstable_Grid2';

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
        <Grid container spacing={0} direction="column" alignItems="center" justify="center">
            <Grid xs>
                <Card sx={{ width: `calc(${width} + 2vw)`, maxWidth: `calc(${width} + 2vw)` }}>
                    <Calendar
                        selectable
                        events={events}
                        defaultView="month"
                        scrollToTime={new Date(1970, 1, 1, 6)}
                        defaultDate={new Date()}
                        localizer={localizer}
                        style={{
                            height: 'calc(100vh - 350px)'
                        }}
                        onSelectEvent={eventClickHandler}
                        onSelectSlot={selectSlotHandler}
                        eventPropGetter={(event) => eventColors(event)}
                        {...props}
                    />
                </Card>
            </Grid>
        </Grid>
    );
};

InterviewCalendar.propTypes = {
    events: PropTypes.array.isRequired,
    eventClickHandler: PropTypes.func.isRequired,
    selectSlotHandler: PropTypes.func.isRequired,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
};

export default InterviewCalendar;
