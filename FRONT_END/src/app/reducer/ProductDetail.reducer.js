import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const productDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  reducers: {
    SetProductDetail: (state, action) => {
      return action.payload;
    },
  },
});

export const { SetProductDetail, CreateProductDetail } =
  productDetailSlice.actions;
export default productDetailSlice.reducer;
export const GetProductDetail = (state) => state.productDetail;
