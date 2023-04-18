import React, { useState } from 'react';

/**
 * Pop up window for user to tell him about failed registration
 * @param {isOpen} state whenever pop window should be visible for user
 * @returns {JSX.Element} pop window UI for successful registration
 */
const FailedRegistration = ({ message, onClose }) => {

    return (
        <div className="bg-white p-8 rounded-md border border-gray-300 max-w-md mx-auto">
            <p className="text-lg font-bold mb-4">Registration failed</p>
            <p className="mb-4">{message}</p>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={onClose}
            >
                Close
            </button>
        </div>
    );
};


export default FailedRegistration;