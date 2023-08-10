
const Errors = ({message, type, cancelErrorMsg}) =>{

    return(
        <div className={'col-6 offset-3 d-flex justify-content-between alert alert-' + type} style={{position: "fixed", top: 80, left: 0, paddingTop: 25, zIndex: 101, opacity:0.75}}>
            <div><strong>{message?.head}</strong> {message?.content}</div>
            <button className='btn btn-outline-dark' onClick={()=> cancelErrorMsg()}>X</button>
        </div>
    )
}

export default Errors;