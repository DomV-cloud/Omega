import React, { useState } from 'react';
import axios from 'axios';

function SearchBar({ accessToken, chooseTrack }) {
    const [searchKey, setSearchKey] = useState('');
    const [tracks, setTracks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handlePlay = (uri) => {
        chooseTrack(uri);
    };

    const searchTracks = async (e) => {
        e.preventDefault();
        setTracks([]);
        setIsLoading(true);

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

    

    return (
        <div className="flex justify-center">
            <div className="">
                <div className="relative w-96 max-w-lg">
                    <form>
                        <div className="flex justify-between overflow-hidden rounded-md bg-white shadow shadow-black/20">
                            <input
                                type="text"
                                className="block w-full flex-1 py-2 px-3 focus:outline-none text-black"
                                placeholder="Start Typing..."
                                value={searchKey}
                                onChange={(e) => setSearchKey(e.target.value)}
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
                    <div className="absolute mt-2 w-full overflow-hidden rounded-md bg-white">
                        {isLoading && <p>Loading...</p>}
                        {!isLoading && tracks.length === 0 && <p>No results found.</p>}
                        {!isLoading && tracks.length > 0 && (
                            <div>
                                {tracks.map((track) => (
                                    <div
                                        key={track.uri}
                                        className="cursor-pointer py-2 px-3 hover:bg-slate-100"
                                        onClick={() => handlePlay(track.uri)}
                                    >
                                        <img
                                            className="w-full h-auto object-cover"
                                            src={track.albumUrl}
                                            alt={track.title}
                                        />
                                        <div>
                                            <p className="text-sm font-medium text-gray-600">{track.title}</p>
                                            <p className="text-sm text-gray-500">{track.artist} - {track.album}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    

    );
}

export default SearchBar;
