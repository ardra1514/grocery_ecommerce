import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/Appcontex";
import { assets } from "../../assets/assets";
import { toast } from "react-hot-toast";

const Orders = () => {
  const { currency, axios } = useAppContext();
  const [orders, setOrders] = useState([]);

  // ========================
  // FETCH ALL ORDERS
  // ========================
  const fetchorders = async () => {
    try {
      const { data } = await axios.get("/api/order/seller");

      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchorders();
  }, []);

  return (
    <div className="flex-1 h-[95vh] overflow-y-scroll">
      <div className="md:p-10 p-4 space-y-4">
        <h2 className="text-lg font-medium">Orders List</h2>

        {orders.length === 0 && (
          <p className="text-gray-500">No orders found</p>
        )}

        {orders.map((order) => (
          <div
            key={order._id}
            className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_1fr] gap-5 p-5 max-w-5xl rounded-md border border-gray-300 text-gray-800"
          >
            {/* ITEMS */}
            <div className="flex gap-4">
              <img
                className="w-12 h-12 object-cover opacity-60"
                src={assets.box_icon}
                alt="boxIcon"
              />

              <div className="space-y-1">
                {order.items.map((item, idx) => (
                  <p key={idx} className="font-medium">
                    {item.name}
                    <span className="text-primary">
                      {" "}
                      × {item.quantity}
                    </span>
                  </p>
                ))}
              </div>
            </div>

            {/* ADDRESS (SAFE FALLBACK) */}
            <div className="text-sm text-black/60">
              <p className="font-medium mb-1">
                Address ID: {order.address}
              </p>
            </div>

            {/* AMOUNT */}
            <p className="font-medium text-base text-black/70 my-auto">
              {currency}
              {order.amount}
            </p>

            {/* PAYMENT INFO */}
            <div className="flex flex-col text-sm">
              <p>Method: {order.paymenttype}</p>
              <p>
                Date:{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p>
                Payment: {order.ispaid ? "Paid" : "Pending"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
