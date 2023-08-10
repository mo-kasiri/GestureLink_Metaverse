import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
//import '@tensorflow/tfjs-core';
//import {FilesetResolver, HandLandmarker} from "@mediapipe/tasks-vision";
let handLandmarker;

// let configuration = {
//     baseOptions: {
//         modelAssetPath: `./tasks/hand_landmarker.task`,
//         delegate: "GPU",
//         //delegate: "CPU" // Awful
//     },
//     numHands: 2
// }


const detectorConfig = {
    runtime: 'mediapipe', // or 'tfjs'
    solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/hands/`,
    //solutionPath: 'node_modules/@mediapipe/hands/',
    modelType: 'full',
    maxHands: 2
};

class MediapipeHandsService {
    // async get2DHandLandmarks(){
    //     const vision = await FilesetResolver.forVisionTasks(
    //         // path/to/wasm/root
    //         "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
    //         //"@mediapipe/tasks-vision/wasm"
    //     );
    //
    //     handLandmarker = await HandLandmarker.createFromOptions(vision, configuration);
    //     await handLandmarker.setOptions({ runningMode: "VIDEO" });
    //     console.log(handLandmarker);
    //     return handLandmarker;
    // }

    async get3DHandLandmarks(){
        const model = handPoseDetection.SupportedModels.MediaPipeHands;
        return handLandmarker = await handPoseDetection.createDetector(model, detectorConfig);
    }
}

export default new MediapipeHandsService();

