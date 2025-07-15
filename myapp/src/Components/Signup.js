import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import "../Auth.css";

const Signup = ({ setToken, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axiosInstance.post("/auth/signup", { email, password });
      const { token, user } = response.data;
      setToken(token);
      setUser(user);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/home");  // or wherever the dashboard is
    } catch (err) {
      setError("Signup failed. Try again.");
    }
  };

  return (
    <div className="auth-form">
      <form onSubmit={handleSignup}>
        <h2>Sign Up</h2>
        {error && <p className="error">{error}</p>}
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Password" />
        <button type="submit">Create Account</button>
        <p>
          Already have an account? <Link to="/login">Log in here</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;