import Axios  from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../css/Navbar.css';
import '../css/Avatar.css';
import Avatar from "../components/Avatar";
const Navbar = ({user, onLogout}) => {

    // const [avatar, setAvatar] = useState(null);
    // const [isDefault, setIsDefault] = useState(true);

    // useEffect(() => {
    //     Axios.post('http://localhost:5000/avatar', {
    //         user_id: user.user_id
    //     })
    //     .then((response) => {
    //         const image = response.data[0].avatar;
    //         if (image){
    //             setAvatar(image);
    //             setIsDefault(false);
    //         } else {
    //             console.log("use default avatar instead");
    //         }
    //     })
    // }, []);

    return (
        <div className="nav-bar">
           <span className="game-name">ブラックジャック王様</span>
           <div className="nav-option">
                <div>
                    <Link to={'/store'} className="nav-link">
                        <i className="fa-solid fa-cart-shopping"></i>
                    </Link>
                </div>
                <div>
                    <Link to={'#'} className="nav-link nav-user"> 
                        {!user && <i className="fa-solid fa-circle-user "></i>}
                        {user && <Avatar user={user}/>}
                        <i className="fa-solid fa-caret-down nav-icon_dropdown"></i>
                        <div className="nav-dropdown">
                            <ul className="nav-dropdown_list">
                                <li>
                                    <Link to={'/my-casino'} className="nav-dropdown_item">My Casino</Link>
                                </li>
                                <li>
                                    <Link to={'/profile'} className="nav-dropdown_item">プロフィール</Link>
                                </li>
                                <li>
                                    <Link to={'/login'} className="nav-dropdown_item">
                                        <span onClick={onLogout}>ログアウト</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/setting'} className="nav-dropdown_item">設定</Link>
                                </li>
                            </ul>
                        </div>
                    </Link>
                </div>
                
           </div>
        </div>

    )
}
export default Navbar