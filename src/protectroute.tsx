import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState<null | boolean>(null);

  useEffect(() => {
    const token = Cookies.get("token");
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
