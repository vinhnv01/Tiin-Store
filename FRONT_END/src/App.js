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
import BillManagement from "./pages/bill/BillManagement";

function App() {
  return (
    <div className="App">
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
              path="/bill-management"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <BillManagement />
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
