import { createContext, useEffect, useState } from "react"
import BgMusicUrl from "../assets/audio/music/minionsund-minion-underwear.mp3"

export const AudioContext = createContext()

const BgMusic = new Audio(BgMusicUrl)

export default function AudioProvider({ children }) {
    const [bgMusic] = useState(BgMusic)

    useEffect(() => {
        bgMusic.autoplay = true
        bgMusic.loop = true
        bgMusic.addEventListener("ended", () => bgMusic.pause())

        return () => {
            bgMusic.removeEventListener("ended", () => bgMusic.pause())
        }
    }, [])

    return (
        <AudioContext.Provider value={{ bgMusic }}>
            { children }
        </AudioContext.Provider>
    )
}