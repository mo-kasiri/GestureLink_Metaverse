import * as THREE from "three";



const v0 = new THREE.Vector3();
const v1 = new THREE.Vector3();
let LF_object = new THREE.Object3D();

const webcam2vector = (x, y, z) => {
    return new THREE.Vector3(
        -(x - 0.5),
        -(y - 0.5),
        (z - 0.5)
    )
}

const LFs_on_hand = [1, 5, 9, 13, 17];
const createTwoHands = (handLandmarks, OOI) => {

    for (let i = 0; i < 10; i++) {

        if (i < 5) {
            v0.copy(webcam2vector(handLandmarks.hands[0][LFs_on_hand[i]].x, handLandmarks.hands[0][LFs_on_hand[i]].y - 1, handLandmarks.hands[0][LFs_on_hand[i]].z + 0.8));
            v1.copy(webcam2vector(handLandmarks.hands[0][LFs_on_hand[i] + 1].x, handLandmarks.hands[0][LFs_on_hand[i] + 1].y - 1, handLandmarks.hands[0][LFs_on_hand[i] + 1].z + 0.8));

            LF_object = OOI[`LF${i}`];
            LF_object.position.copy(v0);
            LF_object.lookAt(v1);
            LF_object.rotateX(Math.PI / 2);



            v0.copy(webcam2vector(handLandmarks.hands[0][LFs_on_hand[i] + 1].x, handLandmarks.hands[0][LFs_on_hand[i] + 1].y - 1, handLandmarks.hands[0][LFs_on_hand[i] + 1].z + 0.8));
            v1.copy(webcam2vector(handLandmarks.hands[0][LFs_on_hand[i] + 2].x, handLandmarks.hands[0][LFs_on_hand[i] + 2].y - 1, handLandmarks.hands[0][LFs_on_hand[i] + 2].z + 0.8));

            LF_object = OOI[`MF${i}`];
            LF_object.position.copy(v0);
            LF_object.lookAt(v1);
            LF_object.rotateX(Math.PI / 2);

            v0.copy(webcam2vector(handLandmarks.hands[0][LFs_on_hand[i] + 2].x, handLandmarks.hands[0][LFs_on_hand[i] + 2].y - 1, handLandmarks.hands[0][LFs_on_hand[i] + 2].z + 0.8));
            v1.copy(webcam2vector(handLandmarks.hands[0][LFs_on_hand[i] + 3].x, handLandmarks.hands[0][LFs_on_hand[i] + 3].y - 1, handLandmarks.hands[0][LFs_on_hand[i] + 3].z + 0.8));

            LF_object = OOI[`TF${i}`];
            LF_object.position.copy(v0);
            LF_object.lookAt(v1);
            LF_object.rotateX(Math.PI / 2);

        } else if (i => 5) {
            v0.copy(webcam2vector(handLandmarks.hands[1][LFs_on_hand[i - 5]].x, handLandmarks.hands[1][LFs_on_hand[i - 5]].y - 1, handLandmarks.hands[1][LFs_on_hand[i - 5]].z + 0.8));
            v1.copy(webcam2vector(handLandmarks.hands[1][LFs_on_hand[i - 5] + 1].x, handLandmarks.hands[1][LFs_on_hand[i - 5] + 1].y - 1, handLandmarks.hands[1][LFs_on_hand[i - 5] + 1].z + 0.8));

            LF_object = OOI[`LF${i}`];
            LF_object.position.copy(v0);
            LF_object.lookAt(v1);
            LF_object.rotateX(Math.PI / 2);

            v0.copy(webcam2vector(handLandmarks.hands[1][LFs_on_hand[i - 5] + 1].x, handLandmarks.hands[1][LFs_on_hand[i - 5] + 1].y - 1, handLandmarks.hands[1][LFs_on_hand[i - 5] + 1].z + 0.8));
            v1.copy(webcam2vector(handLandmarks.hands[1][LFs_on_hand[i - 5] + 2].x, handLandmarks.hands[1][LFs_on_hand[i - 5] + 2].y - 1, handLandmarks.hands[1][LFs_on_hand[i - 5] + 2].z + 0.8));

            LF_object = OOI[`MF${i}`];
            LF_object.position.copy(v0);
            LF_object.lookAt(v1);
            LF_object.rotateX(Math.PI / 2);

            v0.copy(webcam2vector(handLandmarks.hands[1][LFs_on_hand[i - 5] + 2].x, handLandmarks.hands[1][LFs_on_hand[i - 5] + 2].y - 1, handLandmarks.hands[1][LFs_on_hand[i - 5] + 2].z + 0.8));
            v1.copy(webcam2vector(handLandmarks.hands[1][LFs_on_hand[i - 5] + 3].x, handLandmarks.hands[1][LFs_on_hand[i - 5] + 3].y - 1, handLandmarks.hands[1][LFs_on_hand[i - 5] + 3].z + 0.8));

            LF_object = OOI[`TF${i}`];
            LF_object.position.copy(v0);
            LF_object.lookAt(v1);
            LF_object.rotateX(Math.PI / 2);
        }
    }
}

export default createTwoHands;