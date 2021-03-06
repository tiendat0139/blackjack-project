import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import socket from './Socket'

import '../css/Notifi.css'

const Notifi = () => {
    const [sendUser, setSenduser] = useState('')
    const [roomid, setRoomid] = useState('')
    const [show, setShow] = useState(false)
    socket.on('invite',({sender, roomid}) => {
        console.log("inviting")
        setSenduser(sender)
        setRoomid(roomid)
        setShow(true)
    })
    const handleHide = () => {
        setShow(false)
    }
    return <div className={`noti ${show? 'show' : 'hide'}`}>
        <h4 className='noti-header'>{sendUser} があなたを試合に招待した</h4>
        <div className='noti-opt'>
            <Link to={`pvp/play?roomCode=${roomid}&owner=false`}>
                <button className='noti-opt_acp' onClick={handleHide}>Accept</button>
            </Link>
            <button className='noti-opt_refu' onClick={handleHide}>Refuse</button>
        </div>
    </div>
}
export default Notifi