
class LocalStreamService {

    async getStream(config){
        try{
            return this.localVideo = await navigator.mediaDevices.getUserMedia(config);
        }catch (e) {
            console.log('server connection error!',e);
            return {message: 'can not connect to the agora server', type:'danger'}
        }
    }

    getLocalVideo(){
        return this.localVideo;
    }
}

export default new LocalStreamService();