import React from "react";
import "../css/MyCasino.css";
import Axios from "axios";
import { useEffect, useState, useRef } from "react";
import CasinoImg from "../assets/img/casino.png";

function MyCasino({ user }) {
  const [name, setName] = useState("");
  const [level, setLevel] = useState(null);
  const [wins, setWins] = useState(null);
  const [loses, setLoses] = useState(null);
  const [description, setDescription] = useState("");
  const [money, setMoney] = useState(0);
  const [item, setItem] = useState([]);
  const canvas = useRef(null);

  useEffect(() => {
    let ctx = canvas.current.getContext("2d");
    var image = new Image();
    image.src = CasinoImg;
    var scale = Math.min(canvas.current.width / image.width, canvas.current.height / image.height);
    var x = (canvas.current.width / 2) - (image.width / 2) * scale;
    var y = (canvas.current.height / 2) - (image.height / 2) * scale;
    ctx.drawImage(image, x, y, image.width * scale, image.height * scale);

    Axios.post("http://localhost:5000/my-casino", {
      params: {
        user_id: user.user_id,
      },
    }).then((response) => {
      console.log(response)
      let data = response.data[0];
      setName(data.name);
      setLevel(data.level);
      setWins(data.win);
      setLoses(data.lose);
      setMoney(data.money);
      setDescription(data.casino_description);
    });
    async function fetchData() {
      let id = user.user_id;
      let result = await fetch(`http://localhost:5000/useritem/${id}`);
      result = await result.json();
      setItem(result);
    }
    fetchData();
  }, []);

  const handleClick = () => {
    setLevel((prevLevel) => prevLevel + 1);
  };
  console.log(user)
  return (
    <div className="wrapper">
      <canvas ref={canvas}></canvas>
      <div id="share">
        シェア
        <br />
        Under construction...
      </div>

      <div id="description">
        カジノ説明
        <br />
        {description}
      </div>

      <div id="decoration">
        飾り付ける
        <br />
        Under construction...
      </div>

      <div id="seeother">
        他人のカジノを見る
        <br />
        Under construction...
      </div>

      <div id="balance">
        残高
        <br />
        {money}
      </div>

      <div id="level">
        レベル
        <br />
        {level}
      </div>

      <div id="wins">
        勝ち回数
        <br />
        {wins}
      </div>

      <div id="loses">
        負け回数
        <br />
        {loses}
      </div>

      <div id="itemlist">
        {item.map((item) => (
          <>
            <p>{item.item_name}</p>
            <button style={{ color: "yellow" }}>Decorate</button>
            <button style={{ color: "red" }}>Remove</button>
          </>
        ))}
        <br />
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
