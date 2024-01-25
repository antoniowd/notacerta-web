import { useState } from "react";
import { Navigate } from "react-router-dom";
import { WithChildrenProps } from "../../@types/generalTypes";

const RequireAuth = ({ children }: WithChildrenProps) => {
  const [user] = useState(true);

  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

export default RequireAuth;
