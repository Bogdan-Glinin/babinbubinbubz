import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ element }: any) => {
  const isUserAuthenticated = () => {
    console.log(Cookies.get("token"))
    return Cookies.get("token");
  };
  return isUserAuthenticated() ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
