import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

interface DecodedToken {
  exp: number;       // expiry timestamp
  [key: string]: any;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState<null | boolean>(null);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        // Tidak ada token → redirect ke signin
        setAuthorized(false);
        navigate("/signin", { replace: true });
        return;
      }

      try {
        const decoded: DecodedToken = jwtDecode(token);

        // Cek expiry token
        if (decoded.exp * 1000 < Date.now()) {
          // Token expired → hapus dan redirect
          localStorage.removeItem("token");
          localStorage.removeItem("nim");
          localStorage.removeItem("fullname");
          localStorage.removeItem("prodi");
          setAuthorized(false);
          navigate("/signin", { replace: true });
          return;
        }

        // Token valid
        setAuthorized(true);
      } catch (err) {
        console.error("Token tidak valid:", err);
        localStorage.removeItem("token");
        setAuthorized(false);
        navigate("/signin", { replace: true });
      }
    };

    checkAuth();
  }, [navigate]);

  // Loading sementara saat cek token
  if (authorized === null) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!authorized) return null; // Tidak authorized → jangan render children

  return <>{children}</>;
};

export default ProtectedRoute;
