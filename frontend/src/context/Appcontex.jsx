import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import { toast } from "react-hot-toast";
import axios from "axios";

export const Appcontext = createContext();

// ⭐ GLOBAL AXIOS FIX
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;  // CORRECT

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isseller, setIsseller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);

  const [products, setProducts] = useState([]);
  const [cartitems, setCartitems] = useState({});
  const [searchquery, setSearchquery] = useState({});

  const currency = import.meta.env.VITE_CURRENCY;


const fetchseller=async()=>{
  try {
    const {data}=await axios.get('/api/seller/is-auth')
    if(data.success){
      setIsseller(true)
    }else{
        setIsseller(false)
    }
  } catch (error) {
      setIsseller(false)
  }
}
//fetch user auth status,
const fetchuser = async () => {
  try {
    const { data } = await axios.get("/api/user/is-auth");
    if (data.success) {
      setUser(data.user);
      setCartitems(data.user.cartitems || {});
    }
  } catch {
    setUser(null);
  }
};








  // Load dummy products
  const fetchproduct = async () => {
   try {
        const{data}=await axios.get('/api/product/list')
        if(data.success){
          setProducts(data.products)
        }
        else{
          toast.error(data.message)
        }
   } catch (error) {
          toast.error(error.message)
    
   }
  };

  useEffect(() => {
    fetchproduct();
    fetchseller();
    fetchuser()
  }, []);

//update database cartitem

// context/Appcontex.jsx
useEffect(() => {
  if (!user) return;

  const updatecart = async () => {
    try {
      const { data } = await axios.post("/api/cart/update", {
        cartitems,
      });

      if (!data.success) {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  updatecart();
}, [cartitems, user]);








  // Add to cart
  const addtocart = (itemid) => {
    let cartData = structuredClone(cartitems);

    if (cartData[itemid]) {
      cartData[itemid] += 1;
    } else {
      cartData[itemid] = 1;
    }

    setCartitems(cartData);
    toast.success("Added to cart");
  };

  // Update cart
  const updatecartitems = (itemid, quantity) => {
    let cartData = structuredClone(cartitems);
    cartData[itemid] = quantity;
    setCartitems(cartData);
    toast.success("Cart updated");
  };

  // Remove item
  const removecart = (itemid) => {
    let cartData = structuredClone(cartitems);

    if (cartData[itemid]) {
      cartData[itemid] -= 1;
      if (cartData[itemid] === 0) delete cartData[itemid];
    }

    setCartitems(cartData);
    toast.success("Item removed");
  };

  const getCartcount = () => {
    let totalcount = 0;
    for (const item in cartitems) {
      totalcount += cartitems[item];
    }
    return totalcount;
  };

 const getcartAmount = () => {
  let totalamount = 0;

  for (const item in cartitems) {
    const iteminfo = products.find((p) => p._id === item);
    if (!iteminfo) continue;

    totalamount += Number(iteminfo.offerprice) * cartitems[item];
  }

  return Math.floor(totalamount * 100) / 100;
};


  return (
    <Appcontext.Provider
      value={{
        navigate,
        user,
        setUser,
        isseller,
        setIsseller,
        showUserLogin,
        setShowUserLogin,
        products,
        currency,
        addtocart,
        updatecartitems,
        removecart,
        cartitems,
        searchquery,
        setSearchquery,
        getcartAmount,
        getCartcount,
        axios,
        fetchproduct,
        setCartitems
      }}
    >
      {children}
    </Appcontext.Provider>
  );
};

export const useAppContext = () => useContext(Appcontext);
