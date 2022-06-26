import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import io from 'socket.io-client'
import '../../css/PvPPlay.css'

let socket;
const ENDPOINT = 'http://localhost:5000'

const PvPPlay = () => {
    const [roomCode, setRoomCode] = useState({})
    const [roomData, setRoomData] = useState([])
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [searchParams] = useSearchParams()
    
    useEffect(() => {
        setRoomCode(searchParams.get('roomCode'))
        socket = io(ENDPOINT,{
            withCredentials: true,
            extraHeaders: {
                "blackjack-game": "abcd"
              }
        })
        socket.emit('join',{roomCode})
        
        return () => {
            socket.disconnect();
            socket.off();
        }
    },[roomCode, searchParams])

    useEffect(() => {
        socket.on('room-data', (currentRoom) => {
            setRoomData(currentRoom)
            console.log(currentRoom)
        })
    })

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
                            <div className="play-area_name">{user}</div>
                        </div>
                    ))}
                </div>
                <button type="" className="play-btn">Start Game</button>
            </div>
        </div>
    )
}
export default PvPPlay