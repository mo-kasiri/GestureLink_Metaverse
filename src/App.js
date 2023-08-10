// Components for render
import './App.css'
import {Canvas, useFrame} from '@react-three/fiber';
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
import Peer2PeerChatForm from "./components/handling-messages/Peer2PeerChatForm.jsx";
import CallModal from "./components/universal-components/CallModal.jsx";
import SimplePeerServices from "./services/SimplePeerServices.jsx";
import IncomingCallModal from "./components/universal-components/IncomingCallModal.jsx";
import Environment from "./components/webGL/Environment.jsx";
import Mediapipe2DHands from "./components/computer-vision/Mediapipe2DHands.jsx";
import Mediapipe3DHands from "./components/computer-vision/Mediapipe3DHands.jsx";
import Models from "./components/webGL/Models.jsx";
import {PointerLockControls} from "@react-three/drei";
import ModelsVrm from "./components/webGL/ModelsVrm";

let channel;
let localHandLandmarks = [null];
let remoteHandLandmarks = {value: null};

function App() {

  const [error, setError] = useState({message:'',peerID:''});
  //const [channelMessage, setChannelMessage] = useState({text:''});
  const [chatMessages, setChatMessages] = useState([]);
  const [isLoggedIn, setIslogedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isJoined, setIsJoined] = useState(true);
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

  console.log('app called');


  const cancelErrorMsg = ()=>{
    setError({...error, message: ''});
  }

  //let client;
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
      console.log(isLoading);
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
    channel.on('MemberJoined',(memberId)=>{
      console.log('A member Joined the channel,:',memberId);
      setLocalInfo({...localInfo, peerID: memberId, channel: chn});
    });

    setError({
      message: {
        head: `Joining to ${chn} channel successful,`,
        content: 'now can enter your peer ID to connect'
      }
      , type:'success'});
    setIsJoined(true);
    setIsLoading(false);
    setLocalInfo({...localInfo, channel: chn});


    let client = AgoraConnection.getClient();
    console.log(client);


    client.on('MessageFromPeer',(message, memberId) =>{
      let originalMessage;

      if(message.text.length > 1000){
        console.log('length:', message.text.length);
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
      console.log('peer stream on the caller side***********: ', stream);
      peerVideoTag.current.srcObject = stream;
      peerVideoTag.current.play().then(()=>{

        console.log('Receiving Media successful');
        setCallAccepted(true);

      }).catch(e => console.log('play video error:', e));

    });

    caller.on('connect', ()=>{
      console.log('the connect message has been sent2');
        setInterval(()=>{
          if(localHandLandmarks[0] !== null){
            caller.send(JSON.stringify(localHandLandmarks)); //<=======================================================  Sending Data call_a_user
          }else{
            caller.send(JSON.stringify(null));
          }
        },20);
    });


    caller.on('data',data => {

        //console.log(JSON.parse(data)); // <**************************************************************************** Receiving Data incommingCall
      if(JSON.parse(data) !== null)
      {
        remoteHandLandmarks.value = JSON.parse(data);
      }else{
        remoteHandLandmarks.value = null;
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

        }).catch(e => console.log('play video error:', e));
      });

      localPeer.on('data',data => {

        //console.log(JSON.parse(data)); // <**************************************************************************** Receiving Data incommingCall
          if(JSON.parse(data) !== null)
          {
            remoteHandLandmarks.value = JSON.parse(data);
          }else{
            remoteHandLandmarks.value = null;
          }
      });

      localPeer.on('connect', ()=> {
        console.log('the connect message has been sent2');

          setInterval(()=> {
            if(localHandLandmarks[0] !== null){
              //const simpleObject = {state: 1, length: true, name: 'mohammad'};
              localPeer.send(JSON.stringify(localHandLandmarks)); //<======================================================= Sending Data Incomming call
            }else{
              localPeer.send(JSON.stringify(null));
            }
          },20);
      });

      localPeer.signal(callerSignal);

    }else if(answer === 'rejected'){
      console.log('Call Rejected');
    }
  }

  const handLandmarksPropHandle = (handLandmarks) =>{
    //console.log(handLandmarks)
    if(handLandmarks !== null){
      localHandLandmarks = handLandmarks;
      //console.log('handle message function', localHandLandmarks);
    }else{
      localHandLandmarks = [null];
    }

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

          ='
          <Environment/>
          <PointerLockControls selector="#PointerLockBtn"/>
          {/*<Models userJoined={userJoined2SocialVR} handLandmarksProp={handLandmarksPropHandle} remoteHandLandMarksProp={remoteHandLandmarks}/>*/}
          <ModelsVrm userJoined={userJoined2SocialVR} handLandmarksProp={handLandmarksPropHandle} remoteHandLandMarksProp={remoteHandLandmarks}/>
          {/*<Perf position='top-right' style={{top:80}}/>*/}
        </Canvas>}

        {isJoined &&
          <button type='button' className={showInstructions ? 'show btn btn-outline-secondary' : 'hide btn btn-outline-secondary'} id="PointerLockBtn">Immersive Mode</button>
        }

      </>
  )
}

export default App