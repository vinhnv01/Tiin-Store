import { configureStore } from "@reduxjs/toolkit";
import CategoryReducer from "./reducer/Category.reducer";
import EmployeeReducer from "./reducer/Employee.reducer";
import LoadingReducer from "./reducer/Loading.reducer";
export const store = configureStore({
  reducer: {
    category: CategoryReducer,
    employee: EmployeeReducer,
    loading: LoadingReducer,
  },
});

export const dispatch = store.dispatch;
export const getState = store.getState;
