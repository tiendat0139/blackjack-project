import Field from "./components/Field";
import Switch from "../../components/Switch";
import Volume from "./components/Volume";
import "../../css/Setting.css"
import { useContext, useState } from "react";
import { AudioContext } from "../../provider/AudioProvider";
import "../../css/components/modal.css"

export default function Setting({ handleCancel }) {
    const { bgMusic } = useContext(AudioContext)

    const [musicVolume, setMusicVolume] = useState({ before: bgMusic.volume * 10, current: bgMusic.volume * 10 })

    const handleVolume = (volume) => {
        bgMusic.volume = volume / 10
        setMusicVolume({
            ...musicVolume,
            current: volume
        })
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
        bgMusic.volume = musicVolume.current / 10
        console.log("...");
        handleCancel()
    }

    return (
        <div className="setting">
            <div className="setting-content modal-content">
                <h1 className="h1">設定</h1>
                <div className="fields">
                    <Field 
                        label={
                            <button onClick={handleOnOff}>音楽</button>
                        }
                        content={
                            <Volume handleVolume={handleVolume} currentVolume={musicVolume.current} />
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
                        <button className="button-cancel" onClick={() => { bgMusic.volume = musicVolume.before / 10; handleCancel() }}>キャンセル</button>
                        <button className="button-ok" onClick={() => handleOk()}>完了</button>
                    </div>
                </div>
            </div>
        </div>
    )
}