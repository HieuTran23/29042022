import './auth.css'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import authSlice, { signUp} from './authSlice'
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
    const [error,setError] = useState({
        username: '',
        password: '',
        rePassword: '',
        email: '',
        message: '',
    })

    const handleLoginOnclick = () => {
        dispatch(authSlice.actions.registerBoxChangeStatus())
        dispatch(authSlice.actions.loginBoxChangeStatus())
    }

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

    const handleRegisterFormSubmit = (event) => {
        event.preventDefault()
        dispatch(signUp(registerForm)).then((res) => {
            console.log(res)
            res.payload.error.response.status === 400 ? setError({...error, message: res.payload.error.response.data.message}) : setError({...error, message: ''})
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
                    <li className="decoration" onClick={handleContinueRegisterOnClick}>Back</li>
                </ul>
            </div>                
            <Button type='submit' buttonStyle='btn-submit-auth' buttonSize='btn-overside-auth'>
                Sign Up
            </Button>
        </>
    )

    return (
        <div className="auth">
            <div className="auth-container">
                <div className="close-box">
                    <Button type='button' buttonStyle='btn-none' buttonSize='btn-large' onClick={handleRegisterFormSubmit}>
                        <GrClose/>
                    </Button>
                </div>
                <div className="auth-name-box">
                    <h2 className="auth-name">Register</h2>
                </div>
                <div className="status-box">
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
                </div>
                {error.message && <span className='error-massage'>{error.message}</span>}
                <form className="auth-form" onSubmit={handleRegisterFormSubmit}>
                {registerFormStatus ? registerForm1 : registerForm2}
                </form>
            </div>
        </div>
    )
}

export default Register