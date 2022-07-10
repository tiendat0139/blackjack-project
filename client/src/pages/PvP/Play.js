import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import io from 'socket.io-client'
import '../../css/PvPPlay.css'
import { ThemeContext } from "../../provider/ThemeProvider";

let socket;
const ENDPOINT = 'http://localhost:5000'

const PvPPlay = ({ user }) => {
    const { pattern } = useContext(ThemeContext)
    const [roomCode, setRoomCode] = useState({})
    const [roomData, setRoomData] = useState([])
    // eslint-disable-next-line react-hooks/rules-of-hooks
    //const [searchParams] = useSearchParams()
    const params = useParams()
    const navigate = useNavigate()
    
    useEffect(() => {
        //setRoomCode(searchParams.get('roomCode'))
        console.log(params);
        setRoomCode(params.roomCode)
        socket = io(ENDPOINT,{
            withCredentials: true,
            extraHeaders: {
                "blackjack-game": "abcd"
              }
        })
        socket.emit('join',{roomCode, user, pattern})
        
        return () => {
            socket.disconnect(user);
            socket.off();
        }
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

    return (
        <div className="pvp-play">
            <div className="player-onl">
                <h4 className="player-onl_header">Player Online</h4>
            </div>
            <div className="play-area">
                <h4 className="play-area_rc">{`Room Code: ${roomCode}`}</h4>
                <div className="play-area_list">
                    {roomData.map((user,id) => (
                        <div className="play-area_item" key={id}>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPyGNr2qL63Sfugk2Z1-KBEwMGOfycBribew&usqp=CAU" 
                                alt="" className="play-area_img">    
                            </img>
                            <div className="play-area_name">{user.user.username}</div>
                        </div>
                    ))}
                </div>
                <button type="" className="play-btn" onClick={handleStart}>Start Game</button>
            </div>
        </div>
    )
}
export default PvPPlay