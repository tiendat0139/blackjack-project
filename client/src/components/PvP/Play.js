import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import '../../css/PvPPlay.css'
import socket from '../Socket'
import {Link} from 'react-router-dom'


const PvPPlay = ({user}) => {
    const [username, setUsername] = useState('')
    const [roomid, setRoomid] = useState('')
    const [owner, setOwner] = useState()
    const [roomData, setRoomData] = useState([])
    const [users, setUsers] = useState([])
    const [invitedBtn, setInvitedBtn] = useState(false)
    const [searchParams] = useSearchParams()
    const navigate = useNavigate();
    useEffect(() => {
        const  getRoomId = searchParams.get('roomCode')
        const getOwner = searchParams.get('owner')
        setRoomid(getRoomId)
        setUsername(user.username)
        setOwner(getOwner === 'true'? true : false)
    },[searchParams, user.username])

    useEffect(() => {
        if(username && roomid){
            socket.emit('join-room', ({username, roomid}))
        }
        socket.on('room-data', (roomData) => {
            setRoomData(roomData)
        })
    },[roomid, username])

    useEffect(() => {
        socket.on('all-user',(users) => {
            console.log(users)
            setUsers(users)
        })
        socket.on('enter-duel', () => {
            navigate('/pvp/playarea')
        })
    })

    const checkInRoom = (username) => {
        const findUser = users.find((e) => e.username === username )
        return findUser.roomid === ''
    }
    const invitePlayer = (e) => {
        setInvitedBtn(true)
        setTimeout(() => {
            setInvitedBtn(false)
        }, 2000);
        const data_id = e.target.getAttribute('data_id');
        const receiverId = users[data_id].userid
        const sender = username
        socket.emit('send-invite', {sender, receiverId, roomid})
    }
    const handleOutRoom = () => {
        socket.emit('out-room', roomid)
        navigate('/')
    }

    const handleJoinGame = () => {
        socket.emit('duel', roomid)
    }

    console.log("Playing")

    return (
        <div className="pvp-play">
            <div className="player-onl">
                <h4 className="player-onl_header">Player Online</h4>
                <ul className="player-onl_list">
                    {users.map((user,index) => 
                        <li key={index} className="player-onl_item">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPyGNr2qL63Sfugk2Z1-KBEwMGOfycBribew&usqp=CAU" alt=""
                                className="player-onl_img"></img>
                            <div className="player-onl_name">{user.username}</div>
                            {checkInRoom(user.username) ?
                                <div  className="player-onl_icon">
                                    <i className={!invitedBtn?"fa-solid fa-circle-plus": "fa-solid fa-check"}
                                        data_id = {index}
                                        onClick={(e) => invitePlayer(e)}>
                                     </i>
                                </div>
                                : '' 
                            }
                        </li>
                    )}
                </ul>
            </div>
            <div className="play-area">
                <h4 className="play-area_rc">{`Room Code: ${roomid}`}</h4>
                <div className="play-area_list">
                    {roomData.map((userInf,id) => (
                        <div className="play-area_item" key={id}>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPyGNr2qL63Sfugk2Z1-KBEwMGOfycBribew&usqp=CAU" 
                                alt="" className="play-area_img">    
                            </img>
                            <div className="play-area_name">{userInf.username}</div>
                        </div>
                    ))}
                </div>
                {
                    owner
                    ?
                    <Link to={"/pvp/playarea"}>
                        <button type="" className="play-btn" onClick={handleJoinGame}>Start Game</button>
                    </Link>
                    : 
                    ''
                }
                <button type="" className="play-btn leave-btn" onClick={handleOutRoom}>Leave Room</button>

            </div>
        </div>
    )
}
export default PvPPlay