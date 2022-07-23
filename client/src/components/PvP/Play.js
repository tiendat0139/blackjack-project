import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams, useSearchParams } from "react-router-dom";
import '../../css/PvPPlay.css'
import { ThemeContext } from "../../provider/ThemeProvider";
import socket from "../Socket";

const betCoin = [50, 100, 200, 400]

const PvPPlay = ({ user, changeBetCoin }) => {
    const { pattern } = useContext(ThemeContext)
    const [roomCode, setRoomCode] = useState({})
    const [roomData, setRoomData] = useState([])
    const [users, setUsers] = useState([])
    const [invitedBtn, setInvitedBtn] = useState(false)
    const [coin, setCoin] = useState()
    const [showAlert, setShowAlert] = useState(false)
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
        return () => {
            setCoin()
        }
    }, [])

    useEffect(() => {
        socket.on('room-data', (currentRoom) => {
            setRoomData(currentRoom)
            if(currentRoom.length === 0) <Navigate to={"/pvp"} replace />
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

        console.log("play");
    })

    const checkInRoom = (username) => {
        const findUser = users.find((e) => e.username === username)
        //console.log("findUser: ", findUser);
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
        navigate("/pvp")
    }

    const handleBet = () => {
        console.log(user);
        if (coin > user.money) {
            setShowAlert(true)
            setTimeout(() => {
                setShowAlert(false)
            }, 2000)
        } else {
            socket.emit("bet", { roomCode, userId: user.user_id, betCoin: coin })
        }
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
                            <div>
                                <div className="play-area_name">{userInf.username}</div>
                                <div
                                    style={{
                                        fontWeight: "800",
                                        color: "red",
                                    }}
                                >
                                    <span style={{ paddingRight: "4px" }}>Bet: {userInf.betCoin ? userInf.betCoin : "?"}</span>
                                    <i className="fa-solid fa-dollar-sign coin"></i>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {roomData.filter(u => u.betCoin).length === roomData.length && <button type="" className="play-btn" onClick={handleStart}>Start Game</button>}
                <button type="" className="play-btn leave-btn" onClick={handleOutRoom}>Leave Room</button>
                {roomData.length >= 2 && (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            paddingTop: "16px"
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                            }}
                        >
                            {betCoin.map(bC => {
                                return (
                                    <button
                                        className="play-btn"
                                        style={{
                                            marginTop: "0",
                                            backgroundColor: coin === bC ? "" : "rgba(255, 0, 0, 0.6)",
                                            borderBottom: coin === bC ? "" : "4px solid rgba(255, 0, 0, 0.5)",
                                            borderRight: coin === bC ? "" : "3px solid rgba(255, 0, 0, 0.5)",
                                        }}
                                        onClick={() => setCoin(bC)}
                                    >
                                        {bC}
                                    </button>
                                )
                            })}
                        </div>
                        <div
                            style={{
                                position: "relative",
                                display: "flex",
                                justifyContent: "center"
                            }}
                        >
                            {showAlert && (
                                <div
                                    style={{
                                        position: "absolute",
                                        width: "240px",
                                        padding: "4px",
                                        border: "2px solid black",
                                        borderRadius: "4px",
                                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                                        color: "red"
                                    }}

                                    className="alert"
                                >
                                    あなたのコインが足りない
                                </div>
                            )}
                            <button className="play-btn button-bet" onClick={handleBet}>BET</button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}
export default PvPPlay