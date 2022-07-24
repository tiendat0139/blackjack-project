import React, { useState } from "react";
import {Link} from 'react-router-dom'
import randomString from "../../../src/utils/generateString";
import '../../css/PvPMode.css'
import pvptext from '../../assets/img/pvptext.png'

const PvPMode = () => {
    const [code, setCode] = useState('')
    return(
        <div className="pvpmode">
            <div className="pvpmode-join">
                <div className="join-form">
                    <input type="text" className="join-form_input" name="room_code" placeholder="Enter a room code"
                        value={code} onChange={(e) => setCode(e.target.value)}>
                    </input>
                    <Link to={`waiting-room/${code}`} className="join-form_btn">JOIN</Link>
                </div>
                <div className="text-or">
                    <img src={pvptext} alt="pvptext"></img>
                </div>
                <div className="create-form">
                    <Link to={`waiting-room/${randomString(5)}`}>
                        <button type="submit" className="create_btn">CREATE ROOM</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PvPMode