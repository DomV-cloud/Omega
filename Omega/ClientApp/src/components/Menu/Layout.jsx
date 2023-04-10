import React from 'react';
import { Route } from 'react-router-dom';
import Sidebar from '../Navbar/Sidebar';
import Dictaphone from '../VoiceAssistant/Dictaphone';

const Layout = () => {
    return (
        <>
            <Sidebar>
            </Sidebar>
            <Dictaphone />
        </>
    );
};

export default Layout;