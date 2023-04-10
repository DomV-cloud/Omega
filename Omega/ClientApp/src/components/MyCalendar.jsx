import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

function MyCalendar() {
    const [events, setEvents] = useState([
        {
            start: new Date(),
            end: new Date(),
            title: 'Test Event',
        },
    ]);

    const handleAddEvent = () => {
        const newEvent = {
            start: new Date(2023, 3, 1, 10, 0),
            end: new Date(2023, 3, 1, 12, 0),
            title: 'New Event',
        };
        setEvents([...events, newEvent]);
    };

    return (
        <div>
            <button onClick={handleAddEvent}>Add Event</button>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
            />
        </div>
    );
}

export default MyCalendar;