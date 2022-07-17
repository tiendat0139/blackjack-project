import React from 'react'
import { Link } from 'react-router-dom'
import '../css/TopScreen.css'
const TopScreen = () => {
    return (
        <div className="top-screen">
            <div className="game-option">
                <Link to={'/pve'} className="game-option_item">PVE モード</Link>
                <Link to={'/pvp'} className="game-option_item">PVP モード</Link>
                <Link to={'/rule'} className="game-option_item">ルールと挑戦</Link>
            </div>
        </div>
    )
}
export default TopScreen