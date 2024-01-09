import { configureStore } from "@reduxjs/toolkit";
import CategoryReducer from "./reducer/Category.reducer";
import EmployeeReducer from "./reducer/Employee.reducer";
import LoadingReducer from "./reducer/Loading.reducer";
import SoleReducer from "./reducer/Sole.reducer";
import BrandReducer from "./reducer/Brand.reducer";
import MaterialReducer from "./reducer/Material.reducer";
import SizeReducer from "./reducer/Size.reducer";
import ColorReducer from "./reducer/Color.reducer";
import ProductReducer from "./reducer/Product.reducer";
import ProductDetailReducer from "./reducer/ProductDetail.reducer";
export const store = configureStore({
  reducer: {
    category: CategoryReducer,
    employee: EmployeeReducer,
    loading: LoadingReducer,
    sole: SoleReducer,
    brand: BrandReducer,
    material: MaterialReducer,
    color: ColorReducer,
    size: SizeReducer,
    product: ProductReducer,
    productDetail: ProductDetailReducer,
  },
});

export const dispatch = store.dispatch;
export const getState = store.getState;
