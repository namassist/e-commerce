import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "https://fakestoreapi.com/products";

const initialState = {
  products: [],
  carts: localStorage.getItem("carts")
    ? JSON.parse(localStorage.getItem("carts"))
    : [],
  sells: localStorage.getItem("sells")
    ? JSON.parse(localStorage.getItem("sells"))
    : [],
  updateQtyProduct: localStorage.getItem("updateQtyProduct")
    ? JSON.parse(localStorage.getItem("updateQtyProduct"))
    : [],
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get(URL);
    return response.data;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItems = state.carts.slice();
      const newItem = { ...action.payload, qty: 1 };

      const existingItemIndex = existingItems.findIndex(
        (item) => item.id === newItem.id
      );

      const product = state.products.find((prod) => prod.id === newItem.id);
      if (product.qty === 0) {
        alert("Stock melebihi batas");
        return;
      }

      if (existingItemIndex !== -1) {
        const existingItem = existingItems[existingItemIndex];

        if (existingItem.qty + 1 > product.qty) {
          alert("Stock melebihi batas");
          return;
        }

        existingItem.qty += 1;
      } else {
        existingItems.push(newItem);
      }

      state.carts = existingItems;
      localStorage.setItem("carts", JSON.stringify(existingItems));
    },
    addSells: (state, action) => {
      const newCheckout = action.payload;
      const existingCheckout = state.sells;

      newCheckout.forEach((item) => {
        const existingItemIndex = existingCheckout.findIndex(
          (existingItem) => existingItem.id === item.id
        );

        if (existingItemIndex !== -1) {
          const existingItem = existingCheckout[existingItemIndex];
          const mergedItem = {
            ...existingItem,
            qty: existingItem.qty + item.qty,
          };
          existingCheckout[existingItemIndex] = mergedItem;
        } else {
          existingCheckout.push(item);
        }
      });

      state.sells = existingCheckout;
      localStorage.setItem("sells", JSON.stringify(existingCheckout));
    },
    deleteItem: (state, action) => {
      const itemId = action.payload;
      state.carts = state.carts.filter((item) => item.id !== itemId);
      localStorage.setItem("carts", JSON.stringify(state.carts));
    },
    incrementItem: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.carts.find((item) => item.id === itemId);

      if (existingItem) {
        existingItem.qty += 1;
        localStorage.setItem("carts", JSON.stringify(state.carts));
      }
    },
    decrementItem: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.carts.find((item) => item.id === itemId);

      if (existingItem && existingItem.qty > 1) {
        existingItem.qty -= 1;
        localStorage.setItem("carts", JSON.stringify(state.carts));
      }
    },
    deleteAllItems: (state) => {
      state.carts = [];
      localStorage.removeItem("carts");
    },
    updateProductQty: (state, action) => {
      const { productId, newQty } = action.payload;
      const existingUpdateQtyProduct = state.updateQtyProduct;

      const productToUpdate = existingUpdateQtyProduct.find(
        (product) => product.productId === productId
      );

      if (productToUpdate) {
        productToUpdate.newQty = newQty;
      } else {
        existingUpdateQtyProduct.push({ productId, newQty });
      }

      state.updateQtyProduct = existingUpdateQtyProduct;

      localStorage.setItem(
        "updateQtyProduct",
        JSON.stringify(existingUpdateQtyProduct)
      );

      state.products = state.products.map((product) =>
        product.id === productId ? { ...product, qty: newQty } : product
      );
    },
  },
  extraReducers: {
    [fetchProducts.pending]: () => console.log("pending"),
    [fetchProducts.fulfilled]: (state, { payload }) => {
      console.log("fetch successfully");
      const updateQtyProduct = state.updateQtyProduct;

      const productsWithQty = payload.map((product) => {
        const matchingProduct = updateQtyProduct.find(
          (p) => p.productId === product.id
        );
        const qty = matchingProduct ? matchingProduct.newQty : 20;
        return { ...product, qty };
      });

      const updatedProductsWithQty = productsWithQty.map((product) => {
        const checkoutItem = state.sells.find((item) => item.id === product.id);
        const qty = checkoutItem ? checkoutItem.qty : 0;
        return {
          ...product,
          qty: product.qty - qty,
        };
      });

      return { ...state, products: updatedProductsWithQty };
    },
    [fetchProducts.rejected]: () => console.log("pending"),
  },
});

export const {
  addToCart,
  deleteItem,
  incrementItem,
  decrementItem,
  getCart,
  updateCart,
  addSells,
  deleteAllItems,
  updateProductQty,
} = productsSlice.actions;

export const getAllProducts = (state) => state.products.products;
export const getAllCarts = (state) => state.products.carts;
export const getAllSells = (state) => state.products.sells;

export default productsSlice.reducer;
