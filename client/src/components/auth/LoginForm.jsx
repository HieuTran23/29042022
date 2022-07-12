import './form.css'
import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { authContainerSelector } from '../../redux/auth/auth.selector';
import Button from '../buttons/Button'
import authSlice, { signIn } from "../../redux/auth/auth.slice";
import { AiOutlineUser} from 'react-icons/ai'
import { FaKey } from 'react-icons/fa'
import { GrClose } from 'react-icons/gr'
import { LOGIN_FORM } from '../../utils/constants/component.constant';
import { motion } from 'framer-motion'


const LoginForm = ({handleCloseAuthOnclick}) => {
    const authContainer = useSelector(authContainerSelector)
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
            return dispatch(authSlice.actions.authContainerChangeStatus(''))
        })
    }

    const handleAuthOnclick = () => {
        if(authContainer.container !== LOGIN_FORM){
            dispatch(authSlice.actions.authContainerChangeStatus(LOGIN_FORM))
        }
    }

    const authBox = (
        <>
        
        <motion.form 
            className="auth-form"
            style={{
                opacity: 0
            }}
            animate = {authContainer.container ===LOGIN_FORM && {
                opacity: 1
            }}
            transition = {{
                delay: 0.7
            }}
            onSubmit={handleLoginFormSubmit}
        >
            {error.message && <span className='error-massage'>{error.message}</span>}
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
                    <li><a href="/reset-password">Forgot Password?</a> </li>
                </ul>
            </div>                
            <Button type='submit' buttonStyle='btn-submit-auth' buttonSize='btn-overside-auth'>
                Login
            </Button>
        </motion.form>
        </>
    )

    return (
        <motion.div
            className="auth"
            style = {{
                // height: authContainer.container === LOGIN_CONTAINER ? '40rem' : authContainer.heightAuth,
                display: 'block',
            }}
            animate = {{
                width: authContainer.container === LOGIN_FORM ? '28.125rem' : '5rem',
                scale: authContainer.container === LOGIN_FORM ? 1: 0.9
            }}
            transition = {authContainer.container ===LOGIN_FORM ? {
                duration: 0.5,
                delay: 0.5
            }: {
                duration: 0.5,
                
            }}
            onClick = {handleAuthOnclick}
        >
            <div 
                style={{
                    padding: '2.5rem 2.6875rem'
                }}
            >
                {authContainer.container === LOGIN_FORM && 
                    <motion.div 
                        className="close-box"
                        style={{
                            opacity: 0
                        }}
                        animate = {authContainer.container === LOGIN_FORM && {
                            opacity: 1
                        }}
                        transition = {{
                            delay: 0.7
                        }}    
                    >
                        <Button type='button' buttonStyle='btn-none' buttonSize='btn-large' onClick={handleCloseAuthOnclick}>
                            <GrClose/>
                        </Button>
                    </motion.div>
                }
                <motion.div 
                    className= 'auth-name-box'
                    animate = {authContainer.container === LOGIN_FORM ? {
                    } : {
                        rotate: -90,
                    }}
                    transition = {authContainer.container === LOGIN_FORM ?{
                        delay: 0.5,
                        duration: 0.5
                    }: {
                        duration: 0.5,
                    }}
                >
                    <motion.h2 
                        className="auth-name"
                        animate = { authContainer.container === LOGIN_FORM ? {
                        }: {
                            x: -180,
                        }}
                        transition = {authContainer.container === LOGIN_FORM ?{
                            duration: 0.5
                        }: {
                            delay: 0.5,
                            duration: 0.5
                        }}
                    >
                        Login
                    </motion.h2>
                </motion.div>
                {authContainer.container === LOGIN_FORM && authBox}
            </div>
        </motion.div>
    )
}

export default LoginForm