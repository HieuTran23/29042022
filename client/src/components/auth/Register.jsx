import './auth.css'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import authSlice from './authSlice'
import { AiOutlineUser} from 'react-icons/ai'
import { FaKey } from 'react-icons/fa'
import { GrClose } from 'react-icons/gr'
import { IoMdMail} from 'react-icons/io'
import Button from '../button/Button'


const Register = () => {
    const dispatch = useDispatch()
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

    const handleLoginOnclick = () => {
        dispatch(authSlice.actions.registerBoxChangeStatus())
        dispatch(authSlice.actions.loginBoxChangeStatus())
    }

    const handleRegisterOnclick = () => {
        dispatch(authSlice.actions.registerBoxChangeStatus())
    }

    const handleRegisterFormChange = (event) => {
        const {name, value} = event.target

        setRegisterForm({...registerForm, [name]: value})
    }

    const handleContinueRegisterOnClick = (event) => {
        event.preventDefault()
        setRegisterFormStatus(!registerFormStatus)
    }

    const registerForm1 = (
        <>
            <div className="auth-field">
                <label>Username</label>
                <div className="auth-input">
                    <AiOutlineUser/>
                    <input type="text" placeholder='Username' name='username' value={username} onChange={handleRegisterFormChange}/>
                </div>
            </div>
            <div className="auth-field">
                <label>Password</label>
                <div className="auth-input">
                    <FaKey/>
                    <input type="password" placeholder='Password' name='password' value={password} onChange={handleRegisterFormChange}/>
                </div>
            </div>
            <div className="auth-field">
                <label>Confirm Password</label>
                <div className="auth-input">
                    <FaKey/>
                    <input type="password" placeholder='Confirm Password' name='rePassword' value={rePassword} onChange={handleRegisterFormChange}/>
                </div>
            </div>
            <div className="auth-field">
                <label>Email</label>
                <div className="auth-input">
                    <IoMdMail/>
                    <input type="text" placeholder='Email' name='email' value={email} onChange={handleRegisterFormChange}/>
                </div>
            </div>
            <div className="others-box">
                <ul className="others">
                    <li className="decoration" onClick={handleLoginOnclick}>Login</li>
                </ul>
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
                    <li className="decoration" onClick={handleContinueRegisterOnClick}>Back to step create Account</li>
                </ul>
            </div>                
            <Button type='submit' buttonStyle='btn-submit-auth' buttonSize='btn-overside-auth'>
                Continue to sign up
            </Button>
        </>
    )

    return (
        <div className="auth">
            <div className="auth-container">
                <div className="close-box">
                    <Button type='button' buttonStyle='btn-none' buttonSize='btn-large' onClick={handleRegisterOnclick}>
                        <GrClose/>
                    </Button>
                </div>
                <div className="auth-name-box">
                    <h2 className="auth-name">Register</h2>
                </div>
                <div className="status-box">
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
                </div>
                <form className="auth-form">
                {registerFormStatus ? registerForm1 : registerForm2}
                </form>
            </div>
        </div>
    )
}

export default Register