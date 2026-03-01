import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import TaskUserPage from "./pages/Task/Taskpage";
import UpdateEmailPage from "./pages/email/email";
import ProtectedRoute from "./protectroute";
import { Toaster, toast } from "react-hot-toast";
import AbsenPage from "./pages/absen/absen";

import { useRegisterSW } from "virtual:pwa-register/react";

export default function App() {

  const {
    needRefresh: [needRefresh, setNeedRefresh],
    offlineReady: [offlineReady, setOfflineReady],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log("✅ Service Worker registered:", r);
    },
    onRegisterError(err) {
      console.error("❌ Service Worker registration error:", err);
    },
  });

  useEffect(() => {
    if (offlineReady) {
      toast.success("App siap digunakan offline ✨");
      setOfflineReady(false);
    }
  }, [offlineReady, setOfflineReady]);

  useEffect(() => {
    if (needRefresh) {
      toast((t) => (
        <div className="flex flex-col gap-2">
          <span className="font-medium">Versi baru tersedia 🚀</span>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              updateServiceWorker(true); // aktifkan SW baru & reload
            }}
            className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm"
          >
            Refresh Sekarang
          </button>
        </div>
      ), { duration: 10000 });

      setNeedRefresh(false);
    }
  }, [needRefresh, setNeedRefresh, updateServiceWorker]);

  return (
    <Router>
      <ScrollToTop />
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ style: { marginTop: "80px" } }}
      />

      <Routes>
        {/* Public */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected */}
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
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}
