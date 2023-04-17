import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import CreateEvent from './CreateEvent';
import EditEvent from './EditEvent';
import DeleteEvent from './DeleteEvent';
import axios from 'axios';
import Dictaphone from '../VoiceAssistant/Dictaphone';

/**
 * A React component that renders a FullCalendar instance and handles events
 * and event editing through child components.
 * 
 * @returns {JSX.Element} The rendered FullCalendar component and its child components.
 */
function FullComponent() {

    // Define state variables for handling events and their associated modals
    const [events, setEvents] = useState([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const arr = [<DeleteEvent />, <EditEvent />];
    const [userId, setUserId] = useState(localStorage.getItem('userId'));

    // Define a function for updating events after they have been edited
    const updateEvents = (updatedEvent) => {
        setEvents((prevEvents) =>
            prevEvents.map((event) => (event.id === updatedEvent.id ? updatedEvent : event))
        );
    };

    // Define functions for handling clicks on calendar dates and events
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

    // Define functions for handling adding, editing, and deleting events
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

    // Define a function for reloading events from the server
    const handleReload = () => {
        axios.get(`/api/calendar/events/${userId}`).then((response) => {
            const mappedEvents = response.data.map((event) => ({
                id: event.id,
                title: event.event_name,
                start: new Date(event.event_date),
                allDay: true
            }));
            setEvents(mappedEvents);
        });
    }

    // Use the useEffect hook to fetch events from the server when the component mounts
    useEffect(() => {
        axios.get(`/api/calendar/events/${userId}`).then((response) => {
            const mappedEvents = response.data.map((event) => ({
                id: event.id,
                title: event.event_name,
                start: new Date(event.event_date),
                allDay: true
            }));
            setEvents(mappedEvents);
        });

    }, []);

    // Define a function for rendering info about Event
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
                    userId={userId}
                    onReload={handleReload}

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

}

export default FullComponent;
