import Field from "./components/Field";
import Switch from "../../components/Switch";
import Volume from "./components/Volume";
import "../../css/Setting.css"
import { useContext, useState } from "react";
import { AudioContext } from "../../provider/AudioProvider";
import "../../css/components/modal.css"

export default function Setting({ handleCancel }) {
    const { bgMusic, sound } = useContext(AudioContext)

    const [musicVolume, setMusicVolume] = useState({ before: bgMusic.volume * 10, current: bgMusic.volume * 10 })
    const [soundVolume, setSoundVolume] = useState({ before: sound.hitSound.volume * 10, current: sound.hitSound.volume * 10 })

    const handleVolumeMusic = (volume) => {
        bgMusic.volume = volume / 10
        setMusicVolume({
            ...musicVolume,
            current: volume
        })
        if (bgMusic.paused) bgMusic.play()
    }

    const handleOnOffMusic = () => {
        if (!bgMusic.paused) {
            bgMusic.pause()
            setMusicVolume(0)
        }
        else {
            bgMusic.play()
            setMusicVolume(bgMusic.volume * 10)
        }
    }

    const handleVolumeSound = (volume) => {
        sound.hitSound.volume = volume / 10
        sound.standSound.volume = volume / 10
        sound.nextSound.volume = volume / 10
        setSoundVolume({
            ...soundVolume,
            current: volume
        })
    }

    const handleOkButton = () => {
        bgMusic.volume = musicVolume.current / 10
        sound.hitSound.volume = soundVolume.current / 10
        sound.standSound.volume = soundVolume.current / 10
        sound.nextSound.volume = soundVolume.current / 10
        console.log("...");
        handleCancel()
    }

    const handleCancelButton = () => {

    }

    return (
        <div className="setting">
            <div className="setting-content modal-content">
                <h1 className="h1">設定</h1>
                <div className="fields">
                    <Field 
                        label={
                            <button onClick={handleOnOffMusic}>音楽</button>
                        }
                        content={
                            <Volume handleVolume={handleVolumeMusic} currentVolume={musicVolume.current} />
                        }
                    />
                    <Field
                        label={
                            <button>サウンド</button>
                        }
                        content={
                            <Volume handleVolume={handleVolumeSound} currentVolume={soundVolume.current} />
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
                        <button className="button-cancel" onClick={}>キャンセル</button>
                        <button className="button-ok" onClick={() => handleOkButton()}>完了</button>
                    </div>
                </div>
            </div>
        </div>
    )
}