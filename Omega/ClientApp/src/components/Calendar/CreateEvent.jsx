import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

function CreateEvent({ isOpen, onClose, date, onEventAdded }) {
    const [description, setDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!description.trim()) {
            setErrorMessage('Description is required.');
            return;
        }

        try {
            const newEvent = {
                description: description.trim(),
                date: date.toISOString(),
                
            };
            const response = await axios.post('/api/calendar/createEvent', newEvent);
            onEventAdded(newEvent);
            setDescription('');
            setErrorMessage('');
            onClose();
        } catch (error) {
            console.log(error);
            setErrorMessage('Error adding event.');
        }
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
        setErrorMessage('');
    };

    return (
    <>
            {isOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <div>
                                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Add Event</h3>
                                    <div className="mt-2">
                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-4">
                                                <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                                                    Description
                                                </label>
                                                <input
                                                    type="text"
                                                    id="description"
                                                    name="description"
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    value={description}
                                                    onChange={handleDescriptionChange}
                                                    maxLength={255}
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