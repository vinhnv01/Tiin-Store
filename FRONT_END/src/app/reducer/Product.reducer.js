import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    SetProduct: (state, action) => {
      return action.payload;
    },
    CreateProduct: (state, action) => {
      const data = action.payload;
      const newProduct = {
        stt: state.length + 1,
        id: data.id,
        name: data.name,
        code: data.code,
        status: data.status,
        createdDate: data.createdDate,
        lastModifiedDate: data.startTime,
      };
      state.unshift(newProduct);
      state.forEach((item, index) => {
        item.stt = index + 1;
      });
    },
  },
});

export const { SetProduct, CreateProduct } = productSlice.actions;
export default productSlice.reducer;
export const GetProduct = (state) => state.product;
