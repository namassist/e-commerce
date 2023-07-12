import React, { useState, useEffect } from "react";
import {
  fetchProducts,
  getAllProducts,
  addToCart,
} from "../features/products/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Atoms/Button";
import homepage from "../assets/images/Layer.png";

const HomePages = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector(getAllProducts);

  const [isLoading, setIsLoading] = useState(false);
  const [Login, setLogin] = useState(false);
  const addtocart = (id) => {
    if (JSON.parse(!localStorage.getItem("login"))) {
      return navigate("/login");
    }
    dispatch(addToCart(id));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLogin(true);
        setIsLoading(true);
        await dispatch(fetchProducts());
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setLogin(false);
        console.log(error);
      }
    };

    fetchData();
  }, [dispatch, Login]);

  return (
    <section id="home" className="px-14 mt-20">
      <div className="flex flex-col lg:flex-row justify-between items-center">
        <div className="max-w-md">
          <h1 className="text-4xl pb-2">Welcome To Our </h1>
          <h1 className="font-bold text-4xl pb-2">Lizidi Tikipidi World</h1>
          <p>
            Lizidi Tikipidi is the buying and selling of goods and services, or
            the transmitting of funds or data, over an electronic network,
            primarily the internet.
          </p>
        </div>
        <img src={homepage} alt="browsing" />
      </div>
      <div className="flex flex-wrap gap-3 pt-20 mb-16">
        {isLoading ? (
          <p className="mx-auto p-10 text-gray-400">Loading...</p>
        ) : (
          products.map((product, index) => (
            <div
              key={index}
              className="w-[calc(27%_-_3.5rem)] px-5 pb-5 rounded-lg shadow-[3px_8px_12px_rgba(0,0,0,0.25)] text-center mb-10"
            >
              <img
                src={product.image}
                alt="product"
                className="h-[10rem] mx-auto bg-center bg-cover"
              />
              <h2 className="font-bold text-xl mt-5 line-clamp-2 hyphens-auto h-[3em]">
                {product.title}
              </h2>
              <p className="truncate text-gray-500 text-sm">
                {product.category}
              </p>
              <p className="truncate text-gray-500 text-sm">
                stock {product.qty}
              </p>
              <p className="mt-3 text-justify line-clamp-3">
                {product.description}
              </p>
              <div className="space-x-6 mt-7 flex flex-row">
                <Link to={`/product-detail/${product.id}`}>
                  <Button type={"button"} buttonPrimary>
                    Detail
                  </Button>
                </Link>
                <button
                  className="btn badge badge-primary badge-outline"
                  onClick={() => addtocart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default HomePages;
