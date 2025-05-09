import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const refreshWishlist = async () => {
    const currentUserId = JSON.parse(localStorage.getItem("user"))?.id;

    if (!currentUserId) {
      setWishlist([]); // Reset wishlist if no user
      return;
    }

    try {
      const res = await axios.get(`http://localhost:5000/users/${currentUserId}`);
      setWishlist(res.data.wishlist || []);
    } catch (err) {
      console.error("Failed to refresh wishlist:", err);
      toast.error("Failed to fetch wishlist. Please try again.");
    }
  };

  useEffect(() => {
    refreshWishlist();
  }, []);

  return (
    <WishlistContext.Provider value={{ wishlist, setWishlist, refreshWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);

export const useWishlistCount = () => {
  const { wishlist } = useWishlist();
  return wishlist.length;
};
