import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await api.post("/auth/register", { name, email, password, role });
        setMessage("Registered! Now login.");
        setIsRegister(false);
      } else {
        const res = await api.post("/auth/login", { email, password });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        navigate("/");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="box">
      <h2>{isRegister ? "Register" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        {isRegister && (
          <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        )}
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {isRegister && (
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
        )}
        <button type="submit">{isRegister ? "Register" : "Login"}</button>
      </form>
      <p className="message">{message}</p>
      <p className="link" onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "Already have an account? Login" : "New user? Register"}
      </p>
    </div>
  );
}

export default Login;
