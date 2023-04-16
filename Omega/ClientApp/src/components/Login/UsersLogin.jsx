import React, { useState } from 'react';
import axios from 'axios';
import RegistrationUser from '../Registration/RegistrationUser';

const UsersLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [regisClicked, setRegisClicked] = useState(false);

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
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="flex flex-col md:flex-row md:justify-between items-center md:mb-4">
                        <button type="submit" className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2 md:mb-0">
                            Log in
                        </button>
                        <button onClick={() => setRegisClicked(true)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
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
