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
    const [calEvents, setCalEvents] = useState(Events);
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = useState('');
    const [slot, setSlot] = useState();
    const [color, setColor] = useState('default');
    const [booked, setBooked] = useState(false);
    const [update, setUpdate] = useState();
    const ColorVariation = [
        {
            id: 1,
            eColor: '#1a97f5',
            value: 'default'
        },
        {
            id: 2,
            eColor: '#00ab55',
            value: 'green'
        },
        {
            id: 3,
            eColor: '#fc4b6c',
            value: 'red'
        },
        {
            id: 4,
            eColor: '#1e4db7',
            value: 'azure'
        },
        {
            id: 5,
            eColor: '#fdd43f',
            value: 'warning'
        }
    ];
    const addNewEventAlert = (slotInfo) => {
        setOpen(true);
        setSlot(slotInfo);
    };
    const editEvent = (event) => {
        setOpen(true);
        const newEditEvent = calEvents.find((elem) => elem.title === event.title);
        setColor(event.color);
        setTitle(newEditEvent.title);
        setColor(newEditEvent.color);
        setUpdate(event);
    };

    const eventColors = (event) => {
        if (event.color) {
            return { className: `event-${event.color}` };
        }
        return { className: `event-default` };
    };

    return (
        <PageContainer title="Calendar ui" description="this is Calendar page">
            <Card>
                <CardContent>
                    <Calendar
                        selectable
                        events={props.events}
                        defaultView="month"
                        scrollToTime={new Date(1970, 1, 1, 6)}
                        defaultDate={new Date()}
                        localizer={localizer}
                        style={{ height: 'calc(100vh - 350px' }}
                        onSelectEvent={props.eventClickHandler}
                        onSelectSlot={(slotInfo) => addNewEventAlert(slotInfo)}
                        eventPropGetter={(event) => eventColors(event)}
                    />
                </CardContent>
            </Card>
        </PageContainer>
    );
};

InterviewCalendar.propTypes = {
    // Default events to prefill calendar with
    events: PropTypes.array,
    // Event handler for clicking on events
    eventClickHandler: PropTypes.func
};

export default InterviewCalendar;
