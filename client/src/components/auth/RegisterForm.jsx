import './form.css'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authContainerSelector } from '../../redux/auth/auth.selector'
import authSlice, { signUp} from '../../redux/auth/auth.slice'
import { AiOutlineUser} from 'react-icons/ai'
import { FaKey } from 'react-icons/fa'
import { GrClose } from 'react-icons/gr'
import { IoMdMail} from 'react-icons/io'
import Button from '../buttons/Button'
import { LOGIN_FORM, REGISTER_FORM } from '../../utils/constants/component.constant'
import { motion } from 'framer-motion'

const RegisterForm = ({handleCloseAuthOnclick}) => {
    const dispatch = useDispatch()
    const authContainer = useSelector(authContainerSelector)
    const [registerFormStatus, setRegisterFormStatus] = useState(true)
    const [registerForm, setRegisterForm] = useState({
        username: '',
        password: '',
        rePassword: '',
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        address: ''
    })
    const { username, password, rePassword, email, firstName, lastName, phone, address} = registerForm
    const [error,setError] = useState({
        username: '',
        password: '',
        rePassword: '',
        email: '',
        message: '',
    })

    const handleRegisterFormChange = (event) => {
        const {name, value} = event.target

        setRegisterForm({...registerForm, [name]: value})

        switch(name) {
            case 'username': 
                value.length < 6 ? setError({...error, username: 'Username must be more than 6 character'}) : setError({...error, username: ''})
                break;
            case 'password':
                value.length < 6 ? setError({...error, password: 'Password must be more than 6 character'}) : setError({...error, password: ''})
                break;
            case 'rePassword':
                value !== password ? setError({...error, rePassword: 'Confirm Password must be same password'}) : setError({...error, rePassword: ''})
                break;
            case 'email':
                !value.match('@') ? setError({...error, email: 'Invalid Email'}) : setError({...error, email: ''})
                break;
            case 'firstName':
                value.length === 0 ? setError({...error, firstName: 'Empty first name'}) : setError({...error, firstName: ''})
                break;
            case 'lastName': 
                value.length === 0 ? setError({...error, lastName: 'Empty first name'}) : setError({...error, lastName: ''})
                break;
            default: return error
        }
    }

    const handleContinueRegisterOnClick = (event) => {
        event.preventDefault()
        setRegisterFormStatus(!registerFormStatus)
    }

    const handleAuthOnclick = () => {
        if(authContainer.container !== REGISTER_FORM){
            dispatch(authSlice.actions.authContainerChangeStatus(REGISTER_FORM))
        }
    }

    const clearForm = () => {
        setRegisterForm({
            username: '',
            password: '',
            rePassword: '',
            email: '',
            firstName: '',
            lastName: '',
            phone: '',
            address: ''
        })
        setError({
            username: '',
            password: '',
            rePassword: '',
            email: '',
            message: '',
        })
    }

    const handleRegisterFormSubmit = (event) => {
        event.preventDefault()
        dispatch(signUp(registerForm)).then((res) => {
            const { error} = res.payload 

            if(error) {
                return res.payload.error.response.status === 400 ? setError({...error, message: res.payload.error.response.data.message}) : setError({...error, message: ''})
            }
            return dispatch(authSlice.actions.authContainerChangeStatus(LOGIN_FORM)).then(clearForm())
        })
    }

    const registerForm1 = (
        <>
            <div className="auth-field">
                <label>Username</label>
                <div className="auth-input">
                    <AiOutlineUser/>
                    <input type="text" placeholder='Username' name='username' value={username} onChange={handleRegisterFormChange}/>
                </div>
                {error.username && <span className='error-massage'>{error.username}</span>}
            </div>
            <div className="auth-field">
                <label>Password</label>
                <div className="auth-input">
                    <FaKey/>
                    <input type="password" placeholder='Password' name='password' value={password} onChange={handleRegisterFormChange}/>
                </div>
                {error.password && <span className='error-massage'>{error.password}</span>}
            </div>
            <div className="auth-field">
                <label>Confirm Password</label>
                <div className="auth-input">
                    <FaKey/>
                    <input type="password" placeholder='Confirm Password' name='rePassword' value={rePassword} onChange={handleRegisterFormChange}/>
                </div>
                {error.rePassword && <span className='error-massage'>{error.rePassword}</span>}
            </div>
            <div className="auth-field">
                <label>Email</label>
                <div className="auth-input">
                    <IoMdMail/>
                    <input type="text" placeholder='Email' name='email' value={email} onChange={handleRegisterFormChange}/>
                </div>
                {error.email && <span className='error-massage'>{error.email}</span>}
            </div>         
            <Button type="button" buttonStyle='btn-submit-auth' buttonSize='btn-overside-auth' onClick={handleContinueRegisterOnClick}>
                Continue to sign up
            </Button>
        </>
                
    )

    const registerForm2 = (
        <>
            <div className="auth-field">
                <label>First Name</label>
                <div className="auth-input">
                    <AiOutlineUser/>
                    <input type="text" placeholder='First Name' name='firstName' value={firstName} onChange={handleRegisterFormChange}/>
                </div>
            </div>
            <div className="auth-field">
                <label>Last Name</label>
                <div className="auth-input">
                    <FaKey/>
                    <input type="text" placeholder='Last Name' name='lastName' value={lastName} onChange={handleRegisterFormChange}/>
                </div>
            </div>
            <div className="auth-field">
                <label>Phone Number</label>
                <div className="auth-input">
                    <FaKey/>
                    <input type="text" placeholder='Phone Number' name='phone' value={phone} onChange={handleRegisterFormChange}/>
                </div>
            </div>
            <div className="auth-field">
                <label>Address</label>
                <div className="auth-input">
                    <FaKey/>
                    <input type="text" placeholder='Address' name='address' value={address} onChange={handleRegisterFormChange}/>
                </div>
            </div>
            <div className="others-box">
                <ul className="others">
                    <li className="decoration" onClick={handleContinueRegisterOnClick}>Back</li>
                </ul>
            </div>                
            <Button type='submit' buttonStyle='btn-submit-auth' buttonSize='btn-overside-auth'>
                Sign Up
            </Button>
        </>
    )

    const authBox = (
        <>
            <motion.div 
                className="status-box"
                style={{
                    opacity: 0
                }}
                animate = {authContainer.container ===REGISTER_FORM && {
                    opacity: 1
                }}
                transition = {{
                    delay: 0.7
                }}
            >
                {registerFormStatus? 
                (
                    <>
                        <div className="status-description">
                            <label className='register-description-active'>1. Account</label>
                            <label>2. Profile</label>
                        </div>
                        <div className="status">
                            <div className="status-account">
                                <div className="dot register-status-active"></div>
                                <div className="line register-status-active"></div>
                            </div>
                            <div className="status-profile">
                                <div className="line"></div>
                                <div className="dot"></div>
                            </div>
                        </div>
                    </>
                    
                ) : (
                    <>
                        <div className="status-description">
                                <label >1. Account</label>
                                <label className='register-description-active'>2. Profile</label>
                            </div>
                        <div className="status">
                            <div className="status-account">
                                <div className="dot "></div>
                                <div className="line "></div>
                            </div>
                            <div className="status-profile">
                                <div className="line register-status-active"></div>
                                <div className="dot register-status-active"></div>
                            </div>
                        </div> 
                    </>
                )
                }
            </motion.div>
            <motion.form 
                className="auth-form" 
                style={{
                    opacity: 0
                }}
                animate = {authContainer.container ===REGISTER_FORM && {
                    opacity: 1
                }}
                transition = {{
                    delay: 0.7
                }}
                onSubmit={handleRegisterFormSubmit}
            >
            {error.message && <span className='error-massage'>{error.message}</span>}
            {registerFormStatus ? registerForm1 : registerForm2}
            </motion.form>
        </>
    )

    return (
        <motion.div 
            className = 'auth'
            style = {{
                height: authContainer.container === REGISTER_FORM ? '' : authContainer.heightAuth,
                display: 'block',
            }}
            animate = {{
                width: authContainer.container === REGISTER_FORM ? '28.125rem' : '5rem',
                scale: authContainer.container === REGISTER_FORM ? 1: 0.9
            }}
            transition = {authContainer.container ===REGISTER_FORM ? {
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
                {authContainer.container === REGISTER_FORM && 
                    <motion.div 
                        className="close-box"
                        style={{
                            opacity: 0
                        }}
                        animate = {authContainer.container ===REGISTER_FORM && {
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
                    className='auth-name-box'
                    animate = {authContainer.container === REGISTER_FORM ? {
                    } : {
                        rotate: 90,
                    }}
                    transition = {authContainer.container === REGISTER_FORM ?{
                        delay: 0.5,
                        duration: 0.5
                    }: {
                        duration: 0.5,
                    }}
                >
                    <motion.h2
                        className="auth-name"
                        animate = { authContainer.container === REGISTER_FORM ? {
                            
                        }: {
                            x: 180,
                        }}
                        transition = {authContainer.container === REGISTER_FORM ?{
                            duration: 0.5
                        }: {
                            delay: 0.5,
                            duration: 0.5
                        }}
                    >
                        Register
                    </motion.h2>
                </motion.div>
                {authContainer.container === REGISTER_FORM && authBox}
            </div>
        </motion.div>
    )
}

export default RegisterForm