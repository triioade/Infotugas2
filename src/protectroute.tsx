import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/signin", { replace: true });
    } else {
      setAuthorized(true);
    }
  }, [navigate]);

  if (!authorized) return null; // optionally return loading

  return <>{children}</>;
};

export default ProtectedRoute;
