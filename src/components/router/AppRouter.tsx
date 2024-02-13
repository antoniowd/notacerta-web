import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { withLoading } from "@app/hocs/withLoading.hoc";
import RequireAuth from "./RequireAuth";
import {
  CompanyData,
  ProfileData,
  companiesData,
  profileData,
  userModel,
} from "@app/storage";
import { useAtom } from "jotai";
import { UserModel } from "@app/domain/UserModel";
import { onAuthStateChanged } from "firebase/auth";
import { onSnapshot, doc, query, where, collection } from "firebase/firestore";
import { auth, db } from "@app/config/firebase";
import GlobalLoading from "../loading/GlobalLoading";
import { Unsubscribe } from "firebase/database";

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

const CompanySettingsPage = React.lazy(
  () => import("@app/pages/CompanySettings"),
);

const Login = withLoading(LoginPage);
const Signup = withLoading(SignupPage);
const Logout = withLoading(LogoutPage);
const VerifyEmail = withLoading(VerifyEmailPage);
const ResetPassword = withLoading(ResetPasswordPage);

const Client = withLoading(ClientPage);
const Dashboard = withLoading(DashboardPage);

const Profile = withLoading(ProfilePage);

const CompanySettings = withLoading(CompanySettingsPage);

const AppRouter = () => {
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingCompanies, setLoadingCompanies] = useState(true);
  const [user, setUser] = useAtom(userModel);
  const [, setProfile] = useAtom(profileData);
  const [, setCompanies] = useAtom(companiesData);

  useEffect(() => {
    onAuthStateChanged(auth, fUser => {
      setUser(fUser ? UserModel.createFromFirebase(fUser) : null);
      setLoadingUser(false);
    });
  }, []);

  useEffect(() => {
    let unsubscribe: Unsubscribe;
    if (user) {
      unsubscribe = onSnapshot(doc(db, "userData", user.id), doc => {
        const data = doc.data();
        setProfile(data as ProfileData);
        setLoadingProfile(false);
      });
    }

    return () => {
      unsubscribe && unsubscribe();
    };
  }, [user]);

  useEffect(() => {
    let unsubscribe: Unsubscribe;
    if (user) {
      const q = query(
        collection(db, "companies"),
        where("users", "array-contains", user.id),
      );
      unsubscribe = onSnapshot(q, querySnapshot => {
        const tempCompanies: CompanyData[] = [];
        querySnapshot.forEach(doc => {
          tempCompanies.push({
            id: doc.id,
            ...doc.data(),
          } as CompanyData);
        });
        setCompanies(tempCompanies);
        setLoadingCompanies(false);
      });
    }

    return () => {
      unsubscribe && unsubscribe();
    };
  }, [user]);

  const protectedLayout = (
    <RequireAuth>
      <Suspense fallback={<GlobalLoading />}>
        <MainLayout />
      </Suspense>
    </RequireAuth>
  );

  if (loadingUser || loadingProfile || loadingCompanies) {
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
          <Route path="settings/company" element={<CompanySettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
