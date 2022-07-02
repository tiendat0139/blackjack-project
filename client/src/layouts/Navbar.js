import React from "react";
import { Link } from "react-router-dom";
import '../css/Navbar.css'
const Navbar = () => {
    return (
        <div className="nav-bar">
           <span className="game-name">ブラックジャック王様</span>
           <div className="nav-option">
                <Link to={'/store'} className="nav-link"><i className="fa-solid fa-cart-shopping"></i></Link>
                <div to={'#'} className="nav-link nav-user"> 
                    <i className="fa-solid fa-circle-user "></i>
                    <i className="fa-solid fa-caret-down nav-icon_dropdown"></i>
                    <div className="nav-dropdown">
                        <ul className="nav-dropdown_list">
                            <li >
                                <Link to={'/my-casino'} className="nav-dropdown_item">My Casino</Link>
                            </li>
                            <li>
                                <Link to={'/profile'} className="nav-dropdown_item">プロフィール</Link>
                            </li>
                            <li>
                                <Link to={'/logout'} className="nav-dropdown_item">ログアウト</Link>
                            </li>
                            <li>
                                <Link to={'/setting'} className="nav-dropdown_item">設定</Link>
                            </li>
                        </ul>
                    </div>
                </div>
           </div>
        </div>

    )
}
export default Navbar