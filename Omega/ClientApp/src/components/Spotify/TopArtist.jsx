import { useState, useEffect } from 'react';
import axios from 'axios';
import { MdVerified } from 'react-icons/md'

/**

A component to display information about the top artist from a Spotify playlist

@param {string} accessToken - The access token for the Spotify API

@returns {JSX.Element} - The JSX code to render the component
*/

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
        <div className="bg-primary h-screen w-full   rounded-lg  md:mr-8 md:mb-8  flex flex-row ">
            {/* Left side */}
            <div className="w-full  mt-4  gap-2 flex flex-col justify-left items-left">
                {/* Verification icon */}
                <div className="ml-2 flex flex-row justify-left items-center">
                    <MdVerified className="w-6 h-6 md:w-14 h-14" />
                    <h2 className="text-sm md:text-lg  ">Verified artist</h2>
                </div>
                {/* Artist event_name */}
                <h2 className="ml-4 md:ml-6 text-lg md:text-4xl font-bold">{nameTopArtist}</h2>
                {/* Monthly listeners */}
                <h3 className="text-sm md:text-lg text-gray-300 ml-4 md:ml-6 ">{monthlyListeners} monthly listeners</h3>
            </div>
            {/* Right side with image */}
            <div className="w-100 h-100 d-flex align-items-center justify-content-end mr-4 mt-4 mb-4 ">
                <img src={artistImgUri} alt="Artist" className="img-fluid img-thumbnail align-self-center rounded-full" style={{ maxHeight: "300px" }} />
            </div>


        </div>




    );
}

export default TopArtists;
