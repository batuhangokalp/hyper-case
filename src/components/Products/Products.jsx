import React, { useEffect } from "react";
import ProductItem from "./ProductItem";

const Products = React.memo(
  ({
    productsData,
    filteredProducts,
    setFilteredProducts,
    categoryName,
    searchedProducts,
  }) => {
    useEffect(() => {
      let filtered = productsData;

      if (categoryName !== "Tümü") {
        filtered = filtered.filter(
          (product) => product?.category === categoryName
        );
      }

      if (searchedProducts) {
        filtered = filtered.filter((product) =>
          product.title.toLowerCase().includes(searchedProducts.toLowerCase())
        );
      }

      setFilteredProducts(filtered);
    }, [categoryName, searchedProducts, productsData, setFilteredProducts]);

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {filteredProducts?.map((product) => (
          <div key={product?.id} className="relative">
            <ProductItem product={product} />
          </div>
        ))}
      </div>
    );
  }
);

export default Products;
