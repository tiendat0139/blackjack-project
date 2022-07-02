import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import socket from './Socket'

import '../css/Notifi.css'

const Notifi = () => {
    const [sendUser, setSenduser] = useState('')
    const [roomid, setRoomid] = useState('')
    const [show, setShow] = useState(false)
    socket.on('invite',({sender, roomid}) => {
        setSenduser(sender)
        setRoomid(roomid)
        setShow(true)
    })
    const handleHide = () => {
        setShow(false)
    }
    const handleShow = () => {
        setShow(true)
    }
    return <div className={`noti ${show? 'show' : 'hide'}`}>
        <h4 className='noti-header'>Tien Dat moi ban vao tran dau</h4>
        <div className='noti-opt'>
            <Link to={`pvp/play?roomCode=${roomid}&owner=false`}>
                <button className='noti-opt_acp' onClick={handleShow}>Accept</button>
            </Link>
            <button className='noti-opt_refu' onClick={handleHide}>Refure</button>
        </div>
    </div>
}
export default Notifi