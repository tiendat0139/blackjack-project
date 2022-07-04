import Field from "./Field";
import Switch from "./Switch";
import Volume from "./Volume";
import "../css/Setting.css"
import { useContext, useState } from "react";
import { AudioContext } from "../provider/AudioProvider";
import "../css/components/modal.css"

export default function Setting({ handleCancel }) {
    const { bgMusic } = useContext(AudioContext)

    const [musicVolume, setMusicVolume] = useState(0)

    const handleVolume = (volume) => {
        console.log(bgMusic, bgMusic.paused)
        bgMusic.volume = volume / 10
        setMusicVolume(volume)
        if (bgMusic.paused) bgMusic.play()
    }

    const handleOnOff = () => {
        if (!bgMusic.paused) {
            bgMusic.pause()
            setMusicVolume(0)
        }
        else {
            bgMusic.play()
            setMusicVolume(bgMusic.volume * 10)
        }
    }

    const handleOk = () => {
        
        handleCancel()
    }

    return (
        <div className="setting modal-content">
            <div className="setting-content">
                <h1 className="h1">設定</h1>
                <div className="fields">
                    <Field 
                        label={
                            <button onClick={handleOnOff}>音楽</button>
                        }
                        content={
                            <Volume handleVolume={handleVolume} currentVolume={musicVolume} />
                        }
                    />
                    <Field
                        label={
                            <button>サウンド</button>
                        }
                        content={
                            <Volume />
                        }
                    />
                    <Field
                        label={
                            <button>ダークモード</button>
                        }
                        content={
                            <Switch />
                        }
                    />
                </div>
                <div className="actions">
                    <div className="buttons">
                        <button className="button-cancel" onClick={handleCancel}>キャンセル</button>
                        <button className="button-ok" onClick={handleOk}>完了</button>
                    </div>
                </div>
            </div>
        </div>
    )
}