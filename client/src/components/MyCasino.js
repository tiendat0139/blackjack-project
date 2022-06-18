import React from 'react';
import "./MyCasino.css";
import Axios from 'axios';
import { useEffect, useState } from "react";

function MyCasino(props) {

    return (
        <div className="wrapper">

            <div id="casinoimg">
                <img src="https://img.freepik.com/free-vector/casino-building-casino-night-neon-signs-gaming-house-illustration_193165-24.jpg?w=2000"/>
            </div>


            <div id="share">
                SHARE<br/>
                Under construction
            </div>


            <div id="description">
                CASINO DESCRIPTION
            </div>


            <div id="decoration">
                CASINO DECORATION<br/>
                Under construction
            </div>


            <div id="seeother">
                SEE OTHER'S<br/>
                Under construction
            </div>


            <div id="balance">
                BALANCE
            </div>


            <div id="level">
                LEVEL
            </div>


            <div id="wins">
                WINS
            </div>


            <div id="loses">
                LOSES
            </div>


            <div id="attack-other">
                ATTACK OTHER<br/>
                Under construction
            </div>


            <div id="casino-upgrade">
                CASINO UPGRADE <br/>
                Under construction<br/>
            </div>
        </div>
    );
}

export default MyCasino;