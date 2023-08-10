import {useForm} from "react-hook-form";
import {useState} from "react";

const ChannelMessageForm = ({localInfo,onMessage,Messages})=>{
    const {register, handleSubmit, formState:{errors, isValid}} = useForm();
    //const [isLoading, setIsLoading] = useState(loading);
    //console.log(errors, isValid);
    //console.log()

    const [messageArr, setMessageArr] = useState([]);
    //setMessageArr([...messageArr, Messages]);

    return(
        <div className="vh-100 d-flex justify-content-center align-items-center">
            <div className="container">
                <div className="row clearfix">
                    <div className="col-lg-10 offset-lg-2">
                        <div className="card">
                            <div className="chat">

                                <div className="chat-history">
                                    <h6>Chat with your peer</h6>
                                    <hr/>
                                    <ul className="m-b-0">

                                        {messageArr.map((item)=> item)}
                                        <li className="clearfix">
                                            <div className="message-data">
                                                <span className="message-data-time float-right">User: </span>
                                                <br/>
                                            </div>
                                            <div className="message other-message float-right"> Hi Aiden, how are you? How is the project coming along? </div>
                                        </li>


                                        <li className="clearfix">
                                            <div className="message-data">
                                                <span className="message-data-time">You (User: {localInfo?.ID})</span>
                                            </div>
                                            <div className="message my-message">Are we meeting today?</div>
                                        </li>


                                    </ul>
                                </div>
                                <div className="chat-message clearfix">
                                    <div className="input-group mb-0">

                                        <form className="col-12 mb-3 mt-md-4"
                                              onSubmit={handleSubmit((msg)=> {onMessage(msg.message)})} >
                                            <div className="mb-3">
                                                <label htmlFor="message" className="form-label ">Type your Message</label>
                                                <textarea {...register('message',{required:true, minLength:4})} id="message" className="form-control" aria-label="With textarea"></textarea>
                                                {errors.message?.type === 'required' && <p className="text-danger">Message is required</p>}
                                                {errors.message?.type === 'minLength' && <p className="text-danger">write Something</p>}
                                            </div>
                                            <div className="d-grid">
                                                <button onClick={()=> {
                                                    if(isValid){
                                                        //setIsLoading(true);
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

export default ChannelMessageForm;