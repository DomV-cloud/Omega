import React, { useState, useEffect } from 'react';
import UsersLogin from '../Login/UsersLogin';
import Sidebar from '../Navbar/Sidebar';
import Dictaphone from '../VoiceAssistant/Dictaphone';
import { useNavigate } from 'react-router-dom';


/**

The Layout component checks if there is a user id stored in local storage. If there is a user id, it will render the Sidebar and Dictaphone components. 
If there is no user id, it will render the UsersLogin component.
@returns {JSX.Element} - The Layout component returns JSX to render the Sidebar, Dictaphone, or UsersLogin component based on whether there is a user id stored in local storage.
*/
const Layout = () => {
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getUserIdFromLocalStorage = async () => {
            const id = await localStorage.getItem('userId');
            if (!id) {
                navigate('/');
            } else {
                setUserId(id);
            }
        };
        getUserIdFromLocalStorage();
    }, []);

    return (
        <>
            {userId ? (
                <>
                    <Sidebar />
                    <Dictaphone />
                </>
            ) : (
                <UsersLogin />
            )}
        </>
    );
};

export default Layout;
