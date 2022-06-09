import './auth.css'
import React, { useState } from 'react'
import { batch, useDispatch } from "react-redux";
import Button from '../button/Button'
import authSlice, { signIn } from "./authSlice";
import { AiOutlineUser} from 'react-icons/ai'
import { FaKey } from 'react-icons/fa'
import { GrClose } from 'react-icons/gr'

const Login = () => {
    const dispatch = useDispatch()
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    })
    const {username, password} = loginForm
    const [error, setError] = useState({
        username: '',
        password: '',
        message: ''
    })

    const handleLoginOnclick = () => {
        dispatch(authSlice.actions.loginBoxChangeStatus())
    } 

    const handleRegisterOnclick = () => {
        batch(() => {
            dispatch(authSlice.actions.loginBoxChangeStatus())
            dispatch(authSlice.actions.registerBoxChangeStatus())
        })
    }

    const handleLoginFormChange = (event) => {
        const {name, value} = event.target

        setLoginForm({...loginForm, [name]: value})

        switch(name) {
            case 'username': 
                value.length < 6 ? setError({...error, username: 'Username must be more than 6 character'}) : setError({...error, username: ''})
                break;
            case 'password':
                value.length < 6 ? setError({...error, password: 'Password must be more than 6 character'}) : setError({...error, password: ''})
                break;
            default: return error
        }
    }

    const handleLoginFormSubmit = (event) => {
        event.preventDefault()
        dispatch(
            signIn(loginForm)
        ).then((res) => {
            if(res.payload.error){
                const errorResponse = res.payload.error.response

                return errorResponse ? setError({...error, message: errorResponse.data.message}) : setError({...error, message: ''})    
            }
            return dispatch(authSlice.actions.loginBoxChangeStatus())
        })
    }

    return (
        <div className="auth">
            <div className="auth-container">
                <div className="close-box">
                    <Button onClick={handleLoginOnclick} type='button' buttonStyle='btn-none' buttonSize='btn-large'>
                        <GrClose/>
                    </Button>
                </div>
                <div className="auth-name-box">
                    <h2 className="auth-name">Login</h2>
                </div>
                {error.message && <span className='error-massage'>{error.message}</span>}
                <form className="auth-form" onSubmit={handleLoginFormSubmit}>
                    <div className="auth-field">
                        <label>Username</label>
                        <div className="auth-input">
                            <AiOutlineUser/>
                            <input type="text" placeholder='Username' name='username' value={username} onChange={handleLoginFormChange}/>
                        </div>
                        {error.username && <span className='error-massage'>{error.username}</span>}
                    </div>
                    <div className="auth-field">
                        <label>Password</label>
                        <div className="auth-input">
                            <FaKey/>
                            <input type="password" placeholder='Password' name='password' value={password} onChange={handleLoginFormChange}/>
                        </div>
                        {error.password && <span className='error-massage'>{error.password}</span>}
                    </div>
                    <div className="others-box">
                        <ul className="others">
                            <li className="decoration" onClick={handleRegisterOnclick}>Register</li>
                            <li><a href="/reset-password">Forgot Password?</a> </li>
                        </ul>
                    </div>                
                    <Button type='submit' buttonStyle='btn-submit-auth' buttonSize='btn-overside-auth'>
                        Login
                    </Button>
                </form>
                
            </div>
        </div>
    )
}

export default Login