import {OrbitControls, useAnimations, Sky} from "@react-three/drei";
import {Perf} from "r3f-perf";
import { useThree } from "@react-three/fiber";
import * as THREE from 'three'

//console.log(useThree)

// components
import Models from "./models/Models.jsx";
import {useEffect} from "react";

const Environment = () =>{
    const {scene, camera} = useThree();

    useEffect(()=>{
        camera.position.set(0.9728517749133652, 1.1044765132727201, 0.7316689528482836);
        camera.lookAt(scene.position);
    },[])

    return(<>


        {/* Lights */}
        <ambientLight intensity={1.5}/>
        <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />
        <Perf position='top-left'/>
    </>)
}

export default Environment;
