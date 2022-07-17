import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Card from "../components/Card"
import socket from "../components/Socket"
import { AudioContext } from "../provider/AudioProvider"
import { ThemeContext } from "../provider/ThemeProvider"
import * as BJUtilities from "../utilities/BlackJackUtilities"
import "../css/play-pvp.css"
import Avatar from "../components/Avatar"

const deck = BJUtilities.getDeck()

export default function BlackJackPVP({ user }) {
    const { pattern } = useContext(ThemeContext)
    const { sound } = useContext(AudioContext)

    const [roomCode, setRoomCode] = useState({})
    const [roomData, setRoomData] = useState([])
    const [state, setState] = useState()
    const [owner, setOwner] = useState(null)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    //const [searchParams] = useSearchParams()
    const params = useParams()
    
    useEffect(() => {
        //setRoomCode(searchParams.get('roomCode'))
        setRoomCode(params.roomCode)

        socket.emit('start-game', { roomId: roomCode })
        
        socket.on('room-data', (currentRoom) => {
            setRoomData(currentRoom)

            for (const player of currentRoom) {
                if (player.role === 1 && owner === null) setOwner(player)

                if (player.user_id == user.user_id) {
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

            console.log(currentRoom, owner)
        })

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
        sound.hitSound.play()
    }

    const handleStand = () => {
        socket.emit("stand-card", { roomCode })
        console.log("stand");
        sound.standSound.play()
    }


    return (
        <div className="play-pvp">
            <div style={{ padding: "40px", width: "80%", backgroundColor: "black" }}>
                <div>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <div style={{ width: "fit-content", paddingBottom: "20px" }}>
                            <Card hide={true} srcImg={owner?.pattern} />
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
                                        if (u.user_id != user.user_id) {
                                            return u.username + "'s turn"
                                        }
                                    })}</button>
                                </>
                            )}
                            {state == "waitting-dealer" && <button className="action" style={{display: "flex", width: "fit-content"}}>Wait Dealer</button>}
                        </div>
                    </div>
                    <div style={{ height: "300px", display: "flex", justifyContent: "space-between", position: "relative" }}>
                        {roomData.map(roomUser => {
                            //const u = roomUser.user
                            const p = roomUser.pattern
                            if (roomUser.cards) {
                                const cards = roomUser.cards
                                console.log(cards);
                                return (
                                    <div
                                        style={{
                                            display: "flex",
                                            bottom: "40px"
                                        }}
                                        className={`${roomUser.user_id == user.user_id ? "auth" : "another"}`} >
                                        {cards.map((card, index) => {
                                            return (
                                                <div className={`${index != 0 ? "card-flow" : ""}`}>
                                                    <Card card={card} hide={roomUser.user_id != user.user_id && index === 0 ? true : false} srcImg={p} />
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        width: "100%",
                        position: "relative",
                        color: "white",
                        fontWeight: "800",
                        bottom: "40px"
                    }}
                >
                    {roomData.map(u => {
                        return (
                            <div
                                className={`${u.user_id === user.user_id ? "auth" : "another"}`}
                                style={{
                                    flexDirection: "column",
                                    alignItems: "end"
                                }}
                            >
                                <Avatar user={u} size={"32px"} sizeAvt={"16px"} />
                                {u.username}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}