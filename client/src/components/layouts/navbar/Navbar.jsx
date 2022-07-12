import './navbar.css'
import { useEffect } from 'react';
import { logo, logoText } from '../../../assets'
import { useDispatch, useSelector } from "react-redux";
import { authSlice } from '../../../redux/slice'
import { getCurrentUser, signOut } from '../../../redux/auth/auth.slice';
import { usernameSelector } from '../../../redux/auth/auth.selector';
import { FaSearch, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import { LOGIN_FORM } from '../../../utils/constants/component.constant';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch()
  const isUsername = useSelector(usernameSelector)

  const handleLoginOnclick = () => {
    dispatch(authSlice.actions.authContainerChangeStatus(LOGIN_FORM))
  } 

  const handleLogoutOnClick = () => {
    dispatch(signOut())
  }

  useEffect(() => {
    dispatch(getCurrentUser())
  }, [])

  return (
    <div className='navbar'>
      <div className="navbar-container section-margin">
        <div className="left-navbar-container">
          <div className="logo-box">
            <img className='logo-image' src={logo} alt="Eagle Logo" />
            <img className='logo-text-image' src={logoText} alt="Eagle Name" />
          </div>
          <div className="nav-links-box">
            <ul className="nav-links">
              <li className="nav-link"><Link to="/">Home</Link></li>
              <li className="nav-link"><Link to="/Tags">Tags</Link></li>
              <li className="nav-link"><Link to="/Categories">Categories</Link></li>
              <li className="nav-link"><Link to="/Archives">Archives</Link></li>
              <li className="nav-link"><Link to="/About">About</Link></li>
            </ul>
          </div>
        </div>
        <div className="right-navbar-container">
          <ul className="nav-tools">
            <li className="nav-tool"><FaSearch/></li>
            { isUsername ? 
            <li className="nav-tool"><FaSignOutAlt onClick={handleLogoutOnClick}/></li>  :
            <li className="nav-tool"><FaSignInAlt onClick={handleLoginOnclick}/></li> 
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar