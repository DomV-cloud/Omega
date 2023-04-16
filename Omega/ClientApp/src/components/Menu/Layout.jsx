import React, { useState, useEffect } from 'react';
import UsersLogin from '../Login/UsersLogin';
import Sidebar from '../Navbar/Sidebar';
import Dictaphone from '../VoiceAssistant/Dictaphone';
import { useNavigate } from 'react-router-dom';

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
