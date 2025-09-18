import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import axios from "axios";
import API_URL from "../../utils/APIURL";
import toast from "react-hot-toast";



export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [nim, setNim] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

const handleSignUp = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  if (!nim || !email || !password) {
    setError("Semua field wajib diisi!");
    setLoading(false);
    return;
  }

  if (!isChecked) {
    setError("Anda harus menyetujui syarat & ketentuan terlebih dahulu.");
    setLoading(false);
    return;
  }

  try {
    const res = await axios.post(`${API_URL}/auth/register`, {
      nim,
      email,
      password,
    });

    console.log("Register response:", res);

    if ((res.status === 200 || res.status === 201) && res.data?.message === "registration successful") {
      toast.success("Pendaftaran berhasil! Silakan masuk.", {
        style: {
          background: "var(--color-brand-500, #2563eb)",
          color: "#fff",
          borderRadius: "0.75rem",
          fontWeight: 500,
        },
        iconTheme: {
          primary: "var(--color-brand-500, #2563eb)",
          secondary: "#fff",
        },
        className: "dark:bg-brand-500 dark:text-white",
      });

      setLoading(false);
      navigate("/signin");
    } else {
      throw new Error(res.data?.message || "Pendaftaran gagal, silakan coba lagi.");
    }
} catch (err: any) {
  let msg = "Terjadi kesalahan saat pendaftaran.";
  const backendMessage = err?.response?.data?.message;

  if (backendMessage === "Error: user is available") {
    msg = "Pengguna sudah terdaftar. Silakan masuk.";
    
  } else if (backendMessage === "user not exist in mentari") {
    msg = "Pengguna Tidak Terdaftar di MENTARI. Pastikan NIM dan Password anda sesuai dengan MENTARI.";

  } else if (backendMessage) {
    msg = backendMessage;

  } else if (err?.response?.status === 400) {
    msg = "Data tidak valid. Mohon periksa kembali.";

  } else if (err?.response?.status === 500) {
    msg = "Server sedang bermasalah. Coba beberapa saat lagi.";
// ERROR JARINGAN
  } else if (err.code === "ERR_BAD_RESPONSE" || err.code === "Request failed with status code 500" || err.code === "ECONNABORTED" || err.code === "ETIMEDOUT" || !err.response) {
    msg = "Tidak dapat terhubung ke server. Periksa koneksi internet atau coba lagi nanti.";
  }

  setLoading(false);
  setError(msg);
  console.error("SignUp error:", err);
}

};



  return (
    <div
      className="flex flex-col flex-1 min-h-screen justify-center items-center relative
        bg-left bg-no-repeat bg-cover
        bg-[url('/images/background/klh.png')]
        dark:bg-[url('/images/background/klhn.png')]"
    >
      <div className="absolute inset-0 bg-black/60 dark:bg-black/30 z-0" />
      <div className="w-full max-w-md pt-10 mx-auto relative z-10">
        <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto bg-white dark:bg-gray-900 px-6 py-10 rounded-lg shadow-lg mt-6">
          {/* Header */}
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Daftar Akun
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Masukkan data sesuai akun Mentari anda untuk membuat akun!
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignUp}>
            <div className="space-y-6">
              <div>
                <Label>
                  NIM <span className="text-error-500">*</span>
                </Label>
                <Input
                  placeholder="241011xxxx"
                  value={nim}
                  onChange={(e) => setNim(e.target.value)}
                />
              </div>
              <div>
                <Label>
                  Email <span className="text-error-500">*</span>
                </Label>
                <Input
                  type="email"
                  placeholder="Masukkan email aktif"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label>
                  Kata Sandi <span className="text-error-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    placeholder="Masukkan kata sandi"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                  >
                    {showPassword ? (
                      <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    ) : (
                      <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    )}
                  </span>
                </div>
              </div>

              {/* Agreement */}
              <div className="flex items-center gap-3">
                <Checkbox checked={isChecked} onChange={setIsChecked} />
                <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                  Saya menyetujui{" "}
                  <button
                    type="button"
                    onClick={() => setShowModal(true)}
                    className="text-brand-500 hover:text-brand-600 dark:text-brand-400 underline"
                  >
                    syarat & ketentuan
                  </button>
                </span>
              </div>

              {error && <div className="text-error-500 text-sm">{error}</div>}

              <div>
<Button className="w-full flex items-center justify-center gap-2" size="sm" disabled={loading}>
  {loading ? (
    <>
      <svg
        className="w-4 h-4 animate-spin text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      Memproses...
    </>
  ) : (
    "Daftar"
  )}
</Button>
              </div>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-5 text-center text-sm text-gray-700 dark:text-gray-400">
            Sudah punya akun?{" "}
            <Link
              to="/signin"
              className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
            >
              Masuk di sini
            </Link>
          </div>
        </div>
      </div>

      {/* Modal Syarat & Ketentuan */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 px-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-md w-full p-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
              Syarat & Ketentuan
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4 space-y-3">
              <span className="block">
                🔒{" "}
                <span className="font-semibold text-brand-500">
                  Keamanan Terjamin
                </span>{" "}
                — Kami{" "}
                <span className="font-semibold">tidak menyimpan password</span>{" "}
                Anda. Login dilakukan langsung melalui sistem{" "}
                <span className="font-semibold">Mentari UNPAM</span>.
              </span>

              <span className="block">
                📧{" "}
                <span className="font-semibold text-brand-500">
                  Data yang Disimpan
                </span>{" "}
                — Hanya <span className="font-semibold">NIM</span> dan{" "}
                <span className="font-semibold">Email</span> Anda yang kami
                simpan, untuk keperluan pencatatan sesuai aturan sistem.
              </span>

              <span className="block">
                ✅{" "}
                <span className="font-semibold text-brand-500">
                  Persetujuan
                </span>{" "}
                — Dengan mencentang syarat & ketentuan, Anda memahami dan
                menyetujui kebijakan ini.
              </span>
            </p>
            <div className="flex justify-end gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowModal(false)}
              >
                Tutup
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  setIsChecked(true);
                  setShowModal(false);
                }}
              >
                Saya Setuju
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
