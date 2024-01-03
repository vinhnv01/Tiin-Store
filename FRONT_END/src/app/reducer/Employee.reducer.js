import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    SetEmployee: (state, action) => {
      return action.payload;
    },
    CreateEmployee: (state, action) => {
      const data = action.payload;
      const newCategory = {
        stt: state.length + 1,
        fullName: data.fullName,
        line: data.line,
        status: data.status,
        lastModifiedDate: data.lastModifiedDate,
        createdDate: data.createdDate,
        dateOfBirth: data.dateOfBirth,
        phoneNumber: data.phoneNumber,
        gender: data.gender,
        email: data.email,
        citizenIdentity: data.citizenIdentity,
        avata: data.avata,
        ward: data.ward,
        district: data.district,
        province: data.province,
        idUser: data.idUser,
        idAddress: data.idAddress,
      };
      state.unshift(newCategory);
      state.forEach((item, index) => {
        item.stt = index + 1;
      });
    },
    UpdateEmployee: (state, action) => {
      const updatedCategory = action.payload; // backend
      const index = state.findIndex(
        (period) => period.id === updatedCategory.id
      );
      console.log(index);
      if (index !== -1) {
        state[index].fullName = updatedCategory.fullName;
        state[index].status = updatedCategory.status;
        state[index].createdDate = updatedCategory.createdDate;
        state[index].lastModifiedDate = updatedCategory.lastModifiedDate;
      }
    },
  },
});

export const { SetEmployee, CreateEmployee, UpdateEmployee } =
  employeeSlice.actions;
export default employeeSlice.reducer;
export const GetEmployee = (state) => state.employee;
