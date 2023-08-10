import * as THREE from "three";

const v0 = new THREE.Vector3();
const v1 = new THREE.Vector3();
let LF_object = new THREE.Object3D();
const LFs_on_hand = [1, 5, 9, 13, 17];

const createOneHand = (handLandmarks, OOI, horizontal,vertical, twoHands) => {
    const localVideo = document.getElementById("user-1");
    const webcam2vector = (x, y, z) => {
        return new THREE.Vector3(
            -(1.5*x + (horizontal/localVideo.videoWidth - 0.5)) - 0.1,
            -(1.5*y + (vertical/localVideo.videoHeight - 0.5)) + 1.3,
            z +.3
        )
    }

    LF_object = OOI.palm;
    v0.copy(webcam2vector(handLandmarks[1].x, handLandmarks[1].y, handLandmarks[1].z));
    v1.copy(webcam2vector(handLandmarks[9].x, handLandmarks[9].y, handLandmarks[9].z));
    LF_object.position.copy(v0);
    LF_object.lookAt(v1);
    LF_object.rotateX(Math.PI);
    LF_object.rotateZ(Math.PI/2);
    LF_object.visible = true;

    LF_object.scale.y = v0.distanceTo(v1)/1.8;
    LF_object.scale.x = v0.distanceTo(v1)/2;
    LF_object.scale.z = v0.distanceTo(v1)/2;

    for (let i = 0; i < 5; i++) {

        v0.copy(webcam2vector(handLandmarks[LFs_on_hand[i]].x, handLandmarks[LFs_on_hand[i]].y, handLandmarks[LFs_on_hand[i]].z));
        v1.copy(webcam2vector(handLandmarks[LFs_on_hand[i] + 1].x, handLandmarks[LFs_on_hand[i] + 1].y, handLandmarks[LFs_on_hand[i] + 1].z));

        LF_object = OOI[`LF${i}`];
        LF_object.position.copy(v0);
        LF_object.lookAt(v1);
        LF_object.rotateX(Math.PI / 2);

        //console.log(v0.distanceTo(v1))

        LF_object.scale.y = v0.distanceTo(v1)/4;
        LF_object.scale.x = v0.distanceTo(v1)/4;
        LF_object.scale.z = v0.distanceTo(v1)/4;

        v0.copy(webcam2vector(handLandmarks[LFs_on_hand[i] + 1].x, handLandmarks[LFs_on_hand[i] + 1].y, handLandmarks[LFs_on_hand[i] + 1].z));
        v1.copy(webcam2vector(handLandmarks[LFs_on_hand[i] + 2].x, handLandmarks[LFs_on_hand[i] + 2].y, handLandmarks[LFs_on_hand[i] + 2].z));

        LF_object = OOI[`MF${i}`];
        LF_object.position.copy(v0);
        LF_object.lookAt(v1);
        LF_object.rotateX(Math.PI / 2);

        LF_object.scale.y = v0.distanceTo(v1)/8;
        LF_object.scale.x = v0.distanceTo(v1)/9.2;
        LF_object.scale.z = v0.distanceTo(v1)/9.2;

        v0.copy(webcam2vector(handLandmarks[LFs_on_hand[i] + 2].x, handLandmarks[LFs_on_hand[i] + 2].y, handLandmarks[LFs_on_hand[i] + 2].z));
        v1.copy(webcam2vector(handLandmarks[LFs_on_hand[i] + 3].x, handLandmarks[LFs_on_hand[i] + 3].y, handLandmarks[LFs_on_hand[i] + 3].z));

        LF_object = OOI[`TF${i}`];
        LF_object.position.copy(v0);
        LF_object.lookAt(v1);
        LF_object.rotateX(Math.PI / 2);

        LF_object.scale.y = v0.distanceTo(v1)/2.5;
        LF_object.scale.x = v0.distanceTo(v1)/3;
        LF_object.scale.z = v0.distanceTo(v1)/3;
    }
}

export default createOneHand;