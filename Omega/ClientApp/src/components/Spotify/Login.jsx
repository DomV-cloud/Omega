import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SpotifyPlayer from 'react-spotify-web-playback';
import TrackSearchResult from './TrackSearchResult';
import Dashboard from './Dashboard';
import { RiSpotifyFill } from "react-icons/ri";
import { motion } from "framer-motion";

/**
 * Login Component
 * @return {JSX.Element} Returns the JSX for the Login component
 */
function Login() {
    const CLIENT_ID = '3170e098c5f24e439eee9708091edc4b';
    const REDIRECT_URI = 'https://localhost:44435/spotify/dashboard';
    const AUTH_ENDPOINT = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(
        REDIRECT_URI
    )}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-top-read%20`;

    const [token, setToken] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    /**
     * useEffect hook to check for token in local storage and handle redirections
     */
    useEffect(() => {
        const hash = window.location.hash;
        let token = window.localStorage.getItem('token');

        if (!token && hash) {
            token = hash.substring(1).split('&').find(elem => elem.startsWith('access_token')).split('=')[1];
            window.location.hash = '';
            window.localStorage.setItem('token', token);
            setIsLoggedIn(true);
        }

        setToken(token);
    }, [isLoggedIn]); // add isLoggedIn as a dependency


    /**
     * Function to handle logout and remove token from local storage
     */
    const handleLogout = () => {
        window.localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    /**
     * Function to handle redirection to Spotify authorization endpoint
     */
    const handleRedirect = () => {
        window.location.href = AUTH_ENDPOINT;
    }

    // render UI component
    return (
        <div className={`w-full min-h-screen ${!token ? "bg-gradient-to-r from-primary to-secondary" : "bg-slate-300"}`}>
            <div class="w-full min-h-screen">
                {token ? (
                    <div className="flex flex-col">
                        <Dashboard accessToken={token} />
                    </div>
                ) : (
                    <div class="w-full min-h-screen flex justify-center items-center">
                        <div class="text-center flex flex-col relative">
                            <div class="hidden md:flex mx-auto flex flex-row gap-12 items-center">
                                <p class="mr-4 text-white font-extrabold leading-tight text-4xl flex">Let the music</p>
                                <div class=" h-48 w-56 z-10 flex justify-center items-center">
                                        <img src="Sources/img/assets/people_image.png" alt="people" class="object-cover h-full absolute bottom-28 mr-8  " />
                                </div>
                                <p class="ml-4 text-white font-extrabold leading-tight text-4xl flex">carry you away</p>
                            </div>
                            <div class="md:mr-8 md:mt-8 flex flex-row gap-4 justify-center items-center text-white text-center relative z-10">
                                <button class="bg-other text-white w-32 transition ease-in-out delay-150 duration-300 hover:-translate-y-1 hover:scale-110 duration-300 hover:border-none rounded-full font-bold py-2 px-6 text-lg ml-4 md:py-4 md:px-8 md:text-xl" onClick={handleRedirect}>
                                    Login
                                </button>
                                <RiSpotifyFill className="md:hidden w-20 h-20 text-[#1DB954]" />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>



    );
}

export default Login;
