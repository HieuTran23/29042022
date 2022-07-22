import React from 'react'
import './mainLayout.css'
import Profile from '../profile/Profile'

const MainLayout = ({children}) => {
  return (
    <div className='main section-margin'>
        <div className="left-main">
            <Profile/>
        </div>
        <div className="right-main">
            {children}
        </div>
    </div>
  )
}

export default MainLayout