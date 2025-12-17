import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/Appcontex";

const Productcard = ({ product }) => {
  const {
    currency,
    addtocart,
    removecart,
    navigate,
    cartitems,
  } = useAppContext();

  return (
    <div
      onClick={() => {
        navigate(`/products/${product.category}/${product._id}`);
        scrollTo(0, 0);
      }}
      className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-56 w-full"
    >
      {/* IMAGE */}
      <div className="group cursor-pointer flex items-center justify-center px-2">
        <img
          className="group-hover:scale-105 transition max-w-26 md:max-w-36"
          src={product.img?.[0]}     // ✅ img
          alt={product.name}
        />
      </div>

      <div className="text-gray-500/60 text-sm">
        <p>{product.category}</p>

        <p className="text-gray-700 font-medium text-lg truncate w-full">
          {product.name}
        </p>

        {/* PRICE */}
        <div className="flex items-end justify-between mt-3">
          <p className="md:text-xl text-base font-medium text-primary">
            {currency}{product.offerprice}   {/* ✅ offerprice */}
            <span className="text-gray-500/60 md:text-sm text-xs line-through ml-1">
              {currency}{product.price}
            </span>
          </p>

          {/* CART */}
          {!cartitems[product._id] ? (
            <button
              className="flex items-center justify-center gap-1 bg-primary/10 border border-primary/10 md:w-[80px] w-[64px] h-[34px] rounded"
              onClick={(e) => {
                e.stopPropagation();
                addtocart(product._id);
              }}
            >
              <img src={assets.cart_icon} alt="" />
              Add
            </button>
          ) : (
            <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-primary/25 rounded">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removecart(product._id);
                }}
              >
                -
              </button>
              <span>{cartitems[product._id]}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addtocart(product._id);
                }}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Productcard;
