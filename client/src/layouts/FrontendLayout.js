import React from "react";
import { Routes, Route } from "react-router-dom";
import TopScreen from "../components/TopScreen";
import Navbar from './Navbar';
import Login from '../components/Login'
import MyCasino from '../components/MyCasino';
import PvPMode from '../components/PvP/Join'
import PvPPlay from "../components/PvP/Play";
const FrontendLayout = () => {
    return (
        <div>
            <Navbar/>
            <Routes>
                <Route path="/" element={<TopScreen />}></Route>
                <Route path="/my-casino" element={<MyCasino/>}></Route>
                <Route path="/pvp/*" element={<PvPMode/>}></Route>
                <Route path="/pvp/play" element={<PvPPlay/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
            </Routes>
        </div>
    );
}
export default FrontendLayout