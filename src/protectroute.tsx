import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState<null | boolean>(null);

  useEffect(() => {
    // Cek token di localStorage dan sessionStorage
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      navigate("/signin", { replace: true });
      setAuthorized(false);
    } else {
      setAuthorized(true);
    }
  }, [navigate]);

  if (authorized === null) {
    return <div>Loading...</div>; // atau spinner
  }

  if (!authorized) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
