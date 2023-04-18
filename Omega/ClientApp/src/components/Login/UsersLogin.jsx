import React, { useState } from 'react';
import axios from 'axios';
import RegistrationUser from '../Registration/RegistrationUser';


/**
The UsersLogin component allows users to log in to the application or navigate to the RegistrationUser component.
@returns A React component that renders a login form with an email and password input, and buttons for submitting the form or navigating to the registration form.
If the "Registration" button is clicked, the component renders the RegistrationUser component instead of the login form.
*/
const UsersLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [regisClicked, setRegisClicked] = useState(false);

    /**
  * Handles the submission of the login form by sending an HTTP GET request to the server with the email and password entered by the user.
  * If successful, stores the user's ID in localStorage and redirects to the home page.
  * If unsuccessful, logs the error and displays an error message to the user.
  * @param {Event} event The form submission event
  */
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get('/api/user/auth', { params: { email, password } });
            const userId = response.data.id; // Assumes that the server returns the user's id
            localStorage.setItem('userId', userId); // Save userId to localStorage
            window.location.href = '/';
        } catch (error) {
            console.log(error);
            alert('User does not exist. Please check your credentials.');
        }
    };


    return (
        <>
            {!regisClicked ? (
                <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="flex flex-col md:flex-row md:justify-between items-center md:mb-4 ">
                        <button type="submit" className="bg-primary w-full md:w-auto hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2 md:mb-0">
                            Log in
                        </button>
                        <button onClick={() => setRegisClicked(true)} className="w-full  md:w-auto bg-secondary hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Registration
                        </button>
                    </div>
                </form>
            ) : (
                <div>
                    <button onClick={() => setRegisClicked(false)}>back</button>
                    <RegistrationUser />
                </div>
            )}
        </>
    );
};

export default UsersLogin;
