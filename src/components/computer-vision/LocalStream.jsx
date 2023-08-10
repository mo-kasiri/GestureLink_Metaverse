import {useEffect, useRef, useState} from "react";
import Draggable from "react-draggable";
import LocalStreamService from "../../services/LocalStreamService.jsx";
import MediapipeHands from "../../services/MediapipeHandsService.jsx";

const videoConfig = {
    video: true,
    audio: true
}

const LocalStream = ()=>{
    //const [localStream, setLocalStream] = useState();
    const videoTag = useRef(null);
    //let handLandMarks;

    useEffect(()=>{
        LocalStreamService.getStream(videoConfig).then((stream)=>{
            //setLocalStream(stream);
            console.log('get stream Called!');
            videoTag.current.srcObject = stream;
            //videoTag.current.play();
        });
    },[]);

    return(
        <Draggable >
            <video muted ref={videoTag} className="video-player grab" id="user-1" autoPlay playsInline></video>
        </Draggable>
    )
}

export default LocalStream;