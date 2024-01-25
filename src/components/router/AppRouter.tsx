import { BrowserRouter, Routes, Route } from "react-router-dom";
import RequireAuth from "./RequireAuth";
import MainLayout from "../layouts/main/MainLayout";

const Dashboard = () => {
  return <div>dashboard</div>;
};

const Client = () => {
  return <div>clients</div>;
};

const SignIn = () => {
  return <div>login</div>;
};

const AppRouter = () => {
  const protectedLayout = (
    <RequireAuth>
      <MainLayout />
    </RequireAuth>
  );
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/" element={protectedLayout}>
          <Route index element={<Dashboard />} />
          <Route path="clients" element={<Client />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
