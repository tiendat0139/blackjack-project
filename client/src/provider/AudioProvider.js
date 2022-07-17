import { createContext, useEffect, useState } from "react"
import { BgMusic, HitSound, NextSound, StandSound } from "../assets/audio/audio"

export const AudioContext = createContext()

export default function AudioProvider({ children }) {
    const [bgMusic] = useState(BgMusic)
    const [sound] = useState({
        hitSound: HitSound,
        standSound: StandSound,
        nextSound: NextSound,
    })

    useEffect(() => {
        bgMusic.volume = 0
        bgMusic.loop = true
        bgMusic.addEventListener("ended", () => bgMusic.pause())

        return () => {
            bgMusic.removeEventListener("ended", () => bgMusic.pause())
        }
    }, [])

    return (
        <AudioContext.Provider value={{ bgMusic, sound }}>
            { children }
        </AudioContext.Provider>
    )
}