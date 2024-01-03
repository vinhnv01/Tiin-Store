import { configureStore } from "@reduxjs/toolkit";
import CategoryReducer from "./reducer/Category.reducer";
import EmployeeReducer from "./reducer/Employee.reducer";
import LoadingReducer from "./reducer/Loading.reducer";
import SoleReducer from "./reducer/Sole.reducer";
import BrandReducer from "./reducer/Brand.reducer";
import MaterialReducer from "./reducer/Material.reducer";
export const store = configureStore({
  reducer: {
    category: CategoryReducer,
    employee: EmployeeReducer,
    loading: LoadingReducer,
    sole: SoleReducer,
    brand: BrandReducer,
    material: MaterialReducer,
  },
});

export const dispatch = store.dispatch;
export const getState = store.getState;
