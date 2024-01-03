import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const soleSlice = createSlice({
  name: "sole",
  initialState,
  reducers: {
    SetSole: (state, action) => {
      return action.payload;
    },
    CreateSole: (state, action) => {
      const data = action.payload;
      const newSole = {
        stt: state.length + 1,
        id: data.id,
        name: data.name,
        status: data.status,
        createdDate: data.createdDate,
        lastModifiedDate: data.startTime,
      };
      state.unshift(newSole);
      state.forEach((item, index) => {
        item.stt = index + 1;
      });
    },
    UpdateSole: (state, action) => {
      const updatedSole = action.payload; // backend
      const index = state.findIndex((period) => period.id === updatedSole.id);
      console.log(index);
      if (index !== -1) {
        state[index].name = updatedSole.name;
        state[index].status = updatedSole.status;
        state[index].createdDate = updatedSole.createdDate;
        state[index].lastModifiedDate = updatedSole.lastModifiedDate;
      }
    },
  },
});

export const { SetSole, CreateSole, UpdateSole } = soleSlice.actions;
export default soleSlice.reducer;
export const GetSole = (state) => state.sole;
