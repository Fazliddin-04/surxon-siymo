import { FaPlus, FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import {
  FiMenu,
  FiX,
  FiSearch,
  FiChevronDown,
  FiSun,
  FiMoon,
} from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { toggleSidebar } from '../features/layout/layoutSlice'
import { useState } from 'react'
import { useEffect } from 'react'

function Header() {
  const [profileToggle, setProfileToggle] = useState(false)
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    if (document.body.classList.contains('light')) {
      document.body.classList.remove('light')
      document.body.classList.add(theme)
    } else if (document.body.classList.contains('dark')) {
      document.body.classList.remove('dark')
      document.body.classList.add(theme)
    } else {
      document.body.classList.add(theme)
    }
  }, [theme])

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { isSidebarOpen } = useSelector((state) => state.layout)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())

    navigate('/')
  }

  const onHandleMenu = () => {
    dispatch(toggleSidebar())
  }

  return (
    <header className="header">
      <div className="flexbox">
        <div className="toggleBar" onClick={onHandleMenu}>
          <div className={`times ${isSidebarOpen ? 'active' : ''}`}>
            <FiX />
          </div>
          <div className={`bars ${!isSidebarOpen ? 'active' : ''}`}>
            <FiMenu />
          </div>
        </div>
        <Link to="/search">
          <FiSearch />
        </Link>
        <Link to="/new-cart" className='btn'>
          <FaPlus /> New Sale
        </Link>
      </div>
      <ul>
        <li>
          <div className="theme flexbox">
            {theme === 'light' ? (
              <div onClick={() => setTheme('dark')} className=" flexbox">
                <FiSun />{' '}
              </div>
            ) : (
              <div onClick={() => setTheme('light')} className=" flexbox">
                <FiMoon />
              </div>
            )}
          </div>
        </li>
        {user ? (
          <li>
            <div className="dropdown">
              <div
                onClick={() => setProfileToggle((prevState) => !prevState)}
                className="dropdown-title"
              >
                {user.name} <FiChevronDown />
              </div>
              <div
                className={`dropdown-content ${profileToggle ? 'active' : ''}`}
              >
                <div onClick={onLogout}>
                  <FaSignOutAlt /> Logout
                </div>
              </div>
            </div>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}

export default Header
