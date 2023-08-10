import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useState} from "react";

const IncomingCallModal = ({incommingCallInfo, incommingCall}) =>{
    //console.log('this is isShow',incommingCallInfo);
    //incommingCallInfo?.stat

    const [isLoading, setIsloading] = useState(false);
    if(incommingCallInfo?.stat){
        return(
            <>
            <div className="modal-backdrop" style={{opacity: 0.5}}></div>
            <div className='h-100 d-inline-block' style={{backgroundColor: 'red'}}>
                <div
                    className="modal show"
                    style={{ display: 'block', position: 'fixed', zIndex:10000 }}
                >
                    <Modal.Dialog>
                        <Modal.Header closeButton>
                            <Modal.Title>Incoming Call</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <p>user: {incommingCallInfo?.remoteID} is calling you to join Social VR</p>
                        </Modal.Body>

                        <Modal.Footer className='d-flex justify-content-center align-items-center'>
                            <Button variant="danger" onClick={()=>{incommingCall('rejected')}}>
                                Decline
                                <i className="mx-1 bi bi-telephone-x-fill"></i>
                            </Button>
                            <Button variant="success" onClick={()=>{incommingCall('accepted')}}>
                                Accept
                                <i className="mx-1 bi bi-telephone-fill"></i>
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </div>
            </div>
            </>
        )
    }
}
export default IncomingCallModal;