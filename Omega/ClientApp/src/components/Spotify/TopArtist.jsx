import { useState, useEffect } from 'react';
import axios from 'axios';
import { MdVerified } from 'react-icons/md'
import { motion } from "framer-motion";
/**

A component to display information about the top artist from a Spotify playlist

@param {string} accessToken - The access token for the Spotify API

@returns {JSX.Element} - The JSX code to render the component
*/



const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, delay: 0.2 } },
};

const iconVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5, delay: 0.4 } },
};

const textVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5, delay: 0.6 } },
};

const imageVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5, delay: 0.8 } },
};


function TopArtists({ accessToken }) {
    //const [artists, setArtists] = useState([]);
    const [nameTopArtist, setnameTopArtist] = useState("");
    const [monthlyListeners, setmonthlyListeners] = useState("")
    const [artistImgUri, setArtistImgUri] = useState("");


   // Fetches the top artist's image and name from the Spotify API
    useEffect(() => {
        if (!accessToken) return alert("Failed OAUTH");

        axios.get('https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF/tracks?fields=items(track(event_name%2C%20id)%2C%20track(album(images)%2C%20artists))', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        }).then(response => {
            const firstTrack = response.data.items[0].track;
            const firstArtistId = firstTrack.artists[0].id;
            

            axios.get(`https://api.spotify.com/v1/artists/${firstArtistId}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            }).then(artistResponse => {
                const artistImageUrl = artistResponse.data.images[0].url;
                setArtistImgUri(artistImageUrl);

               
            })
            setnameTopArtist(firstTrack.artists[0].name);
        }).catch(error => {
            console.error(error);
        });
    }, [accessToken]);

    // Renders the component with artist information and image
    return (
        <motion.div
            className=" bg-slate-300 h-screen w-full rounded-lg md:mr-8 md:mb-8 flex flex-row overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Left side */}
            <div className="w-full md:w-1/2 mt-4 flex flex-col justify-center text-primary items-center ">
                {/* Verification icon */}
                <div className="flex flex-row justify-center items-center  mb-2">
                    <MdVerified className="w-6 h-6 md:w-14 h-14  " />
                    <h2 className="ml-2 text-sm md:text-lg ">Verified artist</h2>
                </div>
                {/* Artist event_name */}
                <h2 className="text-2xl md:text-5xl font-bold text-center  mb-4">
                    {nameTopArtist}
                </h2>
                {/* Monthly listeners */}
                <h3 className="text-sm md:text-lg text-blue-700 text-center">
                    New 1# Artist on Spotify
                </h3>
            </div>
            {/* Right side with image */}
            <div className="w-full md:w-1/2 h-full flex justify-center items-center">
                <motion.img
                    src={artistImgUri}
                    alt="Artist"
                    className="img-fluid img-thumbnail rounded-full"
                    style={{ maxHeight: "80%" }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                />
            </div>
        </motion.div>


    );
}

export default TopArtists;
