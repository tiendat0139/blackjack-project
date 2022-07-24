import { useContext, useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Card from "../components/Card"
import socket from "../components/Socket"
import { AudioContext } from "../provider/AudioProvider"
import { ThemeContext } from "../provider/ThemeProvider"
import * as BJUtilities from "../utilities/BlackJackUtilities"
import "../css/play-pvp.css"
import Avatar from "../components/Avatar"
import { Box } from "@material-ui/core"
import { Modal } from "@material-ui/core";
import axios from "axios"

export default function BlackJackPVP({ user }) {
    const { pattern } = useContext(ThemeContext)
    const { sound } = useContext(AudioContext)

    const [roomCode, setRoomCode] = useState({})
    const [roomData, setRoomData] = useState([])
    const [state, setState] = useState()
    const [owner, setOwner] = useState(null)
    const [showEnd, setShowEnd] = useState(false)
    const [deck, setDeck] = useState([])
    //const [searchParams] = useSearchParams()
    const params = useParams()
    const navigate = useNavigate()
    
    useEffect(() => {
        //setRoomCode(searchParams.get('roomCode'))
        setRoomCode(params.roomCode)

        socket.emit('start-game', { roomId: roomCode })
        
        socket.on('room-data', (currentRoom) => {
            if (currentRoom[0].state !== "deal" && currentRoom[1].state !== "waiting-deal") {
                setRoomData(currentRoom.sort((u1, u2) => {
                    if (u1.rank && u2.rank) {
                        return u1.rank - u2.rank
                    } else {
                        return 
                    }
                }))
            }

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
                        case "deal-turn":
                            setState("deal-turn")
                            break
                        case "end":
                            setState("end")
                            setShowEnd(true)
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
        setDeck(BJUtilities.getDeck(1))
    }, [])

    useEffect(() => {
        socket.emit("change-pattern", { roomCode, user, pattern })
    }, [pattern])

    useEffect(() => {
        const findUser = roomData.find(u => u.user_id === user.user_id)
        if (state === "end") {
            if (findUser.rank !== -1) {
                sound.losingSound.play()
                axios.post("http://localhost:5000/update-win", {
                    user_id: findUser.user_id,
                    newCoin: user.money + findUser.winLoseCoins
                })
                    .then(res => console.log(res.data[0]))
                    .catch(err => console.log(err))
                
                
            } else {
                sound.winSound.play()
                axios.post("http://localhost:5000/update-lose", {
                    user_id: findUser.user_id,
                    newCoin: user.money - findUser.winLoseCoins
                })
                    .then(res => console.log(res.data[0]))
                    .catch(err => console.log(err))
            }
        }
    }, [state])
    
    const handleDeal = () => {
        console.log(deck);

        const c1_1 = Math.floor(Math.random() * deck.length)
        deck.splice(c1_1, 1)
        const c1_2 = Math.floor(Math.random() * deck.length)
        deck.splice(c1_2, 1)
        const c2_1 = Math.floor(Math.random() * deck.length)
        deck.splice(c2_1, 1)
        const c2_2 = Math.floor(Math.random() * deck.length)
        deck.splice(c2_2, 1)

        const cards = [
            [deck[c1_1], deck[c1_2]],
            [deck[c2_1], deck[c2_2]],
        ]

        console.log(c1_1, c1_2, c2_1, c2_2);

        socket.emit("deal", { roomCode, cards })
    }

    const handleHit = () => {
        console.log(user);
        const c = Math.floor(Math.random() * deck.length)
        socket.emit("hit-card", { roomCode, user, card: deck[c] })
        deck.splice(c, 1)
        sound.hitSound.play()
    }

    const handleStand = () => {
        socket.emit("stand-card", { roomCode })
        console.log("stand");
        sound.standSound.play()
    }

    const handleNext = () => {
        sound.nextSound.play()
        socket.emit("out-room", { userId: user.user_id, roomId: roomCode })
        navigate("/pvp")
    }

    const handleBackHome = () => {
        socket.emit("out-room", { userId: user.user_id, roomId: roomCode })
        navigate("/")
    }


    return (
        <>
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
                                {state === "deal-turn" && (
                                    <>
                                        <button className="action hit" onClick={handleHit}>Hit</button>
                                        {BJUtilities.getScore(owner.cards) > 17 && <button className="action stand" onClick={handleStand}>Stand</button>} 
                                    </>
                                )}
                                {state === "another-turn" && (
                                    <>
                                        <button className="action" style={{display: "flex", width: "fit-content"}}>{roomData.map(u => {
                                            if (u.user_id != user.user_id) {
                                                return u.username + "'s turn"
                                            }
                                        })}</button>
                                    </>
                                )}
                                {state === "waitting-dealer" && <button className="action" style={{display: "flex", width: "fit-content"}}>Wait Dealer</button>}
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
                                                top: "52px",
                                                display: "flex",
                                                flexDirection: "column"
                                            }}
                                            className={`${roomUser.user_id == user.user_id ? "auth" : "another"}`}
                                        >
                                            <Box
                                                className={`arrow_box_common arrow_box_dealer`}
                                                style={{
                                                    visability: user.user_id === roomUser.user_id ? "visible" : "hidden",
                                                    justifyContent: "center"
                                                }}
                                            >
                                                {user.user_id === roomUser.user_id ? BJUtilities.getScoreForDisplay(cards) : state === "end" ? BJUtilities.getScoreForDisplay(cards) : "?"}
                                            </Box>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    bottom: "84px",
                                                }}
                                                className="cards"
                                            >
                                                {cards.map((card, index) => {
                                                    return (
                                                        <div className={`${index != 0 ? "card-flow" : ""}`}>
                                                            <Card card={card} hide={roomUser.user_id != user.user_id && index === 0 && state !== "end" ? true : false} srcImg={p} />
                                                        </div>
                                                    )
                                                })}
                                            </div>
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
            {showEnd && (
                <Modal
                    open={showEnd}
                    onClose={() => setShowEnd(false)}
                >
                    <div
                        style={{
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: "black",
                                padding: "40px",
                                borderRadius: "20px",
                                border: "2px solid red",
                                color: "white",
                                width: "60%",
                                display: "flex",
                                flexDirection: "column-reverse",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <div
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "end",
                                    paddingTop: "16px",
                                    paddingRight: "64px"
                                }}
                            >
                                <div
                                    style={{
                                        width: "24%",
                                        display: "flex",
                                        justifyContent: "space-between"
                                    }}
                                >
                                    <button className="button-ok" onClick={handleNext}>Next</button>
                                    <button className="button-cancel" onClick={handleBackHome}>Home</button>
                                </div>
                            </div>
                            {roomData.map(roomUser => {
                                return (
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            padding: "16px",
                                            borderBottom: "solid 2px white",
                                            width: "80%",
                                            alignItems: "end"
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "end"
                                            }}
                                        >
                                            <Avatar user={roomUser} size={"32px"} sizeAvt={"16px"} />
                                            <div style={{paddingLeft: "16px"}}>{roomUser.username}</div>
                                        </div>
                                        <div>
                                            {roomUser.rank === 0 && (
                                                <>
                                                    <div className="bj">BLACK JACK</div>
                                                </>
                                            )}
                                            {roomUser.rank === -1 && (
                                                <>
                                                    <div className="losed">LOSED</div>
                                                </>
                                            )}
                                            {roomUser.rank !== 0 && roomUser.rank !== -1 && (
                                                <>
                                                    <div className="won-rank">{roomData.length === 2 ? "WON" : `RANK ${roomUser.rank}`}</div>
                                                </>
                                            )}
                                        </div>
                                        <div>
                                            <div>{BJUtilities.getLastScore(roomUser.cards) + " points"}</div>
                                            <div
                                                style={{
                                                    color: "red",
                                                    fontWeight: "800"
                                                }}
                                            >
                                                <span style={{ paddingRight: "4px" }}>
                                                    {roomUser.rank !== -1 ? "+" : "-"} {roomUser.winLoseCoins}
                                                </span>
                                                <i className="fa-solid fa-dollar-sign coin"></i>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </Modal>
            )}
        </>
    )
}