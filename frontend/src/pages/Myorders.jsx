import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/Appcontex";

const Myorders = () => {
  const { axios, user, currency } = useAppContext();
  const [myorders, setMyorders] = useState([]);

  // ========================
  // FETCH USER ORDERS
  // ========================
  const fetchmyorders = async () => {
    try {
      const { data } = await axios.get("/api/order/user");
      if (data.success) {
        setMyorders(data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ========================
  // LOAD ON LOGIN
  // ========================
  useEffect(() => {
    if (user) {
      fetchmyorders();
    }
  }, [user]);

  return (
    <div className="mt-16 pb-16 max-w-5xl mx-auto px-4">
      {/* TITLE */}
      <div className="mb-8">
        <p className="text-2xl font-medium uppercase">My Orders</p>
        <div className="w-16 h-1 bg-primary rounded-full mt-1"></div>
      </div>

      {/* ORDERS */}
      {myorders.length === 0 && (
        <p className="text-gray-500">No orders found.</p>
      )}

      {myorders.map((order) => (
        <div
          key={order._id}
          className="border border-gray-300 rounded-lg mb-8 bg-white"
        >
          {/* ORDER HEADER */}
          <div className="flex flex-col md:flex-row md:justify-between gap-2 p-4 border-b text-sm text-gray-600">
            <span>Order ID: {order._id}</span>
            <span>Payment: {order.paymenttype}</span>
            <span>
              Total: {currency}
              {order.amount}
            </span>
          </div>

          {/* ORDER ITEMS */}
          <div className="divide-y">
            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 p-4"
              >
                {/* LEFT: IMAGE + DETAILS */}
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 border rounded overflow-hidden bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <h2 className="text-lg font-medium text-gray-800">
                      {item.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>

                {/* RIGHT: PRICE + STATUS */}
                <div className="flex flex-col md:items-end text-sm text-gray-600">
                  <p className="text-primary font-medium text-base">
                    {currency}
                    {item.price * item.quantity}
                  </p>
                  <p>Status: {order.status}</p>
                  <p>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Myorders;
