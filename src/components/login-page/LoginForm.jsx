import {useForm} from "react-hook-form";
import {useState} from "react";
const LoginForm = ({loading, loginPressed})=>{
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
                                        <form onSubmit={handleSubmit((uid)=>{loginPressed(uid.localID)})} className="mb-3 mt-md-4">
                                            <h2 className="fw-bold text-uppercase text-center">Motaverse</h2>
                                            <h5 className="mb-5 text-center">Please enter your ID to connect to the app</h5>
                                            <div className="mb-3">
                                                <label htmlFor="localID" className="form-label ">Your ID (just assign a random number)</label>
                                                <input {...register('localID',{required:true, minLength:4})} type="number" className="form-control" id="localID" placeholder="As an example 1234"/>
                                                {errors.localID?.type === 'required' && <p className="text-danger">The local ID is required</p>}
                                                {errors.localID?.type === 'minLength' && <p className="text-danger">The local ID must be at least 4 digits (like 1234)</p>}
                                            </div>
                                            <div className="d-grid">
                                                <button onClick={()=> {
                                                    if(isValid){
                                                        setIsLoading(true);
                                                    }
                                                }} className="btn btn-outline-dark" type="submit">Login</button>
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

export default LoginForm;