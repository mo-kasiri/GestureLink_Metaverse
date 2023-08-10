
const Message = ({message}) => {

        //console.log(messageTrigger);
        return (
            <>
                <div className={"alert mt-2 alert-" + message?.class} role="alert">
                    {message?.text}
                </div>
            </>
        )


};

export default Message;
