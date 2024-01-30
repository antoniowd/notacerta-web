import { Navigate } from "react-router-dom";
import { WithChildrenProps } from "../../@types/generalTypes";
import { useAtom } from "jotai";
import { userModel } from "@app/storage";

const RequireAuth = ({ children }: WithChildrenProps) => {
  const [user] = useAtom(userModel);

  if (user && user.emailVerfified) {
    return <>{children}</>;
  }

  if (user && !user.emailVerfified) {
    return <Navigate to="/verify-email" replace />;
  }

  return <Navigate to="/login" replace />;
};

export default RequireAuth;
