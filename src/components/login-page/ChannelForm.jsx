import {useForm} from "react-hook-form";
import {useState} from "react";
const ChannelForm = ({loading , joinPressed})=>{
    const {register, handleSubmit, formState:{errors, isValid}} = useForm();
    const [isLoading, setIsLoading] = useState(loading);
    //console.log(errors, isValid);
    //console.log()
    return(
        <>
            <div className="vh-100 d-flex justify-content-center align-items-center">
                <div className="container">
                    <div className="container">
                        <div className="row d-flex justify-content-center">
                            <div className="col-10 col-md-8 col-lg-6">
                                <div className="card bg-white">
                                    <div className="card-body p-5">
                                        <form onSubmit={handleSubmit((chn)=>{joinPressed(chn.channelName)})} className="mb-3 mt-md-4">
                                            <h2 className="fw-bold text-uppercase text-center">Motaverse</h2>
                                            <h5 className="mb-5 text-center">Please enter your Channel name</h5>
                                            <div className="mb-3">
                                                <label htmlFor="localID" className="form-label ">Channel Name (just assign a random name)</label>
                                                <input {...register('channelName',{required:true, minLength:4})} type="text" className="form-control" id="channelName" placeholder="As an example: Demochannel"/>
                                                {errors.channelName?.type === 'required' && <p className="text-danger">The channel name is required</p>}
                                                {errors.channelName?.type === 'minLength' && <p className="text-danger">The channel name must be at least 4 characters (like demo)</p>}
                                            </div>
                                            <div className="d-grid">
                                                <button onClick={()=> {
                                                    if(isValid){
                                                        setIsLoading(true);
                                                    }
                                                }} className="btn btn-outline-primary" type="submit">JOIN</button>
                                            </div>
                                        </form>

                                        <div>
                                            <p className="mb-0  text-center">Need help? <a href="#" className="text-primary fw-bold">Click Here</a></p>
                                        </div>
                                        {isLoading && <div className='spinner-border'></div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChannelForm;