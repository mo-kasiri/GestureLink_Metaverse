import * as THREE from "three";

const v0 = new THREE.Vector3();
const v1 = new THREE.Vector3();
let LF_object = new THREE.Object3D();
const LFs_on_hand = [1, 5, 9, 13, 17];

const CreatTwo3DHands = (handLandmarks1,handLandmarks2, OOI, horizontal1,vertical1, horizontal2, vertical2)=>{

    const localVideo = document.getElementById("user-1");

    const webcam2vector = (x, y, z, horizontal, vertical) => {
        return new THREE.Vector3(
            (x*1.5 + (horizontal/localVideo.videoWidth - 0.5)) - 0.2,
            -(y*1.5 + (vertical/localVideo.videoHeight - 0.5)) + 1.3,
            -z - 1.4
        )
    }

    for (let i = 0; i < 10; i++) {
        if(handLandmarks1 === null){
            OOI[`LF${i}`].visible = false;
            OOI[`MF${i}`].visible = false;
            OOI[`TF${i}`].visible = false;
            OOI.palm1.visible = false;
            OOI.palm2.visible = false;
        } else if (i < 5) {
            LF_object = OOI.palm1;
            v0.copy(webcam2vector(handLandmarks1[1].x, handLandmarks1[1].y, handLandmarks1[1].z, horizontal1, vertical1));
            v1.copy(webcam2vector(handLandmarks1[9].x, handLandmarks1[9].y, handLandmarks1[9].z, horizontal1, vertical1));
            LF_object.position.copy(v0);
            LF_object.lookAt(v1);
            LF_object.rotateX(Math.PI);
            LF_object.rotateZ(Math.PI/2);

            LF_object.scale.y = v0.distanceTo(v1)/1.8;
            LF_object.scale.x = v0.distanceTo(v1)/2;
            LF_object.scale.z = v0.distanceTo(v1)/2;


            v0.copy(webcam2vector(handLandmarks1[LFs_on_hand[i]].x, handLandmarks1[LFs_on_hand[i]].y, handLandmarks1[LFs_on_hand[i]].z, horizontal1, vertical1));
            v1.copy(webcam2vector(handLandmarks1[LFs_on_hand[i] + 1].x, handLandmarks1[LFs_on_hand[i] + 1].y, handLandmarks1[LFs_on_hand[i] + 1].z, horizontal1, vertical1));

            LF_object = OOI[`LF${i}`];
            LF_object.position.copy(v0);
            LF_object.lookAt(v1);
            LF_object.rotateX(Math.PI / 2);
            LF_object.rotateY(Math.PI / 2);

            LF_object.scale.y = v0.distanceTo(v1)/4;
            LF_object.scale.x = v0.distanceTo(v1)/4;
            LF_object.scale.z = v0.distanceTo(v1)/4;


            v0.copy(webcam2vector(handLandmarks1[LFs_on_hand[i] + 1].x, handLandmarks1[LFs_on_hand[i] + 1].y, handLandmarks1[LFs_on_hand[i] + 1].z, horizontal1, vertical1));
            v1.copy(webcam2vector(handLandmarks1[LFs_on_hand[i] + 2].x, handLandmarks1[LFs_on_hand[i] + 2].y, handLandmarks1[LFs_on_hand[i] + 2].z, horizontal1, vertical1));

            LF_object = OOI[`MF${i}`];
            LF_object.position.copy(v0);
            LF_object.lookAt(v1);
            LF_object.rotateX(Math.PI / 2);
            LF_object.rotateY(Math.PI / 2);

            LF_object.scale.y = v0.distanceTo(v1)/8;
            LF_object.scale.x = v0.distanceTo(v1)/9.2;
            LF_object.scale.z = v0.distanceTo(v1)/9.2;


            v0.copy(webcam2vector(handLandmarks1[LFs_on_hand[i] + 2].x, handLandmarks1[LFs_on_hand[i] + 2].y, handLandmarks1[LFs_on_hand[i] + 2].z, horizontal1, vertical1));
            v1.copy(webcam2vector(handLandmarks1[LFs_on_hand[i] + 3].x, handLandmarks1[LFs_on_hand[i] + 3].y, handLandmarks1[LFs_on_hand[i] + 3].z, horizontal1, vertical1));

            LF_object = OOI[`TF${i}`];
            LF_object.position.copy(v0);
            LF_object.lookAt(v1);
            LF_object.rotateX(Math.PI / 2);
            LF_object.rotateY(Math.PI / 2);

            LF_object.scale.y = v0.distanceTo(v1)/2.5;
            LF_object.scale.x = v0.distanceTo(v1)/3;
            LF_object.scale.z = v0.distanceTo(v1)/3;

            OOI[`LF${i}`].visible = true;
            OOI[`MF${i}`].visible = true;
            OOI[`TF${i}`].visible = true;
            OOI.palm1.visible = true;

        } else if (i => 5) {
            LF_object = OOI.palm2;
            v0.copy(webcam2vector(handLandmarks2[1]?.x, handLandmarks2[1]?.y, handLandmarks2[1]?.z, horizontal2, vertical2));
            v1.copy(webcam2vector(handLandmarks2[9]?.x, handLandmarks2[9]?.y, handLandmarks2[9]?.z, horizontal2, vertical2));
            LF_object.position.copy(v0);
            LF_object.lookAt(v1);
            LF_object.rotateX(Math.PI);
            LF_object.rotateZ(Math.PI/2);

            LF_object.scale.y = v0.distanceTo(v1)/1.8;
            LF_object.scale.x = v0.distanceTo(v1)/2;
            LF_object.scale.z = v0.distanceTo(v1)/2;


            v0.copy(webcam2vector(handLandmarks2[LFs_on_hand[i - 5]]?.x, handLandmarks2[LFs_on_hand[i - 5]]?.y, handLandmarks2[LFs_on_hand[i - 5]]?.z, horizontal2, vertical2));
            v1.copy(webcam2vector(handLandmarks2[LFs_on_hand[i - 5] + 1]?.x, handLandmarks2[LFs_on_hand[i - 5] + 1]?.y, handLandmarks2[LFs_on_hand[i - 5] + 1]?.z, horizontal2, vertical2));

            LF_object = OOI[`LF${i}`];
            LF_object.position.copy(v0);
            LF_object.lookAt(v1);
            LF_object.rotateX(Math.PI / 2);
            LF_object.rotateY(Math.PI / 2);

            LF_object.scale.y = v0.distanceTo(v1)/4;
            LF_object.scale.x = v0.distanceTo(v1)/4;
            LF_object.scale.z = v0.distanceTo(v1)/4;

            v0.copy(webcam2vector(handLandmarks2[LFs_on_hand[i - 5] + 1]?.x, handLandmarks2[LFs_on_hand[i - 5] + 1]?.y, handLandmarks2[LFs_on_hand[i - 5] + 1]?.z, horizontal2, vertical2));
            v1.copy(webcam2vector(handLandmarks2[LFs_on_hand[i - 5] + 2]?.x, handLandmarks2[LFs_on_hand[i - 5] + 2]?.y, handLandmarks2[LFs_on_hand[i - 5] + 2]?.z, horizontal2, vertical2));

            LF_object = OOI[`MF${i}`];
            LF_object.position.copy(v0);
            LF_object.lookAt(v1);
            LF_object.rotateX(Math.PI / 2);
            LF_object.rotateY(Math.PI / 2);

            LF_object.scale.y = v0.distanceTo(v1)/8;
            LF_object.scale.x = v0.distanceTo(v1)/9.2;
            LF_object.scale.z = v0.distanceTo(v1)/9.2;

            v0.copy(webcam2vector(handLandmarks2[LFs_on_hand[i - 5] + 2]?.x, handLandmarks2[LFs_on_hand[i - 5] + 2]?.y , handLandmarks2[LFs_on_hand[i - 5] + 2]?.z, horizontal2, vertical2));
            v1.copy(webcam2vector(handLandmarks2[LFs_on_hand[i - 5] + 3]?.x, handLandmarks2[LFs_on_hand[i - 5] + 3]?.y, handLandmarks2[LFs_on_hand[i - 5] + 3]?.z, horizontal2, vertical2));

            LF_object = OOI[`TF${i}`];
            LF_object.position.copy(v0);
            LF_object.lookAt(v1);
            LF_object.rotateX(Math.PI / 2);
            LF_object.rotateY(Math.PI / 2);

            LF_object.scale.y = v0.distanceTo(v1)/2.5;
            LF_object.scale.x = v0.distanceTo(v1)/3;
            LF_object.scale.z = v0.distanceTo(v1)/3;

            OOI[`LF${i}`].visible = true;
            OOI[`MF${i}`].visible = true;
            OOI[`TF${i}`].visible = true;
            OOI.palm2.visible = true;
        }
    }
}

export default CreatTwo3DHands;