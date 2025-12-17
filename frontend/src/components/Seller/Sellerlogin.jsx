import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/Appcontex";
import toast from "react-hot-toast";
import axios from "axios";

const Sellerlogin = () => {
  const { isseller, setIsseller, navigate } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isseller) {
      navigate("/seller");
    }
  }, [isseller]);

  const onsubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post("/api/seller/login", {
        email,
        password,
      });

      if (data.success) {
        setIsseller(true);
        navigate("/seller");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    !isseller && (
      <form
        onSubmit={onsubmitHandler}
        className="min-h-screen flex items-center text-sm text-gray-600"
      >
        <div className="flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200">
          <p className="text-2xl font-medium m-auto">
            <span className="text-primary">Seller </span>Login
          </p>

          {/* Email */}
          <div className="w-full">
            <p>Email</p>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            />
          </div>

          {/* Password */}
          <div className="w-full">
            <p>Password</p>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-primary text-white w-full py-2 rounded-md"
          >
            Login
          </button>
        </div>
      </form>
    )
  );
};

export default Sellerlogin;
