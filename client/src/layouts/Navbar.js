import React, { memo, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Setting from "../pages/setting/Setting";
import '../css/Navbar.css'
import "../css/components/modal.css"
import "../css/components/window.css";
import { Modal } from "@material-ui/core";

const Navbar = ({ user, onLogout }) => {
    const [isShowSettingModal, setShowSettingModal] = useState(false)

    const handleShowSetting = () => {
        setShowSettingModal(true)
    }

    const handleCancelSettingModal = () => {
        setShowSettingModal(false)
    }

    return (
        <>
            <div className="nav-bar">
            <span className="game-name">ブラックジャック王様</span>
            <div className="nav-option">
                    <Link to={'/store'} className="nav-link"><i className="fa-solid fa-cart-shopping"></i></Link>
                    <Link to={'#'} className="nav-link nav-user"> 
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
                                    <Link to={'/login'} className="nav-dropdown_item">
                                        <span onClick={onLogout}>Logout</span>
                                    </Link>
                                </li>
                                <li>
                                    <div className="nav-dropdown_item" onClick={handleShowSetting}>設定</div>
                                </li>
                            </ul>
                        </div>
                    </Link>
            </div>
            </div>
            {isShowSettingModal && (
                <Modal
                    open={isShowSettingModal}
                    onClose={handleCancelSettingModal}
                >
                    <Setting handleCancel={handleCancelSettingModal} />
                </Modal>
            )}
        </>
    )
}
export default memo(Navbar)