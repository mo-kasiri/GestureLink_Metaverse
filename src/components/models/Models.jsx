import { useFrame, useLoader,useThree } from '@react-three/fiber';
import {TransformControls,OrbitControls,useGLTF} from "@react-three/drei";
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import {useEffect, useMemo, useRef, useState} from 'react';
import {CCDIKSolver, CCDIKHelper} from 'three/examples/jsm/animation/CCDIKSolver.js'

const Models = ({modelPosition}) =>{
    let orbitControlTarget = new THREE.Vector3();
    const OOI ={};
    let IKSolver;

    const Model = ()=>{
        let conf = {
            followSphere: true,
            turnHead: true,
            turnSpine: true,
            ik_solver: true
        }

        const orbitControlRef = useRef();

        const v0 = new THREE.Vector3();
        const v1 = new THREE.Vector3();
        const { scene } = useGLTF('./models/kira.glb');


        scene.traverse(n => {
            if (n.name === 'head') OOI.head = n;
            if (n.name === 'lowerarm_l') OOI.lowerarm_l = n;
            if (n.name === 'Upperarm_l') OOI.Upperarm_l = n;
            if (n.name === 'hand_l') OOI.hand_l = n;
            if (n.name === 'Clavicle_l') OOI.clavicle = n;
            if (n.name === 'target_hand_l') OOI.target_hand_l = n;

            if (n.name === 'boule') OOI.sphere = n;
            if (n.name === 'Kira_Shirt_left') OOI.kira = n;
            if (n.name === 'armchair') OOI.armchair = n;
        });

        OOI.sphere.visible = false;
        OOI.armchair.getWorldPosition(orbitControlTarget);
        orbitControlTarget.setY(1);

        // IK and skeletons
        //OOI.kira.add(OOI.kira.skeleton.bones[0]);
        const iks = [
            {
                target: 22, // "target_hand_l"
                effector: 5, // Owner "hand_l"
                links: [
                    {
                        index: 5, // "lowerarm_l"
                        //rotationMax: new THREE.Vector3(2 *Math.PI, 2 *Math.PI, 2 *Math.PI),
                        //rotationMin: new THREE.Vector3(-2 *Math.PI, -2 *Math.PI, -2 *Math.PI)
                        //rotationMin: new THREE.Vector3(-0.21125239318290628, 0.524248101291266, -2.65842740258269),
                        //rotationMax: new THREE.Vector3(0.00005379427024330693, -0.3644661700502669, -0.00006362150192408478)
                    },
                    {
                        index: 4, // "Upperarm_l"
                        //rotationMin: new THREE.Vector3(Math.PI/5, 0, -Math.PI/1.7),
                        //rotationMax: new THREE.Vector3(Math.PI/5, 0, -Math.PI/1.7)
                        //rotationMin: new THREE.Vector3( 0, - Math.PI/2, -Math.PI/1.6),
                        //rotationMax: new THREE.Vector3( 1.2 * Math.PI, Math.PI/2, Math.PI/2 )
                    }
                ],
            }
        ];
        IKSolver = new CCDIKSolver(OOI.kira, iks);
        const ccdikhelper = new CCDIKHelper( OOI.kira, iks, 0.01 );
        scene.add(ccdikhelper);



        useFrame(()=>{
            //console.log(modelPosition);
            if ( OOI.head && OOI.sphere && conf.turnHead ) {

                // turn head
                //OOI.hand_l.getWorldPosition( v0 );
                //OOI.head.lookAt( v0 );
                //OOI.head.rotation.set( OOI.head.rotation.x, OOI.head.rotation.y + Math.PI, OOI.head.rotation.z );
            }

            // updating hand from camera
            if(modelPosition.handOne.length){

                // hand_marker: 0
                v1.copy(modelPosition.handOne[0])
                v1.y = (modelPosition.handOne[0].x - 0.3);
                v1.x = (modelPosition.handOne[0].y - 0.5);
                v1.z = -0.09 * (modelPosition.handOne[0].z - 0.5);
                //v1.z= 0;
                OOI.target_hand_l.position.copy(v1);

                //OOI.target_hand_l.position.z += 0.01;
                //console.log(OOI.target_hand_l.position);

            }else{
                v1.x = 0.3886355439737091;
                v1.y = 0.007019885324916857;
                v1.z = 0.1375772120304787;
                OOI.target_hand_l.position.copy(v1);
                //console.log(OOI.target_hand_l);
            }

            if ( conf.ik_solver ) {
                IKSolver?.update();
            }
        })


        return(
            <>
                <TransformControls object={OOI.target_hand_l}  mode="translate"/>
                <OrbitControls ref={orbitControlRef} makeDefault maxDistance={1.5} target={orbitControlTarget}/>
                <primitive object={scene} scale={1} position={[0,0,0]} rotation={[0,0,0]}/>
            </>
        )
    }


    return(
        <>
            <Model/>
        </>
    )
}

export default Models;
