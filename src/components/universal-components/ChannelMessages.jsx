
const Errors = ({message, type, cancelMsg}) =>{

    return(
        <div className={'col-10 offset-1 d-flex justify-content-between alert alert-' + type} style={{position: "fixed", top: 80, left: 0, paddingTop: 25}}>
            <div><strong>{message?.head}</strong> {message?.content}</div>
            <button className='btn btn-outline-dark' onClick={()=> cancelMsg()}>X</button>
        </div>
    )
}

export default Errors;