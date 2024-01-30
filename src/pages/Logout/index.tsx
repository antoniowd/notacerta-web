import GlobalLoading from "@app/components/loading/GlobalLoading";
import logoutUser from "@app/services/user/logoutUser";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const Logout = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    logoutUser().finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <GlobalLoading />;
  }

  return <Navigate to="/login" replace />;
};

export default Logout;
