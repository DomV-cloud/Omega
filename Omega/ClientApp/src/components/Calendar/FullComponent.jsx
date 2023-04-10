import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import CreateEvent from './CreateEvent';
import EditEvent from './EditEvent';
import DeleteEvent from './DeleteEvent';
import axios from 'axios';
import Dictaphone from '../VoiceAssistant/Dictaphone';


function FullComponent() {
    const [events, setEvents] = useState([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(-1); // Nový stav
    const arr = [<DeleteEvent />, <EditEvent />]; // Nový stav

    const updateEvents = (updatedEvent) => {
        setEvents((prevEvents) =>
            prevEvents.map((event) => (event.id === updatedEvent.id ? updatedEvent : event))
        );
    };
    
    const handleDateClick = (arg) => {
        setSelectedDate(arg.date);
        setIsCreateModalOpen(true);
    };

    const handleEventClick = (arg) => {
        setSelectedEvent(arg.event);
        {
            !isDeleteModalOpen && (
                setIsEditModalOpen(true)
            )
        };
    };

    const handleEventAdded = (event) => {
        setEvents([...events, event]);
        setIsCreateModalOpen(false);
    };

    const handleEventEdited = (event) => {
        const newEvents = events.map((e) => {
            if (e.id === event.id) {
                return { ...e, ...event };
            }
            return e;
        });
        setEvents(newEvents);
        setIsEditModalOpen(false);
    };

    const handleEventDeleted = (event) => {
        const newEvents = events.filter((e) => e.id !== event.id);
        setEvents(newEvents);
        setIsEditModalOpen(false);
        setIsDeleteModalOpen(true);
    };



    const handleReload = () => {
        axios.get('/api/calendar/events').then((response) => {
            const mappedEvents = response.data.map((event) => ({
                id: event.id,
                title: event.description, // Use description as the event title
                start: new Date(event.date),
                allDay: true
            }));
            setEvents(mappedEvents);
        })
    }

    useEffect(() => {
        // Fetch events from API endpoint and map them to FullCalendar event objects
        axios.get('/api/calendar/events').then((response) => {
            const mappedEvents = response.data.map((event) => ({
                id: event.id,
                title: event.description, // Use description as the event title
                start: new Date(event.date),
                allDay: true 
            }));
            setEvents(mappedEvents);
        });
    }, []);

    const renderEventContent = (eventInfo) => {
        // Render the event title and description
        return (
            <>
                <b>{eventInfo.timeText}</b>
                <p>{eventInfo.event.title}</p>
                {!isDeleteModalOpen && (
                    <button
                        onClick={() => {
                            setSelectedEvent(eventInfo.event);
                            setIsDeleteModalOpen(true);
                            setIsEditModalOpen(false);

                        }}
                    >
                        X
                    </button>
                )}
            </>
        );
    };
    return (
        <>
            
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                events={events}
                eventContent={renderEventContent} // Use custom event renderer

            />
            {isCreateModalOpen && (
                <CreateEvent
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                    date={selectedDate}
                    onEventAdded={handleEventAdded}

                />
            )}
            {isEditModalOpen && selectedEvent &&(
                <EditEvent
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    initialValues={selectedEvent}
                    onEventEdited={handleEventEdited}
                    handleUpdate={updateEvents}
                    onReload={handleReload}
                />
            )}

            {isDeleteModalOpen && (
                <DeleteEvent
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    event={selectedEvent}
                    onDelete={handleEventDeleted}
                    onReload={handleReload}
                />
            )}
           
           
        </>

    );
    // <Dictaphone/>
}

export default FullComponent;
