import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { withLoading } from "../../hocs/withLoading.hoc";
import RequireAuth from "./RequireAuth";
import GlobalLoading from "../loading/GlobalLoading";

const MainLayout = React.lazy(() => import("../layouts/main/MainLayout"));

// Public pages
const LoginPage = React.lazy(() => import("../../pages/Login"));

const DashboardPage = React.lazy(() => import("../../pages/Dashboard"));
const ClientPage = React.lazy(() => import("../../pages/Client"));

const Login = withLoading(LoginPage);

const Client = withLoading(ClientPage);
const Dashboard = withLoading(DashboardPage);

const AppRouter = () => {
  const protectedLayout = (
    <RequireAuth>
      <Suspense fallback={<GlobalLoading />}>
        <MainLayout />
      </Suspense>
    </RequireAuth>
  );
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={protectedLayout}>
          <Route index element={<Dashboard />} />
          <Route path="clients" element={<Client />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
