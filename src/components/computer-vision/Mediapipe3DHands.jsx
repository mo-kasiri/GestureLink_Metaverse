import MediapipeHandsService from "../../services/MediapipeHandsService.jsx";
import {useFrame} from "@react-three/fiber";

let handLandMarks;
let modelLoaded = false;
const Mediapipe3DHands = ({handLandmarksProp})=>{
    const localVideo = document.getElementById("user-1");
    const init = async()=>
    {
        handLandMarks = await MediapipeHandsService.get3DHandLandmarks();
        modelLoaded = true;
    }
    init();

    useFrame(()=>{
        if (localVideo.currentTime > 0 && modelLoaded)
        {
            handLandMarks.estimateHands(localVideo).then((res)=>{
                if(res.length)
                {
                    handLandmarksProp(res);
                    //console.log(res);
                }
            });
        }
    });
}

export default Mediapipe3DHands;