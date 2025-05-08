import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHome, FaHeart } from 'react-icons/fa';
import { TbPlayFootball } from 'react-icons/tb';
import { useEffect, useState } from 'react';

function Navbar() {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const wishlist = user?.wishlist || [];
  const cart = user?.cart || [];

  return (
    <header className="fixed top-0 left-0 w-full bg-black z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        
        {/* Brand */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <h1 className="text-2xl font-bold text-yellow-400 flex items-center gap-2">
            Soccer City <TbPlayFootball className="text-3xl text-white" />
          </h1>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex-grow md:flex-grow-0 md:w-1/3 flex items-center justify-center"
        >
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-96 px-4 py-2 rounded-full border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
          />
        </form>

        {/* Navigation Icons */}
        <nav className="flex items-center gap-6">
          <Link to="/" className="text-white text-xl"><FaHome /></Link>

          <Link to="/cart" className="relative text-xl">
            <FaShoppingCart className="text-white" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-xs rounded-full px-1 text-black">
                {cart.length}
              </span>
            )}
          </Link>

          <Link to="/wishlist" className="relative text-xl">
            <FaHeart className={`text-white ${wishlist.length > 0 ? 'text-red-500' : ''}`} />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-xs rounded-full px-1 text-black">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Login/Logout Button */}
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-white text-black px-3 py-1 rounded hover:bg-yellow-500 text-extra-smaller"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="text-white text-sm border border-white px-3 py-1 rounded hover:bg-yellow-500 hover:text-black"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
