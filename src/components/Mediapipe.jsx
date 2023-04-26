import { Hands } from '@mediapipe/hands';
import * as cam from '@mediapipe/camera_utils'
import * as Webcam from 'react-webcam'
import {useRef, useEffect, useState} from 'react'
import {Canvas} from "@react-three/fiber";



// components
import Environment from "./Environment.jsx";
import Models from "./models/Models.jsx";



const Mediapipe = () =>{
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    var camera = null;

    let handsPosition = {handOne: [], handTwo: []};

    let variable = {i:[]};

    function onResults(results){
        variable.i += 1;
        if(results.multiHandLandmarks.length){
            handsPosition.handOne = results.multiHandLandmarks[0];
            //console.log(handsPosition);

            if(results.multiHandLandmarks[1]){
                handsPosition.handTwo = results.multiHandLandmarks[1];
            }else{
                handsPosition.handTwo = [];
            }

        }else{
            handsPosition.handOne = [];
        }

        //canvasRef.current.width = webcamRef.current.video.videoWidth
        //canvasRef.current.height = webcamRef.current.video.videoHeight

        const canvasElement = canvasRef.current;
        const canvasCtx = canvasElement.getContext("2d");
        canvasCtx.save();

        canvasCtx.clearRect(0,0,canvasElement.width,canvasElement.height);
        canvasCtx.drawImage(results.image,0,0,canvasElement.width,canvasElement.height);
    };

    useEffect(()=>{
        const hands = new Hands({locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
            }});

        hands.setOptions({
            maxNumHands: 2,
            modelComplexity: 1,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
        });

        hands.onResults(onResults);

        if(typeof webcamRef.current !== 'undefined' && typeof webcamRef.current !== null){
            camera = new cam.Camera(webcamRef.current.video, {
                onFrame: async()=>{await hands.send({image: webcamRef.current.video})}, width: 640, height: 480
            });
            camera.start();
        }
    });


    return(
        <>
            <Webcam
                ref={webcamRef}
                style={{
                    position: 'absolute',
                    marginRight: 'auto',
                    marginLeft: 'auto',
                    right: 0,
                    top:0,
                    textAlign: 'left',
                    zIndex: 10,
                    width:400,
                    height: 300}}
            />
            <canvas
                ref = {canvasRef}
                style={{
                    position: 'absolute',
                    marginRight: 'auto',
                    marginLeft: 'auto',
                    left: 10,
                    right: 0,
                    textAlign: 'left',
                    zIndex: 9,
                    width:400,
                    height:300}}>
            </canvas>

            <Canvas style={{
                position: 'fixed',
                marginRight: 'auto',
                marginLeft: 'auto',
                left: 0,
                top:0,
                textAlign: 'center',
                zIndex: 9,
                width:'100%',
                height: '100%'}}
            >
            <Models modelPosition={handsPosition}/>
            <Environment/>
            </Canvas>
        </>
    )
}

export default Mediapipe;
