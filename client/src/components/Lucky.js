import React from 'react'
import WheelComponent from 'react-wheel-of-prizes'
import '../css/Lucky.css'
const Lucky = () => {
    const segments = [
        'item1',
        'item2',
        'item3',
        'item4',
        'item5',
        'item6'
    ]
    const segColors = ["#EE4040", "#F0CF50", "#815CD1", "#3DA5E0", "#34A24F", 'aqua']
    const onFinished = (winner) => {
        alert(winner)
    }
    return(
        <div className='lucky'>
            <h1 className='lucky-header'>WHEEL OF FORTUNE</h1>
            <div className='lucky-wheel'>
                <WheelComponent 
                    segments = {segments}
                    segColors = {segColors}
                    onFinished = {(winner) => onFinished(winner)}
                    primaryColor = '#6a51b2'
                    contrastColor='white'
                    buttonText='Spin'
                    size={1000}
                    isOnlyOnce={false}
                    upDuration={100}
                    downDuration={500}
                />
            </div>
        </div>
    )
}
export default Lucky