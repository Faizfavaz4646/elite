import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from './components/Pages/Home';
import Cart from './components/Pages/Cart/Cart';
import Login from './components/Pages/Login/Login';
import Wishlist from './components/Pages/Wishlist';
import SignUp from './components/Pages/Signup/SignUp';
import ProductDetails from './components/ProductDetails';
import ProductListing from './components/Productlist/ProductListing';
import Orders from './components/Orders/Oders';
import Payment from './components/Payment/Payment';
import { ToastContainer } from 'react-toastify';
import Footer from './components/Footer';
import AdminDashboard from './Admins/AdminDashboard';
import AdminProductList from './Admins/AdminProductList'; 
import PrivateRoute from './Admins/PrivateRoute';
import AddProduct from './Admins/AddProduct';
import EditProfile from './components/Pages/EditProfile/EditProfile';
import EditProduct from './Admins/EditProduct';
import AdminManageOrders from './Admins/AdminManageOrders';
import AdminUserManagement from './Admins/AdminUserManagement';
import AdminSideBar from './Admins/AdminSideBar';
import SearchResults from './components/SearchResults';
import NavBar from "./components/NavBar"

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
