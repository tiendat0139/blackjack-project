import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import TopScreen from "../pages/TopScreen";
import Navbar from "./Navbar";
import MyCasino from "../pages/MyCasino";
import ProtectedRoute from "../components/ProtectedRoute";
import BlackJack from "../pages/BlackJack";
import LoginComponent from "../components/LoginComponent";
import Store from "../pages/Store";
import Register from "../pages/Register";
import Join from "../components/PvP/Join"
import Play from "../components/PvP/Play"
<<<<<<< HEAD
import Lucky from "../components/Lucky";
import Notifi from "../components/Notifi"
=======

>>>>>>> a4c91874b1f8964b590a5873888880fdce878c7c
export default class FrontendLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      user: 1,
    };
    this.handleAuth = this.handleAuth.bind(this);
  }

    handleAuth(user){
        this.setState({user: user}, () => {
<<<<<<< HEAD
            console.log(user)
=======
            // console.log(user)
>>>>>>> a4c91874b1f8964b590a5873888880fdce878c7c
            console.log('Okay you can play this game!');
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
                <Notifi />
                <Routes>
                    <Route path="/register" element={<Register user={this.state.user}/>}></Route>
                    <Route path="/login" element={<LoginComponent user={this.state.user} onSubmit={this.handleAuth} />}></Route>
                    <Route element={<ProtectedRoute user={this.state.user} />}>
                        <Route path="/" element={<TopScreen/>}></Route>
                        <Route path='/pve' element={<BlackJack user={this.state.user} />}></Route>
                        <Route path="/my-casino" element={<MyCasino user={this.state.user} />}></Route>
                        <Route path="/pvp" element={<Join />}></Route>
<<<<<<< HEAD
                        <Route path="/pvp/play" element={<Play user={this.state.user}/> }></Route>
=======
                        <Route path="/pvp/play" element={<Play />}></Route>
>>>>>>> a4c91874b1f8964b590a5873888880fdce878c7c
                        <Route path="/rule" element={<BlackJack user={this.state.user} />}></Route>
                        <Route path="/store/" element={<Store user={this.state.user}/>}></Route>
                        <Route path="/store/category/:id" element={<Store />}></Route>
                        <Route path="/store/lucky" element={<Lucky user={this.state.user} />}></Route>
                        {/* <Route path='/profile' element={<BlackJack/>}></Route>
                        <Route path='/setting' element={<BlackJack/>}></Route> */}
                    </Route>
                </Routes>
            </div>
        );
    }  
}
