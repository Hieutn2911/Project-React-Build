import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Product = {
  // productId: string;
  // productName: string;
  // price: number;
  // description: string;
  // imageUrl: string;
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export type ProductsState = {
  productlist: Product[];
  isLoading: boolean;
  productdetails: Product | null;
  productCart: number[];
};

const initialState: ProductsState = {
  productlist: [],
  isLoading: false,
  productdetails: null,
  productCart: [],
};
export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProductList: (state, action: PayloadAction<Product[]>) => {
      state.isLoading = false;
      state.productlist = action.payload;
    },
    requestProducts: (state) => {
      state.isLoading = true;
    },
    setProductDetail: (state, action: PayloadAction<Product>) => {
      state.productdetails = action.payload;
    },
    setProductCart: (state, action: PayloadAction<Product>) => {
      state.productCart?.push(action.payload.id);
    },
    DeleteProductCart: (state, action: PayloadAction<Product>) => {
      const LastIndex = state.productCart.lastIndexOf(action.payload.id);
      state.productCart.splice(LastIndex, 1);
    },
  },
});
export const {
  setProductList,
  requestProducts,
  setProductDetail,
  setProductCart,
  DeleteProductCart,
} = productsSlice.actions;
export default productsSlice.reducer;
