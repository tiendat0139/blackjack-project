import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Avatar from "../components/Avatar";
import Field from "../components/Setting/Field";
import "../css/profile.css"

export default function Profile({ user }) {
    const params = useParams()
    const navigate = useNavigate()
    const [u, setU] = useState()

    useEffect(() => {
        console.log(params);
        if (params.userId) {
            axios.get("http://localhost:5000/get-user", {
                params: {
                    user_id: params.userId
                }
            })
                .then(res => {
                    console.log(res.data);
                })
        } else {
            console.log(user);
            axios.get("http://localhost:5000/get-user", {
                params: {
                    user_id: user.user_id
                }
            })
                .then(res => {
                    console.log(res.data[0]);
                    setU(res.data[0])
                })
        }

        console.log("profile");
    }, [])

    return (
        <div className="profile">
            {u && (
                <div className="profile-content">
                    <div className="header-profile">
                        <div className="avatar-profile">
                            <Avatar user={user} active={false} />
                        </div>
                        <div
                            style={{
                                width: "80%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center"
                            }}
                        >
                            <div style={{ display: "flex", justifyContent: "left", fontSize: "20px" }}>
                                {u.name}
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    width: "200px",
                                    justifyContent: "space-between"
                                }}
                            >
                                <div>レベル：{u.level}</div>
                                <div>コイン：{u.money}</div>
                            </div>
                        </div>
                    </div>
                    <div className="body-profile">
                        <Field
                            label={"性別"}
                            content={u.gender === "male" ? "男" : "女"}
                        />
                        <Field
                            label={"年齢"}
                            content={u.age}
                        />
                        <Field
                            label={"メール"}
                            content={u.mail}
                        />
                        <Field
                            label={"パスワード"}
                            content={u.user_id === user.user_id ? u.password : u.password.replace("\d?\w?", "*")}
                        />
                        <div>
                            <Field
                                label={"カジノ"}
                                content={
                                    <div>
                                        <div>{u.casino_name}</div>
                                        <button className="button-other" onClick={() => navigate("/my-casino")}>見る</button>
                                    </div>
                                }
                            />
                        </div>
                    </div>
                    {u?.user_id === user.user_id && (
                        <div className="button-profile">
                            <button className="button-ok">編集</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}