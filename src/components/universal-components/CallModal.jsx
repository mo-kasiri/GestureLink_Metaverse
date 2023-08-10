import {useForm} from "react-hook-form";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const CallModal = ({call_a_User,callAccepted})=>{
    const {register, handleSubmit, formState:{errors, isValid}} = useForm();

    const [show, setShow] = useState(callAccepted);
    const [isLoading, setLoading] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //console.log('callAccepted state', callAccepted);

    if(!callAccepted){
        return(
            <div>
                <div id='call_handler' className='col-12 d-flex justify-content-center'>
                    <Button id='call_user' variant="success" onClick={handleShow}>
                        <i className="bi bi-telephone-fill"></i>
                    </Button>
                </div>


                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Join Social VR</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit((data)=>{call_a_User(data?.remoteID); setLoading(true) })}>
                            <Form.Label>Enter your peer ID to connect</Form.Label>
                            <Form.Group className="mb-3 d-flex justify-content-between">
                                <Form.Control
                                    id="remoteID"
                                    {...register('remoteID', {required: true, minLength: 4})}
                                    type="number"
                                    autoFocus
                                />

                                <br/><br/>
                                <Button type='submit' className='mx-2' variant="success" onClick={()=>{
                                    if(isValid) {
                                        console.log('the form is valid');
                                    }else{
                                        console.log(errors);
                                    }
                                }}>
                                    Call
                                    <i className="bi bi-telephone-forward-fill"></i>
                                </Button>

                            </Form.Group>

                            {isValid && isLoading && <><div className="spinner-grow text-success"></div><h5>Please wait for {} user response</h5></>}
                            {errors.remoteID?.type === 'required' && <p className="text-danger">Peer ID required</p>}
                            {errors.remoteID?.type === 'minLength' && <p className="text-danger">Peer ID must be at least 4 digits (like 1234)</p>}

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }


}

export default CallModal;