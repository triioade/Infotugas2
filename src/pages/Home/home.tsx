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

    // kasih jeda 1 render cycle biar spinner sempat tampil
    setTimeout(() => {
      if (token) {
        try {
          const decoded: DecodedToken = jwtDecode(token);

          if (decoded.exp * 1000 > Date.now()) {
            navigate("/task", { replace: true });
            return;
          } else {
            localStorage.removeItem("token");
            toast.error("Sesi kamu sudah berakhir, silakan login ulang.");
          }
        } catch {
          localStorage.removeItem("token");
          toast.error("Token tidak valid, silakan login ulang.");
        }
      }

      navigate("/signin", { replace: true });
    }, 0);
  }, [navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-white dark:bg-gray-900">
      <div className="flex flex-col items-center gap-3">
        {/* Spinner */}
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-700 dark:text-gray-300 text-sm font-medium">
          Redirecting...
        </p>
      </div>
    </div>
  );
}
