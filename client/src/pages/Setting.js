import "../css/Setting.css"
import { useContext, useEffect, useState } from "react";
import { Modal } from "@material-ui/core";
import { AudioContext } from "../provider/AudioProvider";
import { ThemeContext } from "../provider/ThemeProvider";
import Field from "../components/Setting/Field";
import Volume from "../components/Setting/Volume";
import Switch from "../components/Switch";
import Parterns from "../components/Setting/Parterns";

export default function Setting({ handleCancel }) {
    const { bgMusic, sound } = useContext(AudioContext)
    const { pattern, setPattern } = useContext(ThemeContext)

    const [musicVolume, setMusicVolume] = useState({ before: bgMusic.volume * 10, current: bgMusic.volume * 10 })
    const [soundVolume, setSoundVolume] = useState({ before: sound.hitSound.volume * 10, current: sound.hitSound.volume * 10 })
    const [parterns, setPaterns] = useState([])
    const [isShowParternsModal, setShowParternsModal] = useState(false)
    const [pt, setPt] = useState({before: pattern, current: pattern})

    useEffect(() => {
        setPaterns([
            "https://i.pinimg.com/originals/84/ef/a0/84efa011d7c90e6337eedcbec1af8a9f.jpg",
            "https://i.pinimg.com/564x/2b/a9/74/2ba97487cf23a83e749ef77aba864c59.jpg",
            "https://i.pinimg.com/564x/14/05/b3/1405b33a082c28c4cf83bc4cf7f24a5e.jpg",
            "https://i.pinimg.com/750x/f1/95/9a/f1959a6854badbc46f52f281de9fd223.jpg",
            "https://i.pinimg.com/564x/0f/04/1c/0f041c5568fefde36f110f91a2e15e94.jpg",
            "https://i.pinimg.com/564x/c7/39/4e/c7394ed4f44d827024f0974324b32acb.jpg"
        ])
    }, [])

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

    const handlePaterns = () => {
        setShowParternsModal(true)
    }

    const handlePatern = (pattern) => {
        setPt({
            ...pt,
            current: pattern
        })
        setShowParternsModal(false)
    }

    const handleOkButton = () => {
        bgMusic.volume = musicVolume.current / 10
        sound.hitSound.volume = soundVolume.current / 10
        sound.standSound.volume = soundVolume.current / 10
        sound.nextSound.volume = soundVolume.current / 10
        setPattern(pt.current)
        console.log("...");
        handleCancel()
    }

    const handleCancelButton = () => {
        bgMusic.volume = musicVolume.before / 10
        sound.hitSound.volume = soundVolume.before / 10
        sound.standSound.volume = soundVolume.before / 10
        sound.nextSound.volume = soundVolume.before / 10
        setPattern(pt.before)
        handleCancel()
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
                            <button>パータン</button>
                        }
                        content={
                            <button onClick={handlePaterns} style={{ backgroundColor: "#FF0000", padding: "8px", borderRadius: "20px" }}>パータンのライブラリ</button>
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
                        <button className="button-cancel" onClick={handleCancelButton}>キャンセル</button>
                        <button className="button-ok" onClick={() => handleOkButton()}>完了</button>
                    </div>
                </div>
            </div>
            <Modal 
                open={isShowParternsModal}
                onClose={() => setShowParternsModal(false)}
            >
                <Parterns parterns={parterns} handlePartern={handlePatern}  />
            </Modal>
        </div>
    )
}