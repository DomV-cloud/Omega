import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TrackSearchResult from './TrackSearchResult';
import SpotifyPlayer from 'react-spotify-web-playback';
import Login from './Login';
import TopArtist from './TopArtist';
import TableArtist from './TableArtist';
import SearchBar from './SearchBar';

/**
 * Dashboard component that displays the user's search history, top artists, and 
 * a SpotifyPlayer for playing the selected track or top track.
 * 
 * @param {Object} props - The props object containing the access token to authenticate with the Spotify API.
 * @param {string} props.accessToken - The access token to authenticate with the Spotify API.
 * @returns {JSX.Element} - The Dashboard component UI.
 */
function Dashboard({ accessToken }) {
    // Define component state variables
    const [searchKey, setSearchKey] = useState('');
    const [tracks, setTracks] = useState([]);
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [selectedTopTrack, setSelectedTopTrack] = useState(null);
    const [play, setPlay] = useState(false);

    /**
     * Event handler for when a top track is selected.
     * 
     * @param {Object} track - The top track object that was selected.
     */
    const handleSelectTopTrack = (track) => {
        setSelectedTopTrack(track);
        setSelectedTrack(null);
        setPlay(true);
    };

    /**
     * Event handler for when a track is selected from the search results.
     * 
     * @param {Object} track - The track object that was selected.
     */
    const handleSelectTrack = (track) => {
        setSelectedTrack(track);
        setSelectedTopTrack(null);
        setPlay(true);
    };

    /**
     * Effect hook that sets the play state to true when a new track is selected.
     */
    useEffect(() => {
        setPlay(true);
    }, [selectedTrack, selectedTopTrack]);

    /**
     * Function to search for tracks using the Spotify API.
     * 
     * @param {Object} e - The event object from the search form submission.
     */
    const searchTracks = async (e) => {
        e.preventDefault();
        setTracks([]);

        const { data } = await axios.get('https://api.spotify.com/v1/search', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                q: searchKey,
                type: 'track',
            },
        });

        // Extract relevant data from the search results and add to the tracks state variable
        const tracks = data.tracks.items.map((item) => {
            return {
                artist: item.artists[0].name,
                title: item.name,
                uri: item.uri,
                albumUrl: item.album.images[0].url,
            };
        });
        setTracks(tracks);
    };

    // Render the component UI
    return (
        <div className="w-full min-h-screen flex flex-col justify-items-center items-center overflow-y-scroll">
            {accessToken ? (
                <div className="flex flex-col w-full">
                    <SearchBar accessToken={accessToken} chooseTrack={handleSelectTrack} /> 
                    <TopArtist accessToken={accessToken} />
                    
                    <TableArtist accessToken={accessToken} onSelectTopTrack={handleSelectTopTrack} />
                    <div className="fixed bottom-0 left-0 w-full">
                        <SpotifyPlayer play={play} className="w-full" token={accessToken} uris={selectedTopTrack ? selectedTopTrack : selectedTrack}
                            callback={(state) => {
                                if (!state.isPlaying) setPlay(false);

                            }}
                        />
                    </div>
                </div>
            ) : (
                <Login />
            )}
        </div>

    );
}

export default Dashboard;
