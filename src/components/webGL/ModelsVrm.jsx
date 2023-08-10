import {useEffect, useState, useRef} from "react";
import {useFrame, useThree} from '@react-three/fiber';
import { useGLTF, Html } from "@react-three/drei";
import MediapipeHandsService from "../../services/MediapipeHandsService.jsx";
import createTwoHands from "../../services/CreateTwoHands.jsx";
import createOneHand from "../../services/CreateOneHand.jsx";
import * as THREE from "three";
import createOne3DHand from "../../services/CreateOne3DHand.jsx";
import CreatTwo3DHands from "../../services/CreatTwo3DHands";
import CreateTwo3DRemoteHands from "../../services/HandsServices/CreateTwo3DRemoteHands";

import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import {VRMLLoader} from "three/examples/jsm/loaders/VRMLLoader";
import { VRM, VRMLoaderPlugin, VRMHumanBoneName } from '@pixiv/three-vrm'

let handLandMarks;
let modelLoaded = false;
const ModelsVrm = ({userJoined,handLandmarksProp,remoteHandLandMarksProp})=>{

    const [gltf, setGltf] = useState();
    const avatar = useRef(null);
    const [bonesStore, setBones] = useState({});
    const camera = useThree((state) => state.camera);
    //const armchairPosition = new THREE.Vector3(2.1151208877563477,0.312796471118927002,-0.3487975299358368);
    camera.position.set( -0.293, 1.1, -1.9 );
    camera.lookAt(-0.29,0.6,0.5);
    camera.fov = 50;
    //camera.position.set( 0.4, 2, -0.6 );

    const loader = new GLTFLoader();
    loader.register((parser)=>{
        return new VRMLoaderPlugin(parser);
    });
    let vrm;

    // then add a function instead of useEffect -> when the peer user joined
    useEffect(() => {
        loader.load(
            '/models/kiraMan2.vrm',
            //'/models/moManCompressed.vrm',
            (gltf)=>{
                //setGltf(gltf);
                console.log(gltf);
                scene.add(gltf.scene);
                gltf.scene.scale.set(1.2,1.2,1.2);
                vrm = gltf.userData.vrm;
                avatar.current = vrm;
                //const targetGaze = new THREE.Object3D();
                //targetGaze.position.set(-0.293, 1.3, -1.9);
                //vrm.lookAt.target = camera;


                //vrm.humanoid.getNormalizedBoneNode(VRMHumanBoneName.Hips).rotation.y = Math.PI
                vrm.humanoid.getNormalizedBoneNode(VRMHumanBoneName.Hips).position.y = 0.4;
                vrm.humanoid.getNormalizedBoneNode(VRMHumanBoneName.Hips).position.z = 0.5;
                vrm.humanoid.getNormalizedBoneNode(VRMHumanBoneName.Hips).position.x = -0.26;
                avatar.current.expressionManager.setValue('relaxed', 0.5);
                //avatar.current.expressionManager.setValue('aa', 0.5);
                // console.log(vrm.blendShapeProxy.exp  ressions)
                // console.log(vrm.expressionManager.expressions)
                const expressionNames = vrm.expressionManager.expressions.map((expression) => expression.expressionName)
                console.log(expressionNames)
                // VRMUtils.rotateVRM0(vrm)

                console.log(vrm.humanoid.getNormalizedBoneNode(VRMHumanBoneName.Head));
                // Some object3d which defined as bones, just take a look at the previous line in the console
                // When the loading is completed these bones are going to be stored inside boneStore state
                const bones = {
                    head: vrm.humanoid.getNormalizedBoneNode(VRMHumanBoneName.Head),
                    neck: vrm.humanoid.getRawBoneNode(VRMHumanBoneName.Neck),
                    hips: vrm.humanoid.getRawBoneNode(VRMHumanBoneName.Hips),
                    spine: vrm.humanoid.getRawBoneNode(VRMHumanBoneName.Spine),
                    upperChest: vrm.humanoid.getRawBoneNode(VRMHumanBoneName.UpperChest),
                    //leftArm: vrm.humanoid.getNormalizedBoneNode(VRMHumanBoneName.LeftUpperArm),
                    //rightArm: vrm.humanoid.getNormalizedBoneNode(VRMHumanBoneName.RightUpperArm)
                }

                //bones.rightArm.rotation.z = -Math.PI / 4

                setBones(bones);
            }
        )
    }, []);


    const OOI = {};

    const { scene } = useGLTF('./models/no-user.glb');
    //const peerUser =
    console.log(scene);



    scene.traverse(n => {
        if (n.name === 'palm1') OOI.palm1 = n;
        if (n.name === 'palm2') OOI.palm2 = n;
        if (n.name === 'LF0') OOI.LF0 = n;
        if (n.name === 'MF0') OOI.MF0 = n;
        if (n.name === 'TF0') OOI.TF0 = n;

        if (n.name === 'LF1') OOI.LF1 = n;
        if (n.name === 'MF1') OOI.MF1 = n;
        if (n.name === 'TF1') OOI.TF1 = n;

        if (n.name === 'LF2') OOI.LF2 = n;
        if (n.name === 'MF2') OOI.MF2 = n;
        if (n.name === 'TF2') OOI.TF2 = n;

        if (n.name === 'LF3') OOI.LF3 = n;
        if (n.name === 'MF3') OOI.MF3 = n;
        if (n.name === 'TF3') OOI.TF3 = n;

        if (n.name === 'LF4') OOI.LF4 = n;
        if (n.name === 'MF4') OOI.MF4 = n;
        if (n.name === 'TF4') OOI.TF4 = n;

        if (n.name === 'LF5') OOI.LF5 = n;
        if (n.name === 'MF5') OOI.MF5 = n;
        if (n.name === 'TF5') OOI.TF5 = n;

        if (n.name === 'LF6') OOI.LF6 = n;
        if (n.name === 'MF6') OOI.MF6 = n;
        if (n.name === 'TF6') OOI.TF6 = n;

        if (n.name === 'LF7') OOI.LF7 = n;
        if (n.name === 'MF7') OOI.MF7 = n;
        if (n.name === 'TF7') OOI.TF7 = n;

        if (n.name === 'LF8') OOI.LF8 = n;
        if (n.name === 'MF8') OOI.MF8 = n;
        if (n.name === 'TF8') OOI.TF8 = n;

        if (n.name === 'LF9') OOI.LF9 = n;
        if (n.name === 'MF9') OOI.MF9 = n;
        if (n.name === 'TF9') OOI.TF9 = n;


        if (n.name === 'palmr1') OOI.palmr1 = n;
        if (n.name === 'palmr2') OOI.palmr2 = n;
        if (n.name === 'LFR0') OOI.LFR0 = n;
        if (n.name === 'MFR0') OOI.MFR0 = n;
        if (n.name === 'TFR0') OOI.TFR0 = n;

        if (n.name === 'LFR1') OOI.LFR1 = n;
        if (n.name === 'MFR1') OOI.MFR1 = n;
        if (n.name === 'TFR1') OOI.TFR1 = n;

        if (n.name === 'LFR2') OOI.LFR2 = n;
        if (n.name === 'MFR2') OOI.MFR2 = n;
        if (n.name === 'TFR2') OOI.TFR2 = n;

        if (n.name === 'LFR3') OOI.LFR3 = n;
        if (n.name === 'MFR3') OOI.MFR3 = n;
        if (n.name === 'TFR3') OOI.TFR3 = n;

        if (n.name === 'LFR4') OOI.LFR4 = n;
        if (n.name === 'MFR4') OOI.MFR4 = n;
        if (n.name === 'TFR4') OOI.TFR4 = n;

        if (n.name === 'LFR5') OOI.LFR5 = n;
        if (n.name === 'MFR5') OOI.MFR5 = n;
        if (n.name === 'TFR5') OOI.TFR5 = n;

        if (n.name === 'LFR6') OOI.LFR6 = n;
        if (n.name === 'MFR6') OOI.MFR6 = n;
        if (n.name === 'TFR6') OOI.TFR6 = n;

        if (n.name === 'LFR7') OOI.LFR7 = n;
        if (n.name === 'MFR7') OOI.MFR7 = n;
        if (n.name === 'TFR7') OOI.TFR7 = n;

        if (n.name === 'LFR8') OOI.LFR8 = n;
        if (n.name === 'MFR8') OOI.MFR8 = n;
        if (n.name === 'TFR8') OOI.TFR8 = n;

        if (n.name === 'LFR9') OOI.LFR9 = n;
        if (n.name === 'MFR9') OOI.MFR9 = n;
        if (n.name === 'TFR9') OOI.TFR9 = n;


        //if (n.name === 'armchair') OOI.armchair = n;
    });

    // *******************************Hands
    const localVideo = document.getElementById("user-1");

    useEffect(()=>{
        const init = async()=>
        {
            handLandMarks = await MediapipeHandsService.get3DHandLandmarks();
            modelLoaded = true;
        }
        init();
    },[]);

    useFrame(({clock}, delta)=>{
        const t = clock.getElapsedTime();
        if (localVideo.currentTime > 0 && modelLoaded)
        {

            // peer user animation => then check if user joined
            if(avatar.current){
                avatar.current.update(delta);

                //avatar.current.expressionManager.setValue('aa', Math.sin((t / 2) * Math.PI));

                if (Math.round(t * 3) % 10 === 0) {
                    avatar.current.expressionManager.setValue('blink', 1 - Math.abs(Math.sin(t * 3 * Math.PI)))
                }
                if (bonesStore.upperChest) {
                    bonesStore.upperChest.rotation.y = (Math.PI / 600) * Math.sin((t / 8) * Math.PI)
                    bonesStore.spine.position.y = (Math.PI / 400) * Math.sin((t / 2) * Math.PI)
                    bonesStore.spine.position.z = (Math.PI / 600) * Math.sin((t / 2) * Math.PI)
                }
                if(bonesStore.head){
                    bonesStore.head.rotation.y = (Math.PI / 600) * 5 *Math.sin((t / 8) * Math.PI);
                }
            }


            // Local hands
            handLandMarks.estimateHands(localVideo).then((res)=>{
                if(res.length)
                {
                    handLandmarksProp(res);
                    if (res.length === 1) {
                        CreatTwo3DHands(res[0].keypoints3D, false, OOI, res[0].keypoints[0].x, res[0].keypoints[0].y,1, 1);
                    } else if (res.length === 2) {
                        CreatTwo3DHands(res[0].keypoints3D, res[1].keypoints3D, OOI, res[0].keypoints[0].x, res[0].keypoints[0].y,res[1].keypoints[0].x, res[1].keypoints[0].y);
                    }
                }else{
                    handLandmarksProp(null);
                    CreatTwo3DHands(null,null,OOI,1,1,1, 1);
                }
            });



            // Remote Hands
            if(remoteHandLandMarksProp?.value !== null)
            {
                //console.log('From Models', remoteHandLandMarksProp.value);

                if(remoteHandLandMarksProp.value.length === 1)
                {
                    CreateTwo3DRemoteHands(remoteHandLandMarksProp.value[0].keypoints3D, false, OOI, remoteHandLandMarksProp.value[0].keypoints[0].x, remoteHandLandMarksProp.value[0].keypoints[0].y,1, 1)
                }else if(remoteHandLandMarksProp.value.length === 2){
                    CreateTwo3DRemoteHands(remoteHandLandMarksProp.value[0].keypoints3D, remoteHandLandMarksProp.value[1].keypoints3D, OOI, remoteHandLandMarksProp.value[0].keypoints[0].x, remoteHandLandMarksProp.value[0].keypoints[0].y,remoteHandLandMarksProp.value[1].keypoints[0].x, remoteHandLandMarksProp.value[1].keypoints[0].y);
                }
            }else{
                //console.log("no hand");
                CreateTwo3DRemoteHands(null,null,OOI,1,1,1, 1);
            }

        }

    });

    // *******************************Hands
    return(
        <>
            <primitive object={scene} scale={1} position={[0, 0, 0]} rotation={[0, 0, 0]} />
                {/*<Html*/}
                {/*    position={[-0.4, 1.3, 1]}*/}
                {/*>*/}
                {/*    <div className="annotation">Peer User</div>*/}
                {/*</Html>*/}
            {/*</primitive>*/}
        </>
    )
}

export default ModelsVrm;