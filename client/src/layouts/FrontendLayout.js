import React from "react";
import { Routes, Route } from "react-router-dom";
import TopScreen from "../components/TopScreen";
import Navbar from './Navbar';
import MyCasino from '../components/MyCasino';
const FrontendLayout = () => {
    return (
        <div>
            <Navbar/>
            <Routes>
                <Route path="/" element={<TopScreen />}></Route>
                <Route path="/my-casino" element={<MyCasino/>}></Route>
            </Routes>
        </div>
    );
}
export default FrontendLayout