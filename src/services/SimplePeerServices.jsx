import Peer from 'simple-peer/simplepeer.min.js';
import LocalStreamService from "./LocalStreamService.jsx";


class SimplePeerServices{
    async createInitiatorPeer(){
        return new Peer({
            initiator: true,
            trickle: false,
            stream: await LocalStreamService.getStream({video: false, audio: true}), // set video to true if you want to submit video
            objectMode: true
        });
    }

    async createPeer(){
        return new Peer({
            initiator: false,
            trickle: false,
            stream: await LocalStreamService.getStream({video: false, audio: true}), // set video to true if you want to submit video
            objectMode: true
        });
    }

    getLocalPeer(){
        //return localPeer;
    }
}

export default new SimplePeerServices();