import "../../css/volume.css"

const volumes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export default function Volume({ handleVolume, currentVolume }) {
    return (
        <div className="volumes">
            {volumes.map(volume => {
                return (
                    <button key={volume} className={currentVolume == volume ? "volume-selected" : "volume"} onClick={() => handleVolume(volume)}>{volume}</button>
                )
            })}
        </div>
    )
}