import { useState, useEffect } from 'react';  // Import necessary React hooks
import axios from 'axios';  // Import axios library for making HTTP requests
import { BiTimeFive } from 'react-icons/bi'  // Import icon component from react-icons library

/**
 * TableArtist component displays a table of tracks from a Spotify playlist.
 * Allows user to select a track and returns the track's URI to parent component.
 * 
 * @param {string} accessToken - Access token required for Spotify API requests.
 * @param {function} onSelectTopTrack - Callback function to pass selected track URI to parent component.
 * 
 * @returns {JSX.Element} - TableArtist component JSX.
 */
function TableArtist({ accessToken, onSelectTopTrack }) {
    // State for tracks array and track duration
    const [tracks, setTracks] = useState([]);
    const [trackDuration, setTrackDuration] = useState("");

    /**
     * Handles track selection by getting track URI and duration and passing URI to parent component.
     * 
     * @param {string} trackId - ID of selected track.
     */
    const handleTrackSelect = (trackId) => {
        getTrackUri(trackId);
    };

    /**
     * Retrieves list of tracks from Spotify playlist using access token.
     * Sets tracks state with response data.
     */
    useEffect(() => {
        // If access token is not available, show error alert
        if (!accessToken) return alert("Failed OAUTH");

        // Send GET request to Spotify API to retrieve playlist tracks
        axios.get('https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF/tracks?fields=items(track(event_name%2C%20id%2C%20album(event_name%2C%20images%2C%20release_date)%2C%20artists))', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        })
            .then(response => {
                // Set tracks state with array of tracks from response data
                setTracks(response.data.items);
            })
            .catch(error => {
                console.error(error);
            });
    }, [accessToken]);

    /**
     * Retrieves track URI and duration using track ID from Spotify API.
     * Calls onSelectTopTrack with URI and sets track duration state with response data.
     * 
     * @param {string} trackId - ID of selected track.
     */
    const getTrackUri = (trackId) => {
        // If access token is not available, show error alert
        if (!accessToken) return alert("Failed OAUTH");

        // Send GET request to Spotify API to retrieve track data
        axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        })
            .then(response => {
                // Retrieve track URI and duration from response data
                const trackUri = response.data.uri;
                const trackLength = response.data;
                // Call onSelectTopTrack with track URI and set track duration state
                onSelectTopTrack(trackUri);
                setTrackDuration(trackLength);
                console.log(trackLength);
            })
            .catch(error => {
                console.error(error);
            });
    };

    // TableArtist component JSX
    return (
        <section className="container mx-auto p-6 bg-slate-300 ">
            <div className="w-full mb-8  overflow-hidden rounded-lg shadow-lg ">
                <div className="w-full overflow-x-auto ">
                    <table className="w-full  ">
                        <thead >
                            <tr className="bg-secondary text-md font-semibold tracking-wide text-left text-white uppercase border-b border-gray-600">
                                <th className="px-4 py-3">ID</th>
                                <th className="px-4 py-3">Name</th>
                               
                                <th className="px-4 py-3">Artist</th>
                                <th className="px-4 py-3">Added</th>
                                <th className="px-4 py-3"><BiTimeFive /></th>
                            </tr>
                        </thead>
                        <tbody className="bg-primary">
                            {tracks.map((track, index) => (
                                
                                <tr key={index} className="text-white" onClick={() => handleTrackSelect(track.track.id)}>
                                    <td className = "px-4 py-3 text-ms font-semibold border" >{index}</td>
                                    <td className="px-4 py-3 border">
                                        <div className="flex items-center text-sm">
                                            <div class="relative w-8 h-8 mr-3 rounded-full md:block">
                                                <img className="object-cover w-full h-full " src={track.track.album.images[0].url} alt="" loading="lazy" /> 
                                                <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-white">{ track.track.name}</p> 
                                                <p className="text-xs text-gray-300">{track.track.artists[0].name }</p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-4 py-3 text-ms font-semibold border">{track.track.artists[0].name}</td>
                                    <td className="px-4 py-3 text-ms font-semibold border">{track.track.album.release_date}</td>
                                    <td className="px-4 py-3 text-ms font-semibold border">4:21</td>





                                </tr>

                            ))}
                           
                          
                           
                          
                           
                        </tbody>
                    </table>
                </div>
            </div>
        </section>

    );
}

export default TableArtist;
