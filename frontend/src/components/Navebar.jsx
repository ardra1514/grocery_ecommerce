import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/Appcontex";

const Navebar = () => {

  const [open, setOpen] = React.useState(false);
  const [showMenu, setShowMenu] = React.useState(false);

  const { user, setUser, setShowUserLogin, navigate, setSearchquery, searchquery,getCartcount,axios } = useAppContext();

  const logout = async() => {

    try {
      
        const {data} =await axios.get('/api/user/logout')
        if(data.success){
          toast.success(data.message)
          setUser(null)
          navigate('/')
        }
        else{
          toast.error(data.message)

        }


    } catch (error) {
          toast.error(error.message)
      
    }
   
  };


  

  useEffect(() => {
    if (searchquery.length > 0) {
      navigate("/products")
    }
  }, [searchquery])





  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 
                    border-b border-gray-300 bg-white fixed top-0 left-0 right-0 z-50">

      {/* Logo */}
      <NavLink to="/" onClick={() => setOpen(false)}>
        <img src={assets.logo} alt="Logo" />
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">

        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">All Products</NavLink>
        <NavLink to="/contact">Contact</NavLink>

        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            type="text"
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            onChange={(e) => {
              setSearchquery(e.target.value)
            }}

          />
          <img src={assets.search_icon} alt="" className="w-4 h-4" />
        </div>




        {/* Cart */}
        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          <img src={assets.nav_cart_icon} className="w-6" />
          <span className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 
                           w-[18px] h-[18px] rounded-full flex items-center justify-center">
          {getCartcount()}
          </span>
        </div>

        {/* AUTH SECTION */}
        {user ? (
          <div className="relative">
            {/* Profile Icon */}
            <img
              src={assets.profile_icon}
              className="w-10 cursor-pointer"
              onClick={() => setShowMenu(!showMenu)}
            />

            {/* Dropdown */}
            {showMenu && (
              <ul className="absolute right-0 mt-2 bg-white border shadow-md rounded-md p-3 w-32 z-50">
                <li
                  onClick={() => navigate("/my-orders")}
                  className="py-1 hover:text-indigo-600 cursor-pointer">
                  My Orders
                </li>

                <li
                  onClick={() => {
                    setShowMenu(false);
                    logout();
                  }}
                  className="py-1 hover:text-red-600 cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            )}
          </div>
        ) : (
          <button
            onClick={() => setShowUserLogin(true)}
            className="cursor-pointer px-8 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full"
          >
            Login
          </button>
        )}
      </div>


<div className="flex item-center gap-6 sm:hidden">
     <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          <img src={assets.nav_cart_icon} className="w-6" />
          <span className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 
                           w-[18px] h-[18px] rounded-full flex items-center justify-center">
          {getCartcount()}
          </span>
        </div>
 {/* Mobile Menu Button */}
      <button className="sm:hidden" onClick={() => setOpen(!open)}>
        <img src={assets.menu_icon} className="w-6" />
      </button>
</div>





     

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-[60px] left-0 w-full bg-white shadow-md p-5 
                        flex flex-col gap-3 sm:hidden z-40">

          <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/products" onClick={() => setOpen(false)}>All Products</NavLink>
          {user && <NavLink to="/orders" onClick={() => setOpen(false)}>My Orders</NavLink>}
          <NavLink to="/contact" onClick={() => setOpen(false)}>Contact</NavLink>

          {user ? (
            <button
              onClick={() => {
                setOpen(false);
                logout();
              }}
              className="cursor-pointer px-6 py-2 bg-indigo-600 hover:bg-indigo-700 
                         text-white rounded-full text-sm"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                setOpen(false);
                setShowUserLogin(true);
              }}
              className="cursor-pointer px-6 py-2 bg-indigo-600 hover:bg-indigo-700 
                         text-white rounded-full text-sm"
            >
              Login
            </button>
          )}
        </div>
      )}

    </nav>
  );
};

export default Navebar;
