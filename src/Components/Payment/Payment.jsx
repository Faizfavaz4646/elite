import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import Lottie from "lottie-react";
import loadingAnimation from "../../animations/loading.json";
import successAnimation from "../../animations/success.json";
import { useCart } from "../../CartContext";
import { FaCcApplePay,FaGooglePay, FaCcVisa, FaCcMastercard } from "react-icons/fa";


const PaymentPage = () => {
  const { refreshCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, totalAmount, userId } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [cardDetails, setCardDetails] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: ""
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [outOfStockItems, setOutOfStockItems] = useState([]);
  
  useEffect(() => {
    if (!cartItems || !userId || !totalAmount) {
      toast.info("Invalid access to payment page. Redirecting...");
      navigate("/cart");
    }

    // Check if there are any out-of-stock items
    checkStock();
  }, []);

  const checkStock = async () => {
    const outOfStock = [];

    for (const item of cartItems) {
      try {
        const response = await axios.get(`http://localhost:5000/products/${item.id}`);
        if (response.data.stock < item.quantity) {
          outOfStock.push(item);
        }
      } catch (error) {
        console.error("Error checking stock", error);
      }
    }

    setOutOfStockItems(outOfStock);
  };

  const handleCardChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (outOfStockItems.length > 0) {
      toast.info("Some items are out of stock, please update your cart.");
      return;
    }

    if (!cartItems?.length) {
      toast.info("Your cart is empty!");
      return;
    }

    if (paymentMethod === "Debit/Credit Card") {
      const { name, number, expiry, cvv } = cardDetails;
      if (!name || !number || !expiry || !cvv) {
        toast.info("Please fill in all card details.");
        return;
      }
    }

    setIsLoading(true);

    try {
      const orderData = {
        userId,
        items: cartItems,
        totalAmount: paymentMethod === "Cash on Delivery" ? totalAmount + 50 : totalAmount,
        paymentMethod,
        cardDetails: paymentMethod === "Debit/Credit Card" ? cardDetails : null,
        status: "Paid",
        date: new Date().toISOString(),
        expectedDeliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
      };

      await axios.post("http://localhost:5000/orders", orderData);
      await axios.patch(`http://localhost:5000/users/${userId}`, { cart: [] });

      setTimeout(() => {
        setIsLoading(false);
        setIsSuccess(true);

        toast.success("Payment successful! Order placed.");
        refreshCart();

        setTimeout(() => {
          navigate("/orders");
        }, 2500); // 2.5s after success animation
      }, 4000); // 2s loading spinner
    } catch (error) {
      console.error("Error placing order", error);
      toast.error("Something went wrong while processing your payment.");
      setIsLoading(false);
    }
  };

  const deliveryDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString();

  // ⏳ Loading State
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Lottie animationData={loadingAnimation} loop={true} style={{ width: 250, height: 250 }} />
      </div>
    );
  }

  // Success State
  if (isSuccess) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <Lottie animationData={successAnimation} loop={false} style={{ width: 500, height: 500 }} />
        <p className="text-green-600 text-xl mt-4 font-semibold">Payment Successful!</p>
      </div>
    );
  }

  // 🧾 Default Payment Form
  return (
    <div className="max-w-2xl mx-auto mt-20 p-7 shadow-lg rounded-xl bg-white">
      <h2 className="text-3xl font-bold  mb-6 text-gray-800">Payment Page</h2>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Order Summary:</h3>
        {!cartItems?.length ? (
          <p className="text-red-500">Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map((item, index) => (
              <div key={index} className="flex justify-between mt-1 text-gray-600">
                <span>{item.name}</span>
                <span>₹{item.price} × {item.quantity}</span>
              </div>
            ))}
            <hr className="my-4" />
            <div className="flex justify-between font-bold text-lg text-gray-800">
              <span>Total:</span>
              <span>₹{paymentMethod === "Cash on Delivery" ? totalAmount + 50 : totalAmount}</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Expected Delivery: {deliveryDate}
            </p>
          </>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Select Payment Method:</h3>
        {["UPI", "Debit/Credit Card", "Cash on Delivery"].map((method) => (
          <label className="block mb-2 text-gray-600" key={method}>
            <input
              type="radio"
              name="payment"
              value={method}
              checked={paymentMethod === method}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />
            {method}
          </label>
        ))}
        {paymentMethod === "Cash on Delivery" && (
          <p className="text-sm text-red-500 mt-1">Note: ₹50 extra charge for Cash on Delivery</p>
        )}
      </div>

      {paymentMethod === "Debit/Credit Card" && (
        <div className="bg-gray-100 p-4 rounded mb-6">
          <h4 className="font-semibold mb-3 text-gray-700">Enter Card Details:</h4>
          <input
            type="text"
            name="name"
            placeholder="Cardholder Name"
            className="block w-full p-2 mb-2 border rounded"
            value={cardDetails.name}
            onChange={handleCardChange}
          />
          <input
            type="text"
            name="number"
            placeholder="Card Number"
            className="block w-full p-2 mb-2 border rounded"
            value={cardDetails.number}
            onChange={handleCardChange}
            maxLength={16}
          />
          <div className="flex gap-2">
            <input
              type="text"
              name="expiry"
              placeholder="MM/YY"
              className="w-1/2 p-2 border rounded"
              value={cardDetails.expiry}
              onChange={handleCardChange}
              maxLength={7}
            />
            <input
              type="password"
              name="cvv"
              placeholder="CVV"
              className="w-1/2 p-2 border rounded"
              value={cardDetails.cvv}
              onChange={handleCardChange}
              maxLength={3}
            />
          </div>
        </div>
      )}
      <div className="flex gap-2"><FaCcApplePay  size={35} />    <FaGooglePay  size={35} /> <FaCcVisa size={35} /> <FaCcMastercard size={35}/>
      </div>
       
    

      <button
        className={`w-full ${outOfStockItems.length > 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600'} text-white px-6 py-2 rounded hover:bg-blue-700 transition font-semibold`}
        onClick={handleSubmit}
        disabled={outOfStockItems.length > 0}
      >
       
        Pay ₹{paymentMethod === "Cash on Delivery" ? totalAmount + 50 : totalAmount}
      </button>
      
    </div>
  );
};

export default PaymentPage;
