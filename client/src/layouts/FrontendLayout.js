import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import TopScreen from "../components/TopScreen";
import Navbar from './Navbar';
import MyCasino from '../components/MyCasino';
import ProtectedRoute from "../components/ProtectedRoute";
import BlackJack from "../BlackJack";
import LoginComponent from "../components/LoginComponent";
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
                        <Route path='/store' element={<BlackJack/>}></Route>
                    </Route>
                </Routes>
            </div>
        );
    }  
}