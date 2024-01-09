import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppConfig } from "./AppConfig";
import { Suspense } from "react";
import AuthGuard from "./guard/AuthGuard";
import DashboardCensor from "./layout/censor/DashboardCensor";
import DashboardManagement from "./pages/censor/dashboard-management/DashboardManagement";
import CustumerManagement from "./pages/censor/custumer-management/CustumerManagement";
import EmployeeManagement from "./pages/censor/employee-management/EmployeeManagement";
import ProductDetailManagement from "./pages/censor/productdetail-management/ProductDetailManagement";
import NotFoud from "./pages/404/NotFoud";
import AddEmployeeManagement from "./pages/censor/employee-management/add";
import AddCustumerManagement from "./pages/censor/custumer-management/add";
import UpdateEmployeeManagement from "./pages/censor/employee-management/update";
import UpdateCustumerManagement from "./pages/censor/custumer-management/update";
import CategoryManagement from "./pages/censor/category-management/CategoryManagement";
import BillManagement from "./pages/censor/bill/BillManagement";
import { GetLoading } from "./app/reducer/Loading.reducer";
import { useAppSelector } from "./app/hook";
import loading from "./../src/assets/s_discount_icon.png";
import BrandManagement from "./pages/censor/brand-management/BrandManagement";
import MaterialManagement from "./pages/censor/material-management/MaterialManagement";
import SoleManagement from "./pages/censor/sole-management/SoleManagement";
import AddProductDetail from "./pages/censor/productdetail-management/AddProductDetail";
import ListProductDetail from "./pages/censor/productdetail-management/list-product-detai/ListProductDetail";
import UpdateProductDetail from "./pages/censor/productdetail-management/UpdateProductDetail";
import PromotionManagement from "./pages/censor/promotion-management/PromotionManagement";
import AddPromotion from "./pages/censor/promotion-management/Add";

function App() {
  const isLoading = useAppSelector(GetLoading);

  return (
    <div className="App">
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-logo">
            <img src={loading} alt="Logo" />
          </div>
        </div>
      )}

      <BrowserRouter basename={AppConfig.routerBase}>
        <Suspense>
          <Routes>
            <Route path="*" element={<NotFoud />} />
            <Route
              path="/"
              element={<Navigate replace to="/dashboard-management" />}
            />
            {/* Màn censor */}
            <Route
              path="/dashboard-management"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <DashboardManagement />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="/product-detail-management"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <ProductDetailManagement />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="add-product-detail-management"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <AddProductDetail />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="update-product-detail-management/:id"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <UpdateProductDetail />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="list-variant-product-detail"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <ListProductDetail />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="/employee-management"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <EmployeeManagement />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="/create-employee-management"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <AddEmployeeManagement />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="/update-employee-management/:id"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <UpdateEmployeeManagement />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="/custumer-management"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <CustumerManagement />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="/create-custumer-management"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <AddCustumerManagement />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="/update-custumer-management/:id"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <UpdateCustumerManagement />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="/category-management"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <CategoryManagement />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="/material-management"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <MaterialManagement />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="/sole-management"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <SoleManagement />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="/brand-management"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <BrandManagement />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="/bill-management"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <BillManagement />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="/promotion-management"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <PromotionManagement />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="/add-promotion-management"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <AddPromotion />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
