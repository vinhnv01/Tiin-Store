import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    SetBrand: (state, action) => {
      return action.payload;
    },
    CreateBrand: (state, action) => {
      const data = action.payload;
      const newBrand = {
        stt: state.length + 1,
        id: data.id,
        name: data.name,
        status: data.status,
        createdDate: data.createdDate,
        lastModifiedDate: data.startTime,
      };
      state.unshift(newBrand);
      state.forEach((item, index) => {
        item.stt = index + 1;
      });
    },
    UpdateBrand: (state, action) => {
      const updatedBrand = action.payload; // backend
      const index = state.findIndex((period) => period.id === updatedBrand.id);
      if (index !== -1) {
        state[index].name = updatedBrand.name;
        state[index].status = updatedBrand.status;
        state[index].createdDate = updatedBrand.createdDate;
        state[index].lastModifiedDate = updatedBrand.lastModifiedDate;
      }
    },
  },
});

export const { SetBrand, CreateBrand, UpdateBrand } = brandSlice.actions;
export default brandSlice.reducer;
export const GetBrand = (state) => state.brand;
