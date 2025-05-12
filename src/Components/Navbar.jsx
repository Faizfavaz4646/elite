import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHome, FaHeart, FaBars, FaTimes } from 'react-icons/fa'; 
import { useEffect, useState } from 'react';
import { useCart, useCartCount } from '../CartContext';
import { useWishlist, useWishlistCount } from '../WishlistContext';


function Navbar() {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const cartCount = useCartCount();
  const wishlistCount = useWishlistCount();
  const { refreshCart } = useCart();
  const { refreshWishlist } = useWishlist();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    refreshCart();
    refreshWishlist();
    navigate('/');
    setMenuOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-black z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 text-yellow-400 text-2xl font-bold">
          <h1 className="flex items-center gap-2">
                         ⚽ Elite Eleven
        
           {/*<TbPlayFootball className="text-3xl text-white" />*/}
          </h1>
         
        
         
             
        </div>

        {/* Hamburger Button */}
        <div className="md:hidden flex items-center gap-4">
          {user && (
            <span className="text-white text-sm">Hi, {user.name}</span>
          )}
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white text-2xl">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex items-center justify-center w-1/3"
        >
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-full border border-yellow-400 text-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </form>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-white text-xl"><FaHome /></Link>

          <Link to="/cart" className="relative text-xl text-white">
            <FaShoppingCart />
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-xs rounded-full px-1 text-black">{cartCount}</span>
          </Link>

         <Link to="/wishlist" className="relative text-xl text-white">
    <FaHeart />
    <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs rounded-full w-4 h-4 flex items-center justify-center">
      {wishlistCount}
    </span>
  </Link>

  <Link to="/orders" className="flex items-center space-x-1 text-md text-white">
    <span>🧾</span>  {/* Optional icon for Orders */}
    <span>Orders</span>
  </Link>

          {user && (
                 
            <span className="text-white text-sm"> Hi, {user.name}</span>
          )}

          {user ? (
            <button onClick={handleLogout} className="bg-white text-black px-3 py-1 rounded hover:bg-yellow-500 text-sm">
              Logout
            </button>
          ) : (
            <Link to="/login" className="text-white text-sm border border-white px-3 py-1 rounded hover:bg-yellow-500 hover:text-black">
              Login
            </Link>
          )}
        </nav>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-yellow-100 px-4 pb-4">
          {/* Search */}
          <form onSubmit={handleSearchSubmit} className="mb-4">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-full border border-yellow-400 text-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </form>

          {/* Nav Items */}
          <div className="flex flex-col gap-4 text-black font-semibold text-lg">
            <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2"><FaHome /> Home</Link>
            <Link to="/cart" onClick={() => setMenuOpen(false)} className="flex items-center gap-2">
              <FaShoppingCart /> Cart ({cartCount})
            </Link>
            <Link to="/wishlist" onClick={() => setMenuOpen(false)} className="flex items-center gap-2">
              <FaHeart /> Wishlist ({wishlistCount})
            </Link>
            <Link to="/orders" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-xl ">
              🧾 Orders
            </Link>
            {user ? (
              <button onClick={handleLogout} className="bg-black text-white px-3 py-1 rounded hover:bg-yellow-500 hover:text-black">
                Logout
              </button>
            ) : (
              <Link to="/login" onClick={() => setMenuOpen(false)} className="border border-black px-3 py-1 rounded hover:bg-yellow-500 hover:text-black">
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
