import { useState } from "react";
import {
  getAllProducts,
  updateProductQty,
} from "../features/products/productSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Atoms/Button";
import admin from "../assets/images/admin.png";

const AdminStockPages = () => {
  const dispatch = useDispatch();
  const products = useSelector(getAllProducts);

  const handleUpdateStock = (productId, newQty) => {
    dispatch(updateProductQty({ productId, newQty }));
    alert("berhasil diupdate");
  };

  return (
    <section className="px-14 mt-20">
      <div className="flex flex-col lg:flex-row justify-between items-center">
        <div className="max-w-md">
          <h1 className="text-4xl pb-2">Welcome To Admin </h1>
          <h1 className="font-bold text-4xl pb-2">Lizidi Tikipidi World</h1>
          <p>
            Lizidi Tikipidi is the buying and selling of goods and services, or
            the transmitting of funds or data, over an electronic network,
            primarily the internet. <br></br>
            Admin can update stock of products here.
          </p>
        </div>
        <img src={admin} alt="browsing" />
      </div>
      <div className="flex flex-wrap gap-3 pt-20 mb-16">
        {products.map((product, index) => (
          <AdminProductCard
            key={index}
            product={product}
            handleUpdateStock={handleUpdateStock}
          />
        ))}
      </div>
    </section>
  );
};

const AdminProductCard = ({ product, handleUpdateStock }) => {
  const [updatedQty, setUpdatedQty] = useState(product.qty);

  const handleOnClickUpdate = () => {
    handleUpdateStock(product.id, updatedQty);
  };

  return (
    <div className="w-[calc(27%_-_3.5rem)] px-5 pb-5 rounded-lg shadow-[3px_8px_12px_rgba(0,0,0,0.25)] text-center">
      <img
        src={product.image}
        alt="product"
        className="h-[10rem] mx-auto bg-center bg-cover"
      />
      <h2 className="font-bold text-xl mt-5 line-clamp-2 hyphens-auto h-[3em]">
        {product.title}
      </h2>
      <p className="truncate text-gray-500 text-sm">{product.category}</p>
      <p className="mt-3 text-justify line-clamp-3">{product.description}</p>
      <form className="my-5">
        <label htmlFor="qty" className="font-bold">
          Stock :{" "}
        </label>
        <input
          type="number"
          name="qty"
          id="qty"
          min={0}
          value={updatedQty}
          className="w-[3em] text-center py-1 font-bold ml-3 border border-black rounded-md"
          onChange={(e) => setUpdatedQty(parseInt(e.target.value))}
        />
      </form>
      <Button type="button" buttonPrimary handleClick={handleOnClickUpdate}>
        UPDATE
      </Button>
    </div>
  );
};

export default AdminStockPages;
