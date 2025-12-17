import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/Appcontex";
import { assets } from "../assets/assets";
import { toast } from "react-hot-toast";

const Cart = () => {
  const {
    products,
    currency,
    cartitems,
    removecart,
    getCartcount,
    getcartAmount,
    updatecartitems,
    navigate,
    user,
    axios,
    setCartitems,
  } = useAppContext();

  const [cartarray, setcartarray] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedaddress, setSelectedaddress] = useState(null);
  const [paymentoption, setPaymentoption] = useState("COD");

  // ========================
  // BUILD CART
  // ========================
  useEffect(() => {
    const temp = [];

    for (const id in cartitems) {
      const product = products.find((p) => p._id === id);
      if (product) {
        temp.push({
          ...product,
          quantity: cartitems[id],
        });
      }
    }

    setcartarray(temp);
  }, [products, cartitems]);

  // ========================
  // GET USER ADDRESSES
  // ========================
  const getUserAddresses = async () => {
    try {
      const { data } = await axios.get("/api/address/get");
      if (data.success) {
        setAddresses(data.addresses);
        if (data.addresses.length > 0) {
          setSelectedaddress(data.addresses[0]);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      getUserAddresses();
    }
  }, [user]);

  if (!products.length) return null;

  // ========================
  // PLACE ORDER
  // ========================
  const placeorder = async () => {
    try {
      if (!selectedaddress) {
        return toast.error("Please select an address");
      }

      const payload = {
        items: cartarray.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        })),
        address: selectedaddress._id,
      };

      // ===== COD =====
      if (paymentoption === "COD") {
        const { data } = await axios.post("/api/order/cod", payload);

        if (data.success) {
          toast.success(data.message);
          setCartitems({});
          navigate("/my-orders");
        } else {
          toast.error(data.message);
        }
      }

      // ===== STRIPE =====
      else {
        const { data } = await axios.post("/api/order/stripe", payload);

        if (data.success && data.url) {
          // 🔴 IMPORTANT: Redirect to Stripe
          window.location.href = data.url;
        } else {
          toast.error("Stripe payment failed");
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row mt-16">
      {/* LEFT */}
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart{" "}
          <span className="text-sm text-primary">
            {getCartcount()} item(s)
          </span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 font-medium pb-3">
          <p>Product</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartarray.map((product) => (
          <div
            key={product._id}
            className="grid grid-cols-[2fr_1fr_1fr] items-center pt-3"
          >
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 border rounded overflow-hidden">
                <img
                  src={product.img?.[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <p className="font-semibold">{product.name}</p>

                <div className="flex items-center gap-2 mt-1">
                  <span>Qty:</span>
                  <select
                    value={product.quantity}
                    onChange={(e) =>
                      updatecartitems(product._id, Number(e.target.value))
                    }
                  >
                    {Array.from({ length: 9 }).map((_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <p className="text-center">
              {currency}
              {(product.offerprice * product.quantity).toFixed(2)}
            </p>

            <button
              onClick={() => removecart(product._id)}
              className="mx-auto"
            >
              <img src={assets.remove_icon} className="w-6" />
            </button>
          </div>
        ))}

        <button
          onClick={() => navigate("/products")}
          className="mt-8 text-indigo-500 font-medium flex items-center gap-2"
        >
          <img src={assets.arrow_right_icon_colored} />
          Continue Shopping
        </button>
      </div>

      {/* RIGHT */}
      <div className="max-w-[360px] w-full bg-gray-100/40 p-5 mt-16 md:mt-0 border">
        <h2 className="text-xl font-medium">Order Summary</h2>
        <hr className="my-4" />

        <p className="text-sm font-medium uppercase">Delivery Address</p>
        {selectedaddress ? (
          <p className="text-gray-500 mt-2">
            {selectedaddress.street}, {selectedaddress.city},{" "}
            {selectedaddress.state}, {selectedaddress.country}
          </p>
        ) : (
          <p className="text-red-500 mt-2">No address found</p>
        )}

        <button
          onClick={() => navigate("/add-address")}
          className="text-indigo-500 text-sm mt-2"
        >
          Add / Change Address
        </button>

        <p className="text-sm font-medium uppercase mt-6">
          Payment Method
        </p>
        <select
          value={paymentoption}
          onChange={(e) => setPaymentoption(e.target.value)}
          className="w-full border px-3 py-2 mt-2"
        >
          <option value="COD">Cash On Delivery</option>
          <option value="STRIPE">Online Payment</option>
        </select>

        <hr className="my-4" />

        <div className="text-gray-500 space-y-2">
          <p className="flex justify-between">
            <span>Price</span>
            <span>
              {currency}
              {getcartAmount()}
            </span>
          </p>

          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>
              {currency}
              {(getcartAmount() * 0.02).toFixed(2)}
            </span>
          </p>

          <p className="flex justify-between font-medium text-lg">
            <span>Total</span>
            <span>
              {currency}
              {(getcartAmount() * 1.02).toFixed(2)}
            </span>
          </p>
        </div>

        <button
          onClick={placeorder}
          className="w-full py-3 mt-6 bg-indigo-500 text-white"
        >
          {paymentoption === "COD"
            ? "Place Order"
            : "Pay with Stripe"}
        </button>
      </div>
    </div>
  );
};

export default Cart;
