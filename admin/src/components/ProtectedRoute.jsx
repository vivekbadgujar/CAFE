import { Navigate } from "react-router-dom";
import { getToken, isTokenExpired, clearToken } from "../utils/auth.js";

const ProtectedRoute = ({ children }) => {
  const token = getToken();
  if (!token || isTokenExpired(token)) {
    clearToken();
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
