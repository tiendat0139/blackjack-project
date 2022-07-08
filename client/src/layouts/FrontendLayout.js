import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import TopScreen from "../components/TopScreen";
import Navbar from './Navbar';
import Login from '../components/Login'
import MyCasino from '../components/MyCasino';
<<<<<<< HEAD
import PvPMode from '../components/PvP/Join'
import PvPPlay from "../components/PvP/Play";
import Notifi from "../components/Notifi";

const FrontendLayout = () => {
    return (
        <div>
            <Navbar/>
            <Notifi />
            <Routes>
                <Route path="/" element={<TopScreen />}></Route>
                <Route path="/my-casino" element={<MyCasino/>}></Route>
                <Route path="/pvp/*" element={<PvPMode/>}></Route>
                <Route path="/pvp/play" element={<PvPPlay/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
            </Routes>
        </div>
    );
=======
import ProtectedRoute from "../components/ProtectedRoute";
import BlackJack from "../BlackJack";
import LoginComponent from "../components/LoginComponent";
import Store from "../components/Store";

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
            <div>
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
                        <Route path='/setting' element={<BlackJack/>}></Route>
                        <Route path="/store/" element={<Store />}></Route>
                        <Route path="/store/category/:id" element={<Store />}></Route>
                    </Route>
                </Routes>
            </div>
        );
    }  
>>>>>>> 7ec37440df49fb67471bcb2a3b5f0343725826c5
}
