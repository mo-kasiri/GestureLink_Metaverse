import * as THREE from "three";
import {useThree} from "@react-three/fiber";

const v0 = new THREE.Vector3();
const v1 = new THREE.Vector3();
let LF_object = new THREE.Object3D();
const LFs_on_hand = [1, 5, 9, 13, 17];

const createOneHand = (handLandmarks, OOI, width, height,vertical, horizental) => {
    const webcam2vector = (x, y, z) => {
        return new THREE.Vector3(
            -((x/width) - 0.5) - 0.2,
            -((y/height) - 0.5) + 1,
            z
        )
    }

    for (let i = 0; i < 5; i++) {

        v0.copy(webcam2vector(handLandmarks[LFs_on_hand[i]].x, handLandmarks[LFs_on_hand[i]].y, 0.2));
        v1.copy(webcam2vector(handLandmarks[LFs_on_hand[i] + 1].x, handLandmarks[LFs_on_hand[i] + 1].y, 0.2));

        LF_object = OOI[`LF${i}`];
        LF_object.position.copy(v0);
        LF_object.lookAt(v1);
        LF_object.rotateX(Math.PI / 2);

        //console.log(v0.distanceTo(v1))

        LF_object.scale.y = v0.distanceTo(v1)/5;
        LF_object.scale.x = v0.distanceTo(v1)/5;
        LF_object.scale.z = v0.distanceTo(v1)/5;

        if(v0.distanceTo(v1)/5 < 0.01)
        {
            LF_object.scale.y = 0.01;
            LF_object.scale.x = 0.01;
            LF_object.scale.z = 0.01;
        }

        v0.copy(webcam2vector(handLandmarks[LFs_on_hand[i] + 1].x, handLandmarks[LFs_on_hand[i] + 1].y+10, 0.2));
        v1.copy(webcam2vector(handLandmarks[LFs_on_hand[i] + 2].x, handLandmarks[LFs_on_hand[i] + 2].y+10, 0.2));

        LF_object = OOI[`MF${i}`];
        LF_object.position.copy(v0);
        LF_object.lookAt(v1);
        LF_object.rotateX(Math.PI / 2);

        LF_object.scale.y = v0.distanceTo(v1)/8;
        LF_object.scale.x = v0.distanceTo(v1)/9;
        LF_object.scale.z = v0.distanceTo(v1)/9;

        if(v0.distanceTo(v1) < 0.02)
        {
            LF_object.scale.y = 0.005;
            LF_object.scale.x = 0.005;
            LF_object.scale.z = 0.005;
        }

        v0.copy(webcam2vector(handLandmarks[LFs_on_hand[i] + 2].x, handLandmarks[LFs_on_hand[i] + 2].y+8, 0.2));
        v1.copy(webcam2vector(handLandmarks[LFs_on_hand[i] + 3].x, handLandmarks[LFs_on_hand[i] + 3].y+8, 0.2));

        LF_object = OOI[`TF${i}`];
        LF_object.position.copy(v0);
        LF_object.lookAt(v1);
        LF_object.rotateX(Math.PI / 2);

        LF_object.scale.y = v0.distanceTo(v1) /3;
        LF_object.scale.x = v0.distanceTo(v1) /3;
        LF_object.scale.z = v0.distanceTo(v1) /3;
    }
}

export default createOneHand;