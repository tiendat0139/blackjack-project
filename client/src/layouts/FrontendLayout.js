import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import TopScreen from "../pages/TopScreen";
import Navbar from "./Navbar";
import MyCasino from "../pages/MyCasino";
import ProtectedRoute from "../components/ProtectedRoute";
import BlackJack from "../pages/BlackJack";
import Store from "../pages/Store";
import Register from "../pages/Register";
import Join from "../components/PvP/Join"
import Play from "../components/PvP/Play"
import BlackJackPVP from "../pages/BlackJackPVP";
import ThemeProvider from "../provider/ThemeProvider";
import AudioProvider from "../provider/AudioProvider";
import LoginComponent from "../pages/LoginComponent";
import Notifi from "../components/Notifi";
import "../css/button.css"
import Lucky from "../components/Lucky";
import Profile from "../pages/Profile";
import socket from "../components/Socket";
import Next from "../components/PvP/Next";

export default class FrontendLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
        user: null,
        loggedIn: false
    };
    this.handleAuth = this.handleAuth.bind(this);
  }

    handleAuth(user){
        this.setState({user: user, loggedIn: true}, () => {
            console.log(user)
            console.log('Okay you can play this game!');
        });
    }
    render(){
        return (
            <ThemeProvider>
                <AudioProvider>
                    {this.state.user && (
                        <>
                            <Navbar
                                user={this.state.user}
                                onLogout={() => {
                                    this.setState({user: null}, () => {
                                        console.log('Logged out!!');
                                    });
                                    //socket.disconnect()
                                }} />
                            <Notifi />
                        </>)}
                    <Routes>
                        <Route path="/register" element={<Register user={this.state.user}/>}></Route>
                        <Route path="/login" element={<LoginComponent user={this.state.user} onSubmit={this.handleAuth} />}></Route>
                        <Route element={<ProtectedRoute user={this.state.user} />}>
                            <Route path="/" element={<TopScreen/>}></Route>
                            <Route path='/pve' element={<BlackJack user={this.state.user} />}></Route>
                            <Route path="/my-casino" element={<MyCasino user={this.state.user} />}></Route>
                            <Route path="/pvp" element={<Join />}></Route>
                            <Route path="/pvp/waiting-room/:roomCode" element={<Play user={this.state.user} />}></Route>
                            <Route path="/pvp/play/:roomCode" element={<BlackJackPVP user={this.state.user} />}></Route>
                            <Route path="/pvp/next" element={<Next />}></Route>
                            <Route path="/profile" element={<Profile user={this.state.user} />}></Route>
                            <Route path="/profile/:userId" element={<Profile user={this.state.user} />}></Route>
                            <Route path="/rule" element={<BlackJack user={this.state.user} />}></Route>
                            <Route path="/store/" element={<Store />}></Route>
                            <Route path="/store/category/:id" element={<Store />}></Route>
                            <Route path="/store/lucky" element={<Lucky user={this.state.user} />}></Route>
                            {/* <Route path='/profile' element={<BlackJack/>}></Route>
                            <Route path='/setting' element={<BlackJack/>}></Route> */}
                        </Route>
                    </Routes>
                </AudioProvider>
            </ThemeProvider>
        );
    }  
}
