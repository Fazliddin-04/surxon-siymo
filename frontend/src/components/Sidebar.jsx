import { Link, useLocation } from 'react-router-dom'
import { IoSettingsOutline } from 'react-icons/io5'
import { FiPieChart, FiHome, FiClock } from 'react-icons/fi'
import { useSelector } from 'react-redux'

function Sidebar() {
  const location = useLocation()
  const { isSidebarOpen } = useSelector((state) => state.layout)

  return (
    <aside className={`sidebar ${isSidebarOpen ? 'open' : 'close'}`}>
      <div className="logo">
        <div className={`btn little`}>SS</div>
        <p>Surxon Siymo</p>
      </div>
      <ul>
        <li>
          <Link to="/" className="sidebar_link">
            <div
              className={`btn btn-reverse little ${
                location.pathname !== '/' ? 'inactive' : ''
              }`}
            >
              <FiHome />
            </div>
            <p>Home</p>
          </Link>
        </li>
        <li>
          <Link to="/products" className="sidebar_link">
            <div
              className={`btn btn-reverse  little ${
                location.pathname !== '/products' ? 'inactive' : ''
              }`}
            >
              <FiPieChart />
            </div>
            <p>Products</p>
          </Link>
          <Link to="/history" className="sidebar_link">
            <div
              className={`btn btn-reverse  little ${
                location.pathname !== '/history' ? 'inactive' : ''
              }`}
            >
              <FiClock />
            </div>
            <p>History</p>
          </Link>
          <Link to="/settings" className="sidebar_link">
            <div
              className={`btn btn-reverse  little ${
                location.pathname !== '/settings' ? 'inactive' : ''
              }`}
            >
              <IoSettingsOutline />
            </div>
            <p>Settings</p>
          </Link>
        </li>
      </ul>
      <div>En</div>
    </aside>
  )
}

export default Sidebar
