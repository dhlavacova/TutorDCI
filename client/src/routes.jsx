import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/authContext";
import { Spinner } from "@nextui-org/react";

export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1>
          <Spinner
            size="lg"
            color="primary"
            label="Loading..."
            labelColor="primary"
          />
        </h1>
      </div>
    );
  }

  if (!isAuthenticated && !loading) return <Navigate to="/login" replace />;
  return <Outlet />;
};
