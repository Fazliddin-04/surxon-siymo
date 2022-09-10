import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import History from './pages/History';
import Products from './pages/Products';
import Settings from './pages/Settings';
import NewProduct from './pages/NewProduct';
import Product from './pages/Product';
import NewCart from './pages/NewCart';

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
                <Route path='/products' element={<PrivateRoute />}>
                  <Route path='/products' element={<Products />} />
                </Route>
                <Route path='/new-product' element={<PrivateRoute />}>
                  <Route path='/new-product' element={<NewProduct />} />
                </Route>
                <Route path='/new-cart' element={<PrivateRoute />}>
                  <Route path='/new-cart' element={<NewCart />} />
                </Route>
                <Route path='/product/:productId' element={<PrivateRoute />}>
                  <Route path='/product/:productId' element={<Product />} />
                </Route>
                <Route path='/history' element={<History />} />
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
