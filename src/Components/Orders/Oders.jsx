import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [cancelReason, setCancelReason] = useState('');
  const [selectOrderId, setSelectOrderId] = useState(null);
  const [showSummaryId, setShowSummaryId] = useState(null);
  const [showCancelled, setShowCancelled] = useState(false);
  const [stockData, setStockData] = useState([]);

  const currentUser = JSON.parse(localStorage.getItem('user'));
  const currentUserId = currentUser?.id;

  useEffect(() => {
    if (currentUserId) {
      axios
        .get(`http://localhost:10000/orders?userId=${currentUserId}`)
        .then((res) => setOrders(res.data))
        .catch((err) => console.error('Error fetching orders:', err));

      axios
        .get('http://localhost:10000/products')
        .then((res) => setStockData(res.data))
        .catch((err) => console.error('Error fetching product stock:', err));
    }
  }, [currentUserId]);

  const handleCancelOrder = async (orderId, orderItems) => {
    if (!cancelReason) return alert('Please enter a reason for cancellation.');

    try {
      await axios.patch(`http://localhost:10000/orders/${orderId}`, {
        status: 'Cancelled',
        cancellationReason: cancelReason,
      });

      for (let item of orderItems) {
        const product = stockData.find((prod) => prod.id === item.id);
        if (product) {
          await axios.patch(`http://localhost:10000/products/${item.id}`, {
            stock: product.stock + item.quantity,
          });
        }
      }

      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId
            ? { ...order, status: 'Cancelled', cancellationReason: cancelReason }
            : order
        )
      );

      toast.success('Order Cancelled Successfully!');
      setCancelReason('');
      setSelectOrderId(null);
    } catch (error) {
      toast.error('Error Cancelling Order');
      console.error('Cancel error:', error);
    }
  };

  const handlePlaceOrder = async (cartItems) => {
    try {
      // Validate stock before placing
      for (let item of cartItems) {
        const product = stockData.find((prod) => prod.id === item.id);
        if (!product || product.stock < item.quantity) {
          toast.error(`Not enough stock for "${item.name}". Available: ${product?.stock ?? 0}`);
          return;
        }
      }

      const orderData = {
        userId: currentUserId,
        items: cartItems,
        status: 'Pending',
        date: new Date().toISOString(),
        paymentMethod: 'Cash on Delivery',
        totalAmount: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
      };

      const response = await axios.post('http://localhost:10000/orders', orderData);

      // Deduct stock
      for (let item of cartItems) {
        const product = stockData.find((prod) => prod.id === item.id);
        if (product) {
          await axios.patch(`http://localhost:10000/products/${item.id}`, {
            stock: product.stock - item.quantity,
          });
        }
      }

      toast.success('Order placed successfully!');
    } catch (error) {
      toast.error('Error placing the order');
      console.error('Place order error:', error);
    }
  };

  const getExpectedDeliveryDate = (orderDate) => {
    const date = new Date(orderDate);
    date.setDate(date.getDate() + 3);
    return date.toLocaleDateString();
  };

  const activeOrders = orders.filter((order) => order.status !== 'Cancelled');
  const cancelledOrders = orders.filter((order) => order.status === 'Cancelled');

  const renderOrderCard = (order) => (
    <div key={order.id} className="border p-4 rounded-xl shadow mb-6 bg-white">
      <div className="flex justify-between mb-2">
        <p className="text-sm text-gray-500">
          Order Date: {new Date(order.date).toLocaleString()}
        </p>
        <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
          {order.paymentMethod}
        </span>
      </div>

      <p className="text-sm text-green-700 mb-2">
        Expected Delivery Date: <strong>{getExpectedDeliveryDate(order.date)}</strong>
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        {order.items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-4 border rounded p-2">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              <p className="text-sm text-green-600 font-medium">₹{item.price * item.quantity}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-right font-bold text-xl mt-4">
        Total: ₹{order.totalAmount}
      </div>

      {order.status === 'Cancelled' && (
        <p className="text-red-600 font-semibold mt-2">❌ Order cancelled</p>
      )}

      {order.status !== 'Cancelled' && (
        <div className="mt-4">
          <button
            onClick={() => setSelectOrderId(order.id)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Cancel Order
          </button>

          {selectOrderId === order.id && (
            <div className="mt-2">
              <input
                type="text"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="border p-2 rounded"
                placeholder="Enter cancellation reason"
              />
              <button
                onClick={() => handleCancelOrder(order.id, order.items)}
                className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
              >
                Confirm
              </button>
            </div>
          )}
        </div>
      )}

      <div className="mt-4">
        <button
          onClick={() =>
            setShowSummaryId(showSummaryId === order.id ? null : order.id)
          }
          className="text-sm underline text-blue-600 hover:text-blue-800"
        >
          {showSummaryId === order.id ? 'Hide Summary' : 'View Summary'}
        </button>

        {showSummaryId === order.id && (
          <div className="mt-2 bg-gray-100 p-4 rounded text-sm text-gray-700">
            <p><strong>User Name:</strong> {currentUser?.name}</p>
            <p><strong>User ID:</strong> {currentUserId}</p>
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Order Date:</strong> {new Date(order.date).toLocaleString()}</p>
            <p><strong>Expected Delivery Date:</strong> {getExpectedDeliveryDate(order.date)}</p>
            <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
            <p><strong>Total:</strong> ₹{order.totalAmount}</p>
            {order.cancellationReason && (
              <p><strong>Cancellation Reason:</strong> {order.cancellationReason}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 mt-20 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">My Orders</h2>

      <div className="flex justify-center mb-6">
        <button
          onClick={() => setShowCancelled((prev) => !prev)}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 text-sm"
        >
          {showCancelled ? 'Hide Cancelled Orders' : 'View Cancelled Orders'}
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">Active Orders</h3>
          {activeOrders.length === 0 ? (
            <p className="text-gray-600">No active orders.</p>
          ) : (
            activeOrders.map(renderOrderCard)
          )}
        </div>

        {showCancelled && (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-red-600">Cancelled Orders</h3>
            {cancelledOrders.length === 0 ? (
              <p className="text-gray-600">No cancelled orders.</p>
            ) : (
              cancelledOrders.map(renderOrderCard)
            )}
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
}

export default Orders;
