import './navbar.css'
import { logo, logoText } from '../../assets'
import { useDispatch, useSelector } from "react-redux";
import { authSlice } from '../slice'
import { signOut } from '../auth/authSlice';
import { loginBoxChangeStatusSelector, usernameSelector, registerBoxChangeStatusSelector } from '../../redux/selectors';
import Register from '../auth/Register';
import Login from '../auth/Login'
import { FaSearch, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'

const Navbar = () => {
  const dispatch = useDispatch()
  const isLoginContainer = useSelector(loginBoxChangeStatusSelector)
  const isRegisterContainer = useSelector(registerBoxChangeStatusSelector)
  const isUsername = useSelector(usernameSelector)

  const handleLoginOnclick = () => {
    dispatch(authSlice.actions.loginBoxChangeStatus(!isLoginContainer))
  } 

  const handleLogoutOnClick = () => {
    dispatch(signOut())
  }

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
              <li className="nav-link"><a href="/">Home</a></li>
              <li className="nav-link"><a href="/Tags">Tags</a></li>
              <li className="nav-link"><a href="/Categories">Categories</a></li>
              <li className="nav-link"><a href="/Archives">Archives</a></li>
              <li className="nav-link"><a href="/About">About</a></li>
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
            {
              isLoginContainer && (
                <Login/>
              )
            }
            {
              isRegisterContainer && (
                <Register/>
              )
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar