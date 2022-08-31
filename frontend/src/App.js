import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import History from './pages/History';
import Products from './pages/Products';
import Settings from './pages/Settings';

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Sidebar />
          <div className='main'>
            <Header />
            <div className='div'>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/history' element={<History />} />
                <Route path='/products' element={<Products />} />
                <Route path='/settings' element={<Settings />} />
                <Route path='/*' element={<p>Not Found</p>} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
