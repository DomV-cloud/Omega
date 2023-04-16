import React from "react";
import axios from "axios";

const DeleteEvent = ({ event, onDelete, isOpen, onReload, onClose }) => {

    
    const handleDelete = () => {
        alert("id:" + event.id);
        axios.delete(`/api/calendar/event/delete/${event.id}`).then(() => {
            onDelete(event);
            onReload(); // aktualizace událostí
        });
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
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Delete Event</h3>
                                    <div className="mt-2">
                                        <p>Are you sure you want to delete this event?</p>
                                        <div className="flex justify-end mt-4">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                onClick={(event) => handleDelete(event)}
                                            >
                                                Delete
                                            </button>
                                            <button
                                                type="button"
                                                className="ml-2 inline-flex justify-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                onClick={onClose}
                                            >
                                                Cancel
                                            </button>
                                        </div>
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

export default DeleteEvent;
