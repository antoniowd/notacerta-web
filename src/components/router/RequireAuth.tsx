import { Navigate } from "react-router-dom";
import { WithChildrenProps } from "../../@types/generalTypes";
import { useAtom } from "jotai";
import { userModel } from "@app/storage";

const RequireAuth = ({ children }: WithChildrenProps) => {
  const [user] = useAtom(userModel);

  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

export default RequireAuth;
