import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TrackSearchResult from './TrackSearchResult';
import SpotifyPlayer from 'react-spotify-web-playback';
import Login from './Login';
import TopArtist from './TopArtist';
import TableArtist from './TableArtist';
import SearchBar from './SearchBar';

function Dashboard({ accessToken }) {
    const [searchKey, setSearchKey] = useState('');
    const [tracks, setTracks] = useState([]);
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [selectedTopTrack, setSelectedTopTrack] = useState(null);
    const [play, setPlay] = useState(false);

    const handleSelectTopTrack = (track) => {
        setSelectedTopTrack(track);
        setSelectedTrack(null);
        setPlay(true);
    };

    const handleSelectTrack = (track) => {
        setSelectedTrack(track);
        setSelectedTopTrack(null);
        setPlay(true);
    };

    useEffect(() => {
        setPlay(true);
    }, [selectedTrack, selectedTopTrack]);

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
