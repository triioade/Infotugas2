import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";
import { jwtDecode } from "jwt-decode";

export default function SignIn() {
  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded: any = jwtDecode(token);

        if (decoded.exp * 1000 > Date.now()) {
    
          navigate("/task", { replace: true });
        } else {
          
          localStorage.removeItem("token");
          localStorage.removeItem("nim");
          localStorage.removeItem("fullname");
          localStorage.removeItem("prodi");
        }
      } catch {

        localStorage.removeItem("token");
        localStorage.removeItem("nim");
        localStorage.removeItem("fullname");
        localStorage.removeItem("prodi");
      }
    }
       setCheckingAuth(false);
  }, [navigate]);
    // Tampilkan loading dulu sampai pengecekan selesai
  if (checkingAuth) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }


  return (
    <>
      <PageMeta
        title="Info Tugas | Dashboard MahasiswaPamulang"
        description="Website pengingat tugas semester bagi mahasiswa Teknik Informatika Universitas Pamulang"
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
