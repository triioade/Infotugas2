import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/AuthPages/SignIn";
import NotFound from "./pages/OtherPage/NotFound";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import TaskUserPage from "./pages/Task/Taskuser";
import ProtectedRoute from "./protectroute";
import UpdateEmailPage from "./pages/email/email";

import SignUp from "./pages/AuthPages/SignUp";
export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        {/* Protected Routes inside Dashboard Layout */}
        <Route element={<AppLayout />}>
          <Route path="/profile" element={<UpdateEmailPage />} />
          <Route path="/task" element={<TaskUserPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
