import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate, Link } from "react-router-dom";  // 👈 Import Link

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axiosInstance.post("/auth/login", { email, password });
      const { token } = response.data;
      setToken(token);
      localStorage.setItem("token", token);
      navigate("/home");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Log In</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Log In</button>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* 🔗 Signup Link */}
      <p>
        Don't have an account? <Link to="/signup">Sign up here</Link>
      </p>
    </form>
  );
};

export default Login;