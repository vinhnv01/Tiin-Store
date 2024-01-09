import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const sizeSlice = createSlice({
  name: "size",
  initialState,
  reducers: {
    SetSize: (state, action) => {
      return action.payload;
    },
    CreateSize: (state, action) => {
      const data = action.payload;
      const newSize = {
        stt: state.length + 1,
        id: data.id,
        name: data.name,
        status: data.status,
        createdDate: data.createdDate,
        lastModifiedDate: data.startTime,
      };
      state.unshift(newSize);
      state.forEach((item, index) => {
        item.stt = index + 1;
      });
    },
  },
});

export const { SetSize, CreateSize } = sizeSlice.actions;
export default sizeSlice.reducer;
export const GetSize = (state) => state.size;
