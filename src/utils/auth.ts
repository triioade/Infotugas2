
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp: number;
  [key: string]: any;
}

export function isTokenValid(): boolean {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const decoded: DecodedToken = jwtDecode(token);

    
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      localStorage.removeItem("nim");
      localStorage.removeItem("fullname");
      localStorage.removeItem("prodi");
      return false;
    }

    return true;
  } catch (err) {
    console.error("Token invalid:", err);
    localStorage.removeItem("token");
    return false;
  }
}
