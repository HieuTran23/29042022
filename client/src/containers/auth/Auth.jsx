import React from 'react'
import './auth.css'
import { useDispatch, useSelector } from 'react-redux'
import { authContainerSelector } from '../../redux/auth/auth.selector'
import authSlice from '../../redux/auth/auth.slice'
import { LoginForm, RegisterForm } from '../../components'

const Auth = () => {
    const dispatch = useDispatch()
    const authContainer = useSelector(authContainerSelector)

    const handleCloseAuthOnclick = () => {
        dispatch(authSlice.actions.authContainerChangeStatus(''))
    }

    return (
        <>
            { authContainer.container && 
                <div className='auth-container'>
                    <div className="auth-box">
                        <LoginForm handleCloseAuthOnclick = {handleCloseAuthOnclick}/>
                        <RegisterForm handleCloseAuthOnclick = {handleCloseAuthOnclick}/>
                    </div>
                </div>
            }    
        </>
    )
}

export default Auth