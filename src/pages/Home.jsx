import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Spin } from "antd";
import Header from "../components/Header/Header";
import Categories from "../components/Categories/Categories";
import Products from "../components/Products/Products";
import CartTotals from "../components/Cart/CartTotals";

const API_URL = "https://fakestoreapi.com/";

const Home = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("Tümü");
  const [searchedProducts, setSearchProducts] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, productsResponse] = await Promise.all([
          axios.get(`${API_URL}products/categories`),
          axios.get(`${API_URL}products`),
        ]);
        setCategoriesData(categoriesResponse.data);
        setProductsData(productsResponse.data);
      } catch (error) {
        console.error("Hata oluştu:", error);
      }
    };

    fetchData();
  }, []);

  const memoizedSetFilteredData = useCallback(
    (newData) => {
      setFilteredProducts(newData);
    },
    [setFilteredProducts]
  );

  const memoizedSetCategoriesData = useCallback(
    (newData) => {
      setCategoriesData(newData);
    },
    [setCategoriesData]
  );

  const memoizedSetProductsData = useCallback(
    (newData) => {
      setProductsData(newData);
    },
    [setProductsData]
  );

  return (
    <>
      <Header setSearchProducts={setSearchProducts} />
      {productsData.length > 0 && categoriesData.length > 0 ? (
        <div className="home px-6 flex md:flex-row flex-col justify-between gap-10 md:pb-0 pb-20 md:h-screen">
          <div className="categories min-w-[150px] overflow-auto max-h-[calc(100vh_-_112px)] md:pb-10">
            <Categories
              categoriesData={categoriesData}
              setCategoriesData={memoizedSetCategoriesData}
              categoryName={categoryName}
              setCategoryName={setCategoryName}
            />
          </div>
          <div className="products flex-[8] overflow-auto max-h-[calc(100vh_-_112px)] pb-10">
            <Products
              productsData={productsData}
              setProductsData={memoizedSetProductsData}
              categoriesData={categoriesData}
              filteredProducts={filteredProducts}
              setFilteredProducts={memoizedSetFilteredData}
              categoryName={categoryName}
              searchedProducts={searchedProducts}
            />
          </div>
          <div className="cart-totals min-w-[300px] border overflow-auto max-h-[calc(100vh_-_112px)]">
            <CartTotals />
          </div>
        </div>
      ) : (
        <Spin
          size="large"
          className="absolute top-1/2 h-screen w-screen flex justify-center"
        />
      )}
    </>
  );
};

export default Home;
