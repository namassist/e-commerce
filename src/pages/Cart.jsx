import React, { useState } from "react";
import { BackButton } from "../components/Atoms/BackButton";
import Button from "../components/Atoms/Button";
import applePay from "../assets/images/applepay.png";
import googlePay from "../assets/images/googlepay.png";
import amazon from "../assets/images/amazon.png";
import affirm from "../assets/images/affirm.png";
import shopeePay from "../assets/images/shopeepay.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementItem,
  deleteItem,
  incrementItem,
  getAllCarts,
  getAllProducts,
  addSells,
  deleteAllItems,
} from "../features/products/productSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const carts = useSelector(getAllCarts);

  const products = useSelector(getAllProducts);

  const [isStockAvailable, setIsStockAvailable] = useState(true);
  const totalHarga = useSelector((state) => {
    return carts.reduce((total, item) => {
      return total + item.qty * item.price;
    }, 0);
  });

  const handleDelete = (id) => dispatch(deleteItem(id));
  const handleIncrement = (id) => {
    const cartItem = carts.find((item) => item.id === id);
    const productItem = products.find((item) => item.id === id);

    if (cartItem.qty < productItem.qty) {
      dispatch(incrementItem(id));
      setIsStockAvailable(true);
    } else {
      setIsStockAvailable(false);
    }
  };

  const handleDecrement = (id) => {
    dispatch(decrementItem(id));
    setIsStockAvailable(true);
  };

  const handleCheckout = () => {
    dispatch(addSells(carts));
    dispatch(deleteAllItems());

    navigate("/home");
  };

  return (
    <section className="mt-24 ml-14 mb-11">
      <BackButton />
      {carts.length > 0 ? (
        <>
          <div className="flex flex-wrap gap-5">
            {carts?.map((cart, index) => (
              <>
                <img
                  src={cart.image}
                  alt="Product Detail Picture"
                  className="w-[16em] h-[13em] shadow-[3px_8px_12px_rgba(0,0,0,0.25)]"
                ></img>
                <div className="flex flex-col ml-10" key={index}>
                  <h1 className="font-bold text-3xl truncate w-[8.5em]">
                    {cart.title}
                  </h1>
                  <p className="mt-6 text-xl">
                    $ <span className="font-extrabold">{cart.price}</span>
                  </p>
                  <div className="flex flex-row mt-5 space-x-3">
                    <Button
                      type={"button"}
                      buttonSecondary
                      handleClick={() => handleDecrement(cart.id)}
                    >
                      -
                    </Button>
                    <Button buttonSecondary>{cart.qty}</Button>
                    <Button
                      type={"button"}
                      buttonSecondary
                      handleClick={() => handleIncrement(cart.id)}
                    >
                      +
                    </Button>
                    <Button
                      buttonDanger
                      handleClick={() => handleDelete(cart.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </Button>
                  </div>
                  {!isStockAvailable && (
                    <span className="text-xs mt-1 text-red-500">
                      maksimal yang bisa dibeli
                    </span>
                  )}
                </div>
              </>
            ))}
          </div>
          <div className="mx-auto mt-20 w-[30em] border-none rounded-md p-7 shadow-[3px_8px_12px_rgba(0,0,0,0.25)]">
            <div className="flex flex-row justify-between mb-3">
              <p>Total Harga</p>
              <p className="font-bold">$ {totalHarga.toFixed(2)}</p>
            </div>
            <Button
              type={"button"}
              buttonPrimary
              isFullWidth
              handleClick={handleCheckout}
            >
              Checkout
            </Button>
            <div className="flex flex-row justify-center mt-2">
              <Link to="https://www.apple.com/apple-pay/" target="_blank">
                <img src={applePay}></img>
              </Link>
              <Link
                to="https://play.google.com/store/games?device=windows&pli=1"
                target="_blank"
              >
                <img src={googlePay}></img>
              </Link>
              <Link to="https://www.amazon.com/" target="_blank">
                <img src={amazon}></img>
              </Link>
              <Link to="https://www.affirm.com/" target="_blank">
                <img src={affirm}></img>
              </Link>
              <Link to="https://www.shopeepay.co.id/" target="_blank">
                <img src={shopeePay}></img>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <p className="text-center">Keranjang belanja kosong</p>
      )}
    </section>
  );
};

export default Cart;
