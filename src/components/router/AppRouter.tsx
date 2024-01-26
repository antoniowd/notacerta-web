import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { withLoading } from "../../hocs/withLoading.hoc";
import RequireAuth from "./RequireAuth";
import MainLayout from "../layouts/main/MainLayout";

import Dashboard from "../../pages/Dashboard";

const ClientPage = React.lazy(() => import("../../pages/Client"));

const Client = withLoading(ClientPage);

const AppRouter = () => {
  const protectedLayout = (
    <RequireAuth>
      <MainLayout />
    </RequireAuth>
  );
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Client />} />
        <Route path="/" element={protectedLayout}>
          <Route index element={<Dashboard />} />
          <Route path="clients" element={<Client />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
