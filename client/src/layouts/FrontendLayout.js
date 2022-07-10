import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import TopScreen from "../pages/top/TopScreen";
import Navbar from './Navbar';
import MyCasino from '../pages/mycasino/MyCasino';
import ProtectedRoute from "../middleware/ProtectedRoute";
import BlackJack from "../pages/play/BlackJack";
import LoginComponent from "../components/LoginComponent";
import "../css/components/button.css"
import "../css/components/modal.css"
import AudioProvider from "../provider/AudioProvider";
import ThemeProvider from "../provider/ThemeProvider";
import PvPMode from "../pages/PvP/Join";
import PvPPlay from "../pages/PvP/Play";
import BlackJackPVP from "../pages/PvP/BlackJackPVP";

export default class FrontendLayout extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: null
        };
        this.handleAuth = this.handleAuth.bind(this);
    }

    handleAuth(newUser){
        this.setState({user: newUser}, () => {
            console.log('Okay you can go everywhere!');
        });
    }

    render(){
        return (
            <AudioProvider>
                <ThemeProvider>
                    <Navbar user={this.state.user} onLogout={() => {
                        this.setState({user: null}, () => {
                            console.log('Logged out!!');
                        });
                    }}/>
                    <Routes>
                        <Route path="/login" element={<LoginComponent user={this.state.user} onSubmit={this.handleAuth} />}></Route>
                        <Route element={<ProtectedRoute user={this.state.user} />}>
                            <Route path="/" element={<TopScreen/>}></Route>
                            <Route path='/pve' element={<BlackJack user={this.state.user} />}></Route>
                            <Route path="/my-casino" element={<MyCasino user={this.state.user} />}></Route>
                            <Route path='/profile' element={<BlackJack/>}></Route>
                            {/* <Route path='/setting' element={<BlackJack/>}></Route> */}
                            <Route path='/store' element={<BlackJack />}></Route>
                            <Route path="/pvp/*" element={<PvPMode/>}></Route>
                            <Route path="/pvp/waiting-room/:roomCode" element={<PvPPlay user={this.state.user} />}></Route>
                            <Route path="/pvp/play/:roomCode" element={<BlackJackPVP user={this.state.user} />}></Route>
                        </Route>
                    </Routes>
                </ThemeProvider>
            </AudioProvider>
        );
    }  
}
