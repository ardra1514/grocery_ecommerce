import React from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Navebar from './components/Navebar'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'
import { useAppContext } from './context/Appcontex'
import Login from './components/Login'
import Allproducts from './pages/Allproducts'
import Productcategory from './pages/Productcategory'
import Productdetails from './pages/Productdetails'
import Cart from './pages/Cart'
import Addaddress from './pages/Addaddress'
import Myorders from './pages/Myorders'
import Sellerlogin from './components/Seller/Sellerlogin'
import Sellerlayout from './pages/seller/Sellerlayout'
import Productlist from './pages/seller/Productlist'
import Orders from './pages/seller/Orders'
import Addproducts from './pages/seller/Addproducts'
import Loading from './components/Loading'

function App() {
  const issellerpath = useLocation().pathname.includes("seller")
  const { showUserLogin, isseller } = useAppContext()

  return (
    <div className='text-default min-h-screen text-gray-700 bg-white'>
      {!issellerpath && <Navebar />}
      {showUserLogin && <Login />}
      <Toaster />

      {/* Push content below navbar */}
      <div className={`${issellerpath ? "" : "px-6 md:px-16 lg:px-32 pt-24"}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Allproducts />} />
          <Route path="/products/:category" element={<Productcategory />} />
          <Route path="/products/:category/:id" element={<Productdetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-address" element={<Addaddress />} />
          <Route path="/my-orders" element={<Myorders />} />
          <Route path="/loader" element={<Loading />} />


          {/* ---------------- SELLER ROUTES ---------------- */}

          <Route
            path="/seller"
            element={isseller ? <Sellerlayout /> : <Sellerlogin />}
          >
            <Route 
              index 
              element={isseller ? <Addproducts /> : <Navigate to="/seller" />} 
            />

            <Route 
              path="product-list" 
              element={isseller ? <Productlist /> : <Navigate to="/seller" />} 
            />

            <Route 
              path="orders" 
              element={isseller ? <Orders /> : <Navigate to="/seller" />} 
            />
          </Route>

        </Routes>
      </div>

      {!issellerpath && <Footer />}
    </div>
  )
}

export default App
