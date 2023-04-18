import React, { useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';

/**

Dictaphone component that initializes the Alan AI SDK and listens for voice commands.
@returns {JSX.Element} The Dictaphone component.
*/

const Dictaphone = () => {
    /**
    * Initializes the Alan AI SDK and listens for voice commands.
    */

   ///přidat commandy na další linky!!!!
    useEffect(() => {
        alanBtn({
            key: 'e6dbcb3b7d44ebb17244dd86190b49ec2e956eca572e1d8b807a3e2338fdd0dc/stage',
            onCommand: ({ command }) => {
                if (command === "home") {
                    window.location.replace('/home');
                } 
                if (command === "spotify") {
                    window.location.replace('/spotify/auth');
                } 
               

            }
        });
    }, []);
    return (
        <div>
          
        </div>
    );
};

export default Dictaphone;


      