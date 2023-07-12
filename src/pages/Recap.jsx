import React from "react";
import { Link } from "react-router-dom";
import { getAllSells } from "../features/products/productSlice";
import { useSelector } from "react-redux";
import { BackButton } from "../components/Atoms/BackButton";

const Recap = () => {
  const sells = useSelector(getAllSells);

  const calculateTotalIncome = () => {
    let totalIncome = 0;
    sells.forEach((product) => {
      const income = product.price * product.qty;
      totalIncome += income;
    });
    return totalIncome;
  };

  return (
    <section className="mt-24 ml-14 mb-11">
      <BackButton />
      {sells.length > 0 ? (
        <>
          <div className="flex flex-wrap gap-2">
            {sells?.map((sell, index) => (
              <>
                <img
                  src={sell.image}
                  alt="Product Detail Picture"
                  className="w-[15em] h-[13em] shadow-[3px_8px_12px_rgba(0,0,0,0.25)]"
                ></img>
                <div className="flex flex-col ml-10 mr-10 mb-10">
                  <h1 className="font-bold text-3xl truncate w-[8.5em] mt-4">
                    {sell.title}
                  </h1>
                  <button className="btn btn-sm w-[10em] btn-primary px-0 text-xs text-white mt-3">
                    Sold : {sell.qty}
                  </button>
                  <p className="mt-6 text-xl">
                    $ <span className="font-extrabold">{sell.price}</span>
                  </p>
                  <div className="flex flex-row mt-5">
                    <p>
                      T O T A L{" "}
                      <span className="ml-7 font-bold">
                        $ {(sell.qty * sell.price).toFixed(2)}
                      </span>
                    </p>
                  </div>
                </div>
              </>
            ))}
          </div>
          <div className="mx-auto mt-20 w-[30em] border-none rounded-md p-7 shadow-[3px_8px_12px_rgba(0,0,0,0.25)]">
            <div className="flex flex-row justify-around text-md tracking-widest mb-3">
              <p>Total income</p>
              <p>&#8739;</p>
              <p className="font-bold">$ {calculateTotalIncome().toFixed(2)}</p>
            </div>
          </div>
        </>
      ) : (
        <p className="text-center">Belum ada product terjual</p>
      )}
    </section>
  );
};

export default Recap;
