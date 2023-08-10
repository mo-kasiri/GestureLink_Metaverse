import {useForm} from "react-hook-form";
import CallModal from "../universal-components/CallModal.jsx";

const Peer2PeerChatForm = ({localInfo,chatMessages, onMessageChange})=>{
    const {register, handleSubmit, formState:{errors, isValid}} = useForm();




    //console.log('chat messages from peer2peerjsx', chatMessages);
    return(
        <div className="vh-100 d-flex justify-content-center align-items-center mt-4">

            <div className="container">
                <div className="row clearfix">

                    <div className="col-lg-12 offset-lg-1">
                        <div className="card">
                            <div className="chat">

                                <div className="chat-history">
                                    <div className='d-flex align-items-center'>
                                    <h6>Chat With Your Peer</h6>

                                       {/*<SocialVRModal/>*/}

                                    </div>

                                    <hr/>
                                    <ul className="m-b-0" style={{overflowY: "scroll", overflowX: "hidden", height: 400}}>
                                        {chatMessages?.length !== 0 ?
                                            chatMessages?.map((item)=>{
                                                return(
                                                    <li key={item?.id} className="offset-1 col-10 clearfix">
                                                        <div className="message-data">
                                                            <span className={localInfo?.ID === item?.ID ? 'message-data-time float-right' : 'message-data-time'}>
                                                                {item.ID === localInfo?.ID ?  (<>You (user: {item?.ID})</>) : (<>Peer (user: {item?.ID})</>)}
                                                                {/*User: {item?.ID}*/}
                                                            </span>
                                                            <br/>
                                                        </div>
                                                        <div className={localInfo?.ID === item?.ID ? 'message other-message float-right' : 'message my-message'}>{item?.message}</div>
                                                    </li>
                                                )
                                            }) : <p>No message to show, now you can send a message to a peer</p>
                                        }
                                    </ul>
                                </div>


                                <div className="chat-message clearfix">
                                    <div className="input-group mb-0">

                                        <form className="col-12 mb-3 mt-md-4"
                                              onSubmit={handleSubmit((msg)=> {
                                                  onMessageChange(msg);
                                                  document.getElementById("message").value = null;
                                              })}
                                        >
                                            <div className="mb-3">

                                                <label className='mx-1' htmlFor="remoteId">Enter your Peer ID </label>
                                                <input {...register('remoteId', {required: true, minLength:4})} id='remoteId' type="number"/>
                                                {errors.remoteId?.type === 'required' && <p className="text-danger">Message is required</p>}
                                                {errors.remoteId?.type === 'minLength' && <p className="text-danger">write Some thing</p>}

                                                <br/><br/>

                                                <label htmlFor="localID" className="form-label ">Type your Message</label>
                                                <textarea {...register('message',{required:true, minLength:4})} id="message" className="form-control" aria-label="With textarea"></textarea>
                                                {errors.message?.type === 'required' && <p className="text-danger">Message is required</p>}
                                                {errors.message?.type === 'minLength' && <p className="text-danger">write Some thing</p>}
                                            </div>
                                            <div className="d-grid">
                                                <button onClick={()=> {
                                                    if(isValid){

                                                    }
                                                }} className="btn btn-outline-dark" type="submit">Send</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Peer2PeerChatForm;