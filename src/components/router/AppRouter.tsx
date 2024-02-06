import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { withLoading } from "@app/hocs/withLoading.hoc";
import RequireAuth from "./RequireAuth";
import { userModel } from "@app/storage";
import { useAtom } from "jotai";
import { UserModel } from "@app/domain/UserModel";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@app/config/firebase";
import GlobalLoading from "../loading/GlobalLoading";

const MainLayout = React.lazy(() => import("../layouts/main/MainLayout"));

// Public pages
const LoginPage = React.lazy(() => import("@app/pages/Login"));
const SignupPage = React.lazy(() => import("@app/pages/Signup"));
const LogoutPage = React.lazy(() => import("@app/pages/Logout"));
const VerifyEmailPage = React.lazy(() => import("@app/pages/VerifyEmail"));
const ResetPasswordPage = React.lazy(() => import("@app/pages/ResetPassword"));

// main menu
const DashboardPage = React.lazy(() => import("@app/pages/Dashboard"));
const ClientPage = React.lazy(() => import("@app/pages/Client"));

//secondary menu
const ProfilePage = React.lazy(() => import("@app/pages/Profile"));

const Login = withLoading(LoginPage);
const Signup = withLoading(SignupPage);
const Logout = withLoading(LogoutPage);
const VerifyEmail = withLoading(VerifyEmailPage);
const ResetPassword = withLoading(ResetPasswordPage);

const Client = withLoading(ClientPage);
const Dashboard = withLoading(DashboardPage);

const Profile = withLoading(ProfilePage);

const AppRouter = () => {
  const [loading, setLoading] = useState(true);
  const [, setUser] = useAtom(userModel);

  useEffect(() => {
    onAuthStateChanged(auth, fUser => {
      setLoading(false);
      setUser(fUser ? UserModel.createFromFirebase(fUser) : null);
    });
  }, []);

  const protectedLayout = (
    <RequireAuth>
      <Suspense fallback={<GlobalLoading />}>
        <MainLayout />
      </Suspense>
    </RequireAuth>
  );

  if (loading) {
    return <GlobalLoading />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/forgot-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/" element={protectedLayout}>
          <Route index element={<Dashboard />} />
          <Route path="/clients" element={<Client />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
