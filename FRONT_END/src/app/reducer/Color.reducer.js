import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {
    SetColor: (state, action) => {
      return action.payload;
    },
    CreateColor: (state, action) => {
      const data = action.payload;
      const newColor = {
        stt: state.length + 1,
        id: data.id,
        name: data.name,
        code: data.code,
        status: data.status,
        createdDate: data.createdDate,
        lastModifiedDate: data.startTime,
      };
      state.unshift(newColor);
      state.forEach((item, index) => {
        item.stt = index + 1;
      });
    },
  },
});

export const { SetColor, CreateColor } = colorSlice.actions;
export default colorSlice.reducer;
export const GetColor = (state) => state.color;
