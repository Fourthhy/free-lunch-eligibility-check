import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import AdminLogin from "../pages/admin/AdminLogin";
import QueryInput from "../pages/KStaff/QueryInput";
import QueryResponse from "../pages/KStaff/QueryResponse";
import QueryInputErrorResponse from "../pages/KStaff/QueryInputErrorResponse";
import Dashboard from "../pages/admin/Dashboard";
import DashboardData from "../pages/admin/DashboardData";
import Masterlist from "../pages/admin/Masterlist";
import Schedule from "../pages/admin/Schedule";
import ForgotPassword from "../pages/admin/forgot_password/ForgotPassword";
import ChangePassword from "../pages/admin/change_password/ChangePassword";
import MealRecordHistory from "../pages/admin/MealRecordHistory";
import SamplePage from "../pages/SamplePage";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin_login" element={<AdminLogin />} />
          <Route path="/queryinput" element={<QueryInput />} />
          <Route path="/queryInputErrorResponse/:error" element={<QueryInputErrorResponse />} />
          <Route path="/queryresponse" element={<QueryResponse />} /> {/* <-- THIS LINE IS CORRECTED */}
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/example" element={<SamplePage />} />

          {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<DashboardData />} />
              <Route path="masterlist" element={<Masterlist />} />
              <Route path="schedule" element={<Schedule />} />
              <Route path="MealRecordHistory" element={<MealRecordHistory />} />
            </Route>
            <Route path="/changepassword" element={<ChangePassword />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;