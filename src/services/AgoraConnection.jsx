import AgoraRTM from "agora-rtm-sdk";
import {APPID} from "../Constants.js";
let client;
let channel;
let options = {
    uid: '',
    token: null
}

class AgoraConnection{

    async connect2agora (uid){
        options.uid = uid;
        try{
            client = await AgoraRTM.createInstance(APPID); // to create an -RTmClient- instance, returns RtmClient
            client.on('ConnectionStateChanged',(state,reason)=>{
                console.log(reason);
            });
            return await client.login(options);

        }catch (e) {
            console.log('server connection error!',e);
            return {message: 'can not connect to the agora server', type:'danger'}
        }
    }


    getClient(){
        return client;
    }


    // async logout(){
    //     return await client.logout();
    // }


    async createChannel(chn){
        try{
            channel = await client.createChannel(chn);
            return channel;
        }catch (e){
            console.log('server connection error!',e);
            return {message: 'can not connect to the agora server', type:'danger'}
        }

    }


    async joinChannel(){
        try{
            await channel.join();
        } catch (err){
            console.log('server connection error!',err);
            return {message: 'can not connect to the agora server', type:'danger'}
        }
    }


    getChannel(){
        return channel;
    }


    async sendMessage2Channel(msg){

        console.log(msg.data)
        try{
            await channel.sendMessage({ text: msg });
        } catch (e){
            console.log('server connection error!',e);
            return {message: 'can not connect to the agora server', type:'danger'}
        }
    }

    async sendMessage2peer(msg,memberId){
        // Check whether it is a message or webRTC signal data
        // msg shape: {userToCall: peerid, signalData: data, from: localInfo?.ID}
        if(memberId === 0){
            //console.log(msg.signalData);
            // Sending message to peer user using agora
            await client.sendMessageToPeer({text: JSON.stringify(msg.signalData)}, msg.userToCall);
        }else{
            try{
                await client.sendMessageToPeer({text: msg}, memberId);
            } catch (e){
                console.log('server connection error!',e);
                return {message: 'can not connect to the agora server', type:'danger'}
            }
        }

    }

    async getMembers(){
        if(channel){
            try{
                return await channel.getMembers();
            }catch (e){
                console.log('server connection error!',e);
                return {message: 'can not connect to the agora server', type:'danger'}
            }
        }
    }
}
export default new AgoraConnection();