import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../css/Avatar.css';

function Avatar({user}) {

    const [avatar, setAvatar] = useState(null);
    const [isDefault, setIsDefault] = useState(true);

    useEffect(() => {
        Axios.post('http://localhost:5000/avatar', {
            user_id: user.user_id
        })
        .then((response) => {
            const image = response.data[0].avatar;
            if (image){
                setAvatar(image);
                setIsDefault(false);
            } else {
                console.log("use default avatar instead");
            }
            
        })
    }, []);

    return (
        <div className="avatar-wrapper">
            {!isDefault && <img src={avatar} alt="" id="avatar" className='nav-avatar'/>}
            {isDefault && <i className="fa-solid fa-circle-user nav-default"></i>}
        </div>
    )
}

export default Avatar