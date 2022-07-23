import { useNavigate } from "react-router-dom"
import "../css/avatar.css"

export default function Avatar({ user, size = "64px", sizeAvt = "32px", active = false }) {
    const navigate = useNavigate()

    const handleAvatar = () => {
        navigate(`/profile/${user.user_id}`)
    }

    return (
        <div
            className="avatar"
            style={{
                width: size,
                height: size,
                cursor: "pointer"
            }}
            onClick={active ? handleAvatar : () => {}}
        >
            {user.avatar ? (
                <img src={user.avatar} />
            ) : (
                <i className="fa-solid fa-user" style={{ fontSize: sizeAvt }}></i>
            )}
        </div>
    )
}