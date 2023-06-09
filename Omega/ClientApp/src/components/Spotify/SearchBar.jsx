﻿import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

// Variants for animation of search results container and its items

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, delay: 0.2 } },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i) => ({
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            delay: 0.1 + i * 0.05,
        },
    }),
};

/**

A React component that allows the user to search for tracks on Spotify and choose one to play.
@param {string} accessToken - The access token for the user's Spotify account.
@param {function} chooseTrack - A callback function that takes a track URI as an argument and plays the selected track.
@returns {JSX.Element} - A search bar component that displays the search results for the entered keyword and allows the user to choose a track to play.
*/
function SearchBar({ accessToken, chooseTrack }) {

    //Initialization of the states
    const [searchKey, setSearchKey] = useState('');
    const [tracks, setTracks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasUserInput, setHasUserInput] = useState(false);
    /**
    * Handles the playing of a selected track.
    * 
    * @param {string} uri - The URI of the selected track.
    */

    const handlePlay = (uri) => {
        chooseTrack(uri);
    };

    /**
    * Searches for tracks on Spotify using the entered search keyword.
    * 
    * @param {Event} e - The submit event of the search form.
    */
    const searchTracks = async (e) => {
        e.preventDefault();
        setTracks([]);
        setIsLoading(true);
        setHasUserInput(true);
        try {
            const { data } = await axios.get('https://api.spotify.com/v1/search', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: {
                    q: searchKey,
                    type: 'track',
                },
            });

            const tracks = data.tracks.items.map((item) => {
                return {
                    artist: item.artists[0].name,
                    title: item.name,
                    uri: item.uri,
                    album: item.album.name,
                    albumUrl: item.album.images[0].url,
                };
            });

            setTracks(tracks);
        } catch (error) {
            console.error(error);
        }

        setIsLoading(false);
    };

    /**
    * Handles the input change in the search bar.
    * 
    * @param {Event} e - The input change event of the search bar.
    */
    const handleSearchInput = (e) => {
        setSearchKey(e.target.value);
        setHasUserInput(false);
    };

   
    // render component UI
    return (
        <div className="flex justify-center">
            <div className="">
                <div className="relative w-85  md:w-96 max-w-lg">
                    <form>
                        <div className="flex justify-between overflow-hidden rounded-md bg-white shadow shadow-black/20">
                            <input
                                type="text"
                                className="block w-full flex-1 py-2 px-3 focus:outline-none text-black"
                                placeholder="Search Track..."
                                value={searchKey}
                                onChange={handleSearchInput}
                            />
                            <span className="m-1 inline-flex cursor-pointer items-center rounded-md bg-indigo-600 px-2 py-2 hover:bg-indigo-700">
                                <button
                                    type="button"
                                    onClick={searchTracks}
                                    className="text-black text-white py-2 px-4 rounded-full"
                                >
                                    Search
                                </button>
                            </span>
                        </div>
                    </form>
                    <div className="absolute mt-2 md:w-full overflow-hidden rounded-md bg-white">
                        {isLoading && <p>Loading...</p>}
                        {!isLoading && tracks.length === 0 && <p className="text-black ">No results found.</p>}
                        {!isLoading && tracks.length > 0 && (
                            <motion.div variants={containerVariants} initial="hidden" animate="visible">
                                {tracks
                                    .filter((track) => {
                                        return track.title.toLowerCase().includes(searchKey.toLowerCase());
                                    })
                                    .map((track, i) => (
                                        <motion.div
                                            key={track.uri}
                                            variants={itemVariants}
                                            custom={i}
                                            className="cursor-pointer py-2 px-3 hover:bg-slate-100 flex flex-row justify-left"
                                            onClick={() => handlePlay(track.uri)}
                                        >
                                            <img
                                                className=" w-12 md:w-16 object-cover"
                                                src={track.albumUrl}
                                                alt={track.title}
                                            />
                                            <div className="ml-4 flex flex-col justify-center">
                                                <p className="text-sm font-medium text-gray-600">{track.title}</p>
                                                <p className="text-sm text-gray-500">
                                                    {track.artist} - {track.album}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default SearchBar;
