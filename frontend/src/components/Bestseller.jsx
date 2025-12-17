import React from "react";
import Productcard from "./Productcard";
import { useAppContext } from "../context/Appcontex";

const Bestseller = () => {
  const { products } = useAppContext();

  return (
    <div className="mt-16">
      <p className="text-2xl md:text-3xl font-medium">Best Sellers</p>

      <div className="flex gap-4 flex-wrap mt-4">
        {products
          .filter((product) => product.instock === true) // ✅ correct field
          .slice(0, 5)
          .map((product) => (
            <Productcard key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default Bestseller;
