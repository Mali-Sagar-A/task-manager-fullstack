import { useState } from "react";
import api from "../services/api";

function LoginPage({ onLogin, goToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);

      onLogin();
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
      <p style={{ textAlign: "center" }}>
        Don't have an account?{" "}
        <span
          style={{ color: "#007bff", cursor: "pointer" }}
          onClick={goToRegister}
        >
          Register here
        </span>
      </p>
    </div>
  );
}

export default LoginPage;
