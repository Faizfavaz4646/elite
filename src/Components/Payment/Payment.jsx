import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const PaymentPage = () => {
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

  const handleCardChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!cartItems?.length) {
      alert("Your cart is empty!");
      return;
    }

    if (paymentMethod === "Debit/Credit Card") {
      const { name, number, expiry, cvv } = cardDetails;
      if (!name || !number || !expiry || !cvv) {
        alert("Please fill in all card details.");
        return;
      }
    }

    try {
      const orderData = {
        userId,
        items: cartItems,
        totalAmount: paymentMethod === "Cash on Delivery" ? totalAmount + 50 : totalAmount,
        paymentMethod,
        cardDetails: paymentMethod === "Debit/Credit Card" ? cardDetails : null,
        status: "Paid",
        date: new Date().toISOString()
      };

      await axios.post("http://localhost:5000/orders", orderData);

      await axios.patch(`http://localhost:5000/users/${userId}`, {
        cart: []
      });

      alert("Payment successful! Order placed.");
      navigate("/orders");

    } catch (error) {
      console.error("Error placing order", error);
      alert("Something went wrong while processing your payment.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-7 shadow-lg rounded-xl bg-white">
      <h2 className="text-2xl font-bold mb-6">Payment Page</h2>

      <div className="mb-4">
        <h3 className="font-semibold">Order Summary:</h3>
        {cartItems?.map((item, index) => (
          <div key={index} className="flex justify-between mt-2">
            <span>{item.name}</span>
            <span>₹{item.price} × {item.quantity}</span>
          </div>
        ))}
        <hr className="my-4" />
        <div className="flex justify-between font-bold text-lg">
          <span>Total:</span>
          <span>₹{paymentMethod === "Cash on Delivery" ? totalAmount + 50 : totalAmount}</span>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Select Payment Method:</h3>
        {["UPI", "Debit/Credit Card", "Cash on Delivery"].map((method) => (
          <label className="block mb-2" key={method}>
            <input
              type="radio"
              name="payment"
              value={method}
              checked={paymentMethod === method}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span className="ml-2">{method}</span>
          </label>
        ))}

        {paymentMethod === "Cash on Delivery" && (
          <p className="text-sm text-red-500 mt-1">Note: ₹50 extra charge for Cash on Delivery</p>
        )}
      </div>

      {paymentMethod === "Debit/Credit Card" && (
        <div className="bg-gray-100 p-4 rounded mb-6">
          <h4 className="font-semibold mb-2">Enter Card Details:</h4>
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

      <button
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        onClick={handleSubmit}
      >
        Pay ₹{paymentMethod === "Cash on Delivery" ? totalAmount + 50 : totalAmount}
      </button>
    </div>
  );
};

export default PaymentPage;
