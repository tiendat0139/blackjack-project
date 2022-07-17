import React, { useState } from 'react';
import Axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import '../css/Auth.css';
import '../css/Tailwindcss.css';

function Register({user}) {

    const initialValues = {
        username: '',
        password: '',
        confirmPassword: '',
        name: '',
        email: '',
        gender: '',
        age: '',
        casinoName: '',
        casinoDesc: '',
    }

    const initialErrors = {
        username: '',
        password: '',
        name: '',
        email: '',
        casinoName: ''
    };

    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState(initialErrors);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prev => {
            return { ...prev, [name]: value };
        });
        setFormErrors(initialErrors);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmitted(true);
        if(Object.keys(validate(formValues)).length === 0 && isSubmitted){
            Axios.post('http://localhost:5000/register', {
                username: formValues.username,
                password: formValues.password,
                email: formValues.email,
                name: formValues.name,
                gender: formValues.gender,
                age: formValues.age,
                casinoName: formValues.casinoName,
                casinoDesc: formValues.casinoDesc
            }).then((response) => {
                if(response.data){
                    setIsRegister(true);
                } else {
                    setIsRegister(false);
                    // setSuccessMessage('ユーザー名　「' + formValues.username + '」はもう保存している。');
                    alert('ユーザー名「' + formValues.username + '」はもう存在している。');
                }
            });
        }
    }
    
    const validate = (values) => {
        const errors = {};
        const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!values.username){
            errors.username = "ユーザー名は必須入力！";
        } else if (values.username.length > 45 || values.username.length < 6){
            errors.username = "ユーザー名は6から45まで!";
        }
        if (!values.password){
            errors.password = "パスワードは必須入力！";
        } else if (values.password.length < 5 || values.password.length > 31){
            errors.password = "パスワードの長さは5から31まで！";
        } else if (!values.confirmPassword){
            errors.password = "パスワード確認は必須入力！";
        } else if (values.confirmPassword !== values.password){
            errors.password = "パスワードとパスワード確認は違います！";
        }
        if (!values.name){
            errors.name = "氏名は必須入力！";
        } else if (values.name.length > 30 || values.name.length < 4){
            errors.name = "氏名は４から３０まで！";
        }
        if (!values.casinoName){
            errors.casinoName = "カジノ名前は必須入力！";
        } else if (values.casinoName.length > 10 || values.casinoName.length < 4){
            errors.casinoName = "カジノ名前は４から１０まで！";
        }
        if (!regexEmail.test(values.email) && values.email.length > 0){
            errors.email = "メールアドレスはinvalid!";
        }
        return errors;
    }

    if (isRegister){
        return <Navigate to={"/login"} replace/>;
    }

    return (
        <div id="form-register">
            <div className='register-card'>
                <div id="form-title" className="mb-4">
                        サインアップ
                </div>
                <div className='register-two-div'>
                    <div className="register-div">
                        { successMessage && <p className='text-xl text-red-500'>{successMessage}</p>}
                        { formErrors.username && <p className='text-sm text-red-500'>{formErrors.username}</p>}
                        <div className="mb-3 auth-input-label">
                            <input type="text" placeholder='ユーザー名' onChange={handleChange} name="username"/>
                        </div>
                        { formErrors.name && <p className='text-sm text-red-500'>{formErrors.name}</p>}
                        <div className="mb-3 auth-input-label">
                            <input type="text" placeholder='氏名' onChange={handleChange} name="name"/>
                        </div>
                        {formErrors.email && <p className='text-sm text-red-500'>{formErrors.email}</p>}
                        <div className="mb-3 auth-input-label">
                            <input type="text" placeholder='メールアドレス' onChange={handleChange} name="email"/>
                        </div>
                        {formErrors.password && <p className='text-sm text-red-500'>{formErrors.password}</p>}
                        <div className="mb-3 auth-input-label">
                            <input type="password" placeholder="パスワード" onChange={handleChange} name="password"/>
                        </div>
                        <div className="mb-3 auth-input-label">
                            <input type="password" placeholder="パスワード確認" onChange={handleChange} name="confirmPassword"/>
                        </div>
                    </div>

                    <div className='register-div'>
                        <div className="mb-3 auth-input-label">
                            <input type="text" placeholder='性別' onChange={handleChange} name="gender"/>
                        </div>
                        <div className="mb-3 auth-input-label">
                            <input type="number" placeholder='年齢' onChange={handleChange} name="age"/>
                        </div>
                        {formErrors.casinoName && <p className='text-sm text-red-500'>{formErrors.casinoName}</p>}
                        <div className="mb-3 auth-input-label">
                            <input type="text" placeholder='カジノ名前' onChange={handleChange} name="casinoName"/>
                        </div>
                        <div className="mb-3 auth-input-label">
                            <input type="text" placeholder='カジノ説明' onChange={handleChange} name="casinoDesc"/>
                        </div>
                        
                    </div>
                </div>

                <div className='flex flex-row justify-center'>
                    <Link to={'/login'} className="register-link">もうアカウント持っている？</Link>
                    <Link to={'/login'} className="register-link">Facebookでサインアップ?</Link>
                </div>

                <div className="button-div">
                    <button type="button" className="w-40 h-10 button-submit" onClick={handleSubmit}>サインアップ</button>
                </div>
            </div>
        </div>
    )
}

export default Register
