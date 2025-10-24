import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = () => {
  const { loading, authenticated } = useAuth();

  if (loading)
    return (
      <div className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
        <div className="spinner-border text-primary" role="status">
        </div>
      </div>
    );

  return authenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
