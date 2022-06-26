import React from 'react';
import "../css/MyCasino.css";
import Axios from 'axios';
import { useEffect, useState } from "react";

function MyCasino(props) {

    // eslint-disable-next-line no-unused-vars
    const[name, setName] = useState('');
    const[level, setLevel] = useState(null);
    const[wins, setWins] = useState(null);
    const[loses, setLoses] = useState(null);
    const[description, setDescription] = useState('');
    const[money, setMoney] = useState(0);

    useEffect(() => {
        Axios.get('http://localhost:5000/my-casino').then((response) => {
            console.log(response.data[1]);
            setName(response.data[1].name);
            setLevel(response.data[1].level);
            setWins(response.data[1].win);
            setLoses(response.data[1].lose);
            setDescription(response.data[1].casino_description);
            setMoney(response.data[1].money);
        });
    },[]);

    const handleClick = () => {
        setLevel(prevLevel => prevLevel + 1);
    }

    return (
        <div className="wrapper">

            <div id="casinoimg">
                <img src="https://img.freepik.com/free-vector/casino-building-casino-night-neon-signs-gaming-house-illustration_193165-24.jpg?w=2000" alt=""/>
            </div>


            <div id="share">
                シェア<br/>
                Under construction...
            </div>


            <div id="description">
                カジノ説明<br/>
                {description}
            </div>


            <div id="decoration">
                飾り付ける<br/>
                Under construction...
            </div>


            <div id="seeother">
                他人のカジノを見る<br/>
                Under construction...
            </div>


            <div id="balance">
                残高<br/>
                {money}
            </div>


            <div id="level">
                レベル<br/>
                {level}
            </div>


            <div id="wins">
                勝ち回数<br/>
                {wins}
            </div>


            <div id="loses">
                負け回数<br/>
                {loses}
            </div>


            <div id="attack-other">
                他人に戦い<br/>
                Under construction...
            </div>


            <div id="casino-upgrade">
                <div>
                    <button onClick={handleClick}>カジノアップグレイド</button>
                </div>
            </div>
        </div>
    );
}

export default MyCasino;