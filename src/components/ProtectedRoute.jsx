import { useLocation, Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  let location = useLocation();

  if (!localStorage.getItem("login")) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
}
// import { useSelector } from "react-redux";
// import { Navigate, Outlet } from "react-router-dom";

// const ProtectedRouteLogin = () => {
//   const { login } = useSelector((state) => state.product);
//   return JSON.parse(!localStorage.getItem("login")) || login === null ? <Outlet /> : <Navigate to="/" />;
// };
// export default ProtectedRouteLogin;
