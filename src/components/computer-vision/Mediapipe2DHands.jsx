import {useFrame} from "@react-three/fiber";
import MediapipeHandsService from "../../services/MediapipeHandsService.jsx";

let handLandMarks;
let modelLoaded = false;
const Mediapipe2DHands = ()=>{
    const localVideo = document.getElementById("user-1");
    let lastVideoTime = -1;

    const init = async () =>{
        handLandMarks = await MediapipeHandsService.get2DHandLandmarks();
        console.log(handLandMarks);
        modelLoaded = true;
    }
    init();

    useFrame(()=>
    {
        if (localVideo.currentTime !== lastVideoTime && localVideo.currentTime > 0 && modelLoaded)
        {
            let detection = handLandMarks.detectForVideo(localVideo, localVideo.currentTime);
            lastVideoTime = localVideo.currentTime;

            if (detection.landmarks.length)
            {
                //console.log(detection.landmarks);
            }
        }
    });

    return(
        <>

        </>
    )
}
export default Mediapipe2DHands;