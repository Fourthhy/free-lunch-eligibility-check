import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "../pages/LandingPage"
import AdminLogin from "../pages/admin/AdminLogin"

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin_login" element={<AdminLogin />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
