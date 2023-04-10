// Komponenta pro úpravu události
import React, { useState, useEffect } from "react";
import axios from "axios";

const EditEvent = ({ initialValues, handleUpdate, onClose, isOpen, onReload }) => {
    const [id, setId] = useState(initialValues?.id || null);
    const [description, setDescription] = useState(initialValues?.description || "");
    const [date, setDate] = useState(initialValues?.date || "");
    const [errorMessage, setErrorMessage] = useState("");

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };
  

   
    const onUpdate = (updatedEvent) => {
        axios
            .put(`/api/calendar/event/put/${updatedEvent.id}`, updatedEvent)
            .then((response) => {
                // handle successful response
                console.log(response.data);
                handleUpdate(response.data);
            })
            .catch((error) => {
                // handle error response
                console.log(error);
            });
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!description || !date) {
            setErrorMessage("Please fill all the gaps");
            return;
        }
        const updatedEvent = {
            id: initialValues ? initialValues.id : null,
            description,
            date,
        };
        console.log(id);
        onUpdate(updatedEvent);
        onClose();
        onReload();
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
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Edit Event</h3>
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
                                            <div className="mb-4">
                                                <label htmlFor="date" className="block text-gray-700 font-bold mb-2">
                                                    Date
                                                </label>
                                                <input
                                                    type="date"
                                                    id="date"
                                                    name="date"
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    value={date}
                                                    onChange={handleDateChange}
                                                />
                                            </div>
                                            <div className="flex justify-end">
                                                <button
                                                    type="submit"
                                                    className="inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                    onClick={(event) => handleSubmit(event, id)}
                                                >
                                                    Update
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

};

export default EditEvent;
