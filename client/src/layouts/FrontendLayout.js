import React from "react";
import { Routes, Route } from "react-router-dom";
import TopScreen from "../components/TopScreen";
import Navbar from './Navbar'
const FrontendLayout = () => {
    return (
        <div>
            <Navbar/>
            <Routes>
                <Route path="/" element={<TopScreen />}></Route>
            </Routes>
        </div>
    )
}
export default FrontendLayout