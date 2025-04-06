import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom"
import LandingPage from "../pages/LandingPage"
import AdminLogin from "../pages/admin/AdminLogin"
import QueryInput from "../pages/KStaff/QueryInput"
import QueryResponse from "../pages/KStaff/QueryResponse"
import Dashboard from "../pages/admin/Dashboard"
import DashboardData from "../pages/admin/DashboardData"
import Masterlist from "../pages/admin/Masterlist"
import Schedule from "../pages/admin/Schedule"

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin_login" element={<AdminLogin />} />
          <Route path="/queryinput" element={<QueryInput />} />

          <Route path="/queryresponse" element={<QueryResponse />} /> {/*TEMPORARY ROUTE*/}

          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<DashboardData />} />
            <Route path="masterlist" element={<Masterlist />} />
            <Route path="schedule" element={<Schedule />} />
          </Route>

        </Routes>
      </Router>
    </>
  )
}

export default App
