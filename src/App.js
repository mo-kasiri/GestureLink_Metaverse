// Components for render
import './App.css'
import * as THREE from 'three';
import {Canvas} from '@react-three/fiber';
import {useEffect, useRef, useState} from "react";
import { Perf } from "r3f-perf";
import LoginForm from "./components/login-page/LoginForm.jsx";
import Errors from "./components/universal-components/Errors.jsx";
import Navbar from "./components/universal-components/Navbar.jsx";

//import Webrtc from "./components/Webrtc.jsx";
import ChannelForm from "./components/login-page/ChannelForm.jsx";

// Services
import AgoraConnection from "./services/AgoraConnection.jsx";
import LocalStream from "./components/computer-vision/LocalStream.jsx";
//import Peer2PeerChatForm from "./components/handling-messages/Peer2PeerChatForm.jsx";
import CallModal from "./components/universal-components/CallModal.jsx";
import SimplePeerServices from "./services/SimplePeerServices.jsx";
import IncomingCallModal from "./components/universal-components/IncomingCallModal.jsx";
import Environment from "./components/webGL/Environment.jsx";
// import Mediapipe2DHands from "./components/computer-vision/Mediapipe2DHands.jsx";
// import Mediapipe3DHands from "./components/computer-vision/Mediapipe3DHands.jsx";
// import Models from "./components/webGL/Models.jsx";
import {PointerLockControls} from "@react-three/drei";
import ModelsVrm from "./components/webGL/ModelsVrm";

let channel;
let localHandLandmarks = [null];
let remoteHandLandmarks = {value: false};
let localCameraDirection = new THREE.Vector3();
let remoteCameraDirection = new THREE.Vector3();

