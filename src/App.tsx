import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import TaskUserPage from "./pages/Task/Taskuser";
import UpdateEmailPage from "./pages/email/email";
import ProtectedRoute from "./protectroute";
import { Toaster, toast } from "react-hot-toast";
import AbsenPage from "./pages/absen/absen";

export default function App() {
  // 🔄 Auto-refresh kalau ada versi baru
  useEffect(() => {
    let currentVersion: string | null = null;

    const checkVersion = async () => {
      try {
        const res = await fetch("/version.json", { cache: "no-store" });
        if (!res.ok) return;

        const data = await res.json();
        if (data?.version) {
          if (!currentVersion) {
            currentVersion = data.version;
          } else if (currentVersion !== data.version) {
            toast((t) => (
              <div className="flex flex-col gap-2">
                <span className="font-medium">
                  Versi baru tersedia 🚀
                </span>
                <button
                  onClick={() => {
                    toast.dismiss(t.id);
                    window.location.reload();
                  }}
                  className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm"
                >
                  Refresh Sekarang
                </button>
              </div>
            ), { duration: 10000 });
          }
        }
      } catch (err) {
        console.error("Gagal cek versi:", err);
      }
    };

    checkVersion();
    const interval = setInterval(checkVersion, 30000); // cek tiap 30 detik
    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            marginTop: "80px",
          },
        }}
      />

      <Routes>
        {/* Public Routes */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Routes inside Dashboard Layout */}
        <Route element={<AppLayout />}>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <TaskUserPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/task"
            element={
              <ProtectedRoute>
                <TaskUserPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/absen"
            element={
              <ProtectedRoute>
                <AbsenPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UpdateEmailPage />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}
