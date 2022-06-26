import React from 'react';
import Axios from 'axios';
import { useState } from 'react';
import '../css/Auth.css';
import '../css/Tailwindcss.css';
import { useNavigate } from "react-router-dom";

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = () => {
        Axios.post('http://localhost:5000/login',{
            username: username,
            password: password
        }).then((response) => {
            const isLoggedIn = response.data.length;
            if (isLoggedIn) {
                console.log('Logged in successfully');

                if(localStorage.getItem('username')) localStorage.clear()
                localStorage.setItem('username', username)
                navigate("/", {replace: true});
            }
            else console.log('Failure to log in: Incorrect incredential');
        });
    }

    return (
        <div id="form-login">
            <div className="auth-card">
                <div id="form-title" className="mb-4">
                    ログイン
                </div>
                <div className="mb-3 auth-input-label">
                    <label className='mr-4'>ユーザー名</label>
                    <input type="text" placeholder="Username" onChange={({target}) => {
                        setUsername(target.value);
                    }}/>
                </div>
                <div className="mb-3 auth-input-label">
                    <label className='mr-4'>パスワード</label>
                  <input type="password" placeholder="Password" onChange={({target}) => {
                    setPassword(target.value);
                  }}/>
                </div>
                <div className="button-div">
                    <button type="button" className="w-40 h-10 button-submit" onClick={handleLogin}>ログイン</button>
                </div>
            </div>
        </div>
    );
}

export default Login;