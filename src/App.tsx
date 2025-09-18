import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import TaskUserPage from "./pages/Task/Taskuser";
import UpdateEmailPage from "./pages/email/email";
import ProtectedRoute from "./protectroute";
import { Toaster } from "react-hot-toast";
import AbsenPage from "./pages/absen/absen";

// ./gradlew assembleRelease

export default function App() {
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
          {/* Task page jadi root "/" */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <TaskUserPage />
              </ProtectedRoute>
            }
          />

          {/* Support untuk user lama yang buka /task */}
          <Route path="/task" element={<Navigate to="/" replace />} />

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
