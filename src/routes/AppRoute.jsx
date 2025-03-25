import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "../pages/LandingPage"
import AdminLogin from "../pages/admin/AdminLogin"
import QueryInput from "../pages/KStaff/QueryInput"
import QueryResponse from "../pages/KStaff/QueryResponse"

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin_login" element={<AdminLogin />} />
          <Route path="/queryinput" element={<QueryInput />} />

          <Route path="/queryresponse" element={<QueryResponse />} /> {/*TEMPORARY ROUTE*/}

        </Routes>
      </Router>
    </>
  )
}

export default App
