import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const refreshCart = async () => {
    const currentUserId = JSON.parse(localStorage.getItem("user"))?.id;

    if (!currentUserId) {
      setCart([]); // Reset cart if no user
      return;
    }

    try {
      const res = await axios.get(`http://localhost:5000/users/${currentUserId}`);
      setCart(res.data.cart || []);
    } catch (err) {
      console.error("Failed to refresh cart:", err);
      toast.error("Failed to fetch cart. Please try again.");
    }
  };

  useEffect(() => {
    refreshCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

export const useCartCount = () => {
  const { cart } = useCart();
  return cart.reduce((total, item) => total + (item.quantity || 1), 0);
};
