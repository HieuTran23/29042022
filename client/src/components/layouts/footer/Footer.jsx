import React from 'react'
import './footer.css'
import { logo, logoText } from '../../../assets'
import { FaGithub, FaInstagram, FaFacebookSquare } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-container section-margin">
            <div className="logo-box">
                <img src={logo} alt="Eagle Logo" className='logo' />
                <img src={logoText} alt="" className='logo-text'/>
            </div>
            <div className="info-box">
                <p>EAGLE © 2021. Made by Tran Hieu</p>
            </div>
            <div className="link-box">
                <ul className="link-list">
                    <li className="link-item"><FaGithub/></li>
                    <li className="link-item"><FaInstagram/></li>
                    <li className="link-item"><FaFacebookSquare/></li>
                </ul>
            </div>

        </div>
    </div>
  )
}

export default Footer