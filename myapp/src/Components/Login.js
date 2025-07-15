import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate, Link } from "react-router-dom";  // 👈 Import Link
import "../Auth.css";

const Login = ({ setToken, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axiosInstance.post("/auth/login", { email, password });
      const { token, user } = response.data;
      setToken(token);
      setUser(user);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/home");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="auth-form">
      <form onSubmit={handleLogin}>
        <h2>Log In</h2>
        {error && <p className="error">{error}</p>}
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Password" />
        <button type="submit">Log In</button>
        <p>
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;