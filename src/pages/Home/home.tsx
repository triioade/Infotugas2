import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function HomeRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          navigate("/task", { replace: true });
          return;
        }
      } catch {}
    }

    navigate("/signin", { replace: true });
  }, [navigate]);

  return null;
}
