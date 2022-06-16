import React from "react";
import { Link } from "react-router-dom";
import '../css/Navbar.css'
const Navbar = () => {
    return (
        <div className="nav-bar">
           <span className="game-name">ブラックジャック王様</span>
           <div className="nav-option">
                <Link to={'user'} className="nav-link"><i className="fa-solid fa-cart-shopping"></i></Link>
                <Link to={'store'} className="nav-link"> <i className="fa-solid fa-circle-user"></i></Link>
               
           </div>
        </div>

    )
}
export default Navbar