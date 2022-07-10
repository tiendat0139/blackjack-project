import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import io from 'socket.io-client'
import Card from "../../components/Card"
import "../../css/pages/play-pvp.css"
import { AudioContext } from "../../provider/AudioProvider"
import { ThemeContext } from "../../provider/ThemeProvider"
import * as BJUtilities from "../../utilities/BlackJackUtilities"

let socket
const ENDPOINT = 'http://localhost:5000'

const deck = BJUtilities.getDeck()

export default function BlackJackPVP({ user }) {
    const { pattern } = useContext(ThemeContext)
    const { sound } = useContext(AudioContext)

    const [roomCode, setRoomCode] = useState({})
    const [roomData, setRoomData] = useState([])
    const [state, setState] = useState()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    //const [searchParams] = useSearchParams()
    const params = useParams()
    
    useEffect(() => {
        //setRoomCode(searchParams.get('roomCode'))
        setRoomCode(params.roomCode)
        socket = io(ENDPOINT,{
            withCredentials: true,
            extraHeaders: {
                "blackjack-game": "abcd"
              }
        })
        socket.emit('join', { roomCode, user, pattern })
        
        socket.on('room-data', (currentRoom) => {
            setRoomData(currentRoom)

            for (const player of currentRoom) {
                if (player.user.user_id == user.user_id) {
                    switch (player.state) {
                        case "deal":
                            setState("deal")
                            break;
                        case "waiting-deal": 
                            setState("waitting-dealer")
                            break
                        case "my-turn":
                            setState("my-turn")
                            break
                        case "another-turn":
                            setState("another-turn")
                            break
                        default:
                            break;
                    }

                    break
                }
            }

            console.log(currentRoom)
        })
        
        return () => {
            socket.disconnect(user);
            socket.off();
        }
    }, [roomCode, params])

    useEffect(() => {
        socket.emit("change-pattern", { roomCode, user, pattern })
    }, [pattern])
    
    const handleDeal = () => {
        console.log(deck);

        const c1_1 = Math.floor(Math.random() * 52)
        const c1_2 = Math.floor(Math.random() * 52)
        const c2_1 = Math.floor(Math.random() * 52)
        const c2_2 = Math.floor(Math.random() * 52)

        const cards = [
            [deck[c1_1], deck[c1_2]],
            [deck[c2_1], deck[c2_2]],
        ]

        deck.splice(c1_1, 1)
        deck.splice(c1_2, 1)
        deck.splice(c2_1, 1)
        deck.splice(c2_2, 1)

        socket.emit("deal", { roomCode, cards })
    }

    const handleHit = () => {
        const c = Math.floor(Math.random() * 52)
        socket.emit("hit-card", { roomCode, user, card: deck[c] })
        deck.splice(c, 1)
    }

    const handleStand = () => {
        socket.emit("stand-card", { roomCode })
        console.log("stand");
    }


    return (
        <div className="play-pvp">
            <div style={{ padding: "40px", width: "80%", backgroundColor: "black" }}>
                <div>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <div style={{ width: "fit-content", paddingBottom: "20px" }}>
                            <Card hide={true} srcImg={roomData[0]?.pattern} />
                        </div>
                        <div style={{ color: "white", width: "20%", display: "flex", justifyContent: "space-around" }}>
                            {state == "deal" && <button className="action deal" onClick={handleDeal}>Deal</button>}
                            {state == "my-turn" && (
                                <>
                                    <button className="action hit" onClick={handleHit}>Hit</button>
                                    <button className="action stand" onClick={handleStand}>Stand</button>
                                </>
                            )}
                            {state == "another-turn" && (
                                <>
                                    <button className="action" style={{display: "flex", width: "fit-content"}}>{roomData.map(u => {
                                        if (u.user.user_id != user.user_id) {
                                            return u.user.username + "'s turn"
                                        }
                                    })}</button>
                                </>
                            )}
                            {state == "waitting-dealer" && <button className="action" style={{display: "flex", width: "fit-content"}}>Wait Dealer</button>}
                        </div>
                    </div>
                    <div style={{ height: "300px", display: "flex", justifyContent: "space-between", position: "relative" }}>
                        {roomData.map(roomUser => {
                            const u = roomUser.user
                            const p = roomUser.pattern
                            if (roomUser.cards) {
                                const cards = roomUser.cards
                                return (
                                    <div style={{ display: "flex", bottom: "20px" }} className={`${u.user_id == user.user_id ? "auth" : "another"}`} >
                                        {cards.map((card, index) => {
                                            return (
                                                <div className={`${index != 0 ? "card-flow" : ""}`}>
                                                    <Card card={card} hide={u.user_id != user.user_id && index == 0 ? true : false} srcImg={p} />
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
                <div style={{ display: "flex", width: "100%", position: "relative", color: "white", fontWeight: "800", bottom: "20px" }}>
                    {roomData.map(u => {
                        return (
                            <div className={`${u.user.user_id === user.user_id ? "auth" : "another"}`}>{u.user.username}</div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}