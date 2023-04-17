import React, { useState, useEffect } from "react";
import SpotifyPlayer from 'react-spotify-web-playback';

/**
 * Extented SpotifyPlayer component for playing choosed tracks
 * @param {string} accessToken - user's accessToken for spotify OAUTH
 * @param {string} trackUri - uri of the selected track to play
 * @returns {JSX.Element} - Extented SpotifyPlayer UI component
 */
function MyPlayer({ accessToken, trackUri }) {
    const [play, setPlay] = useState(false);

    // set play state to true if trackUri changes
    useEffect(() => {
        setPlay(true);
    }, [trackUri]);

    // if no access token, return null (component doesn't render)
    if (!accessToken) return null;

    return (
        <SpotifyPlayer
            token={accessToken}
            showSaveIcon
            // set play state to false when playback is paused/stopped
            callback={(state) => {
                if (!state.isPlaying) setPlay(false);
            }}
            play={play}
            // if trackUri is present, play the track; otherwise, don't play anything
            uris={trackUri ? [trackUri] : []}
        />
    );
}

export default MyPlayer;
