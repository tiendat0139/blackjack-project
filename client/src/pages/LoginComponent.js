import React, { Component } from 'react';
import Axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import '../css/Auth.css';
import '../css/Tailwindcss.css';
import socket from '../components/Socket';

export default class LoginComponent extends Component {
    constructor (props){
        super(props);
        this.state = {
            username: null,
            password: null,
            user_id: null
        };
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.setUserID = this.setUserID.bind(this);
    }

    onChangeUsername({target}){
        const newUsername = target.value;
        this.setState({username: newUsername});
    }

    onChangePassword({target}){
        const newPassword = target.value;
        this.setState({password: newPassword});
    }
    setUserID(id){
        this.setState({user_id: id});
    }

    handleLogin(){
        Axios.post('http://localhost:5000/login', {
            username: this.state.username,
            password: this.state.password
        }).then((response) => {
            const isLoggedIn = response.data.length;
            if (isLoggedIn) {
                let id = response.data[0].user_id;
                this.setState({user_id: id}, () => {
                    this.props.onSubmit(this.state);
                });
                socket.emit("join", { username: this.state.username, user_id: id })
            } else {
                console.log('Failed to log in: Incorrect credentials');
            }
        });
    }

    render() {
        if (this.state.user_id) {
            return (
                <Navigate to={"/"} replace/>
            );
        }
        return (
            <div id="form-login">
                <div className="auth-card">
                    <div id="form-title" className="mb-4">
                        ログイン
                    </div>
                    <div className="mb-3 auth-input-label">
                        <label className='mr-4'>ユーザー名</label>
                        <input type="text" placeholder="" onChange={this.onChangeUsername}/>
                    </div>
                    <div className="mb-3 auth-input-label">
                        <label className='mr-4'>パスワード</label>
                        <input type="password" placeholder="" onChange={this.onChangePassword}/>                 
                    </div>
                    <div className='flex flex-row justify-center'>
                        <Link to={'/register'} className="register-link"><span style={{color: "white"}}>アカウントない？</span>サインアップ</Link>
                        <Link to={'/password-reset'} className="register-link">パスワードを忘れ？</Link>
                    </div>
                    <div className="button-div">
                        <button type="button" className="w-40 h-10 button-submit" onClick={this.handleLogin}>ログイン</button>
                    </div>
                </div>
            </div>
        );
    }
}
