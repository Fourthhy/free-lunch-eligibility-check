import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "../pages/LandingPage"
import AdminLogin from "../pages/admin/AdminLogin"
import InputField from "../pages/KStaff/InputField"

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin_login" element={<AdminLogin />} />
          <Route path="/kstaffInput" element={<InputField />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
