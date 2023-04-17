import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

/**
 * CreateEvent component is responsible for creating and adding new events to the calendar.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Boolean} props.isOpen - Whether the modal for adding events is open or not.
 * @param {Function} props.onClose - Function to close the modal.
 * @param {Date} props.date - The date for which the event is being created.
 * @param {Function} props.onEventAdded - Function to be called after the event has been added.
 * @param {Number} props.userId - The ID of the user who is creating the event.
 * @param {Function} props.onReload - Function to be called after the event has been added to reload the calendar.
 * @returns {JSX.Element} - Returns the CreateEvent component.
 */
function CreateEvent({ isOpen, onClose, date, onEventAdded, userId, onReload }) {
    // Define state variables for the event name, category ID, and error message.
    const [eventName, setEventName] = useState('');
    const [categoryid, setCategoryId] = useState(1);
    const [errorMessage, setErrorMessage] = useState('');

    /**
     * Handle form submission for adding a new event.
     *
     * @param {Object} e - The form submission event.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate the event name input.
        if (!eventName.trim()) {
            setErrorMessage('Event name is required.');
            return;
        }

        try {
            // Create a new event object with the necessary data.
            const newEvent = {
                event_name: eventName.trim(),
                event_date: date.toISOString(),
                fk_event_user: userId,
                fk_event_category: categoryid
            };
            // Send a POST request to the API to add the event.
            const response = await axios.post(`/api/calendar/createEvent/${userId}`, newEvent);
            // Call the onEventAdded prop function to update the state of the calendar.
            onEventAdded(newEvent);
            // Reset the event name and category ID inputs, error message, and close the modal.
            setEventName('');
            setCategoryId(1);
            setErrorMessage('');
            onClose();
            // Call the onReload prop function to reload the calendar with the newly added event.
            onReload();
        } catch (error) {
            console.log(error);
            setErrorMessage('Error adding event.');
        }
    };

    /**
     * Handle changes to the event name input field.
     *
     * @param {Object} e - The input change event.
     */
    const handleDescriptionChange = (e) => {
        setEventName(e.target.value);
        setErrorMessage('');
    };

    /**
     * Handle changes to the category ID input field.
     *
     * @param {Object} e - The input change event.
     */
    const handleCategoryChange = (e) => {
        setCategoryId(e.target.value);
    };

    // Render the CreateEvent component.

    return (
        <>
            {isOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">​</span>
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <div>
                                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Add Event</h3>
                                    <div className="mt-2">
                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-4">
                                                <label htmlFor="eventName" className="block text-gray-700 font-bold mb-2">
                                                    Description
                                                </label>
                                                <input
                                                    type="text"
                                                    id="eventName"
                                                    name="eventName"
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    value={eventName}
                                                    onChange={handleDescriptionChange}
                                                    maxLength={150}
                                                />
                                                {errorMessage && (
                                                    <p className="text-red-500 text-xs italic mt-2">{errorMessage}</p>
                                                )}
                                            </div>
                                            <div className="flex justify-end">
                                                <button
                                                    type="submit"
                                                    className="inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                >
                                                    Add
                                                </button>
                                                <button
                                                    type="button"
                                                    className="ml-2 inline-flex justify-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                    onClick={onClose}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

CreateEvent.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    onEventAdded: PropTypes.func.isRequired,
};

export default CreateEvent;