import React from 'react';
import "../../css/MyCasino.css";
import Axios from 'axios';
import { useEffect, useState } from "react";

function MyCasino({user}) {

    const[name, setName] = useState('');
    const[level, setLevel] = useState(null);
    const[wins, setWins] = useState(null);
    const[loses, setLoses] = useState(null);
    const[description, setDescription] = useState('');
    const[money, setMoney] = useState(0);

    useEffect(() => {
        Axios.post('http://localhost:5000/my-casino', {
            params: {
                user_id: user.user_id
            }
        })
        .then((response) => {
            let data = response.data[0];
            setName(data.name);
            setLevel(data.level);
            setWins(data.win);
            setLoses(data.lose);
            setMoney(data.money);
            setDescription(data.casino_description);
        })
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