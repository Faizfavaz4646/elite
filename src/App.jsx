import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from "./components/page/Home.jsx";
import Cart from './components/page/Cart/Cart';
import Login from './components/page/Login/Login';
import Wishlist from './components/page/Wishlist';
import SignUp from './components/page/Signup/SignUp';
import ProductDetails from './components/ProductDetails';
import ProductListing from './components/productlist/ProductListing';
import Orders from './components/orders/Oders';
import Payment from './components/payment/Payment';
import { ToastContainer } from 'react-toastify';
import Footer from './components/Footer';
import AdminProductList from './admins/AdminProductList'; 
import PrivateRoute from './admins/PrivateRoute';
import AddProduct from './admins/AddProduct';
import EditProfile from './components/page/EditProfile/EditProfile';
import EditProduct from './admins/EditProduct';
import AdminManageOrders from './admins/AdminManageOrders';
import AdminUserManagement from './admins/AdminUserManagement';
import NavBar from "./components/NavBar"
import AdminDashboard from './Admins/AdminDashboard';
import AdminSideBar from './Admins/AdminSideBar';
import SearchResults from './Components/SearchResults';

function App() {
  const location = useLocation();
  const hideNavBarRoutes = ['/login', '/signup','/admin/dashboard','/admin/products','/admin/products/add','/admin/user/manage','/admin/manage/order'];
  const hideNavBar = hideNavBarRoutes.includes(location.pathname) || location.pathname.startsWith('/admin/edit-product/');
  const hideFooterRoutes = ['/login', '/signup'];

  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user?.role === 'admin';

  return (
    <>
          {!hideNavBar && <NavBar />}

      <Routes>
  {/* Public/User Routes  */}
  <Route path="/" element={<Home />} />
  <Route
    path="/login"
    element={user ? <Navigate to={isAdmin ? "/admin/dashboard" : "/"} /> : <Login />}
  />
  <Route path="/signup" element={<SignUp />} />
  <Route path="/cart" element={<Cart />} />
  <Route path="/wishlist" element={<Wishlist />} />
  <Route path="/productlisting" element={<ProductListing />} />
  <Route path="/product/:id" element={<ProductDetails />} />
  <Route path="/payment" element={<Payment />} />
  <Route path="/orders" element={<Orders />} />
  <Route path="/profile" element={<EditProfile />} />
  <Route path="/search" element={<SearchResults />} />

  {/* Admin Routes with Layout */}
  <Route
    path="/admin"
    element={
      <PrivateRoute>
        <AdminSideBar />
      </PrivateRoute>
    }
  >
    <Route path='/admin/dashboard' element={<AdminDashboard />} />
    <Route path='/admin/products' element={<AdminProductList />} />
    <Route path="/admin/products/add" element={<AddProduct />} />
    <Route path="edit-product/:id" element={<EditProduct />} />
    <Route path="/admin/manage/order" element={<AdminManageOrders />} />
    <Route path="/admin/user/manage" element={<AdminUserManagement />} />
  </Route>

  {/* Redirect to login on logout */}
  <Route path="/admin/logout" element={<Navigate to="/login" replace />} />
</Routes>

      <ToastContainer position="top-right" autoClose={1000} />
      {!hideFooterRoutes.includes(location.pathname) && <Footer />}
    </>
  );
}

export default App;
