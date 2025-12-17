import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/Appcontex";
import Productcard from "../components/Productcard";

const Allproducts = () => {
  const { products, searchquery } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    let list = products.filter(p => p.instock === true);

    if (searchquery.length > 0) {
      list = list.filter(product =>
        product.name.toLowerCase().includes(searchquery.toLowerCase())
      );
    }

    setFilteredProducts(list);
  }, [products, searchquery]);

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-medium">All Products</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-6">
        {filteredProducts.map(product => (
          <Productcard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Allproducts;
