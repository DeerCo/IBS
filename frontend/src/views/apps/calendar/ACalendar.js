import React, { useState } from 'react';
import FeatherIcon from 'feather-icons-react';
import {
  Card,
  CardContent,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Fab,
  Typography,
} from '@mui/material';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Events from './EventData';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';

import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from '../../../layouts/full-layout/breadcrumb/Breadcrumb';
import CustomTextField from '../../../components/forms/custom-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/custom-elements/CustomFormLabel';

moment.locale('en-GB');
const localizer = momentLocalizer(moment);

const ACalendar = () => {
  const [calevents, setCalEvents] = useState(Events);
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = useState('');
  const [slot, setSlot] = useState();
  const [color, setColor] = useState('default');
  const [update, setUpdate] = useState();
  const ColorVariation = [
    {
      id: 1,
      eColor: '#1a97f5',
      value: 'default',
    },
    {
      id: 2,
      eColor: '#00ab55',
      value: 'green',
    },
    {
      id: 3,
      eColor: '#fc4b6c',
      value: 'red',
    },
    {
      id: 4,
      eColor: '#1e4db7',
      value: 'azure',
    },
    {
      id: 5,
      eColor: '#fdd43f',
      value: 'warning',
    },
  ];
  const addNewEventAlert = (slotInfo) => {
    setOpen(true);
    setSlot(slotInfo);
  };
  const editEvent = (event) => {
    setOpen(true);
    const newEditEvent = calevents.find((elem) => elem.title === event.title);
    setColor(event.color);
    setTitle(newEditEvent.title);
    setColor(newEditEvent.color);
    setUpdate(event);
  };
  const updateEvent = (e) => {
    e.preventDefault();

    setCalEvents(
      calevents.map((elem) => {
        if (elem.title === update.title) {
          return { ...elem, title, color };
        }
        return elem;
      }),
    );
    setOpen(false);
    setTitle('');
    setColor('');
    setUpdate(null);
  };
  const inputChangeHandler = (e) => setTitle(e.target.value);

  const selectinputChangeHandler = (id) => setColor(id);

  const submitHandler = (e) => {
    e.preventDefault();

    const newEvents = calevents;
    newEvents.push({
      title,
      start: slot.start,
      end: slot.end,
      color,
    });
    setOpen(false);
    e.target.reset();

    setCalEvents(newEvents);
    setTitle('');
  };
  const deleteHandler = (event) => {
    const updatecalEvents = calevents.filter((ind) => ind.title !== event.title);
    setCalEvents(updatecalEvents);
  };
  const handleClose = () => {
    setOpen(false);
    setTitle('');
    setUpdate(null);
  };

  const eventColors = (event) => {
    if (event.color) {
      return { className: `event-${event.color}` };
    }
    return { className: `event-default` };
  };

  return (
    <PageContainer title="Calendar ui" description="this is Calendar page">
      <Breadcrumb title="Calendar" subtitle="App" />
      <Card>
        <CardContent>
          <Calendar
            selectable
            events={calevents}
            defaultView="month"
            scrollToTime={new Date(1970, 1, 1, 6)}
            defaultDate={new Date()}
            localizer={localizer}
            style={{ height: 'calc(100vh - 350px' }}
            onSelectEvent={(event) => editEvent(event)}
            onSelectSlot={(slotInfo) => addNewEventAlert(slotInfo)}
            eventPropGetter={(event) => eventColors(event)}
          />
        </CardContent>
      </Card>

      <Dialog open={open} onClose={handleClose} fullWidth>
        <form onSubmit={update ? updateEvent : submitHandler}>
          <DialogContent>
            <Typography variant="h3" sx={{ mb: 2 }}>
              {update ? 'Update Event' : 'Add Event'}
            </Typography>
            <CustomFormLabel htmlFor="Event Title">Event Title</CustomFormLabel>
            <CustomTextField
              id="Event Title"
              placeholder="Enter Event Title"
              variant="outlined"
              fullWidth
              value={title}
              sx={{ mb: 2 }}
              onChange={inputChangeHandler}
              size="small"
            />
            <CustomFormLabel>Select Event Color</CustomFormLabel>

            {ColorVariation.map((mcolor) => {
              return (
                <Fab
                  color="primary"
                  style={{ backgroundColor: mcolor.eColor }}
                  sx={{ marginRight: '3px' }}
                  size="small"
                  key={mcolor.id}
                  onClick={() => selectinputChangeHandler(mcolor.value)}
                >
                  {mcolor.value === color ? <FeatherIcon icon="check" size="16" /> : ''}
                </Fab>
              );
            })}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>

            {update ? (
              <Button
                type="submit"
                color="error"
                variant="contained"
                onClick={() => deleteHandler(update)}
              >
                Delete
              </Button>
            ) : (
              ''
            )}
            <Button type="submit" disabled={!title} variant="contained">
              {update ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </PageContainer>
  );
};

export default ACalendar;
