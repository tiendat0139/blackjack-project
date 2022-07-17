import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import '../../css/PvPPlay.css'
import { ThemeContext } from "../../provider/ThemeProvider";
import socket from "../Socket";

const PvPPlay = ({ user }) => {
    const { pattern } = useContext(ThemeContext)
    const [roomCode, setRoomCode] = useState({})
    const [roomData, setRoomData] = useState([])
    const [users, setUsers] = useState([])
    const [invitedBtn, setInvitedBtn] = useState(false)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    //const [searchParams] = useSearchParams()
    const params = useParams()
    const navigate = useNavigate()
    
    useEffect(() => {
        //setRoomCode(searchParams.get('roomCode'))
        console.log(params);
        setRoomCode(params.roomCode)
        socket.emit('join-room', { roomId: roomCode, user, pattern })
    },[roomCode, params])

    useEffect(() => {
        socket.on('room-data', (currentRoom) => {
            setRoomData(currentRoom)
            console.log(currentRoom)
        })
    })

    const handleStart = () => {
        if (roomData.length >= 2) {
            navigate(`/pvp/play/${roomCode}`)
        }
    }

    useEffect(() => {
        socket.on('all-user',(users) => {
            setUsers(users)
        })
    })

    const checkInRoom = (username) => {
        const findUser = users.find((e) => e.username === username)
        console.log("findUser: ", findUser);
        return findUser.roomId === ''
    }

    const invitePlayer = (e) => {
        setInvitedBtn(true)
        setTimeout(() => {
            setInvitedBtn(false)
        }, 2000);
        const data_id = e.target.getAttribute('data_id');
        const receiverId = users[data_id].socketId
        const sender = user.username
        socket.emit('send-invite', {sender, receiverId, roomId: roomCode })
    }

    const handleOutRoom = () => {
        socket.emit("out-room", { userId: user.user_id, roomId: roomCode })
        navigate("pvp/play")
    }

    console.log("Playing")

    return (
        <div className="pvp-play">
            <div className="player-onl">
                <h4 className="player-onl_header">Player Online</h4>
                <ul className="player-onl_list">
                    {users.map((u, index) => 
                        <li key={index} className="player-onl_item">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPyGNr2qL63Sfugk2Z1-KBEwMGOfycBribew&usqp=CAU" alt=""
                                className="player-onl_img"></img>
                            <div className="player-onl_name">{u.username}</div>
                            {checkInRoom(u.username) ?
                                <div  className="player-onl_icon">
                                    <i className={!invitedBtn ? "fa-solid fa-circle-plus" : "fa-solid fa-check"}
                                        data_id = {index}
                                        onClick={(e) => invitePlayer(e)}
                                    >
                                     </i>
                                </div>
                                : '' 
                            }
                        </li>
                    )}
                </ul>
            </div>
            <div className="play-area">
                <h4 className="play-area_rc">{`Room Code: ${roomCode}`}</h4>
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
                <button type="" className="play-btn" onClick={handleStart}>Start Game</button>
                <button type="" className="play-btn leave-btn" onClick={handleOutRoom}>Leave Room</button>

            </div>
        </div>
    )
}
export default PvPPlay