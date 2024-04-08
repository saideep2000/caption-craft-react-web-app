import React, { useState, useEffect, useRef } from 'react';
import { Button, Box, Typography } from '@mui/material';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import CallEndIcon from '@mui/icons-material/CallEnd';
import PersonIcon from '@mui/icons-material/Person';
import MicIcon from '@mui/icons-material/Mic';
import VideocamIcon from '@mui/icons-material/Videocam';

function Caller({ onClose, video, setVideo}) {
    const videoRef = useRef(null);
    const [mediaStream, setMediaStream] = useState(null);
    const [videoVisible, setVideoVisible] = useState(video); // Control visibility
    const [isAudioEnabled, setIsAudioEnabled] = useState(true);

    // Function to toggle video visibility
    const toggleVideoVisibility = () => {
        if(videoVisible)
        {
            offVideo()
            setVideoVisible(false);
            setVideo(false)
        }
        else{
            getMedia();
            setVideoVisible(true);
            setVideo(true)
        }
    };
    const offVideo = () => {
        mediaStream.getVideoTracks().forEach(track => track.stop());
    }

    const endTheCall = () => {
        offVideo();
        setVideoVisible(false);
        onClose();
        setVideo(false)
        if(isAudioEnabled){
            setIsAudioEnabled(false);
        }
    }

    const getMedia = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: video, audio: true });
            setMediaStream(stream);
            if (videoRef.current) videoRef.current.srcObject = stream;
        } catch (error) {
            console.error("Failed to get user media", error);
        }
    };

    // Function to toggle the audio track
    const toggleAudio = () => {
        const audioTrack = mediaStream?.getAudioTracks()[0];
        if (audioTrack) {
            audioTrack.enabled = !audioTrack.enabled;
            setIsAudioEnabled(audioTrack.enabled);
        }
    };

    useEffect(() => {
        // Acquire the media stream
        getMedia();

        // Cleanup function to stop the media stream when the component unmounts
        return () => {
            mediaStream?.getTracks().forEach(track => track.stop());
        };
    }, []);

    return (
        <Box sx={{ padding: 3, textAlign: 'center', maxWidth: 400, margin: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h5" sx={{ marginBottom: 2 }}>Calling...</Typography>
            
            <div style={{ visibility: videoVisible ? 'visible' : 'hidden' }}>
                
            </div>

            { videoVisible ? (
                <video ref={videoRef} autoPlay playsInline style={{ width: 750, height: 650, marginBottom: 2, borderRadius: '12px' }} />
            ) : (
                <PersonIcon style={{width : 300, height: 250}}/>
            )

            }
            
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, marginBottom: 2 }}>
                <Button variant="contained" onClick={toggleAudio} sx={{ bgcolor: isAudioEnabled ? 'primary.main' : 'grey', '&:hover': { bgcolor: isAudioEnabled ? 'primary.dark' : 'grey' } }}>
                    {isAudioEnabled ? <MicIcon /> : <MicOffIcon />}
                </Button>

                <Button variant="contained" onClick={toggleVideoVisibility} sx={{ bgcolor: videoVisible ? 'secondary.main' : 'grey', '&:hover': { bgcolor: videoVisible ? 'secondary.dark' : 'grey' } }}>
                    {videoVisible ? <VideocamIcon /> : <VideocamOffIcon />}
                </Button>

                <Button variant="contained" color="error" onClick={endTheCall}>
                    <CallEndIcon />
                </Button>
            </Box>
        </Box>
    );
}

export default Caller;
