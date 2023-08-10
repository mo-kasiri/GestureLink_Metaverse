import CallModal from "./CallModal.jsx";
const Navbar = ({localInfo})=>{

    return (
        <nav className="navbar fixed-top bg-light d-flex justify-content-between">
            <div className="container-fluid">

                <div className='d-flex'>
                    {localInfo?.peerID !==0 ?
                        <div>Peer ID:
                            <small className=''>{localInfo?.peerID}</small>
                        </div> : <p></p>
                    }
                </div>


                {
                localInfo?.ID !== 0 ?
                    <div className="navbar-brand bg-opacity-10"
                         style={{paddingLeft: 8, paddingRight: 8, borderRadius: 5}}>
                        <small className='mx-2'>Your ID:</small>
                        <strong className='text-decoration-underline'>{localInfo?.ID}</strong>
                         <small className='mx-2'>Channel Name:</small>
                        <strong className='text-decoration-underline'>
                            {localInfo?.channel}</strong>
                    </div> : <h5>Motaverse</h5>
                }
            </div>
        </nav>
    )
}

export default Navbar;