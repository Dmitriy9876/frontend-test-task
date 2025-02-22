import { Navigate, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";

const PrivateRoute = () => {
  const [cookies] = useCookies(["token"]);

  return cookies.token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
