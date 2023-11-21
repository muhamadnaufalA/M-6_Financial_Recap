import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const isLogin = Cookies.get("userId");
  return isLogin ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
