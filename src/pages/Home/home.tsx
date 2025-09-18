import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

interface DecodedToken {
  exp: number;
  [key: string]: any;
}

export default function HomeRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);

        const isValid = decoded.exp * 1000 > Date.now();

        if (isValid) {
          navigate("/task", { replace: true });
          return;
        } else {

          localStorage.removeItem("token");
          toast.error("Sesi kamu sudah berakhir, silakan login ulang.");
        }
      } catch (err) {
    
        localStorage.removeItem("token");
        toast.error("Token tidak valid, silakan login ulang.");
      }
    }

    navigate("/signin", { replace: true });
  }, [navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <p>Redirecting...</p>
    </div>
  );
}
