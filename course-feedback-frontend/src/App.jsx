import { Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import Admin from "./pages/Admin";

function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      {token && (
        <nav>
          <Link to="/">Courses</Link>
          {role === "admin" && <Link to="/admin">Ratings Dashboard</Link>}
          <button onClick={logout}>Logout</button>
        </nav>
      )}

      <div className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={token ? <Courses /> : <Navigate to="/login" />} />
          <Route path="/course/:id" element={token ? <CourseDetails /> : <Navigate to="/login" />} />
          <Route path="/admin" element={role === "admin" ? <Admin /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
