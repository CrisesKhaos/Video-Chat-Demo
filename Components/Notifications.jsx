import React, { useContext } from 'react'
import { Button } from '@material-ui/core'

import { SocketContext } from '../SocketContext'
function Notifications() {
    const { answerCall, callAccepted, call } = useContext(SocketContext);
    console.log(call.isRecieved);
    console.log(call.isRecieved);
    console.log("h1");
    if (call.isRecieved && !callAccepted) console.log("h2")
    return (
        <>
            {call.isRecieved && !callAccepted && (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <h1>{call.name} is callin...</h1>
                    <Button variant='contained' color='primary' onClick={answerCall}>Answer</Button>
                </div>)}
        </>
    )
}

export default Notifications
