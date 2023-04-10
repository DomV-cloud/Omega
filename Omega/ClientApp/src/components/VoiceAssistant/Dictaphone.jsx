import React, { useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';

const Dictaphone = () => {
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


        /*
        import React, { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useSpeechSynthesis } from 'react-speech-kit';

const Dictaphone = () => {
    const { speak, cancel, speaking } = useSpeechSynthesis();
    const { transcript, resetTranscript } = useSpeechRecognition({
        commands: [
            {
                command: 'reset',
                callback: ({ resetTranscript }) => resetTranscript(),
            },
            {
                command: 'open *',
                callback: (site) => window.open('https://' + site),
            },
            {
                command: 'navigate to *',
                callback: (pageName) => {
                    window.location.href = `https://localhost:44435/${pageName}`;
                },
            },
            {
                command: 'test',
                callback: () => speak({ text: transcript }),
            },
        ],
    });

    useEffect(() => {
        if (!speaking && transcript) {
            speak({ text: transcript });
        }
        SpeechRecognition.startListening({ continuous: true });
    }, []);

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return <span>Browser doesn't support speech recognition.</span>;
    }
    return (
        <div>
            <button onClick={() => SpeechRecognition.startListening({ continuous: true })}>Start</button>
            <button onClick={SpeechRecognition.stopListening}>Stop</button>
            <button onClick={resetTranscript}>Reset</button>
            <button onClick={() => speak({ text: transcript })}>Read</button>
            <p>{transcript}</p>
        </div>
    );
};

export default Dictaphone;

        
        
        
        */