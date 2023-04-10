import { useState, useEffect } from 'react';
import axios from 'axios';
import { BiTimeFive } from 'react-icons/bi'
function TableArtist({ accessToken, onSelectTopTrack }) {
    const [tracks, setTracks] = useState([]);
    const [trackDuration, setTrackDuration] = useState("");


    const handleTrackSelect = (trackId) => {
        getTrackUri(trackId);

    };

    useEffect(() => {
        if (!accessToken) return alert("Failed OAUTH");

        axios.get('https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF/tracks?fields=items(track(name%2C%20id%2C%20album(name%2C%20images%2C%20release_date)%2C%20artists))'
, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        }).then(response => {
            setTracks(response.data.items);
            
        }).catch(error => {
            console.error(error);
        });
    }, [accessToken]);

    const getTrackUri = (trackId) => {
        if (!accessToken) return alert("Failed OAUTH");

        axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        })
            .then(response => {
                const trackUri = response.data.uri;
                const trackLength = response.data;
                onSelectTopTrack(trackUri);
                setTrackDuration(trackLength);
                console.log(trackLength);

                
                
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <section className="container mx-auto p-6 ">
            <div className="w-full mb-8  overflow-hidden rounded-lg shadow-lg ">
                <div className="w-full overflow-x-auto ">
                    <table className="w-full  ">
                        <thead >
                            <tr className="bg-secondary text-md font-semibold tracking-wide text-left text-white uppercase border-b border-gray-600">
                                <th className="px-4 py-3">ID</th>
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">Album</th>
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

                                    <td className="px-4 py-3 text-ms font-semibold border">{track.track.album.name}</td>
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
