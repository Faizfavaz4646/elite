import React from 'react';
import Home from './Components/Pages/Home';
import { Routes, Route, useLocation } from 'react-router-dom';
import Cart from './Components/Pages/Cart/Cart';
import Login from './Components/Pages/Login/Login';
import Wishlist from './Components/Pages/Wishlist';
import Navbar from './Components/Navbar';
import SignUp from './Components/Pages/Signup/SignUp';
import ProductDetails from './Components/ProductDetails';
import ProductListing from './Components/Productlist/ProductListing';
import Orders from './Components/Orders/Oders';
import Payment from './Components/Payment/Payment';
import { ToastContainer } from 'react-toastify';
import Footer from './Components/Footer';


function App() {
   const location = useLocation()
  const hideNavbarRoutes = ['/login', '/signup'];
  const hideFooterRoutes=['/login','/signup']
  return (
     
       <>
          {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
       
       
      
       <Routes>
        <Route path='/' element={<Home />} />
        <Route path='cart' element={<Cart />} />
        <Route path='login' element={<Login />} />
        <Route path='wishlist' element={<Wishlist />} />
        <Route path='signup' element={<SignUp />}/>
        <Route path='productlisting' element={<ProductListing />} />
        <Route path='product/:id' element={<ProductDetails />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/orders" element={<Orders />} />
       
       </Routes>
        <ToastContainer position="top-right" autoClose={1000} />
           {!hideFooterRoutes.includes(location.pathname) && <Footer />}
       


        
 
    
   
    </>
   
  
  )
}

export default App;