function App() {

  const [error, setError] = useState({message:'',peerID:''});
  //const [channelMessage, setChannelMessage] = useState({text:''});
  const [chatMessages, setChatMessages] = useState([]);
  const [isLoggedIn, setIslogedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [localInfo, setLocalInfo] = useState({ID: 0, channel: '', peerID: 0});
  const [incommingCallInfo, setIncommingCallInfo] = useState({stat: false, localID:0, peerID: 0});
  const [callerSignal, setCallerSignal] = useState();
  const [calleeSignal, setCalleeSignal] = useState(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const [userJoined2SocialVR, setUserJoined2SocialVR] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);



  function pointerlockchange() {
    console.log(showInstructions);
    setShowInstructions(!showInstructions);
  }

  useEffect(() => {
    document.addEventListener('pointerlockchange', pointerlockchange, false)
    return () => {
      document.removeEventListener('pointerlockchange', pointerlockchange, false)
    }
  })

  const peerVideoTag = useRef(null);

  //console.log('app called');


  const cancelErrorMsg = ()=>{
    setError({...error, message: ''});
  }


  // Login to the Agora server first
  const loginPressed = async (uid)=>{

    // Connect to the agora server and login the user
    await AgoraConnection.connect2agora(uid);

    let client = AgoraConnection.getClient();
    if(client.connectionState === "CONNECTED")
    {
      setError({
        message: {
          head: 'Login successful,',
          content: 'now enter your channel name'
        }
        , type:'success'});
      setIslogedIn(true);
      setIsLoading(false);
      setLocalInfo({...localInfo, ID: uid});
    }else{
      setIsLoading(false);
      //console.log(isLoading);
      setError({
        message: {
          head: 'Login failed,',
          content: 'please check your internet then try again'
        }
        , type:'danger'});
    }
    console.log(client);
  }

  // When a user is Logged in let them join a channel
  const joinPressed = async (chn) => {
    await AgoraConnection.createChannel(chn);
    await AgoraConnection.joinChannel();
    channel = AgoraConnection.getChannel();

    await AgoraConnection.getMembers().then((members)=>{
      //console.log('this are members in the channel', members);
      if(members.length > 1){
        setLocalInfo({...localInfo, peerID: parseInt(members[1]), channel: chn});
        setTimeout(()=>{
          setError({
            message: {
              head: `Member ${members[1]} is in your channel,`,
              content: 'you can call them'
            }
            , type:'warning'})
        }, 5000);
      }
    });


    channel.on('MemberJoined',(memberId)=>{
      setError({
        message: {
          head: `Member ${memberId} Joined,`,
          content: 'a new member joined the channel you can call them'
        }
        , type:'warning'});
      //console.log('A member Joined the channel,:',memberId);
      setLocalInfo({...localInfo, peerID: memberId, channel: chn});
    });

    channel.on('MemberLeft', (memberId)=>{
      //console.log('A member Joined the channel,:',memberId);
      AgoraConnection.getMembers().then((members)=>{
        if(members.length > 1){
          setLocalInfo({...localInfo, peerID: memberId, channel: chn});
        }else{
          setError({
            message: {
              head: `Member ${memberId} Left,`,
              content: 'no one can hear you; ask a peer to join your channel'
            }
            , type:'warning'});
          setLocalInfo({...localInfo, channel: chn});
        }
      })
    });

    setError({
      message: {
        head: `Joining to ${chn} channel successful,`,
        content: 'Ask a peer to join your channel'
      }
      , type:'success'});
    setIsJoined(true);
    setIsLoading(false);
    //setLocalInfo({...localInfo, channel: chn});


    let client = AgoraConnection.getClient();
    console.log(client);


    client.on('MessageFromPeer',(message, memberId) =>{
      let originalMessage;

      if(message.text.length > 1000){
        //console.log('length:', message.text.length);
        originalMessage = JSON.parse(message.text);
        if(originalMessage?.type === 'offer')
        {
          console.log('WebRTCOffer comes: ', originalMessage, memberId);
          setIncommingCallInfo({stat: true, localID: localInfo?.ID, remoteID: memberId});
          setCallerSignal(originalMessage);
        }
      }else
      {
        console.log('Message from peer', message.text, memberId);
        setChatMessages(arr => [...arr, {message: message.text, ID: memberId}]);
      }
    });
  }

  const onMessageChange = async (msg)=>{
    console.log('handleChannelMsg called!', msg);
    console.log(localInfo.ID);
    setChatMessages(arr => [...arr, {message: msg.message, ID: localInfo.ID}]);
    console.log(chatMessages);

    await AgoraConnection.sendMessage2peer(msg.message, msg.remoteId);
  }


  // This part is for the Caller
  const call_a_User = async (peerid)=>{

    console.log(peerid);

    const caller = await SimplePeerServices.createInitiatorPeer();
    caller.on("signal", (data)=>{
      // Set memberId to 0 as an indicator of asking for Social VR
      AgoraConnection.sendMessage2peer({userToCall: peerid, signalData: data, from: localInfo?.ID},0).then((res)=>{

      });
    });




    caller.on("stream", stream => {
      //console.log('peer stream on the caller side***********: ', stream);
      peerVideoTag.current.srcObject = stream;
      peerVideoTag.current.play().then(()=>{

        console.log('Receiving Media successful');
        setUserJoined2SocialVR(true);
        setCallAccepted(true);

      }).catch(e => console.log('play video error:', e));
    });

    // caller.on('close', ()=>{
    //   caller.destroy();
    //   console.log('*************inside close connection closed');
    // });

    caller.on('error', (err)=>{
      // console.log(err);
      // console.log(typeof err);
      // console.log(Object.keys(err));
      // console.log(err.code);
      //RTCError: User-Initiated Abort, reason=Close called
      if(err.code ===  'ERR_DATA_CHANNEL'){
        console.log('the exact error');
        setError({
          message: {
            head: 'Peer user left the chat,',
            content: 'no one can hear you; call a peer to join social VR'
          }
          , type:'warning'});
        setUserJoined2SocialVR(false);
        setTimeout(()=>{
          window.location.reload();
        },8000);
        //setCallAccepted(false);
      }
    });



    caller.on('connect', ()=>{
        console.log('the connect message has been sent2');
        setInterval(()=>{
                                              //<======================================================= Sending Data Incoming call
          if(localHandLandmarks[0] !== false && caller.writable){
            caller.send(JSON.stringify({cameraDir: localCameraDirection,value:localHandLandmarks}));
          }else if(caller.writable){
            caller.send(JSON.stringify({cameraDir: localCameraDirection, value : false}));
          }
        },20);
    });


    caller.on('data',(data) => {
      //console.log(JSON.parse(data));  // <**************************************************************************** Receiving Data incomingCall
      if(JSON.parse(data).value !== false) {
        remoteHandLandmarks.value = JSON.parse(data).value;
        if(JSON.parse(data).cameraDir?.x){
          remoteCameraDirection.copy(JSON.parse(data).cameraDir);
        }

      }else{
        remoteHandLandmarks.value = false;
        if(JSON.parse(data).cameraDir?.x){
          remoteCameraDirection.copy(JSON.parse(data).cameraDir);
        }
      }
    });

    console.log('this is calleeSignal***********', calleeSignal);

    let client = AgoraConnection.getClient();

    client.on('MessageFromPeer',(message, memberId)=>{

      let originalMessage;

      if(message.text.length > 1000){
        originalMessage = JSON.parse(message.text);
        if(originalMessage.type === 'answer'){
          console.log('this is callee signal from connect2SocialVR', originalMessage);
          caller.signal(originalMessage);
        }
      }
    })
  }


  // This part is for the callee
  const incommingCall = async (answer)=>{
    if(answer === 'accepted'){
      setCallAccepted(true)
      //incommingCallInfo(...incommingCallInfo, incommingCallInfo.stat =  false);
      setIncommingCallInfo({...incommingCallInfo, stat: false})
      const localPeer = await SimplePeerServices.createPeer();

      localPeer.on("signal", (data)=>{

        AgoraConnection.sendMessage2peer({userToCall: incommingCallInfo.remoteID, signalData: data, from: localInfo?.ID},0);
      });

      localPeer.on("stream", stream => {
        console.log('peer stream: ', stream);
        peerVideoTag.current.srcObject = stream;

        peerVideoTag.current.play().then(()=>{

          console.log('Receiving Media successful');
          setUserJoined2SocialVR(true);

        }).catch(e => console.log('play video error:', e));
      });

      localPeer.on('error', (err)=>{
        // console.log(err);
        // console.log(typeof err);
        // console.log(Object.keys(err));
        // console.log(err.code);
        //RTCError: User-Initiated Abort, reason=Close called
        if(err.code ===  'ERR_DATA_CHANNEL'){
          console.log('the exact error');
          setError({
            message: {
              head: 'Peer user left the chat,',
              content: 'no one can hear you; call a peer to join social VR'
            }
            , type:'warning'});
          setUserJoined2SocialVR(false);
          setCallAccepted(false);
        }
      });

      // localPeer.on('close', ()=>{
      //   localPeer.destroy();
      //   console.log('*************inside close connection closed');
      // })

      localPeer.on('data',data => {

          //console.log(JSON.parse(data)); // <**************************************************************************** Receiving Data incomingCall
          if(JSON.parse(data).value !== false)
          {
            remoteHandLandmarks.value = JSON.parse(data).value;
            if(JSON.parse(data).cameraDir?.x){
              remoteCameraDirection.copy(JSON.parse(data).cameraDir);
            }
          }else{
            remoteHandLandmarks.value = false;
            if(JSON.parse(data).cameraDir?.x){
              remoteCameraDirection.copy(JSON.parse(data).cameraDir);
              //console.log(remoteCameraDirection);
            }
          }
      });

      localPeer.on('connect', ()=> {
        console.log('the connect message has been sent2');

          setInterval(()=> {
                                                  //<======================================================= Sending Data Incomming call
            if(localHandLandmarks[0] !== false && localPeer.writable){
              localPeer.send(JSON.stringify({cameraDir: localCameraDirection,value: localHandLandmarks}));
            }else if(localPeer.writable){
              localPeer.send(JSON.stringify({cameraDir: localCameraDirection, value : false}));
            }
          },20);
      });

      localPeer.signal(callerSignal);

    }else if(answer === 'rejected'){
      console.log('Call Rejected');
    }
  }

  const handLandmarksPropHandle = (handLandmarks) =>{

    if(handLandmarks !== false){
      localHandLandmarks = handLandmarks;
    }else{
      localHandLandmarks = [false];
    }
  }

  const handleCameraDirection  = (cameraDirection)=>{
    localCameraDirection.copy(cameraDirection);
  }

  return (
      <>
        <LocalStream/>
        <video hidden={true} ref={peerVideoTag} className="video-player" id="user-2" autoPlay playsInline></video>

        <IncomingCallModal incommingCallInfo={incommingCallInfo} incommingCall={incommingCall}/>

        {isJoined && <CallModal call_a_User={call_a_User} callAccepted={callAccepted}/>}
        <Navbar localInfo={localInfo}/>
        {error.message && <Errors message={error?.message} type={error?.type} cancelErrorMsg={cancelErrorMsg}/>}
        {!isLoggedIn && <LoginForm loading={isLoading} loginPressed={loginPressed}/>}
        {isLoggedIn && !isJoined && <ChannelForm loading={isLoading} joinPressed={joinPressed}/>}
        {/*{isJoined && <Peer2PeerChatForm chatMessages={chatMessages} localInfo={localInfo} onMessageChange={onMessageChange} call_a_User={call_a_User}/>}*/}


        {isJoined && <Canvas style={{
          position: 'fixed',
          marginRight: 'auto',
          marginLeft: 'auto',
          left: 0,
          top: 0,
          textAlign: 'center',
          zIndex: 9,
          width: '100%',
          height: '100%'
        }}>
          <Environment/>
          <PointerLockControls selector="#PointerLockBtn"/>
          {/*<Models userJoined={userJoined2SocialVR} handLandmarksProp={handLandmarksPropHandle} remoteHandLandMarksProp={remoteHandLandmarks}/>*/}
          <ModelsVrm
              userJoined={userJoined2SocialVR}
              handLandmarksProp={handLandmarksPropHandle}
              remoteHandLandMarksProp={remoteHandLandmarks}
              cameraDirection={handleCameraDirection}
              remoteCameraDirection={remoteCameraDirection}
          />
          {/*<Perf position='top-right' style={{top:80}}/>*/}
        </Canvas>}

        {isJoined &&
          <button type='button' className={showInstructions ? 'show btn btn-outline-secondary' : 'hide btn btn-outline-secondary'} id="PointerLockBtn">Click to enable Immersive Mode</button>
        }
      </>
  )
}

export default App
