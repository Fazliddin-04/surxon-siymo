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
          <Link
            to="/"
            className={`sidebar_link ${
              location.pathname !== '/' ? 'inactive' : ''
            }
          `}
          >
            <div className={`btn btn-reverse little`}>
              <FiHome />
            </div>
            <p>Bosh sahifa</p>
          </Link>
        </li>
        <li>
          <Link
            to="/products"
            className={`sidebar_link ${
              location.pathname !== '/products' ? 'inactive' : ''
            }`}
          >
            <div className={`btn btn-reverse  little `}>
              <FiPieChart />
            </div>
            <p>Tovarlar</p>
          </Link>
          <Link
            to="/history"
            className={`sidebar_link ${
              location.pathname !== '/history' ? 'inactive' : ''
            }`}
          >
            <div className={`btn btn-reverse  little `}>
              <FiClock />
            </div>
            <p>Tarix</p>
          </Link>
          <Link
            to="/settings"
            className={`sidebar_link ${
              location.pathname !== '/settings' ? 'inactive' : ''
            }`}
          >
            <div className={`btn btn-reverse little `}>
              <IoSettingsOutline />
            </div>
            <p>Sozlamalar</p>
          </Link>
        </li>
      </ul>
      <div>En</div>
    </aside>
  )
}

export default Sidebar
