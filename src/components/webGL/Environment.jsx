import {OrbitControls, Sky,PointerLockControls, useHelper} from '@react-three/drei';
import {useRef} from 'react';
import {DirectionalLightHelper, PointLight,PointLightHelper} from "three";
import {useFrame} from "@react-three/fiber";
import * as THREE from "three";

const Environment = () => {

    const pointLight = useRef(null);
    useHelper(pointLight,PointLightHelper, 0.5, "blue");
    const points = [];
    points.push(new THREE.Vector3(-10, 0, 0));
    points.push(new THREE.Vector3(0, 10, 0));
    points.push(new THREE.Vector3(10, 0, 0));

    return(
        <>
            <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />
            {/*<pointLight ref={pointLight} position={[-0.2,1.5,-0.8]} intensity={7} color="#fff"/>*/}
            <ambientLight intensity={5}/>
            {/*<axesHelper args={[2, 2, 2]} />*/}
            {/*<primitive object={new THREE.AxesHelper(10)} />*/}
            {/*<OrbitControls makeDefault/>*/}
        </>
    )
}

export default Environment;
